import mapFileResultIntoFlatTestResults from './mapFileResultIntoFlatTestResults';
import fileResult from './fileResult.mock';

describe('mapFileResultIntoFlatTestResults', () => {
  const rootDir = '/Users/scalablepath/magic_auth';
  const flatTests = mapFileResultIntoFlatTestResults(fileResult, rootDir);
  it('should map into 4 tests', () => {
    expect(flatTests.length).toBe(3);
  });

  it('should clean file path, removing root dir and map other props', () => {
    expect(flatTests[0]).toEqual({
      testFilePath:
        '/Users/scalablepath/magic_auth/modules/app/components/AppWithModulesHocs.test.js',
      cleanFilePath: 'modules app components AppWithModulesHocs.test.js',
      fullName:
        'AppWithModulesHocs renders successfully (this adds the modules hocs)',
      title: 'renders successfully (this adds the modules hocs)',
    });
  });

  it('should clean file path, removing root dir and map other props of second test', () => {
    expect(flatTests[1]).toEqual({
      testFilePath:
        '/Users/scalablepath/magic_auth/modules/app/components/AppWithModulesHocs.test.js',
      cleanFilePath: 'modules app components AppWithModulesHocs.test.js',
      fullName:
        'AppWithModulesHocs wraps with the store provider',
      title: 'wraps with the store provider',
    });
  });
});
