class Particle {
  constructor(_loc,_dir,_speed, _xBounds, _yBounds, _color, _boundingFn){
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
    this.i = 0;
    this.original = {
      x: _loc.x,
      y: _loc.y
    }
    this.xBounds = _xBounds;
    this.yBounds = _yBounds;
    this.color = _color;
    this.boundingFn = _boundingFn;
  }
  run() {
    this.update();
    this.checkEdges();
    this.i++;
  }
  checkEdges(){
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || this.loc.y>height) {    
      this.loc.x = random(this.xBounds[0], this.xBounds[1]);
      this.loc.y = random(this.yBounds[0], this.yBounds[1]);
    }
    if (this.loc.x > this.original.x + 10 || this.loc.x < this.original.x - 10) {
      this.loc.x = random(this.xBounds[0], this.xBounds[1]);
      this.loc.y = random(this.yBounds[0], this.yBounds[1]);
    }
  }
  update(){
    let color = this.color ? this.color : random(rockColors)
    stroke(color);
    strokeWeight(mainStrokeWeight)

    let x1 = this.loc.x
    let y1 = this.loc.y
    
    for (let j = 0; j < 10; j++) {
      let angle = noise(this.loc.x/noiseScale, this.loc.y/noiseScale) * TWO_PI * noiseStrength
      this.dir.x = cos(angle);
      this.dir.y = sin(angle);
      var vel = this.dir.copy();
      vel.mult(this.speed);
      this.loc.add(vel);
    }
    let x2 = this.loc.x
    let y2 = this.loc.y     
    for (let j = 0; j < 10; j++) {
      let angle = noise(this.loc.x/noiseScale, this.loc.y/noiseScale) * TWO_PI * noiseStrength
      this.dir.x = cos(angle);
      this.dir.y = sin(angle);
      var vel = this.dir.copy();
      vel.mult(this.speed);
      this.loc.add(vel);
    }
    let x3 = this.loc.x
    let y3 = this.loc.y  
    for (let j = 0; j < 10; j++) {
      let angle = noise(this.loc.x/noiseScale, this.loc.y/noiseScale) * TWO_PI * noiseStrength
      this.dir.x = cos(angle);
      this.dir.y = sin(angle);
      var vel = this.dir.copy();
      vel.mult(this.speed);
      this.loc.add(vel);
    }
    let x4 = this.loc.x
    let y4 = this.loc.y

    if (this.boundingFn(x1,y1,this.xBounds[1],this.yBounds[1]) || this.boundingFn(x2,y2,this.xBounds[1],this.yBounds[1]) || this.boundingFn(x3,y3,this.xBounds[1],this.yBounds[1]) || this.boundingFn(x4,y4,this.xBounds[1],this.yBounds[1])) {
      quad(x1,y1,x2,y2,x3,y3,x4,y4)
    } else {
      return
    }
  }
}

const notInBox = (x,y, width, height) => {
  return !(x > 30 && x < width-30 && y > 30 && y < height-30)
}
