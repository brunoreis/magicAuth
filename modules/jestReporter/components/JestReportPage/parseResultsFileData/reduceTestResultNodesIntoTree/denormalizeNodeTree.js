const glueOneChildNodes = (node) => {
    const nextNode = {...node}
    if(
        nextNode.nodes.length == 1
    ) {
        const uniqueChild = nextNode.nodes[0]
        nextNode.fullName = uniqueChild.fullName
        nextNode.type = uniqueChild.type
        nextNode.name = nextNode.name + ' ' + uniqueChild.name
        nextNode.nodes = uniqueChild.nodes
        return glueOneChildNodes(nextNode)
    } else if (
        nextNode.nodes.length > 1
    ) {
        nextNode.nodes = denormalize(nextNode.nodes)
    }
    return nextNode
}

const denormalize = (nodes) => {
    const newNodes = []
    nodes.forEach((node) => {
        if(node.nodes.length == 1) {
            const newNode = glueOneChildNodes(node) 
            newNodes.push(newNode)
        } else if (node.nodes.length > 1) {
            const newNode = {...node}
            newNode.nodes = denormalize(newNode.nodes)
            newNodes.push(newNode)
        } else {
            newNodes.push(node)
        }
    })
    return newNodes

}

export default (nodeTree) => {    
    const newNodeTree = denormalize(nodeTree)
    return newNodeTree
}
