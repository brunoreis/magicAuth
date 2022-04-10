import TestNode from './TestNode'

export default function TestNodeList({nodes}) {
  return nodes.map((node) => <TestNode node={node}/>)
}
