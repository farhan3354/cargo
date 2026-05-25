# PowerShell helper to remove large tracked media files and show history-clean steps
Write-Host "Removing tracked large media files from index (won't rewrite history)."
git rm --cached public/banner1.mp4 public/banner2.mp4 public/banner3.mp4 public/homepageimage/intro.mp4 public/homepageimage/custom.mp4
Write-Host "Files staged for removal. Commit with: git commit -m 'Remove large media files'"

Write-Host "
To permanently remove these files from your git history (required if they were committed earlier):

1) Using BFG Repo-Cleaner (recommended for non-experts):
   - Install BFG (https://rtyley.github.io/bfg-repo-cleaner/)
   - Run: java -jar bfg.jar --delete-files *.mp4
   - Then run: git reflog expire --expire=now --all && git gc --prune=now --aggressive

2) Or using git-filter-repo (more flexible):
   - pip install git-filter-repo
   - Run: git filter-repo --strip-blobs-bigger-than 10M

After history rewrite, force-push to origin: git push --force --all

Note: Force-pushing rewrites remote history — ensure collaborators are informed.
"