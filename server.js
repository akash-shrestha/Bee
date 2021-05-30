const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();

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

app.use(helmet());

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

const PORT = process.env.PORT || 3000

sequelize
.sync()
.then(() => {
  app.listen(PORT)
  console.log(`Server listening for incoming requests on port ${PORT} !`)
})
.catch(err => {
  console.log(err);
})
 
