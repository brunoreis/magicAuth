import { useStore } from 'react-redux'

export default (WrappedComponent) => {
  return ({ broadCastStore = () => {}, ...props }) => {
    const store = useStore();
    broadCastStore(store);
    return <WrappedComponent {...props} />;
  };
};
