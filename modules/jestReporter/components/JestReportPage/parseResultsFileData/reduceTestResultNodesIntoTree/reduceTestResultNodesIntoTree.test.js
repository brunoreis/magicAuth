import reduceTestResultNodesIntoTree from './reduceTestResultNodesIntoTree';
import { testResults, expectedFourthIterationForSecondTest } from './testData';

describe('reducer', () => {
    it('should reduce the test result nodes into a node tree', () => {
      const nestedNodes = []
      const newNestedNodes = reduceTestResultNodesIntoTree(nestedNodes, testResults);
      expect(newNestedNodes).toStrictEqual(expectedFourthIterationForSecondTest)
  })
});

