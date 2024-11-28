import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate ,Link } from 'react-router-dom';

const AddUser = () => {
    const [user, setUser] = useState({ firstname: '', lastname: '', email: '', phone: '' });
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l’ajout de l’utilisateur');
                }
                return response.json();
            })
            .then(() => {
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/');
                }, 3000); 
            })
            .catch((error) => {
                console.error('Erreur :', error);
                alert('Une erreur est survenue lors de la sauvegarde de l’utilisateur.');
            });
    };

    return (
        <div className='col-sm-6 offset-sm-3'>
            <h1 className='d-flex justify-content-center'>Ajouter un utilisateur</h1>
            {showMessage && <Alert variant="success">Utilisateur ajouté avec succès !</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        value={user.firstname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formLastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastname"
                        value={user.lastname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" className='mt-2' type="submit">Save</Button>
                <Link to='/' className='btn btn-success ms-3 mt-2'>Back</Link>

            </Form>
        </div>
    );
};

export default AddUser;
