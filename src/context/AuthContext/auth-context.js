import React from 'react'

const AuthContext = React.createContext({
    token: '',
    username: '',
    isLoggedIn: false,
    authError: '',
    ClickAuthModalError: () => {},
    UserSignupHandler: (authdata) => {},
    UserLoginHandler: (authData) => {},
    LogoutUserHandler: () => {}
})

export default AuthContext