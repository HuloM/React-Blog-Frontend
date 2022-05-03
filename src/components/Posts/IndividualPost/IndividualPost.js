const IndividualPost = props => {
    const post = props.post
    return (
        <>
            <div className='text-black text-2xl'>
                {post.title}
            </div>
            <div>
                <p>{post.body}</p>
            </div>
        </>
    )
}

export default IndividualPost