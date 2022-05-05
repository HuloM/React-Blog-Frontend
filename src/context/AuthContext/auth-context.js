import React from 'react'

const AuthContext = React.createContext({
    token: '',
    userId: '',
    isLoggedIn: false,
    UserLoginHandler: (event, authData) => {},
    AutoLogoutUserHandler: (milliseconds) => {},
    LogoutUserHandler: () => {}
})

export default AuthContext