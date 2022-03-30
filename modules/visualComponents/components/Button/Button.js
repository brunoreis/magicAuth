import React from 'react';

import { ButtonStyled } from './Button.styles';

export default function Button({ children, onClick, light, disabled, loading }) {
  return (
    <ButtonStyled onClick={onClick} light={light} disabled={disabled || loading}>
      {loading ? "...loading..." : children}
    </ButtonStyled>
  );
}
