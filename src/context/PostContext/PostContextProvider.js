import React, {useState} from 'react'

import PostContext from './post-context'

const PostProvider = props => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [posts, setPosts] = useState([])
    const [individualPost, setIndividualPost] = useState({
        title: '',
        imageUrl: '',
        body: '',
        author: {
            username: '',
            id: ''
        },
        createdAt: '',
        comments: []
    })
    const [postError, setPostError] = useState('')

    const onCreatePostHandler = async (postData, token) => {
        const formData = new FormData()
        formData.append('title', postData.titleInput)
        formData.append('body', postData.bodyInput)
        formData.append('image', postData.image)
        const response = await fetch('http://localhost:8080/posts/', {
            method: 'POST',
            headers: {
                Authorization: token
            },
            body: formData
        })
        const data = await response.json()
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
        return data.message
    }

    const onRetrievePostHandler = async postId => {
        const response = await fetch(`http://localhost:8080/post/${postId}`, { method: 'GET' })

        const data = await response.json()
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
        setIndividualPost(data.post)
    }

    const onRetrievePostsHandler = async (page) => {
        setPage(page)
        console.log(page)
        const url = 'http://localhost:8080/posts/' + page
        const method = 'GET'
        console.log(url)
        const posts = await fetch('http://localhost:8080/posts/' + page, {
            method: method
        })
        console.log(posts)
        const data = await posts.json()
        setPosts(data.posts)
        setTotalPages(data.totalPages)
        console.log(data)
        console.log(posts)
    }

    const onUpdatePostHandler = async (postId, postData, token) => {
        const formData = new FormData()
        formData.append('title', postData.titleInput)
        formData.append('body', postData.bodyInput)
        formData.append('image', postData.image)
        const response = await fetch(`http://localhost:8080/post/${postId}`, {
            method: 'PUT',
            headers: {
                Authorization: token
            },
            body: formData
        })
        const data = await response.json()
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
        setIndividualPost(data.post)
    }

    const onDeletePostHandler = async (postId, token) => {
        const response = await fetch(`http://localhost:8080/post/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        })
        const data = await response.json()
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
    }

    const onCreateCommentHandler = async (postId, commentData, token) => {
        const formData = new FormData()
        formData.append('comment', commentData)

        const response = await fetch(
            `http://localhost:8080/post/comments/${postId}`, {
                method: 'POST',
                headers: {
                    Authorization: token
                },
                body: formData
            })
        const data = await response.json()
        console.log(data)
        if (response.status !== 200) {
            setPostError(data.message)
            return
        }
    }

    const postContext = {
        page,
        totalPages,
        posts,
        individualPost,
        postError,
        onCreatePostHandler,
        onCreateCommentHandler,
        onRetrievePostHandler,
        onRetrievePostsHandler,
        onUpdatePostHandler,
        onDeletePostHandler,
    }

    return (
        <PostContext.Provider value={postContext}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostProvider