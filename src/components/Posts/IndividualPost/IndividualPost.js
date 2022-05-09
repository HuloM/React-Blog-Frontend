import Comments from '../../Comments/Comments'
import authContext from '../../../context/AuthContext/auth-context'
import {useContext, useEffect} from 'react'
import postContext from '../../../context/PostContext/post-context'

const IndividualPost = props => {
    const authCtx = useContext(authContext)
    const postCtx = useContext(postContext)

    useEffect(() => {
        postCtx.onRetrievePostHandler(props.id)
    },[])

    const onDeleteClickHandler = () => {
        postCtx.onDeletePostHandler(props.id, authCtx.token)
        props.onDelete()
    }

    return (
        <>
            <div className='text-black text-2xl text-center font-bold'>
                {postCtx.individualPost.title}
            </div>
            <div className='flex justify-center max-h-96 w-fit'>
                <img src={'http://localhost:8080/static/' + postCtx.individualPost.imageUrl} alt="alt"/>
            </div>
            <div className='scrollbar-thin overflow-y-auto max-h-96 text-justify scroll-smooth scroll-m-auto'>
                <p className='m-auto'>{postCtx.individualPost.body}</p>
            </div>
            <div className='text-right font-bold'>
                <h2>
                    {postCtx.individualPost.author.username}
                </h2>
                {new Date(postCtx.individualPost.createdAt).toLocaleString().split(',')[0]}
            </div>
            {postCtx.individualPost.author.id === parseInt(authCtx.userId) && <div className='flex justify-center'>
                <button className={`rounded-full bg-gray-900 hover:bg-blue-700 text-white px-3 py-1 mt-1 mr-1`}
                    >
                    Edit</button>
                <button className={`rounded-full bg-gray-900 hover:bg-blue-700 text-white px-3 py-1 mt-1 ml-1`}
                    onClick={onDeleteClickHandler}>
                    Delete</button>
            </div>}
            <div>
                {postCtx.individualPost.comments !== undefined && postCtx.individualPost.comments.length > 0 && <Comments comments={postCtx.individualPost.comments}/>}
            </div>
        </>
    )
}

export default IndividualPost