import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

const Users = () => {

    const {userList, setUserList, setUserId, isLoggedIn} = useContext(UserContext)    
    const [pageNumber, setPageNumber] = useState(1)
    const [searchUser, setSearchUser] = useState('')

    useEffect(() => {
        fetchUserList()
    }, [pageNumber])

    const fetchUserList = async () => {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`)
            const result = await response.json()
            setUserList(result)
        } catch (error) {
            console.error(error)
        } 
    }

    const handleDelete = async (id) => {
        try {
            setUserList({ ...userList, data: userList?.data?.filter((user) => user?.id !== id) })
            alert('User Deleted')
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const result = await response.json();  //throws error as API does not provide any response

          } catch (error) {
            console.error('Error making DELETE request:', error);
          }
    }

    if(!isLoggedIn) return(
        <h2><Link to='/login'>Login</Link> First</h2>
    )

    return (
    <div>
        <h2> Users </h2>

        {/* user searchBar  */}
        <input className='editInput' placeholder='Search name or email' onChange={(e) => setSearchUser(e.target.value.toLowerCase())} /> 

        <div className='userList'>
        {
            userList?.data?.filter(({first_name, last_name, email }) => first_name?.toLowerCase()?.includes(searchUser) || last_name?.toLowerCase()?.includes(searchUser) || email?.toLowerCase()?.includes(searchUser) )?.map((user) => 
            <div key={user?.id} className='userCard'>
                <img className='userImg' alt='user_Avatar' src={user?.avatar} /> 
                <p> {user?.first_name} {user?.last_name} </p>
                <p> {user?.email} </p>
                
                <Link to='/edit' ><button className='btn' onClick={() => setUserId(user?.id)}> Edit </button></Link>
                <button className='btn' onClick={() => handleDelete(user?.id)} > Delete </button>
            </div> )
        }
        </div>

        <br />
        <button className='btn' onClick={() => setPageNumber(1)} >1</button>
        <button className='btn' onClick={() => setPageNumber(2)} >2</button>

    </div>
  )
}

export default Users