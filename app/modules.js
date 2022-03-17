import users from 'features/users/module';
import authentication from 'features/authentication/module';
import navigation from 'features/navigation/module';

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
  watchers: modules.reduce(
    (watchers, module) =>
      module.watcher ? [...watchers, module.watcher] : watchers,
    []
  ),
};

export default config;