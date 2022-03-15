import { Provider } from 'react-redux';

const addReduxProvider = WrappedComponent => {
    return ({ store, ...props}) => {
        return <Provider store={store}>
            <WrappedComponent {...props}/>
        </Provider>
    }
}
export default addReduxProvider
