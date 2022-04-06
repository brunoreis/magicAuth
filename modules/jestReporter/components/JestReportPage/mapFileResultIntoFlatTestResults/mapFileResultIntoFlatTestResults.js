export default (fileResult, rootDir) => {
  const partialPath = fileResult.testFilePath.replace(rootDir + '/', '');
  return fileResult.testResults.map((testResult) => {
    return {
      testFilePath: fileResult.testFilePath,
      cleanFilePath: partialPath.replace(/\//g, ' '),
      fullName: testResult.fullName,
      title: testResult.title,
    };
  });
};
