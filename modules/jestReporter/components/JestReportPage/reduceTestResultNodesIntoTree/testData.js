export const testResult = {
  testFilePath: '/Users/scalablepath/magic_auth/modules/AppWithModulesHocs.test.js',
  cleanFilePath: 'modules AppWithModulesHocs.test.js',
  fullName: 'renders successfully',
  title: 'renders successfully'
};

export const expectedFirstIteration = [
  {
    fullName: 'modules',
    type: 'folderPath',
    name: 'modules',
    nodes: []
  },
];

export const expectedSecondIteration = [
  {
    fullName: 'modules',
    type: 'folderPath',
    name: 'modules',
    nodes: [
      {
        fullName: 'modules AppWithModulesHocs.test.js',
        type: 'file',
        name: 'AppWithModulesHocs.test.js',
        nodes: []
      },
    ]
  },
];

export const expectedThirdIteration = [
  {
    fullName: 'modules',
    type: 'folderPath',
    name: 'modules',
    nodes: [
      {
        fullName: 'modules AppWithModulesHocs.test.js',
        type: 'file',
        name: 'AppWithModulesHocs.test.js',
        nodes: [
          {
            fullName: 'modules AppWithModulesHocs.test.js renders',
            type: 'namePath',
            name: 'renders',
            nodes: []
          },
        ]
      },
    ]
  },
];

export const expectedFourthIteration = [
  {
    fullName: 'modules',
    type: 'folderPath',
    name: 'modules',
    nodes: [
      {
        fullName: 'modules AppWithModulesHocs.test.js',
        type: 'file',
        name: 'AppWithModulesHocs.test.js',
        nodes: [
          {
            fullName: 'modules AppWithModulesHocs.test.js renders',
            type: 'namePath',
            name: 'renders',
            nodes: [
              {
                fullName: 'modules AppWithModulesHocs.test.js renders successfully',
                type: 'testResult',
                name: 'successfully',
                nodes: []
              },
            ]
          },
        ]
      },
    ]
  },
];
