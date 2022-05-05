import './App.css'
import Header from './components/UI/Header/Header'
import Posts from './components/Posts/Posts'
import PostForm from './components/Posts/Post/PostForm/PostForm'
import {useState, useContext} from 'react'
import LoginForm from './components/LoginForm/LoginForm'
import SigninForm from './components/SigninForm/SigninForm'
import authContext from './context/AuthContext/auth-context'

function App() {
    const ctx = useContext(authContext)
    const [content, setContent] = useState(<Posts/>)
    const [contentStateString, setContentStateString] = useState('posts')

    const OpenLoginFormHandler = () => {
        setContent(<LoginForm/>)
        setContentStateString('Login form')
    }

    const OpenSigninFormHandler = () => {
        setContent(<SigninForm/>)
        setContentStateString('Sign up form')
    }

    const OpenPostFormHandler = () => {
        setContent(<Posts/>)
        setContentStateString('posts')
    }
    return (
        <>
            <Header onLoginButtonClick={OpenLoginFormHandler} onSigninButtonClick={OpenSigninFormHandler}
                    onPostButtonClick={OpenPostFormHandler} isLoggedIn={ctx.isLoggedIn}
            />
            <div className='grid grid-rows-3 gap-20 justify-center bg-gray-600 h-screen'>
                <div>
                    {content}
                    {ctx.isLoggedIn && contentStateString === 'posts' && <PostForm/>}
                </div>
            </div>
        </>
    )
}

export default App
