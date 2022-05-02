import './App.css'
import Header from './components/UI/Header/Header'
import Posts from './components/Posts/Posts'

function App() {
    return (
        <>
            <Header/>
            <div className='flex justify-center items-center bg-gray-600'>
                <Posts/>
            </div>
        </>
    )
}

export default App
