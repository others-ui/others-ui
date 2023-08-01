ORIGIN="origin"
RELEASE_BRANCH=`git symbolic-ref --short -q HEAD`

bump_version() {
  npx changeset version
  echo "更新 changelog 成功!"
}

push() {
  git add .
  git commit -m "ci: release"
  git push origin $RELEASE_BRANCH
  echo "已提交到 origin/$RELEASE_BRANCH"
}

bump_version
push

exit 0
