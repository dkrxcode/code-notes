# Add alias to dotfile:
rx.add_alias() {
  local aliases_file=${HOME}/.bash_aliases
  local timestamp=$(date "+%Y-%m-%d")
  local most_recent=$(history 2)
  echo '=== ADD ALIAS ==='
  echo 'Your most recent command was:'
  echo
  echo "$most_recent"
  echo
  echo 'Enter the command to alias'
  read -p 'Command: ' command
  echo 'Enter a name for the alias (rx prefix?)'
  read -p 'Alias: ' alias_name
  echo 'Enter note: (optional)'
  read -p 'Note: ' alias_note
  echo "alias ${alias_name}=\"${command}\" # ${alias_note} ${timestamp}" >> ${aliases_file}
  source ${HOME}/.bash_aliases
  echo "SUCCESS: 'rx.${alias_name}' has been added to your '${aliases_file}' and is ready to use."
}
