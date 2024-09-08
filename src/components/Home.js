import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/api/patients'); // Replace with your API endpoint
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    const deletePatient = async (patientId) => {
        try {
            await axios.delete(`http://127.0.0.1:8080/api/patients/${patientId}`); // Replace with your delete API endpoint
            const updatedPatients = patients.filter(patient => patient.patient_id !== patientId);
            setPatients(updatedPatients);
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    return (
        <div>
            <h1>HOME</h1>
            <h1>Patients</h1>
            <table style={{ margin: '0 auto' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.patient_id}>
                            <td>{patient.patient_id}</td>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.age}</td>
                            <td>
                                <button onClick={() => deletePatient(patient.patient_id)}>Delete</button>
                            </td>
                            <td>
                                <Link to={`/add-clinical-data/${patient.patient_id}`}>Add Clinical Data</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to="/add-patient">Add Patient</Link>
        </div>
    );
};

export default Home;