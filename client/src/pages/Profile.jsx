import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData,filePerc);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photo: downloadURL })
        );
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="my-7 text-semibold text-3xl text-center">
        Profile
      </h1>
      <form action="" className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          hidden ref={fileRef}
          accept='image/*' 
        />

        <img src={formData?.photo || currentUser.photo} alt="profile" className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2' onClick={() => fileRef.current.click()} />
        <p className='text-sm self-center'>
          {fileError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
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