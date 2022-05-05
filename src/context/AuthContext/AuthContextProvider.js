import React, {useState, useEffect, useCallback} from 'react'

import AuthContext from './auth-context'

const CartProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
    const [authError, setAuthError] = useState('')

    const UserLoginHandler = (event, authData) => {
        console.log(event, authData)
        // TODO: this will actually check a database
        setAuthError('')
        const email = authData.email
        const password = authData.password

        if(email === 'test@test.com' && password === 'password') {
            console.log('logged in')
            const milliseconds = 60 * 60 * 1000
            localStorage.setItem('token', 'will implement later')
            const expDate = new Date(new Date().getTime() + milliseconds)
            localStorage.setItem('expiryDate', expDate.toISOString())

            setToken('will implement later')
            setUserId('will implement later')

            AutoLogoutUserHandler(milliseconds)

            setIsLoggedIn(true)
        }
        else {
            setAuthError('Invalid email or password')
        }
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

    const ClickAuthModalError = () => {
        setAuthError('')
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
            new Date(new Date().getTime() + milliseconds).toISOString()
        localStorage.setItem('expiryDate', expDate)

        setIsLoggedIn(true)
        AutoLogoutUserHandler(milliseconds)
    }, [AutoLogoutUserHandler])

    const authContext = {
        token,
        userId,
        isLoggedIn,
        authError,
        ClickAuthModalError,
        UserLoginHandler,
        LogoutUserHandler,
    }

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default CartProvider