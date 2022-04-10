import { useState } from 'react';
import TestNodeList from './TestNodeList';
import { TestNodeListWrapper, Small, TitleWrapper, Title } from './TestNode.styles';
import OpenCloseIcon from './OpenCloseIcon';

export default function TestNode({ node }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open)
  return (
    <div>
      <TitleWrapper onClick={toggle}>
        <OpenCloseIcon open={open} />
        <Title>{node.name}</Title>{' '}
        <Small>
            {node.type} - {node.fullName}
        </Small>
      </TitleWrapper>
      {open && (
        <TestNodeListWrapper>
          <TestNodeList nodes={node.nodes} />
        </TestNodeListWrapper>
      )}
    </div>
  );
}
