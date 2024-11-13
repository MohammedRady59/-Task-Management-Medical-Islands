import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line react/prop-types
function Home({ socket }) {
  const [lgShow, setLgShow] = useState(false);
  const [todoData, setTodoData] = useState({
    todo: "",
    dueDate: "",
    completed: false,
    userId: 5,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodoData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // eslint-disable-next-line react/prop-types
    socket.emit("addTodo", {
      id: uuidv4(),
      ...todoData,
    });

    setTodoData({
      todo: "",
      dueDate: "",
      completed: false,
      userId: 1,
    });
    setLgShow(false);
  };

  return (
    <>
      <Button onClick={() => setLgShow(true)}>Add Todo</Button>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add New Todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="todo"
                value={todoData.todo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={todoData.dueDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Complete"
                name="completed"
                checked={todoData.completed}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add New
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Home;
