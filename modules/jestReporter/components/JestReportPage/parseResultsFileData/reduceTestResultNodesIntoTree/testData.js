const clone = (original) => JSON.parse(JSON.stringify(original));

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
  {
    testFilePath:
      '/Users/scalablepath/magic_auth/modules/AppWithModulesHocs.test.js',
    cleanFilePath: 'modules AppWithModulesSagas.test.js',
    fullName: 'register new watchers',
    title: 'register new watchers',
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

export const expectedSecondIteration = clone(expectedFirstIteration);
expectedSecondIteration[0].nodes = [
  {
    fullName: 'modules AppWithModulesHocs.test.js',
    type: 'file',
    name: 'AppWithModulesHocs.test.js',
    nodes: [],
  },
];

export const expectedThirdIteration = clone(expectedSecondIteration);
expectedThirdIteration[0].nodes[0].nodes = [
  {
    fullName: 'modules AppWithModulesHocs.test.js renders',
    type: 'namePath',
    name: 'renders',
    nodes: [],
  },
];

export const expectedFourthIteration = clone(expectedThirdIteration);
expectedFourthIteration[0].nodes[0].nodes[0].nodes = [
  {
    fullName: 'modules AppWithModulesHocs.test.js renders successfully',
    type: 'testResult',
    name: 'successfully',
    nodes: [],
  },
];

// the first emmited node will be "modules", that already exists, so nothing should change
export const expectedFirstIterationForSecondTest = expectedFourthIteration;

export const expectedSecondIterationForSecondTest = clone(
  expectedFirstIterationForSecondTest
);
expectedSecondIterationForSecondTest[0].nodes[1] = {
  fullName: 'modules AppWithModulesSagas.test.js',
  name: 'AppWithModulesSagas.test.js',
  nodes: [],
  type: 'file',
};

export const expectedThirdIterationForSecondTest = clone(
  expectedSecondIterationForSecondTest
);
expectedThirdIterationForSecondTest[0].nodes[1].nodes = [
  {
    fullName: 'modules AppWithModulesSagas.test.js register',
    name: 'register',
    nodes: [],
    type: 'namePath',
  },
];

export const expectedFourthIterationForSecondTest = clone(
  expectedThirdIterationForSecondTest
);

expectedFourthIterationForSecondTest[0].nodes[1].nodes[0].nodes = [
  {
    fullName: 'modules AppWithModulesSagas.test.js register watchers',
    name: 'watchers',
    nodes: [],
    type: 'testResult',
  },
];

export const expectedFirstIterationForThirdTest = clone(
  expectedFourthIterationForSecondTest
);
export const expectedSecondIterationForThirdTest = clone(
  expectedFirstIterationForThirdTest
);
export const expectedThirdIterationForThirdTest = clone(
  expectedSecondIterationForThirdTest
);
export const expectedFourthIterationForThirdTest = clone(
  expectedThirdIterationForThirdTest
);
expectedFourthIterationForThirdTest[0].nodes[1].nodes[0].nodes = [
  ...expectedFourthIterationForThirdTest[0].nodes[1].nodes[0].nodes,
  {
    fullName: 'modules AppWithModulesSagas.test.js register new',
    name: 'new',
    nodes: [],
    type: 'namePath',
  },
];
export const expectedFifthIterationForThirdTest = clone(
  expectedFourthIterationForThirdTest
);
expectedFifthIterationForThirdTest[0].nodes[1].nodes[0].nodes[1].nodes = [
  {
    fullName: 'modules AppWithModulesSagas.test.js register new watchers',
    name: 'watchers',
    nodes: [],
    type: 'testResult',
  },
];

export const denormalizedTree = [
  {
    fullName: 'modules',
    type: 'folderPath',
    name: 'modules',
    nodes: [
      {
        fullName: 'modules AppWithModulesHocs.test.js renders successfully',
        type: 'testResult',
        name: 'AppWithModulesHocs.test.js renders successfully',
        nodes: [],
      },
      {
        fullName: 'modules AppWithModulesSagas.test.js register',
        name: 'AppWithModulesSagas.test.js register',
        nodes: [
          {
            fullName: 'modules AppWithModulesSagas.test.js register watchers',
            name: 'watchers',
            nodes: [],
            type: 'testResult',
          },
          {
            fullName:
              'modules AppWithModulesSagas.test.js register new watchers',
            name: 'new watchers',
            nodes: [],
            type: 'testResult',
          },
        ],
        type: 'namePath',
      },
    ],
  },
];
