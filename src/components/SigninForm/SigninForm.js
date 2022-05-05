const SigninForm = props => {
    return (
        <div>
            <form  className='w-96'>
                <div>
                    <h2 className='font-bold text-center text-white'>Login</h2>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>username</span>
                        <input type="text" className='form-input rounded block w-full'/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>first Name</span>
                        <input type="text" className='form-input rounded block w-1/2'/>
                        <span className='text-white'>Last Name</span>
                        <input type="text" className='form-input rounded block w-1/2'/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>Email</span>
                        <input type="email" className='form-input rounded block w-full'/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>Password</span>
                        <input type="password" className='form-input rounded block w-full'/>
                    </label>
                </div>
                <div className='py-2'>
                    <label className='font-bold'>
                        <span className='text-white'>Confirm Password</span>
                        <input type="password" className='form-input rounded block w-full'/>
                    </label>
                </div>
                <button type='submit' className='rounded-full bg-gray-900 hover:bg-blue-700 text-white px-4 py-2 mt-1'>Submit</button>
            </form>
        </div>
    )
}

export default SigninForm