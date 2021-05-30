const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Admin = require('./models/admin');
const TestQuestion = require('./models/test-question');
const Test = require('./models/test');
const UserTestResult = require('./models/user-test-result');
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


Test.belongsTo(Admin);
Admin.hasMany(Test);

TestQuestion.belongsTo(Test);
Test.hasMany(TestQuestion);

UserTestResult.belongsTo(User);
User.hasMany(UserTestResult);

UserTestResult.belongsTo(Test);
Test.hasMany(UserTestResult);

// UserTestResult.findAll()
// .then(result => {
//   console.log(result);
//   console.log('xxxxxxxxxxxxxxxx')
// })

sequelize
.sync()
.then(result => {
  return Admin.findAll()
})
.then(admins => {
  const admin = admins[0];
  if (!admin) {
    return Admin.create({ fullName: 'Akash Shrestha', userName: 'akash', password: 'password123'});
  }
  return admin;
})
.then(() => {
  app.listen(3000, () => {
    console.log('Server listening on port 3000 !');
  });
})
.catch(err => {
  console.log(err);
})
 
