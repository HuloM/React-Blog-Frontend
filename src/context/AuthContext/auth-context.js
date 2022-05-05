import React from 'react'

const AuthContext = React.createContext({
    token: '',
    userId: '',
    isLoggedIn: false,
    authError: '',
    ClickAuthModalError: () => {},
    UserLoginHandler: (event, authData) => {},
    LogoutUserHandler: () => {}
})

export default AuthContext