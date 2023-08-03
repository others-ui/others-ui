git clean -fdx
pnpm i
pnpm build
pnpm run changeset:version
pnpm run changeset:publish