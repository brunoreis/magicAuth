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
  wrappers: modules.reduce(
    (wrappers, module) =>
      module.wrappers ? [...wrappers, ...module.wrappers] : wrappers,
    []
  ),
  watchers: modules.reduce(
    (watchers, module) =>
      module.watcher ? [...watchers, module.watcher] : watchers,
    []
  ),
};

export default config;
