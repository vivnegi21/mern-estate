import React from 'react'
import {useSelector} from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="my-7 text-semibold text-3xl text-center">
        Profile
      </h1>
      <form action="" className='flex flex-col gap-4'>
        <img src={currentUser.photo} alt="profile" className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2' />
        <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' />
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>

      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile