import {useContext, useState} from 'react'
import authContext from '../../context/AuthContext/auth-context'
import Modal from '../UI/Modal/Modal'

const LoginForm = () => {
    const ctx = useContext(authContext)
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const EmailInputChangeHandler = event => {
        setEmailInput(event.target.value)
    }

    const PasswordInputChangeHandler = event => {
        setPasswordInput(event.target.value)
    }

    const FormSubmitHandler = event => {
        event.preventDefault()
        const email = emailInput
        const password = passwordInput

        ctx.UserLoginHandler(event, {email: email, password: password})
        if (ctx.authError)
            setEmailInput(email)
        setPasswordInput('')
    }

    return (
        <div className='pt-4 flex h-fit'>
            <form className='card bg-gray-500 justify-between grow w-96' onSubmit={FormSubmitHandler}>
                <div>
                    <h2 className='font-bold text-center text-white'>Login</h2>
                </div>
                {ctx.authError !== '' && <div className='bg-gray-800 text-center justify-center mt-3 rounded'>
                    <p className='text-rose-600'>{ctx.authError}</p>
                </div>}
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>Email</span>
                        <input type='text' className='form-input rounded block w-full text-black'
                                onChange={EmailInputChangeHandler} value={emailInput}/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>Password</span>
                        <input type='password' className='form-input rounded block w-full text-black'
                                onChange={PasswordInputChangeHandler} value={passwordInput}/>
                    </label>
                </div>
                <button type='submit'
                        className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1'>Submit
                </button>
            </form>
        </div>
    )
}

export default LoginForm