
import reducer from "./reducer";
import mapTestResultIntoNodes from '../mapTestResultIntoNodes/mapTestResultIntoNodes';
import { testResult, expectedFirstIteration, expectedSecondIteration, expectedThirdIteration, expectedFourthIteration } from './testData';

describe('reducer', () => {
  const testResultNodes = mapTestResultIntoNodes(testResult);
  describe('first iteration', () => {
    const nestedNodes = reducer([], testResultNodes[0]);
    it('should create one first level node', () => {
      expect(nestedNodes.length).toBe(1);
    });
    it('should create the correct node structure', () => {
      expect(nestedNodes).toStrictEqual(expectedFirstIteration);
    });
  });

  describe('second iteration', () => {
    const nestedNodes = reducer(expectedFirstIteration, testResultNodes[1]);

    it('should not alter the passed tree', () => {
      expect(expectedFirstIteration[0].nodes.length).toBe(0);
    });
    it('should create one nested second level node', () => {
      expect(nestedNodes[0].nodes.length).toBe(1);
    });
    it('create the correct node structure', () => {
      expect(nestedNodes).toStrictEqual(expectedSecondIteration);
    });
  });

  describe('third iteration', () => {
    const nestedNodes = reducer(expectedSecondIteration, testResultNodes[2]);

    it('should not alter the passed tree', () => {
      expect(expectedSecondIteration[0].nodes[0].nodes.length).toBe(0);
    })
    it('creates a nested node', () => {
      expect(nestedNodes[0].nodes[0].nodes.length).toBe(1);
    });

    it('create the correct node structure', () => {
      expect(nestedNodes).toStrictEqual(expectedThirdIteration);
    })
  });

  describe('fourth iteration', () => {
    const nestedNodes = reducer(expectedThirdIteration, testResultNodes[3]);
    it('should not alter the passed tree', () => {
      expect(expectedThirdIteration[0].nodes[0].nodes[0].nodes.length).toBe(0);
    })
    it('creates a nested node', () => {
      expect(nestedNodes[0].nodes[0].nodes[0].nodes.length).toBe(1);
    });
    it('create the correct node structure', () => {
      expect(nestedNodes).toStrictEqual(expectedFourthIteration);
    })
  });
});
