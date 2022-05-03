import {useState} from 'react'
import Modal from '../../UI/Modal/Modal'
import IndividualPost from '../IndividualPost/IndividualPost'

const Post = props => {
    const [showPost, setShowPost] = useState(false)

    const post = props.post

    const handleShowPost = () => {
        setShowPost(true)
    }

    const handleClosePost = () => {
        setShowPost(false)
    }

    return (
        <>
            {showPost && <Modal onClick={handleClosePost}><IndividualPost post={post}/></Modal>}
            <a onClick={handleShowPost}>
                <div className='card bg-gray-500 flex justify-between grow my-2 gap-x-40'>
                    <span className='text-left'>{post.title}</span>
                    <div className='top-0 right-0 text-right'>
                        <span>{post.author}</span>
                        <div>{post.createdAt.toLocaleString()}</div>
                    </div>
                </div>
            </a>
        </>
    )
}

export default Post