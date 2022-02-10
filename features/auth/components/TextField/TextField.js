import React from 'react'
import { InputContainer, Input, InputAdornmentContainer } from './TextField.styles'

export default function TextField({ id, testId, value, onChange }){
    const inputOnChange = onChange ? e => onChange(e.target.value) : null
    return (
        <InputContainer data-testid={testId}>
            <InputAdornmentContainer>@</InputAdornmentContainer>
            <Input id={id} value={value} onChange={inputOnChange}/>
        </InputContainer>
    )
}