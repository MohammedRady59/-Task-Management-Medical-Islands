/* eslint-disable react/prop-types */
import { Pencil } from "lucide-react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/feature/Todo/Todo";
import toast from "react-hot-toast";

function UpdateComplete({
  complete,
  myId,
  initialTodoText,
  socket,
  dummy,
  initialDate,
}) {
  const [yourCheck, setCheck] = useState(complete);
  const [smShow, setSmShow] = useState(false);
  const [todoText, setTodoText] = useState(initialTodoText);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const dispach = useDispatch();
  const handleChange = () => {
    setCheck(!yourCheck);
  };

  const handleTextChange = (e) => {
    setTodoText(e.target.value);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleUpdate = () => {
    if (dummy == "dummy") {
      dispach(updateTodo({ id: myId, completed: yourCheck, todo: todoText }));
      setSmShow(false);
    }
    if (dummy == "no") {
      // eslint-disable-next-line react/prop-types
      socket.emit("updateTodo", {
        id: myId,
        completed: yourCheck,
        todo: todoText,
        dueDate: initialDate,
      });
      toast.success("Todo Update Successfully", {
        position: "bottom-center",
        duration: 1500,
        style: {
          backgroundColor: "green",
          color: "white",
          width: "fit-content",
        },
      });
      setSmShow(false);
    }
  };

  return (
    <div>
      <Button
        variant="success"
        onClick={() => setSmShow(true)}
        className="me-2"
      >
        <Pencil />
      </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Edit Status Todo {myId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="todoText">Todo Text</label>
            <input
              id="todoText"
              type="text"
              className="form-control mb-2"
              value={todoText}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <label htmlFor="todoDate">Due Date</label>
            <input
              id="todoDate"
              type="date"
              className="form-control mb-2"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="d-flex align-items-center">
            <h6> {complete ? "Completed" : "Uncompleted"}</h6>

            <input
              type="checkbox"
              className="ms-2"
              checked={yourCheck}
              onChange={handleChange}
            />
          </div>
          <Button className="mt-2" onClick={handleUpdate}>
            Update Status
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateComplete;
