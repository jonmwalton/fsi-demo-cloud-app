#!/bin/bash
set -o errexit # Exit on error

HOST="https://psdev.us.evals.redhatmobile.com"

function target {
  fhc target $HOST
}

function tail {
  fhc app logs tail --app=$1 --env=$2
}

target
tail $1 $2
