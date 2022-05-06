import Comments from '../../Comments/Comments'

const IndividualPost = props => {
    const post = props.post
    return (
        <>
            <div className='text-black text-2xl text-center font-bold'>
                {post.title}
            </div>
            <div className='overflow-y-auto max-h-96 text-justify scroll-smooth scroll-m-auto'>
                <p className='m-auto'>{post.body}</p>
            </div>
            <div className='text-right'>
                <div>
                    {post.author}
                </div>
                {post.createdAt.toLocaleString()}
            </div>
            <div>
                {post.comments.length > 0 && <Comments comments={post.comments}/>}
            </div>
        </>
    )
}

export default IndividualPost