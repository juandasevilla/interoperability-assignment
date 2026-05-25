import { useState, useEffect } from 'react';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import './App.css';
import superstoreimg from './superstore.png';

export const App = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  // Obtener categorías
  const getCategories = () => {
    fetch("http://localhost:4000/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  };

  // Cargar categorías al iniciar
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
      .then((data) => {
        console.log(data);

        // Limpiar formulario
        setName("");
        setDescription("");

        // Recargar tabla
        getCategories();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container className="mt-4">
      <img src={superstoreimg} alt="Super Store" className="imagen mb-4" />

      <Row>
        {/* FORMULARIO */}
        <Col md={5}>
          <h3>Create Category</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
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

            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>

        {/* TABLA */}
        <Col md={7}>
          <h3>Categories</h3>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};