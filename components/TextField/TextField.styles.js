import styled from 'styled-components';

const adornmentWidth = '2rem';
const borderRadius = '0.5rem';

export const InputContainer = styled.div`
  position: relative;
  border: ${props => props.theme.colors.border} solid 1px;
  border-radius: ${borderRadius};
  display: flex;
  justify-content: flex-end;
  height: 3rem;
`;

export const InputAdornmentContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0.7rem;
  color: ${props => props.theme.colors.border};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${borderRadius};
  width: ${adornmentWidth};
`;

export const Input = styled.input`
  border-radius: ${borderRadius};
  width: 100%;
  border: none;
  font-size: 1.5rem;
  padding-left: ${adornmentWidth};
`;
