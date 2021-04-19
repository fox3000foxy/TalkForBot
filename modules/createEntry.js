function setUsername(entry, username) {
  entry.username = username;
  return entry;
}

function setPassword(entry, password) {
  entry.password = password;
  return entry;
}

function setAvatarURL(entry, avatarURL) {
  entry.avatarURL = avatarURL;
  return entry;
}

exports.setUsername = setUsername
exports.setPassword = setPassword
exports.setAvatarURL = setAvatarURL