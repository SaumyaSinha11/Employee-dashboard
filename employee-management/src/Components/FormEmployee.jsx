import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Card, FloatingLabel } from 'react-bootstrap';
import { useTheme } from '../ThemeContext';
import usePostApi from '../Hooks/usePostApi';
import useUpdateApi from '../Hooks/useUpdateApi';

export default function FormEmployee({ closeForm, editForm, currentEmployee, list, setFetch }) {

  const { darkMode } = useTheme()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')

  useEffect(() => {
    if (editForm && currentEmployee) {
      setName(currentEmployee.name);
      setEmail(currentEmployee.email);
      setDepartment(currentEmployee.department);
    }
  }, [editForm, currentEmployee]);

  const isValidName = (name) => {
    if (name.length === 0) {
      alert("Name cannot be null");
      return false;
    }
    if (!(/^[\x41-\x7A\u00C0-\uD7FB\ \']+([\-])*[.]{0,1}$/.test(name))) {
      alert("Invalid characters in name");
      return false;
    }
    if (name.length > 50) {
      alert("Max 50 characters allowed in name");
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    if (email.length === 0) {
      alert("Email cannot be null");
      return false;
    }
    if (email.length > 50) {
      alert("Email cannot exceed 50 characters");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Invalid email format");
      return false;
    }
    return true;
  };

  const emailExists = (email) => {
    return list.some((employee) => employee.email === email);
  };

  const addEmployee = async () => {
    if (isValidEmail(email) && isValidName(name)) {
      if (emailExists(email)) {
        alert("This email id already exist.");
        return;
      }
      const newEmployee = {
        name: name,
        email: email,
        department: department,
      }
      await usePostApi(newEmployee, 'http://localhost:8080/employee')
      setFetch((prev) => !prev)
      closeForm()
    }
  }

  const updateEmployee = async () => {
    if (isValidEmail(email) && isValidName(name)) {
      const updatedEmployee = { name, email, department };
      await useUpdateApi(`http://localhost:8080/employee/${currentEmployee.email}`, updatedEmployee)
      setFetch((prev) => !prev)
      closeForm();
    }
  };

  return (

    <Container className="mt-4 position-absolute" data-bs-theme ={darkMode ?"dark":"lighr"}>
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="shadow-lg p-3 rounded">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Employee Name" className='mb-3'>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value.trim())}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel label="Employee Email">
                    {(!editForm) ? (<Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      required
                    />) : (<Form.Control
                      type="email"
                      value={email}
                      disabled={true}
                    />)}
                  </FloatingLabel>
                </Form.Group>
                <FloatingLabel label="Department">
                  <Form.Select className="mb-3" onChange={(e) => setDepartment(e.target.value)} value={department}>
                    <option value="" disabled></option>
                    <option value="Manufacture">Manufacture</option>
                    <option value="Customer Success">Customer Success</option>
                    <option value="Management">Management</option>
                    <option value="" disabled></option>
                  </Form.Select>
                </FloatingLabel>

                <div className="d-grid gap-2">

                  {editForm ? (
                    <Button variant="warning" onClick={updateEmployee}>Update</Button>
                  ) : (
                    <Button variant="success" onClick={addEmployee}>Add</Button>
                  )}
                  <Button variant="secondary" onClick={closeForm}>Close</Button>
                  {/* {(email.length === 0 || name.length === 0) && (
                    <p className="text-danger">Email or name can't be null</p>
                  )} */}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
