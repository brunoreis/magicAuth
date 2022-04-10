import fileData from './fileData.mock';
import parseResultsFileData from './parseResultsFileData';
import expectedTestResult from './expectedTestResult';

it('should nest jest results', () => {
  const result = parseResultsFileData(fileData);
  expect(result).toStrictEqual(expectedTestResult);
});
