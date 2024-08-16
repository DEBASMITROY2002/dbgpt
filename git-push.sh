# message: Update as parameter
# Check if there is a parameter
if [ -z "$1" ]
  then
    echo "No commit message supplied"
    exit 1
fi
git add .
git commit -m "$1"
git push