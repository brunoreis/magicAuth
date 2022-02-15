import React from 'react';
import { ButtonStyled } from './Button.styles';

export default function Button({ children, onClick, light, disabled }) {
  return (
    <ButtonStyled onClick={onClick} light={light} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
}
