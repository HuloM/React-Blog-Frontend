import {useState, useCallback, useContext} from 'react'
import useInput from '../../../../hooks/use-input'
import authContext from '../../../../context/AuthContext/auth-context'

const PostForm = props => {
    const ctx = useContext(authContext)
    const [openForm, setOpenForm] = useState(false)

    const {
        enteredInput: titleInput,
        enteredInputIsValid: titleIsValid,
        inputIsInvalid: titleIsInvalid,
        inputBlurHandler: titleBlurHandler,
        inputChangeHandler: titleChangeHandler,
        resetOnFormSubmitHandler: resetTitle
    } = useInput(useCallback(input => input.trim() !== '' && input.length > 10, []))

    const {
        enteredInput: bodyInput,
        enteredInputIsValid: bodyIsValid,
        inputIsInvalid: bodyIsInvalid,
        inputBlurHandler: bodyBlurHandler,
        inputChangeHandler: bodyChangeHandler,
        resetOnFormSubmitHandler: resetBody
    } = useInput(useCallback(input => input.trim() !== '' && input.length > 5, []))

    const [image, setImage] = useState('')

    const handleOpenForm = () => {
        setOpenForm(true)
    }

    const onImageUploadChange = event => {
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    const handleFormSubmit = async event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('title', titleInput)
        formData.append('body', bodyInput)
        formData.append('image', image)
        const response = await fetch('http://localhost:8080/posts/', {
            method: 'POST',
            headers: {
                Authorization: ctx.token
            },
            body: formData
        })
        const data = await response.json()
        console.log(data)
        // setOpenForm(false)
    }

    const handleCancelSubmit = event => {
        event.preventDefault()
        setOpenForm(false)
        resetBody()
        resetTitle()
        setImage('')
    }

    return (
        <div className='pt-4 flex h-fit'>
            {!openForm && !props.isEditing &&
                <button onClick={handleOpenForm} className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 text-center grow'>Create New Post</button>
            }
            {(openForm || props.isEditing) && <form onSubmit={handleFormSubmit} className='card bg-gray-500 justify-between grow w-96'>
                <div>
                    <h2 className='font-bold text-center text-white'>Create New Post</h2>
                </div>
                {ctx.authError !== '' && <div className='bg-gray-800 text-center justify-center mt-3 rounded'>
                    <p className='text-rose-600'>{ctx.authError}</p>
                </div>}
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className={`${titleIsInvalid && 'text-red-700'}`}>Title:</span>
                        <input type="text" className={`form-input rounded block w-full text-black 
                                ${titleIsInvalid && 'border-red-700 border-2'}`}
                                onChange={titleChangeHandler} value={titleInput} onBlur={titleBlurHandler}/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className={`${bodyIsInvalid && 'text-red-700'}`}>Body:</span>
                        <textarea type="textarea" className={`form-textarea mt-1 w-full rounded block text-black 
                                ${bodyIsInvalid && 'border-red-700 border-2'}`}
                                onChange={bodyChangeHandler} value={bodyInput} onBlur={bodyBlurHandler} rows='5'/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span>Image:</span>
                        <input type="file" className={`w-full`}
                                onChange={onImageUploadChange}/>
                    </label>
                </div>
                <button type='submit' className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1'>Submit</button>
                <button onClick={handleCancelSubmit} className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1'>Cancel</button>
            </form>}
        </div>
    )
}

export default PostForm