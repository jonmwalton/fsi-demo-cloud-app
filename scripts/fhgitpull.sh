#!/bin/bash

# Exit on error
set -o errexit

HOST="https://psdev.us.evals.redhatmobile.com"

function target {
  fhc target $HOST
}

function gitPull {
  fhc git pull --app=$1 --clean --json
}

target
gitPull $1
