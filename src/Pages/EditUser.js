import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'

const EditUser = () => {

    const { userList, userId, isLoggedIn } = useContext(UserContext)
    const [response,setResponse] = useState('')

    const userToEdit = userList?.data?.find(({id}) => id === userId)

    const [userDetail, setUserDetail] = useState({
        firstName: userToEdit ? userToEdit?.first_name : "",
        lastName: userToEdit ? userToEdit?.last_name : "",
        email: userToEdit ? userToEdit?.email : ""
    })

    const handleUserEdit = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserDetail({...userDetail, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://reqres.in/api/user/${userId}`, {
             method: 'PUT',
             headers: {
             'Content-Type': 'application/json',
              },
            body: JSON.stringify(userDetail),
        });
           const result = await response.json()
           setResponse(result)
        } catch (error) {
          console.error(error)
          setResponse(error)
        }
    }

  if(!isLoggedIn) return(
        <h2><Link to='/login' >Login</Link> First</h2>
    )
    
  return (
    <>
          <h2>Edit User Detail</h2>

          <form onSubmit={handleSubmit} className='editForm'>
            <input className='editInput' type='text' name='firstName' onChange={handleUserEdit} value={userDetail.firstName} placeholder='First Name' />
            <input className='editInput' type='text' name='lastName' onChange={handleUserEdit} value={userDetail.lastName} placeholder='Last Name'/>
            <input className='editInput' type='email' name='email' onChange={handleUserEdit} value={userDetail.email} placeholder='Email' />
            <button className='btn'> Submit </button>
          </form>

          <>
          <h3>Response:- </h3>
          <p> Name: {response?.firstName} {response?.lastName} </p>
          <p> Email: {response?.email} </p>
          </>
        
    </>
  )
}

export default EditUser