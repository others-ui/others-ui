ORIGIN="origin"
RELEASE_BRANCH="main"
HOST_RELEASE_BRANCH=`git symbolic-ref --short -q HEAD`

cd ./docs
git stash
git checkout main
git stash pop
git add .
git commit -m "docs update"
git push origin $RELEASE_BRANCH -f
echo "文档已提交到 origin/$RELEASE_BRANCH"

cd ..
git add .
git commit -m 'docs(ci): docs update'
git push origin $HOST_RELEASE_BRANCH
echo "主仓库已提交到 origin/$HOST_RELEASE_BRANCH"

exit 0
