import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = (page) => {
        fetch(`http://localhost:8000/api/users?page=${page}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.data);
                setTotalPages(data.last_page);
            });
    };

    const handleDelete = (id) => {
        setUserIdToDelete(id);
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:8000/api/users/${userIdToDelete}`, 
            { method: 'DELETE' })
            .then(() => {
                setUsers(users.filter(user => user.id !== userIdToDelete));
                setShowConfirmModal(false);
            });
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    const handleView = (user) => {
        setSelectedUser(user);
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => setShowDetailsModal(false);
    const handleCloseConfirmModal = () => setShowConfirmModal(false);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h1 className='d-flex justify-content-center'>La liste des Employés</h1>
            <div className="d-flex justify-content-end mt-2 mb-2">
                <Button href="/add" variant="primary">Add+</Button>
            </div>
            <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <Button variant="info" onClick={() => handleView(user)}>View</Button>{' '}
                                <Button variant="warning" onClick={() => handleUpdate(user.id)}>Update</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination className="d-flex justify-content-center">
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Details des Utilisateurs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>First Name:</strong> {selectedUser.firstname}</p>
                    <p><strong>Last Name:</strong> {selectedUser.lastname}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Phone:</strong> {selectedUser.phone}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetailsModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Voulez-vous vraiment supprimer cet utilisateur ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmModal}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UsersTable;
