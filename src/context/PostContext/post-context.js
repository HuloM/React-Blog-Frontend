import React from 'react'

const PostContext = React.createContext({
    posts: [],
    individualPost: {},
    postError: '',
    onCreatePostHandler: (postData, token) => {},
    onCreateCommentHandler: (postId, commentData, token) => {},
    onRetrievePostHandler: (postId) => {},
    onRetrievePostsHandler: () => {},
    onUpdatePostHandler: (postId, postData, token) => {},
    onDeletePostHandler: (postId, token) => {},
})

export default PostContext