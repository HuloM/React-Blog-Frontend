import './App.css'
import Header from './components/UI/Header/Header'
import Posts from './components/Posts/Posts'
import PostForm from './components/Posts/Post/PostForm/PostForm'
import {useState} from 'react'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [openLoginForm, setOpenLoginForm] = useState(false)
    const [openSigninForm, setOpenSigninForm] = useState(false)

    const UserLoginHandler = () => {
        setIsLoggedIn(true)
        localStorage.setItem('token', 'will implement later')

        AutoLogoutUserHandler()
        setOpenLoginForm(false)
    }

    const AutoLogoutUserHandler = () => {
        const milliseconds = 60 * 60 * 1000
        setTimeout(() => {
            LogoutUserHandler()
        }, milliseconds)

    }

    const LogoutUserHandler = () => {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        localStorage.removeItem('expiryDate')
    }

    const OpenLoginFormHandler = () => {
        setOpenLoginForm(true)
        setOpenSigninForm(false)
        UserLoginHandler()
    }

    const OpenSigninFormHandler = () => {
        setOpenSigninForm(true)
        setOpenLoginForm(false)
    }

    const OpenPostFormHandler = () => {
        setOpenLoginForm(false)
        setOpenSigninForm(false)
    }

    let content = <Posts/>

    if (openLoginForm)
        content = <p> implement login form</p> //<LoginForm/>
    else if (openSigninForm)
        content = <p> implement sign in form</p> //<SigninForm/>

    return (
        <>
            <Header onLoginButtonClick={OpenLoginFormHandler} onSigninButtonClick={OpenSigninFormHandler}
                    onPostButtonClick={OpenPostFormHandler} onLogoutButtonClick={LogoutUserHandler} isLoggedIn={isLoggedIn}
            />
            <div className='grid grid-rows-3 gap-20 justify-center bg-gray-600 h-screen'>
                {content}
                {isLoggedIn && <PostForm/>}
            </div>
        </>
    )
}

export default App
