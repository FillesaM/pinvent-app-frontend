import { useState } from 'react'
import Card from '../../components/card/Card'
import './contact.scss'
import { FaPhoneAlt, FaEnvelope} from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from 'react-toastify';
import axios from 'axios';


export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


const Contact = () => {
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("second")

    const data = {
        subject,
        message
    }

const sendEmail=async(e)=>{
   e.preventDefault();
    try{
        const response = await axios.post(`${BACKEND_URL}/api/contactus`, data)
        setSubject("")
        setMessage("")
        toast.success(response.data.message)
    }catch(error){
        toast.error(error.message)
    }
}

  return (
    <div className='contact'>
        <h3 className='--mt'>Contact Us</h3>
        <div className="section">
            <form onSubmit={sendEmail}>
                <Card cardClass="card">
                    <label>Subject</label>
                    <input type="text" name='subject' placeholder='Subject' required value={subject} onChange={(e)=> setSubject(e.target.value)}/>
                    <label>Message</label>
                    <textarea name='message' value={message} onChange={(e)=> setMessage(e.target.value)} cols="30" rows="10"></textarea>
                    <button className='--btn --btn-primary'>Send Message</button>
                </Card>
            </form>
            <div className='details'>
                <Card cardClass={"card2"}>
                    <h3>Our Contact Information</h3>
                    <p>Fill the form or contact us via another channels listed below</p>
                    <div className='icons'>
                        <span>
                            <FaPhoneAlt/>
                            <p>+383443654812</p>
                        </span>
                        <span>
                            <FaEnvelope/>
                            <p>support@pinvent.com</p>
                        </span>
                        <span>
                            <GoLocation/>
                            <p>Prishtine, Kosove</p>
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default Contact