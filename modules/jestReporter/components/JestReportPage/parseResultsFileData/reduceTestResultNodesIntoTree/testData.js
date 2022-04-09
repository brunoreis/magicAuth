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
