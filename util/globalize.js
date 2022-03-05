const globalize = (mainStoreKey) => (selector) => (state) => selector(state[mainStoreKey])
export default globalize;