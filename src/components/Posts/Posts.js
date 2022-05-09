import Post from './Post/Post'
import {useContext, useEffect, useState} from 'react'
import postContext from '../../context/PostContext/post-context'


const Posts = () => {
    const postCtx = useContext(postContext)
    useEffect(() => {
        postCtx.onRetrievePostsHandler()
    },[])

    return (
        <div className='flex-container h-fit'>
            {postCtx.posts.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    )
}

export default Posts