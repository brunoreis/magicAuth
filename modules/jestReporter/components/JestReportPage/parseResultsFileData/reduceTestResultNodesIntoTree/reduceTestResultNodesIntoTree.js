import reducer from './reducer';
import mapTestResultIntoNodes from './mapTestResultIntoNodes/mapTestResultIntoNodes';
import denormalizedTree from './denormalizeNodeTree';

export default (nestedNodes, flatTestResults) => {
  const flatTestResultNodes = flatTestResults.reduce((concatNodes, result) => {
    const nodes = mapTestResultIntoNodes(result);
    return concatNodes.concat(nodes);
  }, []);
  const normalizedTree = flatTestResultNodes.reduce(reducer, nestedNodes);
  const tree = denormalizedTree(normalizedTree);
  return tree;
};


