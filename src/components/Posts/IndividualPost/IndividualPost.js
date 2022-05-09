import Comments from '../../Comments/Comments'
import {Component} from 'react'
import authContext from '../../../context/AuthContext/auth-context'

class IndividualPost extends Component {
    static contextType = authContext

    state = {
        title: '',
        author: '',
        authorId: '',
        image: '',
        body: '',
        comments: [],
        createdAt: '',
    }

    componentDidMount() {
        const postId = this.props.id
        const url = `http://localhost:8080/post/${postId}`
        const method = 'GET'
        fetch(url, {
            method: method
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed to fetch status')
                }
                return res.json()
            })
            .then(resData => {
                this.setState({
                    title: resData.post.title,
                    author: resData.post.author.username,
                    authorId: resData.post.author.id,
                    image: resData.post.imageUrl,
                    createdAt: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
                    body: resData.post.body,
                    comments: resData.post.comments,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <>
                <div className='text-black text-2xl text-center font-bold'>
                    {this.state.title}
                </div>
                <div className='flex justify-center max-h-96 w-fit'>
                    <img src={'http://localhost:8080/static/' + this.state.image} alt="alt"/>
                </div>
                <div className='scrollbar-thin overflow-y-auto max-h-96 text-justify scroll-smooth scroll-m-auto'>
                    <p className='m-auto'>{this.state.body}</p>
                </div>
                <div className='text-right font-bold'>
                    <h2>
                        {this.state.author}
                    </h2>
                    {this.state.createdAt}
                </div>
                {this.state.authorId === parseInt(this.context.userId) && <div className='flex justify-center'>
                    <button className={`rounded-full bg-gray-900 hover:bg-blue-700 text-white px-3 py-1 mt-1 mr-1`}
                        onClick={this.props.onEdit}>
                        Edit</button>
                    <button className={`rounded-full bg-gray-900 hover:bg-blue-700 text-white px-3 py-1 mt-1 ml-1`}
                        onClick={this.props.onDelete}>
                        Delete</button>
                </div>}
                <div>
                    {this.state.comments.length > 0 && <Comments comments={this.state.comments}/>}
                </div>
            </>
        )
    }
}

export default IndividualPost