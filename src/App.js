import React, { useState, useEffect } from 'react'; // Import React and hooks

const App = () => {
    // State to store users and search query
    const [users, setUsers] = useState([]); // List of users
    const [search, setSearch] = useState(''); // Search query
    const [formData, setFormData] = useState({ // Form data for user creation/editing
        firstName: '',
        lastName: '',
        gender: 'Male',
        dob: '',
        city: '',
        phone: '',
        email: '',
    });
    const [editingUser, setEditingUser] = useState(null); // Track if we're editing a user

    // Load users from local storage when the component mounts
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || []; // Retrieve users from local storage
        setUsers(storedUsers); // Update state with stored users
    }, []);

    // Handle input changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event target
        setFormData({ ...formData, [name]: value }); // Update form data state
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        if (editingUser) {
            // Update existing user
            const updatedUsers = users.map((user) =>
                user.email === editingUser.email ? { ...formData } : user // Update user if email matches
            );
            setUsers(updatedUsers); // Update state
            localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save to local storage
            setEditingUser(null); // Reset editing user state
        } else {
            // Add new user
            setUsers([...users, formData]); // Add new user to the list
            localStorage.setItem('users', JSON.stringify([...users, formData])); // Save to local storage
        }
        setFormData({ // Reset form data
            firstName: '',
            lastName: '',
            gender: 'Male',
            dob: '',
            city: '',
            phone: '',
            email: '',
        });
    };

    // Function to delete a user
    const deleteUser = (email) => {
        const updatedUsers = users.filter(user => user.email !== email); // Remove user by email
        setUsers(updatedUsers); // Update state
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save to local storage
    };

    // Function to start editing a user
    const editUser = (user) => {
        setFormData(user); // Populate form with user data
        setEditingUser(user); // Set the user to be edited
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) || // Search by first name
        user.lastName.toLowerCase().includes(search.toLowerCase()) || // Search by last name
        user.email.toLowerCase().includes(search.toLowerCase()) // Search by email
    );

    return (
        <div className="app-container">
            <h1>User Management System</h1>
            <form onSubmit={handleSubmit}> {/* Form for adding/editing users */}
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City (optional)"
                    value={formData.city}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button> {/* Conditional button text */}
            </form>

            <input
                type="text"
                placeholder="Search Users"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update search state
            />

            <ul>
                {filteredUsers.map((user, index) => ( // Map over filtered users to display them
                    <li key={index}>
                        {user.firstName} {user.lastName} - {user.email} {/* Display user information */}
                        <button onClick={() => editUser(user)}>Edit</button> {/* Edit button */}
                        <button onClick={() => deleteUser(user.email)}>Delete</button> {/* Delete button */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App; // Export App component
