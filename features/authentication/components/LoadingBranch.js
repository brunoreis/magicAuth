import React from 'react'
import { useSelector } from 'react-redux';
import Image from 'next/image'
import styled from 'styled-components';

import { getShowLoader } from 'app/selectors';

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

//@todo: test this component
export default function LoadingBranch({ children }) {
    const showLoader = useSelector(getShowLoader);

    return showLoader ? (
        <LoadingContainer>
                <Image src="/loader.gif" width="160px" height="120px"/>
                checking user info..
        </LoadingContainer> 
    ) : (
        children
    );
}