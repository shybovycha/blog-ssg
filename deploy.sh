#!/usr/bin/env sh
set -e

npm run build

cd blog/.vitepress/dist

git init
git add -A
git commit -m "Deploy $(date)"
git push -f git@github.com:shybovycha/blog-ssg.github.io.git master:gh-pages

cd -
