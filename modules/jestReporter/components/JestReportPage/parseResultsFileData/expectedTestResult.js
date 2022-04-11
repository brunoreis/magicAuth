export default [
  {
    fullName: 'modules navigation',
    type: 'folderPath',
    name: 'modules navigation',
    nodes: [
      {
        fullName: 'modules navigation slice slice.test.js navigation.slice',
        type: 'namePath',
        name: 'slice slice.test.js navigation.slice',
        nodes: [
          {
            fullName:
              'modules navigation slice slice.test.js navigation.slice initial state navigatingTo should be null',
            type: 'testResult',
            name: 'initial state navigatingTo should be null',
            nodes: [],
          },
          {
            fullName:
              'modules navigation slice slice.test.js navigation.slice actions navigate sets navigatingTo with the path value',
            type: 'testResult',
            name: 'actions navigate sets navigatingTo with the path value',
            nodes: [],
          },
        ],
      },
      {
        fullName: 'modules navigation sagas',
        type: 'folderPath',
        name: 'sagas',
        nodes: [
          {
            fullName:
              'modules navigation sagas navigationWatchersSaga.test.js navigationWatchersSaga takes the latest navigate action and calls navigateSaga',
            type: 'testResult',
            name: 'navigationWatchersSaga.test.js navigationWatchersSaga takes the latest navigate action and calls navigateSaga',
            nodes: [],
          },
          {
            fullName:
              'modules navigation sagas navigateSaga.test.js navigateSaga calls Next navigation',
            type: 'testResult',
            name: 'navigateSaga.test.js navigateSaga calls Next navigation',
            nodes: [],
          },
        ],
      },
      {
        fullName:
          'modules navigation selectors global getNavigatingTo.test.js getNavigatingTo returns the last path to where a navigation was requested',
        type: 'testResult',
        name: 'selectors global getNavigatingTo.test.js getNavigatingTo returns the last path to where a navigation was requested',
        nodes: [],
      },
    ],
  },
];
