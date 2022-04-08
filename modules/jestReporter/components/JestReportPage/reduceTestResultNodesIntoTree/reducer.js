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
    if(repeated) {
      if(repeated.type !== newNode.type) throw new Error('Something wrong in the tree')
      return newNestedNodes;
    }
    newNestedNodes.push(newNode);
  } else {
    const next = path.shift();
    const nodeIndex = newNestedNodes.findIndex(({ name }) => name === next);
    newNestedNodes[nodeIndex] = { ...newNestedNodes[nodeIndex] };
    newNestedNodes[nodeIndex].nodes = addNewNode(
      newNestedNodes[nodeIndex].nodes,
      path,
      node,
      name
    );
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
