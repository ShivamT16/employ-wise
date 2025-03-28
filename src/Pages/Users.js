import React, { useEffect, useState } from 'react'

const Users = () => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        fetchUserList()
    }, [])

    const fetchUserList = async () => {
        try {
            const response = await fetch('https://reqres.in/api/users?page=1')
            const result = await response.json()
            setUserList(result)
        } catch (error) {
            console.error(error)
        } 
    }

    const handleUpdate = async () => {}

    const handleDelete = async (id) => {
        try {
            setUserList({ ...userList, data: userList?.data?.filter((user) => user?.id !== id) })

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

    return (
    <div>
        <h2>Users</h2>
        {
            userList?.data?.map((user) => 
            <div key={user?.id}>
                <img alt='user_Avatar' src={user?.avatar} /> 
                <p> {user?.first_name} {user?.last_name} </p>
                <p> {user?.email} </p>
                <button> Edit </button>
                <button onClick={() => handleDelete(user?.id)} > Delete </button>
            </div> )
        }
    </div>
  )
}

export default Users