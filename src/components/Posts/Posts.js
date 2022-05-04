import DummyPosts from './DummyPosts'
import Post from './Post/Post'


const Posts = () => {
    const posts = DummyPosts

    return (
        <div className='flex-container h-fit'>
            {posts.map(post => (
                <Post post={post}/>
            ))}
        </div>
    )
}

export default Posts