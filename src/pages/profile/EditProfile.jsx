import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../components/card/Card';
import ChangePassword from '../../components/changePassword/ChangePassword';
import Loader from '../../components/loader/Loader';
import { selectUser } from '../../redux/features/auth/authSlice';
import { updateProfile } from '../../services/authService';
import './profile.scss'


const EditProfile = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser)
    const {email} = user

    useEffect(()=>{
        if(!email) {
            navigate('/profile')
        }
    },[email,navigate])

    const initialState ={
        name:user?.name,
        email:user?.email,
        phone:user?.phone,
        bio:user?.bio,
        photo:user?.photo
    }

    const [isLoading, setIsLoading] = useState(false);
    const [profile,setProfile] = useState(initialState)
    const [profileImg,setProfileImg] = useState("")
    
    const handleInputChange=(e)=> {
        const {name,value} = e.target;
        setProfile({...profile,[name]:value})
        }
    
    const handleImageChange=(e)=> {
        setProfileImg(e.target.files[0])
    };
    
    const saveProfile =async (e)=> {
        e.preventDefault();
        setIsLoading(true)
        try{
            let imageUrl;
            if(profileImg && 
                (
                    profileImg.type === "image/jpeg" ||
                    profileImg.type === "image/jpg" ||
                    profileImg.type === "image/png" 
                )
                ){
                    const image = new FormData()
                    image.append("file",profileImg)
                    image.append("cloud_name","doqv1gpxy")
                    image.append("upload_preset","fe8iorl4")

                    const response = await fetch("https://api.cloudinary.com/v1_1/doqv1gpxy/image/upload",
                    {
                        method:"post",
                        body:image
                    });
                    const imageData = await response.json()
                    imageUrl = imageData.url.toString()
                }
                const formData = {
                    name:profile.name,
                    phone:profile.phone,
                    bio:profile.bio,
                    photo: profileImg ? imageUrl : profile.photo
                }

                await updateProfile(formData)
                toast.success("User profile updated")
                navigate('/profile')
                setIsLoading(false)
        }catch(error){
            console.log(error)
            setIsLoading(false)
            toast.error(error.message)
        }      
    }

  return (
    <div className='profile --my2'>
        {isLoading && <Loader/>}
        <Card cardClass={"card --flex-dir-column"}>
                <span className='profile-photo'>
                    <img src={user?.photo} alt="Profile Pic"/>
                </span>
                <form className='--form-control --m' onSubmit={saveProfile}>
                <span className='profile-data'>
                    <p>
                        <label>Name:</label>
                        <input type="text" name="name" value={profile?.name} onChange={handleInputChange}/>
                    </p>
                    <p>
                    <label>Email:</label>
                        <input type="text" name="email" value={profile?.email} disabled/>
                        <br/>
                        <code>Email can not be changed</code>
                    </p>
                    <p>
                    <label>Phone:</label>
                        <input type="text" name="phone" value={profile?.phone} onChange={handleInputChange}/>
                    </p>
                    <p>
                    <label>Bio:</label><br/>
                        <textarea type="text" name="bio" value={profile?.bio} onChange={handleInputChange} cols="30" rows="10"></textarea>
                    </p>
                    <p>
                        <label>Photo:</label>
                        <input type="file" name="image" onChange={handleImageChange}/>
                    </p>
                    <div>
                        <button className='--btn --btn-primary' type='submit'>Save changes</button>
                     </div>
                </span>
                </form>
            </Card>
            <br/>
            <ChangePassword/>
    </div>
  )
}

export default EditProfile