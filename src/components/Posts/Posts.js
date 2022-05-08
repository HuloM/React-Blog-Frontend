import DummyPosts from './DummyPosts'
import Post from './Post/Post'
import post from './Post/Post'
import {useEffect, useState} from 'react'


const Posts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getAllPosts = async () => {
            const url = 'http://localhost:8080/posts'
            const method = 'GET'
            const posts = await fetch(url, {
                method: method
            })
            const data = await posts.json()
            setPosts(data.posts)
        }
        getAllPosts()
    },[])

    return (
        <div className='flex-container h-fit'>
            {posts.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    )
}

export default Posts