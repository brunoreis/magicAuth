## Next + Redux + Redux-Saga + Styled Components app that implements a login using https://magic.link

This is an exercise on using Next, Redux and Redux-Sagas. It is a work in progress. 

The proposal is to have different modules, as decoupled as possible from one another, in such a way that we can remove each of the modules and the other ones will keep working. When dependencies need to exist, we will keep them acyclic. 

Navigation is dispatched through redux and sagas, so that we can have a nice history and also that we can test navigation as a saga side effect. The navigation module is not removable, we consider it as a core module. We may create other core modules in the future, like a notification one. When we need links on the pages, we will probably Override Next/Link to dispatch events and use this navigation approach.

All the magic link login is isolated in the authentication module. We also have a "local" user database, where we "keep" the registered users, just for the sake of the exercise. 

As said, it still in progress and there are some ux/code issues to be tackled. You can check them in the /todo file. 

### dependencies:

navigation > app (router??? - would it be possible to be moved into navigation)
welcome > components, app (selector???)
authentication > app, components, navigation, loading (to notify applicationLoaded)
users > authentication 
