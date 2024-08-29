# !/bin/bash

# Make sure to install required pnpm version
pnpm install -g pnpm@$(grep '"pnpm": "^' package.json | sed -E 's/.*"pnpm": ".*([0-9]\.[0-9]\.[0-9])"/\1/')

# Run the build
pnpm run build
