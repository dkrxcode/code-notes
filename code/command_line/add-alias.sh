# Add alias to dotfile:
rx.add_alias() {
  local dotfile_path="${HOME}/.zshrc"
  local aliases_file=${dotfile_path}
  local timestamp=$(date "+%Y-%m-%d")
  local most_recent=$(history)
  echo '=== ADD ALIAS ==='
  echo 'Your most recent command was:'
  echo
  echo "${most_recent}"
  echo
  echo 'Enter the command to alias'
  read command
  echo 'Enter a name for the alias (rx prefix?)'
  read alias_name
  echo 'Enter note: (optional)'
  read alias_note
  echo "alias ${alias_name}=\"${command}\" # ${alias_note} ${timestamp}" >> ${aliases_file}
  source ${dotfile_path}
  echo "SUCCESS: '${alias_name}' has been added to your '${aliases_file}' and is ready to use."
}
