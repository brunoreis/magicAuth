import { useState } from 'react';
import TestNodeList from './TestNodeList';
import { TestNodeListWrapper, Small, TitleWrapper, Title } from './TestNode.styles';
import OpenCloseIcon from './OpenCloseIcon';

export default function TestNode({ node }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open)
  const hasNodes = node.nodes.length > 0
  return (
    <div>
      <TitleWrapper onClick={toggle}>
        <OpenCloseIcon open={open} show={hasNodes} />
        <Title type={node.type}>{node.name}</Title>{' '}
        {/* <Small>
          {node.fullName}
        </Small> */}
      </TitleWrapper>
      {open && (
        <TestNodeListWrapper>
          <TestNodeList nodes={node.nodes} />
        </TestNodeListWrapper>
      )}
    </div>
  );
}
