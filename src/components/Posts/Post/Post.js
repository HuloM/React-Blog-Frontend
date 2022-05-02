const Post = props => {
    const post = props.post
    return (
        <div className='card bg-gray-500 flex justify-between grow my-2 gap-x-40'>
            <span className='text-left'>{post.title}</span>
            <div className='top-0 right-0 text-right'>
                <span>{post.author}</span>
                <div>{post.createdAt.toLocaleString()}</div>
            </div>
        </div>
    )
}

export default Post