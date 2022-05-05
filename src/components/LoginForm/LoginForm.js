const LoginForm = props => {
    return (
        <div>
            <form  className='w-96'>
                <div>
                    <h2 className='font-bold text-center text-white'>Login</h2>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>Email</span>
                        <input type="text" className='form-input rounded block w-full'/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>Password</span>
                        <input type="text" className='form-input rounded block w-full'/>
                    </label>
                </div>
                <button type='submit' className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1'>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm