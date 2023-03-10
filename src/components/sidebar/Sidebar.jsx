import React, { useState } from 'react'
import './sidebar.scss'
import {HiMenuAlt3} from 'react-icons/hi'
import {RiProductHuntLine} from 'react-icons/ri'
import menu from '../../data/sidebar'
import SidebarItem from './SidebarItem'
import { Link } from 'react-router-dom'

const Sidebar = ({children}) => {
    const [isOpen,setIsOpen] = useState(true)

const toggle = ()=>{
    setIsOpen(!isOpen)
}

  return (
    <div className='layout'>
        <div className={isOpen ? 'sidebar' : 'sidebar-close'}>
            <div className='top_section'>
                <div className="logo" style={{display : isOpen ? 'block' : 'none'}}>
                 <Link to='/'><RiProductHuntLine size={35} style={{cursor:'pointer'}}/></Link>
                </div>
                <div className={isOpen ?'bars' : 'bars-close'}> 
                    <HiMenuAlt3 style={{cursor:'pointer'}} onClick={toggle}/>
                </div>
            </div>
           {menu.map((item,index)=> {
            return <SidebarItem key={index} item={item} isOpen={isOpen} setIsOpen={setIsOpen}/>
           })} 
        </div>
        <main className={isOpen ? 'main' : 'main-close'}>
            {children}
        </main>
    </div>
  )
}

export default Sidebar