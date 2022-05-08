import Comments from '../../Comments/Comments'
import {Component} from 'react'

class IndividualPost extends Component {
    state = {
        title: '',
        author: '',
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
                    image: 'http://localhost:8080/static/' + resData.post.imageUrl,
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
                    <img src={this.state.image} alt="alt"/>
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
                <div>
                    {this.state.comments.length > 0 && <Comments comments={this.state.comments}/>}
                </div>
            </>
        )
    }
}

export default IndividualPost