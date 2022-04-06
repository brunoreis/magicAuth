import modules from './modules'
import authentication from 'modules/authentication/module';
import users from 'modules/users/module';
import navigation from 'modules/navigation/module';

it('should gather all the modules reducers (authentication, navigation and users)', () => {
    expect(modules.reducers).toEqual({
        [authentication.key]: authentication.reducer,
        [navigation.key]: navigation.reducer,
        [users.key]: users.reducer,
    })
})

it('should gather all the modules hocs (users and authentication)', () => {
    expect(modules.hocs).toEqual([
        users.hoc,
        authentication.hoc,
    ])
})

it('should gather the modules watcher sagas (users, authentication and navigation)', () => {
    expect(modules.sagaWatchers).toEqual([
        users.sagaWatcher,
        authentication.sagaWatcher,
        navigation.sagaWatcher,
    ])
})