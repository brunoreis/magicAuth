import styled from 'styled-components';

export const MessageContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 1.5rem;
    margin-top: 1rem;
    color: ${({available}) => available ? 'green' : 'red'}
`