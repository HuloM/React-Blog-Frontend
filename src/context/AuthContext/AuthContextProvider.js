import React, {useState, useEffect, useCallback} from 'react'

import AuthContext from './auth-context'

const CartProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [authError, setAuthError] = useState('')

    const UserSignupHandler = async authdata => {
        setAuthError('')
        const formData = new FormData()
        formData.append('username', authdata.username)
        formData.append('first_name', authdata.first_name)
        formData.append('last_name', authdata.last_name)
        formData.append('email', authdata.email)
        formData.append('password', authdata.password)
        formData.append('confirmPassword', authdata.confirmPassword)

        const response = await fetch('http://localhost:8080/signup', {
            method: 'PUT',
            body: formData
        })
        if (response.status !== 200) {
            if (response.status !== 422)
            {
                setAuthError('Error signing up user, please try again later')
                return
            }
            const data = await response.json()
            setAuthError(data.message)
            return
        }
        // redirect to login
    }

    const UserLoginHandler = async authData => {
        setAuthError('')

        const formData = new FormData()
        formData.append('email', authData.email)
        formData.append('password', authData.password)

        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        if (response.status !== 200) {
            if (response.status !== 422 && response.status !== 401)
            {
                setAuthError('Error logging user in, please try again later')
                return
            }
            setAuthError(data.message)
            return
        }
        const milliseconds = 60 * 60 * 1000
        localStorage.setItem('token', data.token)
        const expDate = new Date(new Date().getTime() + milliseconds)
        localStorage.setItem('expiryDate', expDate.toISOString())

        setToken(data.token)
        setUsername(data.username)

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
        localStorage.removeItem('username')
        localStorage.removeItem('expiryDate')
    }

    const ClickAuthModalError = () => {
        setAuthError('')
    }

    useEffect(() => {
        const cookieToken = localStorage.getItem('token')
        const expiryDate = localStorage.getItem('expiryDate')
        if (!cookieToken || !expiryDate) {
            return
        }
        if (new Date(expiryDate) <= new Date()) {
            LogoutUserHandler()
            return
        }
        const cookieUsername = localStorage.getItem('username')
        setToken(cookieToken)
        setUsername(cookieUsername)
        const milliseconds = 60 * 60 * 1000

        const expDate =
            new Date(new Date().getTime() + milliseconds).toISOString()
        localStorage.setItem('expiryDate', expDate)

        setIsLoggedIn(true)
        AutoLogoutUserHandler(milliseconds)
    }, [AutoLogoutUserHandler])

    const authContext = {
        token,
        username,
        isLoggedIn,
        authError,
        ClickAuthModalError,
        UserSignupHandler,
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