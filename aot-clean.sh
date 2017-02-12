#!/bin/bash

find ./src -name "*.ngfactory.ts" -exec rm -rf {} \;
find ./src -name "*.css.shim.ts" -exec rm -rf {} \;
find ./src -name "*.ngsummary.json" -exec rm -rf {} \;
find ./src -name "*.shim.ngstyle.ts" -exec rm -rf {} \;
find ./src -name "*.css.ngstyle.ts" -exec rm -rf {} \;
find ./src -name "*.js.map" -exec rm -rf {} \;
find ./src/app -name "*.d.ts" -exec rm -rf {} \;
find ./src -name "*.metadata.json" -exec rm -rf {} \;