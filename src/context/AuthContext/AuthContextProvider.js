import React, {useState, useEffect, useCallback} from 'react'

import AuthContext from './auth-context'

const CartProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')

    const UserLoginHandler = (event, authData) => {

        const milliseconds = 60 * 60 * 1000
        localStorage.setItem('token', 'will implement later')
        setToken('will implement later')
        setUserId('will implement later')
        localStorage.setItem('expiryDate', (new Date().getTime() + milliseconds).toISOString())

        AutoLogoutUserHandler(milliseconds)

        setIsLoggedIn(true)
    }

    const AutoLogoutUserHandler = useCallback((milliseconds) => {
        setTimeout(() => {
            LogoutUserHandler()
        }, milliseconds)
    }, [])

    const LogoutUserHandler = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        localStorage.removeItem('expiryDate')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const expiryDate = localStorage.getItem('expiryDate')
        if (!token || !expiryDate) {
            return
        }
        if (new Date(expiryDate) <= new Date()) {
            LogoutUserHandler()
            return
        }
        const userId = localStorage.getItem('userId')
        setToken(token)
        setUserId(userId)
        const milliseconds = 60 * 60 * 1000

        const expDate =
            (new Date().getTime() + milliseconds).toISOString()
        localStorage.setItem('expiryDate', expDate)

        this.setState({isAuth: true, token: token, userId: userId})
        AutoLogoutUserHandler(milliseconds)
    }, [AutoLogoutUserHandler])

    const authContext = {
        token,
        userId,
        isLoggedIn,
        UserLoginHandler,
        AutoLogoutUserHandler,
        LogoutUserHandler,
    }

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default CartProvider