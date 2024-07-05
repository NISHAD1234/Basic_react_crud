import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);


  console.log(users)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/getuser');
      setUsers(response.data); 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post('http://localhost:3000/api/users/createUser', newUser);
      fetchUsers();
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.post('http://localhost:3000/api/users/update', editingUser);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/deleteUser/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };





  return (
    <div>
    <h1>User Table</h1>


 {/* Create User Form */}

 
    <div>
    <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
       <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={createUser}>Create User</button>
    </div>

       {/* User Table */}


    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name || user.fname}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => setEditingUser(user)}>Edit</button>
              <button onClick={() => deleteUser(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>


{/* Edit User Form */}

    {editingUser && (
      <div>
        <input
          type="text"
          value={editingUser.name || editingUser.fname}
          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
        />
        <input
          type="email"
          value={editingUser.email}
          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
        />
        <button onClick={updateUser}>Update User</button>
        <button onClick={() => setEditingUser(null)}>Cancel</button>
      </div>
    )}

  </div>
  );
}

export default App;
