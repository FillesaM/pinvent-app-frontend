import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { changePassword } from '../../services/authService'
import Card from '../card/Card'
import './changePassword.scss'

const initialState= {
    oldPassword:"",
    password:"",
    password2:"",
  }
  

const ChangePassword = () => {

    const navigate = useNavigate()

    const [formData,setFormData] = useState(initialState)
    
    const{oldPassword,password,password2} = formData

    const handleInputChange=(e)=> {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
        }

     const changePass=async(e)=>{
        e.preventDefault();
        if(password !== password2) {
            return toast.error("New password do not match")
        }
        const formData = {
            oldPassword,
            password
        }
       const data = await changePassword(formData)
        toast.success(data)
        navigate('/profile')
     }   

  return (
    <div className='change-password'>
        <Card cardClass={"password-card"}>
            <h3>Change Password</h3>
            <form className='--form-control' onSubmit={changePass}>
                <input type="password" placeholder='Old Password' name='oldPassword' value={oldPassword} onChange={handleInputChange}/>
                <input type="password" placeholder='New Password' name='password' value={password} onChange={handleInputChange}/>
                <input type="password" placeholder='Confirm New Password' name='password2' value={password2} onChange={handleInputChange}/>
                <button type="submit" className='--btn --btn-primary'>Change Password</button>
            </form>
        </Card>
    </div>
  )
}

export default ChangePassword