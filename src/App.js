import './App.css'
import Header from './components/UI/Header/Header'
import Posts from './components/Posts/Posts'
import PostForm from './components/Posts/Post/PostForm/PostForm'
import {useState, useEffect, useContext} from 'react'
import LoginForm from './components/LoginForm/LoginForm'
import SigninForm from './components/SigninForm/SigninForm'
import authContext from './context/AuthContext/auth-context'

function App() {
    const ctx = useContext(authContext)
    const [content, setContent] = useState(<Posts/>)

    const OpenLoginFormHandler = () => {
        setContent(<LoginForm/>)
    }

    const OpenSigninFormHandler = () => {
        setContent(<SigninForm/>)
    }

    const OpenPostFormHandler = () => {
        setContent(<Posts/>)
    }
    return (
        <>
            <Header onLoginButtonClick={OpenLoginFormHandler} onSigninButtonClick={OpenSigninFormHandler}
                    onPostButtonClick={OpenPostFormHandler} isLoggedIn={ctx.isLoggedIn}
            />
            <div className='grid grid-rows-3 gap-20 justify-center bg-gray-600 h-screen'>
                {content}
                {ctx.isLoggedIn && <PostForm/>}
            </div>
        </>
    )
}

export default App
