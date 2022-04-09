export default name => name.split(' ').reduce(
    (nameNodes, word) => {
        const prefix = nameNodes.length > 0 ? nameNodes[nameNodes.length - 1] + ' ' : '';
        nameNodes.push(prefix + word);
        return nameNodes;
    },
    []
);
