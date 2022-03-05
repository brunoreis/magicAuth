import { useRef } from 'react'
import { buildStore } from 'app/store';
import { Provider } from 'react-redux';

const addReduxProvider = WrappedComponent => {
    return ({ store, ...props}) => {
        const actualStore = useRef(store || buildStore())
        return <Provider store={actualStore.current}>
            <WrappedComponent {...props}/>
        </Provider>
    }
}
export default addReduxProvider
