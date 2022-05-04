import {useState} from 'react'

const PostForm = props => {
    const [openForm, setOpenForm] = useState(false)

    const handleOpenForm = () => {
        setOpenForm(true)
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        setOpenForm(false)
    }
    return (
        <div className='pt-4 flex grid grid-flow-row auto-rows-max justify-center'>
            {!openForm &&
                <button onClick={handleOpenForm} className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2'>Create New Post</button>
            }
            {openForm && <form onSubmit={handleFormSubmit} className='w-96'>
                <div>
                    <h2 className='font-bold text-center text-white'>Create New Post</h2>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>Title:</span>
                        <input type="text" className='form-input rounded block w-full'/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>body:</span>
                        <textarea type="textarea" className='form-textarea mt-1 w-full rounded block' rows='5'/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>image:</span>
                        <input type="file" className='w-full'/>
                    </label>
                </div>
                <button type='submit' className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1'>Submit</button>
            </form>}
        </div>
    )
}

export default PostForm