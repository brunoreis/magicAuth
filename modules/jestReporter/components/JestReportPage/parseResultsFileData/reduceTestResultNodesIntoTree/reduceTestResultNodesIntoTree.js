import reducer from "./reducer";
import mapTestResultIntoNodes from './mapTestResultIntoNodes/mapTestResultIntoNodes'

export default (nestedNodes, flatTestResults) => {
  const flatTestResultNodes = flatTestResults.reduce( 
    (concatNodes, result) => {
      const nodes = mapTestResultIntoNodes(result)
      return concatNodes.concat(nodes)
    },
    [] 
  )
  const normalizedTree = flatTestResultNodes.reduce(reducer, nestedNodes);
  return normalizedTree;
};
