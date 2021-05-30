const Test = require('../models/test')
const TestQuestion = require('../models/test-question')
const UserTestResult = require('../models/user-test-result')


exports.postTest = (req, res, next) => {

  const adminId = req.body.adminId;
  const testName = req.body.testName;

 Test.create({
   adminId: adminId,
   testName: testName
 })
 .then(result => {
   res.status(201).json({
     message: 'Test created successfully',
    testName: testName,
    authorId: adminId
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


exports.postTestQuestion = (req, res, next) => {

  const testId = req.body.testId;
  const question = req.body.question;
  const optionA = req.body.optionA;
  const optionB = req.body.optionB;
  const optionC = req.body.optionC;
  const correctAnswer = req.body.correctAnswer;

  TestQuestion.create({
    testId: testId,
    question: question,
    optionA: optionA,
    optionB: optionB,
    optionC: optionC,
    correctAnswer: correctAnswer
  })
  .then(result => {
    res.status(201).json({
      message: 'Test question created successfully',
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


exports.getReport = (req, res, next) => {

  let report = {};
  
  UserTestResult.findAll(
    {where: {result: 'passed'}})
  .then(passed => {
    report.passed = passed
    return UserTestResult.findAll(
      {where: {result: 'failed'}})
  })
  .then(failed => {
    report.failed = failed
    return UserTestResult.findAll()
  })
  .then(total => {
    report.total = total
    res.status(200).json({
      message: 'Fetched test report successfully.',
      report: report
  })
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}

