import denormalizeNodeTree from './denormalizeNodeTree';
import {
  expectedFifthIterationForThirdTest,
  denormalizedTree,
} from './testData';

describe('reducer', () => {
  it('should reduce the test result nodes into a node tree', () => {
    const tree = denormalizeNodeTree(expectedFifthIterationForThirdTest);
    expect(tree).toStrictEqual(denormalizedTree);
  });
});

