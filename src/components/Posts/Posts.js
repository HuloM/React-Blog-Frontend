import DummyPosts from './DummyPosts'
import Post from './Post/Post'


const Posts = () => {
    const posts = DummyPosts

    return (
        <div className='flex-container h-fit'>
            {posts.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    )
}

export default Posts