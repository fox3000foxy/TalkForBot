function setUsername(Entry,username) {
  Entry.username = username
  return Entry
}

function setPassword(Entry,password) {
  Entry.password = password
  return Entry
}

function setAvatarURL(Entry,avatarURL) {
  Entry.avatarURL = avatarURL
  return Entry
}

exports.setUsername = setUsername
exports.setPassword = setPassword
exports.setAvatarURL = setAvatarURL