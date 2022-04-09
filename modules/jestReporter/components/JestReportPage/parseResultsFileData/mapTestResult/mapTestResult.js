export default (testFileResult, rootDir) => {
  const partialPath = testFileResult.testFilePath.replace(rootDir + '/', '');
  return testFileResult.testResults.map((testResult) => {
    return {
      testFilePath: testFileResult.testFilePath,
      cleanFilePath: partialPath.replace(/\//g, ' '),
      fullName: testResult.fullName,
      title: testResult.title,
    };
  });
};
