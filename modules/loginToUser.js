function loginToUser(params, db) {
    let username = params[0];
    let password = params[1];
    for (i = 0; i < db.length; i++) {
        if (db[i].username == username && db[i].password == password) {
          return db[i];
        }
    }
    return {};
}

exports.loginToUser = loginToUser