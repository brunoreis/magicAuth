import mapTestResultIntoNodes from './mapTestResultIntoNodes'

it('map test results into multiple nodes', () => {
    const testResult = {
        testFilePath:
            '/Users/scalablepath/magic_auth/modules/app/components/AppWithModulesHocs.test.js',
        cleanFilePath: 'modules app components AppWithModulesHocs.test.js',
        fullName:
            'AppWithModulesHocs renders successfully (this adds the modules hocs)',
        title: 'renders successfully (this adds the modules hocs)',
    }
    
    const expectedNodes = [
        {
            fullName: "modules",
            type: "folderPath"
        },
        {
            fullName: "modules app",
            type: "folderPath"
        },
        {
            fullName: "modules app components",
            type: "folderPath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js",
            type: "file"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs renders",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs renders successfully",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs renders successfully (this",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs renders successfully (this adds",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs renders successfully (this adds the",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs renders successfully (this adds the modules",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs renders successfully (this adds the modules hocs)",
            type: "testResult",
            testResult: testResult
        },
    ]

    const testResultNodes = mapTestResultIntoNodes(testResult)
    expect(testResultNodes).toStrictEqual(expectedNodes)
})

it('map second test results into multiple nodes', () => {
    const testResult = {
        testFilePath:
          '/Users/scalablepath/magic_auth/modules/app/components/AppWithModulesHocs.test.js',
        cleanFilePath: 'modules app components AppWithModulesHocs.test.js',
        fullName:
          'AppWithModulesHocs wraps with the store provider',
        title: 'wraps with the store provider',
      }
    
    const expectedNodes = [
        {
            fullName: "modules",
            type: "folderPath"
        },
        {
            fullName: "modules app",
            type: "folderPath"
        },
        {
            fullName: "modules app components",
            type: "folderPath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js",
            type: "file"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs wraps",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs wraps with",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs wraps with the",
            type: "namePath"
        },
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs wraps with the store",
            type: "namePath"
        },
        
        {
            fullName: "modules app components AppWithModulesHocs.test.js AppWithModulesHocs wraps with the store provider",
            type: "testResult",
            testResult: testResult
        },
    ]

    const testResultNodes = mapTestResultIntoNodes(testResult)
    expect(testResultNodes).toStrictEqual(expectedNodes)
})