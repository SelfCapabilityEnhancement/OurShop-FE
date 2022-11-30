#!/usr/bin/env bash
set -e

args=(
  -t ourshop-fe-test
  -f test.dockerfile .
)

if [[ "$(uname -m)" == "arm64" ]]; then
  args+=(--platform 'linux/arm64/v8')
fi

docker build "${args[@]}"
docker run --rm -it ourshop-fe-test
