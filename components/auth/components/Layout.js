import Head from 'next/head'
import React from 'react';
import styled from 'styled-components';


export default function Layout({ children, title }) {
  return (
    <MainContainer>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding-left: 1.2rem;
  padding-right: 1.2rem;
`

export const HeaderContainer = styled.div` 
  height: 23vh;
  display: flex;
  align-items: center;
`
export const FormContainer = styled.div` 
  height: 57vh;
`
export const FooterContainer = styled.div` 
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 3rem;
  height: calc(20vh - 3rem);
`

