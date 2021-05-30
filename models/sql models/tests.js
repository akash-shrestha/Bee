const db = require('../util/database');

module.exports = class Tests {
  constructor(id, adminId, testName) {
    this.id = id;
    this.adminId = adminId;
    this.testName = testName;
  }

  save() {
    return db.execute(
      'INSERT INTO tests (id, adminId, testName) VALUES (?, ?, ?)',
      [this.id, this.adminName, this.testName]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM tests');
  }

  static findById(id) {
    return db.execute('SELECT * FROM tests WHERE admins.id = ?', [id]);
  }
};


