import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="card-body">
          <p className="card-text"><strong>{user.username}</strong></p>
          <p className="card-text">{user.email}</p>
          <p className="card-text">{user.password}</p>
          <p className="card-text">{user.age}</p>
          <p className="card-text">{user.bio}</p>
        </div>
      </div>
    </div>
  );
}
let id = 1;
function UserApp() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    fetch("http://localhost:8081/listUsers")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching Users:', error);
      });
  };

  const showUser = () => {
    const user = users.find(user => user.username === userName);
    setSelectedUser(user);
  };

  const addNewUser = async () => {
    const email = document.getElementById("email").value;
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;

    try {
      const response = await fetch('http://localhost:8081/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "id": id,
          "email": email,
          "username": name,
          "password": password,
          "age": age
        })
      });

      if (response.ok) {
        alert('User added successfully!');
        loadUsers();
      } else {
        alert('Failed to add user. Please try again.');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('An error occurred while adding the user.');
    }
  };

  
  
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/deleteUser/${id}`);
      if (response.status === 200) {
        alert('User deleted successfully!');
        loadUsers();
      } else {
        alert('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };
  
  const updateUserBio = async (id, newBio) => {
    try {
      const response = await axios.put(`http://localhost:8081/updateBio/${id}`, { bio: newBio });
      if (response.status === 200) {
        alert('User bio updated successfully!');
        loadUsers();
      } else {
        alert('Failed to update user bio. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user bio:', error);
      alert('An error occurred while updating the user bio.');
    }
  };
  
  const updateUserPassword = async (id, newPassword) => {
    try {
      const response = await axios.put(`http://localhost:8081/updatePassword/${id}`, { password: newPassword });
      if (response.status === 200) {
        alert('user password updated successfully!');
        loadUsers();
      } else {
        alert('Failed to update user password. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user password:', error);
      alert('An error occurred while updating the user password.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this User?')) {
      await deleteUser(id);
    }
  };

  const handleUpdateBio = async (id, newBio) => {
    const updatedBio = prompt('Enter the new bio for the User:');
    if (updatedBio !== null) {
      await updateUserBio(id, updatedBio);
    }
  };

  const handleUpdatePassword = async (id) => {
    const newPassword = prompt('Enter the new password for the User:');
    if (newPassword !== null) {
      await updateUserPassword(id, newPassword);
    }
  };

  return (
    <div>
      <header className="main_header">
        <p className="calculator_title">Admin Control</p>
        <div className="flex_container"> 
            <button className="header_buttons">
              <Link to="/">Home</Link>
            </button>
            <button className="header_buttons">
              <Link to="/implied">Implied</Link>
            </button>
            <button className="header_buttons">
              <Link to="/prob">NoVig</Link>
            </button>
            <button className="header_buttons">
              <Link to="/kelly">Kelly</Link>
            </button>
            <button className="header_buttons">
              <Link to="/login">Admin Control</Link>
            </button>
        </div>
      </header>
      <div className="flex_center">
      <div className="calc_holder"> 
          
          <div className="row">
            <div className="col">
              <label htmlFor="name">Enter User name:</label>
              <input type="text" id="name" value={userName} onChange={(e) => setUserName(e.target.value)} />
              <button onClick={showUser}>Show User</button>
            </div>
            <div className="col">
               <div className="card shadow-sm">
                  <div className="card-body">
                      
                      {selectedUser ? (
        <><div className="card-footer">
        <button onClick={() => handleDelete(selectedUser.id)}>Delete</button>
        <button onClick={() => handleUpdateBio(selectedUser.id)}>Update Bio</button>
        <button onClick={() => handleUpdatePassword(selectedUser.id)}>Update Password</button>
    </div>
          <p className="card-text"><strong>{selectedUser.username}</strong></p>
          <p className="card-text">{selectedUser.email}</p>
          <p className="card-text">{selectedUser.password}</p>
          <p className="card-text">{selectedUser.age}</p>
          <p className="card-text">{selectedUser.bio}</p>
        </>
      ) : (
        <p>No user selected</p>
      )}
    </div>
  </div>
</div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" />
              <label htmlFor="username">username:</label>
              <input type="text" id="username" />
              <label htmlFor="password">Password:</label>
              <input type="text" id="password" />
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" />
              <button onClick={addNewUser}>Add User</button>
            </div>
          </div>
      </div>
      </div>
      <footer class="main_footer"> <button className="header_buttons"><Link to="/aboutUs">About Us</Link></button></footer>
    </div>
  );
  
  
}

export default UserApp;
