import AppWithModulesHocs from '../app/AppWithModulesHocs';
const App = ({ Component, pageProps }) => {
    return <AppWithModulesHocs Component={Component} pageProps={pageProps}/>
}
export default App