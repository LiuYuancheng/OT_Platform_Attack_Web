#!/bin/bash

killall -9 node

cd /home/orchestrator/Attack/server/server/

BASEDIR=$(dirname "$0")

$BASEDIR/node $BASEDIR/app.js

echo open 
