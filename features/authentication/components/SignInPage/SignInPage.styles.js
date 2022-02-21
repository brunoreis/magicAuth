import styled from 'styled-components';

export const ToggleLabelContainer = styled.div`
    padding-bottom: 0.2rem;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    margin-right: 1rem;
`

export const ErrorMessage = styled.div`
    margin-top: 1.2rem;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
    color: ${({theme}) => theme.colors.error}
`