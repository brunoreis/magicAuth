export const testResults = [
  {
    testFilePath:
      '/Users/scalablepath/magic_auth/modules/AppWithModulesHocs.test.js',
    cleanFilePath: 'modules AppWithModulesHocs.test.js',
    fullName: 'renders successfully',
    title: 'renders successfully',
  },
  {
    testFilePath:
      '/Users/scalablepath/magic_auth/modules/AppWithModulesHocs.test.js',
    cleanFilePath: 'modules AppWithModulesSagas.test.js',
    fullName: 'register watchers',
    title: 'register watchers',
  },
];

export const expectedFirstIteration = [
  {
    fullName: 'modules',
    type: 'folderPath',
    name: 'modules',
    nodes: [],
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
        nodes: [],
      },
    ],
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
            nodes: [],
          },
        ],
      },
    ],
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
                fullName:
                  'modules AppWithModulesHocs.test.js renders successfully',
                type: 'testResult',
                name: 'successfully',
                nodes: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

// the first emmited node will be "modules", that already exists, so nothing should change
export const expectedFirstIterationForSecondTest = expectedFourthIteration;

export const expectedSecondIterationForSecondTest = [
  {
    fullName: 'modules',
    name: 'modules',
    nodes: [
      {
        fullName: 'modules AppWithModulesHocs.test.js',
        name: 'AppWithModulesHocs.test.js',
        nodes: [
          {
            fullName: 'modules AppWithModulesHocs.test.js renders',
            name: 'renders',
            nodes: [
              {
                fullName:
                  'modules AppWithModulesHocs.test.js renders successfully',
                name: 'successfully',
                nodes: [],
                type: 'testResult',
              },
            ],
            type: 'namePath',
          },
        ],
        type: 'file',
      },
      {
        fullName: 'modules AppWithModulesSagas.test.js',
        name: 'AppWithModulesSagas.test.js',
        nodes: [],
        type: 'file',
      },
    ],
    type: 'folderPath',
  },
];

export const expectedThirdIterationForSecondTest = [
  {
    fullName: 'modules',
    name: 'modules',
    nodes: [
      {
        fullName: 'modules AppWithModulesHocs.test.js',
        name: 'AppWithModulesHocs.test.js',
        nodes: [
          {
            fullName: 'modules AppWithModulesHocs.test.js renders',
            name: 'renders',
            nodes: [
              {
                fullName:
                  'modules AppWithModulesHocs.test.js renders successfully',
                name: 'successfully',
                nodes: [],
                type: 'testResult',
              },
            ],
            type: 'namePath',
          },
        ],
        type: 'file',
      },
      {
        fullName: 'modules AppWithModulesSagas.test.js',
        name: 'AppWithModulesSagas.test.js',
        nodes: [
          {
            fullName: 'modules AppWithModulesSagas.test.js register',
            name: 'register',
            nodes: [],
            type: 'namePath',
          },
        ],
        type: 'file',
      },
    ],
    type: 'folderPath',
  },
];

export const expectedFourthIterationForSecondTest = [
  {
    fullName: 'modules',
    name: 'modules',
    nodes: [
      {
        fullName: 'modules AppWithModulesHocs.test.js',
        name: 'AppWithModulesHocs.test.js',
        nodes: [
          {
            fullName: 'modules AppWithModulesHocs.test.js renders',
            name: 'renders',
            nodes: [
              {
                fullName:
                  'modules AppWithModulesHocs.test.js renders successfully',
                name: 'successfully',
                nodes: [],
                type: 'testResult',
              },
            ],
            type: 'namePath',
          },
        ],
        type: 'file',
      },
      {
        fullName: 'modules AppWithModulesSagas.test.js',
        name: 'AppWithModulesSagas.test.js',
        nodes: [
          {
            fullName: 'modules AppWithModulesSagas.test.js register',
            name: 'register',
            nodes: [
              {
                fullName:
                  'modules AppWithModulesSagas.test.js register watchers',
                name: 'watchers',
                nodes: [],
                type: 'testResult',
              },
            ],
            type: 'namePath',
          },
        ],
        type: 'file',
      },
    ],
    type: 'folderPath',
  },
];
