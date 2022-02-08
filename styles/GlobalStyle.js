import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html{
    box-sizing: border-box;
    display:block;
    height: 100%;
    max-width: 600px;
    margin:0 auto;
    background: #efefef;
    padding: 0;
  }
  
  body{
    background: #fefefe;
    min-height:100vh;
    padding: 1rem;
    margin-top:0;
    font-family:OpenSans;
  }
`;
export default GlobalStyle;
