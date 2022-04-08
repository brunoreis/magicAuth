import mapTestResultIntoNodes from '../mapTestResultIntoNodes/mapTestResultIntoNodes';
import reduceTestResultNodesIntoTree from './reduceTestResultNodesIntoTree';
import { testResults,  expectedFourthIteration } from './testData';

describe('reducer', () => {
    it('should reduce the test result nodes into a node tree', () => {
      const testResultNodes = mapTestResultIntoNodes(testResults[0]);
      const nestedNodes = []
      const newNestedNodes = reduceTestResultNodesIntoTree(nestedNodes, testResultNodes);
      expect(newNestedNodes).toStrictEqual(expectedFourthIteration)
  })
});

