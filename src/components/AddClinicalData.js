import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddClinicalData = () => {
    const [patient, setPatient] = useState(null);
    const {patientId} = useParams();

    useEffect(() => {

        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/api/patients/' + patientId);
                setPatient(response.data);
            } catch (error) {
                console.error('Error fetching patient details:', error);
            }
        };

        fetchPatientDetails();
    }, [patientId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const componentName = document.getElementById('componentName').value;
            const componentValue = document.getElementById('componentValue').value;
    
            const response = await axios.post(`http://127.0.0.1:8080/api/clinical-data/${patientId}`, {
                componentName,
                componentValue
            });

            if(response.data) {
                toast.success('Clinical data added successfully!');
            }
    
            console.log('Clinical data saved:', response.data);
        } catch (error) {
            console.error('Error saving clinical data:', error);
        }

    };

    return (
        <div>
            <h1>Add Clinical Data</h1>
            {patient && (
                <div>
                    <h2>{patient.firstName} {patient.lastName}</h2>
                    <p>Age: {patient.age}</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor="componentName">Component Name:</label>
                <input type="text" id="componentName" name="componentName" />
                <br />
                <label htmlFor="componentValue">Component Value:</label>
                <input type="text" id="componentValue" name="componentValue" />
                <br />
                <button type="submit">Save</button>
            </form>


            <table style={{ margin: '0 auto' }}>
                <thead>
                    <tr>
                        <th>Component Name</th>
                        <th>Component Value</th>
                    </tr>
                </thead>
                <tbody>
                    {patient?.clinicalData?.map((data, index) => (
                        <tr key={`${data.componentName}-${index}`}>
                            <td>{data.componentName}</td>
                            <td>{data.componentValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/">Go back to Home</Link>
        </div>
        
    );
};

export default AddClinicalData;