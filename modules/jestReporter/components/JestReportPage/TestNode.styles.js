import styled from 'styled-components';

export const TestNodeListWrapper = styled.div`
  margin-left: 0.8rem;
`;
export const Small = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.silver};
`;
export const TitleWrapper = styled.div`
  cursor: pointer;
`;

export const Title = styled.span`
  font-size: 1rem;
  color: ${({ type, theme }) =>
    type === 'folderPath'
      ? theme.colors.silver
      : type === 'namePath'
      ? theme.colors.silver
      : type === 'file'
      ? theme.colors.green 
      : theme.colors.black};
`;
