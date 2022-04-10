export default {
  globalConfig: {
    bail: 0,
    changedFilesWithAncestor: false,
    collectCoverage: false,
    collectCoverageFrom: [],
    coverageDirectory: '/Users/scalablepath/magic_auth/coverage',
    coverageProvider: 'babel',
    coverageReporters: ['json', 'text', 'lcov', 'clover'],
    detectLeaks: false,
    detectOpenHandles: false,
    errorOnDeprecated: false,
    expand: false,
    findRelatedTests: false,
    forceExit: false,
    json: false,
    lastCommit: false,
    listTests: false,
    logHeapUsage: false,
    maxConcurrency: 5,
    maxWorkers: 2,
    noStackTrace: false,
    nonFlagArgs: ['modules/navigation/'],
    notify: false,
    notifyMode: 'failure-change',
    onlyChanged: false,
    onlyFailures: false,
    passWithNoTests: true,
    projects: [],
    reporters: [
      ['default', {}],
      [
        '/Users/scalablepath/magic_auth/modules/jestReporter/customReporter.js',
        {},
      ],
    ],
    rootDir: '/Users/scalablepath/magic_auth',
    runTestsByPath: false,
    skipFilter: false,
    testFailureExitCode: 1,
    testPathPattern: 'modules/navigation/',
    testSequencer:
      '/Users/scalablepath/.nvm/versions/node/v14.18.2/lib/node_modules/jest/node_modules/@jest/test-sequencer/build/index.js',
    updateSnapshot: 'new',
    useStderr: false,
    watch: true,
    watchAll: false,
    watchman: true,
  },
  options: {},
  contexts: {},
  results: {
    numFailedTestSuites: 0,
    numFailedTests: 0,
    numPassedTestSuites: 4,
    numPassedTests: 5,
    numPendingTestSuites: 0,
    numPendingTests: 0,
    numRuntimeErrorTestSuites: 0,
    numTodoTests: 0,
    numTotalTestSuites: 4,
    numTotalTests: 5,
    openHandles: [],
    snapshot: {
      added: 0,
      didUpdate: false,
      failure: false,
      filesAdded: 0,
      filesRemoved: 0,
      filesRemovedList: [],
      filesUnmatched: 0,
      filesUpdated: 0,
      matched: 0,
      total: 0,
      unchecked: 0,
      uncheckedKeysByFile: [],
      unmatched: 0,
      updated: 0,
    },
    startTime: 1649602017072,
    success: false,
    testResults: [
      {
        leaks: false,
        numFailingTests: 0,
        numPassingTests: 2,
        numPendingTests: 0,
        numTodoTests: 0,
        openHandles: [],
        perfStats: {
          end: 1649602022722,
          runtime: 2182,
          slow: false,
          start: 1649602020540,
        },
        skipped: false,
        snapshot: {
          added: 0,
          fileDeleted: false,
          matched: 0,
          unchecked: 0,
          uncheckedKeys: [],
          unmatched: 0,
          updated: 0,
        },
        testFilePath:
          '/Users/scalablepath/magic_auth/modules/navigation/slice/slice.test.js',
        testResults: [
          {
            ancestorTitles: ['navigation.slice', 'initial state'],
            duration: 2,
            failureDetails: [],
            failureMessages: [],
            fullName:
              'navigation.slice initial state navigatingTo should be null',
            invocations: 1,
            location: null,
            numPassingAsserts: 0,
            status: 'passed',
            title: 'navigatingTo should be null',
          },
          {
            ancestorTitles: ['navigation.slice', 'actions', 'navigate'],
            duration: 9,
            failureDetails: [],
            failureMessages: [],
            fullName:
              'navigation.slice actions navigate sets navigatingTo with the path value',
            invocations: 1,
            location: null,
            numPassingAsserts: 0,
            status: 'passed',
            title: 'sets navigatingTo with the path value',
          },
        ],
        failureMessage: null,
      },
      {
        leaks: false,
        numFailingTests: 0,
        numPassingTests: 1,
        numPendingTests: 0,
        numTodoTests: 0,
        openHandles: [],
        perfStats: {
          end: 1649602022992,
          runtime: 2567,
          slow: false,
          start: 1649602020425,
        },
        skipped: false,
        snapshot: {
          added: 0,
          fileDeleted: false,
          matched: 0,
          unchecked: 0,
          uncheckedKeys: [],
          unmatched: 0,
          updated: 0,
        },
        testFilePath:
          '/Users/scalablepath/magic_auth/modules/navigation/sagas/navigationWatchersSaga.test.js',
        testResults: [
          {
            ancestorTitles: ['navigationWatchersSaga'],
            duration: 3,
            failureDetails: [],
            failureMessages: [],
            fullName:
              'navigationWatchersSaga takes the latest navigate action and calls navigateSaga',
            invocations: 1,
            location: null,
            numPassingAsserts: 0,
            status: 'passed',
            title: 'takes the latest navigate action and calls navigateSaga',
          },
        ],
        failureMessage: null,
      },
      {
        leaks: false,
        numFailingTests: 0,
        numPassingTests: 1,
        numPendingTests: 0,
        numTodoTests: 0,
        openHandles: [],
        perfStats: {
          end: 1649602023418,
          runtime: 590,
          slow: false,
          start: 1649602022828,
        },
        skipped: false,
        snapshot: {
          added: 0,
          fileDeleted: false,
          matched: 0,
          unchecked: 0,
          uncheckedKeys: [],
          unmatched: 0,
          updated: 0,
        },
        testFilePath:
          '/Users/scalablepath/magic_auth/modules/navigation/selectors/global/getNavigatingTo.test.js',
        testResults: [
          {
            ancestorTitles: ['getNavigatingTo'],
            duration: 0,
            failureDetails: [],
            failureMessages: [],
            fullName:
              'getNavigatingTo returns the last path to where a navigation was requested',
            invocations: 1,
            location: null,
            numPassingAsserts: 0,
            status: 'passed',
            title: 'returns the last path to where a navigation was requested',
          },
        ],
        failureMessage: null,
      },
      {
        leaks: false,
        numFailingTests: 0,
        numPassingTests: 1,
        numPendingTests: 0,
        numTodoTests: 0,
        openHandles: [],
        perfStats: {
          end: 1649602023713,
          runtime: 583,
          slow: false,
          start: 1649602023130,
        },
        skipped: false,
        snapshot: {
          added: 0,
          fileDeleted: false,
          matched: 0,
          unchecked: 0,
          uncheckedKeys: [],
          unmatched: 0,
          updated: 0,
        },
        testFilePath:
          '/Users/scalablepath/magic_auth/modules/navigation/sagas/navigateSaga.test.js',
        testResults: [
          {
            ancestorTitles: ['navigateSaga'],
            duration: 2,
            failureDetails: [],
            failureMessages: [],
            fullName: 'navigateSaga calls Next navigation',
            invocations: 1,
            location: null,
            numPassingAsserts: 0,
            status: 'passed',
            title: 'calls Next navigation',
          },
        ],
        failureMessage: null,
      },
    ],
    wasInterrupted: false,
  },
};
