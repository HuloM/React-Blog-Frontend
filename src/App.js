import './App.css'
import Header from './components/UI/Header/Header'
import Posts from './components/Posts/Posts'
import PostForm from './components/Posts/Post/PostForm/PostForm'

function App() {
    return (
        <>
            <Header/>
            <div className='grid grid-rows-3 gap-20 justify-center bg-gray-600 h-screen'>
                <Posts/>
                <PostForm/>
            </div>
        </>
    )
}

export default App
