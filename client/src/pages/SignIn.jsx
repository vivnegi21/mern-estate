import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const SignIn = () => {

  const [formdata, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value
    })
  }
  const onSubmit = async (e) => {

    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formdata),
        }
      );
      const data = await res.json();
      if(data.success===false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/')

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    console.log(data);
  }
  // console.log(formdata);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form action="" className='flex flex-col gap-4' onSubmit={onSubmit}>
        <input type="text" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >
          {loading?'Loading...':"Sign In"}
        </button>

      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have An Account?</p>
        <Link className='text-blue-700 ' to={'/sign-up'}>Sign In</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p> }
    </div>
  )
}

export default SignIn