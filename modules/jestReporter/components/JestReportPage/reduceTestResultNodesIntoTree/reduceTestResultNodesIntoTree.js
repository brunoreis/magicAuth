import reducer from "./reducer";

export default (nestedNodes, testResultNodes) => {
  console.log(nestedNodes)
  console.log(testResultNodes)
  return testResultNodes.reduce(reducer, nestedNodes);
};
