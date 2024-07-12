#!/bin/bash

NODE_SCRIPT="createabunch.js"
MAX_RUNS=30
COUNTER=0

# Function to handle the interrupt signal
on_interrupt() {
  echo ""
  echo "Script interrupted. Exiting."
  exit 0
}

# Set the trap to catch the interrupt signal (SIGINT)
trap on_interrupt INT

while [ $COUNTER -lt $MAX_RUNS ]; do
  echo "Run #$((COUNTER+1)): Starting $NODE_SCRIPT"
  gtimeout 10s node $NODE_SCRIPT
  COUNTER=$((COUNTER+1))

  if [ $COUNTER -lt $MAX_RUNS ]; then
    echo "Run #$((COUNTER+1)): Restarting $NODE_SCRIPT in 1 minute"
    sleep 10s
  else
    echo "Reached max runs ($MAX_RUNS). Exiting."
  fi
done