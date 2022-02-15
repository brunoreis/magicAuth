import styled from 'styled-components';

export const ButtonStyled = styled.button`
  width: 100%;
  color: ${props => props.theme.colors.white};
  font-size: 1.5rem;
  background-color: ${
    props => props.light ? 
      props.theme.colors.light : 
      props.disabled ? 
        props.theme.colors.primaryDisabled:
        props.theme.colors.primary
  };
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  &:hover {
    cursor: ${props => props.disabled ? null : 'pointer'};
  }
`;