const User = require('../models/user')
const Test = require('../models/test')
const TestQuestion = require('../models/test-question');
const UserTestResult = require('../models/user-test-result')

exports.postUser = (req, res, next) => {
  console.log('postSignUp from userController executed !')

 const fullName = req.body.fullName
 const email = req.body.email

User.findAll({
  where: {email: email}
})
.then(result => {
  if (result.length > 0) {
    const error = new Error('Email exists !');
    error.statusCode = 422;
    throw error;
  }
  return result
})
.then(result => {
  User.create({
    fullName: fullName,
    email: email
  })
})
 .then(result => {
  return res.status(201).json({
    message: 'User created successfully',
    email: email
  })
})
.catch(err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
});
}

exports.getTest = (req, res, next) => {
  console.log('getTest from userController executed !')

  Test.findAll()
  .then(tests => {
    res.status(200).json({
      message: 'Fetched tests successfully.',
      test: tests
  })
 })
 .catch(err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
});
}

exports.getQuestion = (req, res, next) => {
  console.log('getQuestion from userController executed !')

  const testId = req.params.testId;
  console.log(testId);
  TestQuestion.findAll({
    where: {
      testId: testId
    },
    attributes: ['id', 'question', 'optionA', 'optionB', 'optionC']
  })
  .then(questions => {
    res.status(200).json({
      message: 'Fetched questions successfully.',
      questions: questions
  })
 })
 .catch(err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
});
}

exports.postResult = (req, res, next) => {                                                 
 console.log('postResult from resultController executed !');

  const correctAnswers = req.body.correctAnswers
  const wrongAnswers = req.body.wrongAnswers
  const userId = req.body.userId
  const testId = req.body.testId 
  const result = req.body.result

  UserTestResult.create({
    correctAnswers: correctAnswers,
    wrongAnswers:  wrongAnswers,
    result: result,
    userId:  userId,
    testId: testId
  })
  .then(result => {
    res.status(201).json({
      message: 'Result created successfully',
      userId: userId,
      testId: testId
    })
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}

exports.getResult = (req, res, next) => {
  console.log('getResult from userController executed !')

  const userId = req.params.userId

  UserTestResult.findAll(
    {where: {userId: userId}}
  )
  .then(results => {
    res.status(200).json({
      message: 'Fetched results successfully.',
      results: results
  })
 })
 .catch(err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
});

}


