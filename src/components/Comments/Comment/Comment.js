const Comment = props => {
    const comment = props.comment

    return (
        <div className='p-8 bg-white max-w-lg m-auto z-50 rounded-xl top-20 inset-x-0 shadow-lg border border-2 border-gray-500'>
            <p className='scrollbar-thin text-left overflow-y-auto max-h-24 text-justify scroll-smooth scroll-m-auto'>{comment.comment}</p>
            <p className='text-right'>{comment.author}</p>
        </div>
    )

}

export default Comment