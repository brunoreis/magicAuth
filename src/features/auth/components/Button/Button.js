import React from 'react'
import { ButtonStyled } from './Button.styles'

export default function Button({ children }){
    return (
        <ButtonStyled>
            {children}
        </ButtonStyled>
    )
}