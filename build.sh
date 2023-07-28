cd cis-minesweeper-ui
yarn install --frozen-lockfile
yarn build
rm -r ../public/cis-minesweeper-ui
mkdir ../public/cis-minesweeper-ui
cp -r dist/. ../public/cis-minesweeper-ui
zip ../public/cis-minesweeper-ui.zip dist
cd ..
next build