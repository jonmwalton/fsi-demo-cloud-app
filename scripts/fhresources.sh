#!/bin/bash

# Exit on error
set -o errexit

HOST="https://psdev.us.evals.redhatmobile.com"

function target {
  fhc target $HOST
}

function getRes {
  fhc app resources --app=$1 --env=$2
}

target
getRes $1 $2
