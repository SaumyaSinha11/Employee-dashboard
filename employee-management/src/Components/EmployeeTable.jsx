import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Tooltip, Navbar, Alert, Container, Spinner } from 'react-bootstrap';
import useDeleteApi from '../Hooks/useDeleteApi';
import FormEmployee from './FormEmployee';
import { useTheme } from '../ThemeContext';
import { Pen, PersonX } from "react-bootstrap-icons";
import "./styles.css";

export default function EmployeeTable() {

  const {darkMode} = useTheme()

  const [toggle, setToggle] = useState(false)
  const openForm = () => { setToggle(true) }
  const closeForm = () => { setToggle(false) }
  const [loading, setLoading] = useState(false)
  const [empData, setEmpData] = useState([])
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [edit, setEdit] = useState(false)
  const [refetch, setFetch] = useState(false)

  function getData(url) {
    setLoading(true)
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("network error")
        }
        return response.json()
      })
      .then((data) => {
        console.log("fetched data - ", data)
        setEmpData([...data])
      })
      .catch((error) => console.error(error))
    setLoading(false)
  }

  useEffect(() => {
    console.log(refetch)
    getData("http://localhost:8080/employee")
  }, [refetch])

  const handleDelete = async (url) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      setLoading(true)
      try {
        await useDeleteApi(url);
        setFetch((prev) => !prev);
      } catch (error) {
        console.error("Error deleting item:", error);
        setLoading(false)
      }
    } else {
      console.log("Deletion cancelled.");
    }
  };

  const handleUpdate = (employee) => {
    setEdit(true)
    setCurrentEmployee(employee)
  }

  return (
    <>
      <div className="position-relative">
        {loading && (
          <>
            <div
              className="position-absolute top-0 start-0 w-100 h-100 bg-light opacity-50"
              style={{ zIndex: 5 }}
            />
            <Spinner
              variant="primary"
              animation="border"
              className="position-absolute top-50 start-50 translate-middle"
              style={{ zIndex: 10 }}
            />
          </>
        )}

        <Navbar className="custom-bg-dark text-white ms-3 me-3" data-bs-theme ={darkMode ?"light":"dark"}>
          <Container>
            <Navbar.Brand>Employees List</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Button variant="secondary" onClick={openForm}>
                Add New Employee
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Conditional rendering of table or empty message */}
        {empData.length === 0 ? (
          <Alert variant="success" className='ms-3 me-3'>
            <Alert.Heading>No Employee Data Present</Alert.Heading>
          </Alert>
        ) : (
          <Table striped bordered hover className='ms-3 me-3'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {empData.map((item) => (
                <tr key={item.email}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.department}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <OverlayTrigger placement="top" overlay={<Tooltip id="edit-tooltip">Edit</Tooltip>}>
                        <Button
                          variant="outline-warning"
                          className="d-flex align-items-center justify-content-center rounded-circle p-2 me-2 icon-btn"
                          onClick={() => handleUpdate(item)}
                        >
                          <Pen className="text-warning fs-4" />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" overlay={<Tooltip id="delete-tooltip">Delete</Tooltip>}>
                        <Button
                          variant="outline-danger"
                          className="d-flex align-items-center justify-content-center rounded-circle p-2 ms-2 icon-btn"
                          onClick={() => handleDelete(`http://localhost:8080/employee/${item.email}`)}
                        >
                          <PersonX className="text-danger fs-4" />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {edit && (
          <FormEmployee
            closeForm={() => setEdit(false)}
            editForm={true}
            currentEmployee={currentEmployee}
            list={empData}
            setFetch={setFetch}
          />
        )}

        {toggle && (
          <FormEmployee
            closeForm={closeForm}
            editForm={false}
            currentEmployee={null}
            list={empData}
            setFetch={setFetch}
          />
        )}
      </div>
    </>
  );
}

