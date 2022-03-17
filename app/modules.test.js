import modules from './modules'
import authentication from 'features/authentication/module';
import users from 'features/users/module';
import navigation from 'features/navigation/module';

it('should gather the reducers', () => {
    expect(modules.reducers).toEqual({
        [authentication.key]: authentication.reducer,
        [navigation.key]: navigation.reducer,
        [users.key]: users.reducer,
    })
})

it('should gather the wrappers', () => {
    expect(modules.hocs).toEqual([
        users.hoc,
        authentication.hoc,
    ])
})

it('should gather the sagas', () => {
    expect(modules.watchers).toEqual([
        users.watcher,
        authentication.watcher,
        navigation.watcher,
    ])
})