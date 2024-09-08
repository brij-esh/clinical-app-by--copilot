import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddPatient = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8080/api/patients', {
                firstName,
                lastName,
                age,
            });

            if (response.data) {
                toast.success('Patient added successfully!');
            }

            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add Patient</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name: <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Last Name: <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Age:  <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <Link to="/">Go back to Home</Link>
        </div>
    );
};

export default AddPatient;