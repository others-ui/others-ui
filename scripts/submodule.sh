ORIGIN="origin"
RELEASE_BRANCH="main"

cd ./docs
git stash
git checkout main
git stash pop
git add .
git commit -m "docs update"
git push origin $RELEASE_BRANCH -f
echo "文档已提交到 origin/$RELEASE_BRANCH"

exit 0
