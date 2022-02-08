import React from 'react'
import { InputContainer, Input, InputAdornmentContainer } from './TextField.styles'

export default function TextField({ id, testId }){
    return (
        <InputContainer data-testid={testId}>
            <InputAdornmentContainer>@</InputAdornmentContainer>
            <Input id={id}/>
        </InputContainer>
    )
}