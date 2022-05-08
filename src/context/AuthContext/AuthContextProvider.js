import React, {useState, useEffect, useCallback} from 'react'

import AuthContext from './auth-context'

const CartProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
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
        const data = response.json()
        // redirect to login
    }

    const UserLoginHandler = authData => {
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