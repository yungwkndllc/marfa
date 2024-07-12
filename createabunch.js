const puppeteer = require('puppeteer-extra');
const UserPreferencesPlugin = require("puppeteer-extra-plugin-user-preferences");
const fs = require('fs')
// const args = process.argv.slice(2);


const downloadImageDirectoryPath = '/Users/campionfellin/Desktop/art/marfa/website/public/images'

// const metaPath = '/Users/campionfellin/Downloads/finals/breathe/public/metadatas'

const generateRandomHash = () => {
  const alphabet =
    "0123456789abcdefABCDEF";
  return (
    "0x" +
    Array(64)
      .fill(0)
      .map((_) => alphabet[(Math.random() * alphabet.length) | 0])
      .join("")
  );
};

puppeteer.use(
  UserPreferencesPlugin({
    userPrefs: {
      download: {
       // this one handle first time downlaod popup
        prompt_for_download: false,

        default_directory: downloadImageDirectoryPath,
        // this arg handle multiple download popup
        automatic_downloads: 0,
      }
    },
  })
);

function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}


const doIt = async (hash, dims, meta) => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: require('puppeteer').executablePath(),
  });

  const page1 = await browser.newPage();
  await page1.setViewport({ width: dims.w, height: dims.h});
  await page1.goto(`http://localhost/?${meta ? 'metadata' : 'download'}=true&h=${hash}&ic=1`)

  // await page1.goto(`https://prohibition.art/api/creator/projects/cliylkvop0004mh0f7aa8ai6u/preview`);
  await new Promise(r => setTimeout(r, 500));
};

// const filesAlready = fs.readdirSync(metaPath)
// const videosAlready = fs.readdirSync(downloadImageDirectoryPath).map((f) =>f.split('.')[0])

let howMany = 0;

// let range = 2

// console.log(range)
// for (let i = range*2; i < (range+1)*2; i++) {
//   const hash = filesAlready[i].split('.')[0]
//   doIt(hash)
// }

let matches = 0
// Find first two files in filesAlready that are not in the download directory
// for (let i = 0; i < filesAlready.length; i++) {
//   const hash = filesAlready[i].split('.')[0]

//   if (!videosAlready.includes(hash) && matches < 3) {
//     matches++
//     doIt(hash)
//   }
// }

// doIt('0x138d93d68c94b3e2720cd9a06d35828fcc3589f3b806ff4521f58d15d2e2b9a5')

// fs.rmdirSync(downloadImageDirectoryPath, { force: true, recursive: true })
let interval = setInterval(async () => {
  howMany++;
  if (howMany > 5) {
    clearInterval(interval)
  } else {
    // Create a hash and render in both 1k and 2k
    const tokenHash = generateRandomHash()

    // await doIt('0xf842cc9d47d941fe2ce11619bb94c68bf37b32deb34bf557df6063a30c628be9', {w: 1920, h: 1080});
    // await doIt('0xf842cc9d47d941fe2ce11619bb94c68bf37b32deb34bf557df6063a30c628be9', {w: 1920*2, h: 1080*2});

    await doIt(tokenHash, {w: 1920, h: 1080}, false);
    // await doIt(tokenHash, {w: 1920, h: 1080}, true);

    // await doIt(tokenData.hash, {w: 1920*2, h: 1080*2});

    // await doIt('0x82e51f49dbb5de00fa4ce16e04583ee5db9aa5b317f626d7ebfd2af5a01a6e0b', {w: 1920*4, h: 1080*4});
    // await doIt('0x4fe5a8c536b6752c49d618f3920afae66a0bb890560bd9b6e5e34b97a8300f4f', {w: 1920*4, h: 1080*4});
    // await doIt(tokenData.hash, {w: 1920*2, h: 1080*2});

  }
}, 1000)
