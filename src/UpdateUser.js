import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams ,Link } from 'react-router-dom';


const UpdateUser = () => {
    const [user, setUser] = useState({ firstname: '', lastname: '', email: '', phone: '' });
    const [showMessage, setShowMessage] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/api/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(() => {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                navigate('/');
            }, 3000); 
        });
    };

    return (
        <div className='col-sm-6 offset-sm-3'>
            <h1 className='d-flex justify-content-center'> Mise à jour</h1>
            {showMessage && <Alert variant="info">Les données ont été mises à jour avec succès !</Alert>}
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstname" value={user.firstname} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formLastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastname" value={user.lastname} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" value={user.email} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="phone" value={user.phone} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" className='mt-2' type="submit">Update</Button>
                    <Link to='/' className='btn btn-success ms-3 mt-2'>Back</Link>
                </Form>
            </div>
        </div>
    );
};

export default UpdateUser;
