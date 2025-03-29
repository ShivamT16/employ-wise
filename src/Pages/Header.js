import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    
    const getActiveStyle = ({isActive}) => ({
        color: isActive ? "Blue" : ""
    })

    const handleLogOut = (e) => {
        setIsLoggedIn(false)
        sessionStorage.removeItem('token')
    }

  return (
    <nav className='header'>
        <NavLink style={getActiveStyle} className='navLink' to="/" >Users</NavLink>
        <NavLink style={getActiveStyle} className='navLink' to="/edit" >EditUsers</NavLink>
        {isLoggedIn ? <NavLink className='navLink' to="/login" onClick={handleLogOut}>Logout</NavLink> :
        <NavLink style={getActiveStyle} className='navLink' to="/login" >Login</NavLink>}
    </nav>
  )
}

export default Header