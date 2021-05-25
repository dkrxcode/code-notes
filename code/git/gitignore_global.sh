# I added a global ~/.gitignore_global in my home directory
# with the pattern *_ignore.* . Then you have to tell git to use it
# git config --global core.excludesfile ~/.gitignore_global

echo *_ignore.* >> ${HOME}/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
