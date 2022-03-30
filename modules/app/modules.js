import users from 'modules/users/module';
import authentication from 'modules/authentication/module';
import navigation from 'modules/navigation/module';

//the order is important do to the inclusion of the wrappers around the _app component
const modules = [users, authentication, navigation].reduce(
  (modules, module) =>
    (modules = module.disabled ? modules : [...modules, module]),
  []
);

const config = {
  reducers: modules.reduce(
    (reducers, module) =>
      module.reducer ? { ...reducers, [module.key]: module.reducer } : reducers,
    {}
  ),
  hocs: modules.reduce(
    (hocs, module) =>
      module.hoc ? [...hocs, module.hoc] : hocs,
    []
  ),
  sagaWatchers: modules.reduce(
    (sagaWatchers, module) =>
      module.sagaWatcher ? [...sagaWatchers, module.sagaWatcher] : sagaWatchers,
    []
  ),
};

export default config;
