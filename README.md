## Next + Redux + Redux-Saga + Styled Components app that implements a login using https://magic.link

We are keeping a user logged in during a (browser open) session. 

The "remember me" behaviour will keep that user logged in across multiple sessions. 

### dependencies:

navigation > app (router??? - would it be possible to be moved into navigation)
welcome > components, app (selector???)
loading > 
authentication > app, components, navigation, loading (to notify applicationLoaded)
users > authentication 
    - signInSuccess and checkIsLoggedInReceived to add new users. These seem to be better documented into a saga)
    - receiveUsername and receiveUsernameStart to save username of the auth user
