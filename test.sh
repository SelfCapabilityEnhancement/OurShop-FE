#!/usr/bin/env bash
ARCH=""
if [[ "$(uname -m)" == "arm64" ]]; then
  ARCH="--platform 'linux/arm64/v8'"
fi

if eval "docker build $ARCH -t ourshop-fe-test -f test.dockerfile ."; then
  docker run --rm -it ourshop-fe-test
else
  echo "docker build failed"
  exit 1
fi
