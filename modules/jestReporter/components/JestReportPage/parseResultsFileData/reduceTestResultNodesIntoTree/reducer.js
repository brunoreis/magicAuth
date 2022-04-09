const addNewNode = (nestedNodes, path, node, name) => {
  const newNode = {
    fullName: node.fullName,
    type: node.type,
    name: name,
    nodes: []
  };

  const newNestedNodes = [...nestedNodes];
  if (path.length === 0) {
    const repeated = newNestedNodes.find((node) => node.name === newNode.name);
    const hasSameNameAndSameType = repeated && repeated.type === newNode.type
    if(hasSameNameAndSameType) {
      return newNestedNodes;
    }
    newNestedNodes.push(newNode);
  } else {
    const next = path.shift();
    const nodeIndex = newNestedNodes.findIndex(({ name }) => name === next);
    // if(nodeIndex !== -1) {
      newNestedNodes[nodeIndex] = { ...newNestedNodes[nodeIndex] };
      newNestedNodes[nodeIndex].nodes = addNewNode(
        newNestedNodes[nodeIndex].nodes,
        path,
        node,
        name
      );
    // }
  }

  return newNestedNodes;
};

export default (nestedNodes, node) => {
  const fullName = node.fullName;
  const path = fullName.split(' ');
  const name = path.pop();
  const newNestedNodes = addNewNode(nestedNodes, path, node, name);
  return newNestedNodes;
};
