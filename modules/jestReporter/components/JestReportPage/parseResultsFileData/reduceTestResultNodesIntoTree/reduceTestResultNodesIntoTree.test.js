import reduceTestResultNodesIntoTree from './reduceTestResultNodesIntoTree';
import { testResults, denormalizedTree } from './testData';

describe('reducer', () => {
  it('should reduce the test result nodes into a node tree', () => {
    const nestedNodes = [];
    const newNestedNodes = reduceTestResultNodesIntoTree(
      nestedNodes,
      testResults
    );
    console.log(JSON.stringify(newNestedNodes));
    expect(newNestedNodes).toStrictEqual(denormalizedTree);
  });
});


