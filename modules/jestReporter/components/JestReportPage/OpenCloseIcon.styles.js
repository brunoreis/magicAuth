import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
  width: 1rem;
`;

export const Icon = styled.div`
  color: ${({theme}) => theme.colors.silver};
  transform: ${({open}) => open ? 'rotate(180deg) translate(0.1rem, 0rem)' : 'rotate(90deg) translate(0.3rem, 0)'};
`;
