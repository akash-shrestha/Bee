const db = require('../util/database');

module.exports = class Admin {
  constructor(id, fullName, userName, password) {
    this.id = id;
    this.fullName = fullName;
    this.userName = userName;imageUrl;
    this.password = password;description;
  }

  save() {
    return db.execute(
      'INSERT INTO admins (id, fullName, userName, password) VALUES (?, ?, ?, ?)',
      [this.id, this.fullName, this.userName, this.password]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM admins');
  }

  static findById(id) {
    return db.execute('SELECT * FROM admins WHERE admins.id = ?', [id]);
  }
};


