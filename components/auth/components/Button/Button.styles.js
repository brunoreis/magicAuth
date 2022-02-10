import styled from 'styled-components';

const borderRadius = '0.5rem';

export const ButtonStyled = styled.button`
  width: 100%;
  color: ${props => props.theme.colors.white};
  font-size: 1.5rem;
  background-color: ${props => props.light ? props.theme.colors.disabled : props.theme.colors.primary};
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;