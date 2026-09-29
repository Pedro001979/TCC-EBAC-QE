#!/usr/bin/env bash
set -euo pipefail

app_dir="$RUNNER_TEMP/ebac-app"
mkdir -p "$app_dir"

curl --fail --location --retry 3 "https://raw.githubusercontent.com/EBAC-QE/ebac-store-mobile-tests/5366408d5d9f03641c92de868c21ad360d32f2c8/app/ebacshop.apks.zip" --output "$app_dir/ebacshop.apks.zip"
unzip -q "$app_dir/ebacshop.apks.zip" -d "$app_dir"

curl --fail --location --retry 3 "https://github.com/google/bundletool/releases/download/1.18.3/bundletool-all-1.18.3.jar" --output "$app_dir/bundletool.jar"
echo "a099cfa1543f55593bc2ed16a70a7c67fe54b1747bb7301f37fdfd6d91028e29  $app_dir/bundletool.jar" | sha256sum --check

apks_file="$(find "$app_dir" -name ebacshop.apks -print -quit)"
test -n "$apks_file"
java -jar "$app_dir/bundletool.jar" install-apks --apks="$apks_file"

adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0

cd Mobile
npx appium --base-path / > "$RUNNER_TEMP/appium.log" 2>&1 &
appium_pid=$!
trap 'kill "$appium_pid" 2>/dev/null || true' EXIT

for attempt in $(seq 1 60); do
  if curl --silent --fail http://127.0.0.1:4723/status > /dev/null; then
    break
  fi
  if ! kill -0 "$appium_pid" 2>/dev/null; then
    cat "$RUNNER_TEMP/appium.log"
    exit 1
  fi
  sleep 2
done
curl --silent --show-error --fail http://127.0.0.1:4723/status

MOBILE_PREINSTALLED_APP=true npm run test:catalog
