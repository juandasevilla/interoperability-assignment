import { useState, useEffect } from 'react';
import { Form, Button, Table, Container, Modal, Badge } from "react-bootstrap";
import './App.css';
import superstoreimg from './superstore.png';

export const App = () => {
  const [categories, setCategories] = useState([]);

  // Create modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const getCategories = () => {
    fetch("http://localhost:4000/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/categories/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then(() => {
        setName("");
        setDescription("");
        setShowCreateModal(false);
        getCategories();
      })
      .catch((error) => console.error(error));
  };

  // TODO: tu compañero debe implementar esta función usando el servicio categories/<pk>/
  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditDescription(category.description);
    setShowEditModal(true);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/categories/${editingCategory.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, description: editDescription }),
    })
      .then((response) => response.json())
      .then(() => {
        setShowEditModal(false);
        setEditingCategory(null);
        getCategories();
      })
      .catch((error) => console.error(error));
  };

  const confirmDelete = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    fetch(`http://localhost:4000/categories/${categoryToDelete.id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
        //getCategories();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container className="mt-4">
      <img src={superstoreimg} alt="Super Store" className="imagen mb-4" />

      {/* Header */}
      <div className="page-header">
        <h3>Categories</h3>
        <Button className="btn-create" onClick={() => setShowCreateModal(true)}>
          + Create Category
        </Button>
      </div>

      {/* Categories Table */}
      <div className="table-wrapper">
      <Table striped hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-muted py-4">
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id}>
                <td><Badge bg="secondary">{category.id}</Badge></td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td className="text-center">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => confirmDelete(category)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      </div>

      {/* Create Category Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="createCategoryForm" onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="createCategoryForm">
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Category Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="editCategoryForm" onSubmit={handleEditSubmit}>
            <Form.Group controlId="editFormName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </Form.Group>
            <Form.Group controlId="editFormDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Enter description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" type="submit" form="editCategoryForm">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the category{" "}
          <strong>{categoryToDelete?.name}</strong>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};