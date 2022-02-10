import React from 'react'
import { ButtonStyled } from './Button.styles'

export default function Button({ children, onClick, light }){
    return (
        <ButtonStyled onClick={onClick} light={light}>
            {children}
        </ButtonStyled>
    )
}