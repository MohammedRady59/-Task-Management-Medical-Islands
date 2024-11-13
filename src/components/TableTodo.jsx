import { Trash2 } from "lucide-react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import UpdateComplete from "./UpdateComplete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTodo, getTodos } from "../redux/feature/Todo/Todo";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
function TableTodo({ todos, socket }) {
  const { todos: todoDummy } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    // eslint-disable-next-line react/prop-types
    socket.emit("deleteTodo", id);
    toast.error("Todo Delete Successfully", {
      position: "bottom-center",
      duration: 1500,
      style: {
        backgroundColor: "red",
        color: "white",
        width: "fit-content",
      },
    });
  };
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className="mt-5">
      <h2 className="text-center">List of Todos</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {/*eslint-disable-next-line react/prop-types*/}
          {todos.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No Todos Yet
              </td>
            </tr>
          ) : (
            // eslint-disable-next-line react/prop-types
            todos.map((el, idx) => (
              <tr key={idx}>
                <td>{el.id}</td>
                <td>{el.todo}</td>
                <td>{el.dueDate}</td>
                <td>{el.completed ? "Complete" : "Uncomplete"}</td>
                <td>
                  <div className="d-flex align-items-center gap-4 justify-content-center">
                    <UpdateComplete
                      complete={el.completed}
                      myId={el.id}
                      initialTodoText={el.todo}
                      socket={socket}
                      dummy={"no"}
                      initialDate={el.dueDate}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(el.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
          {todoDummy.map((el, idx) => (
            <tr key={idx}>
              <td>{el.id}</td>
              <td>{el.todo}</td>
              <td>{el.dueDate ? el.dueDate : "2024-11-01"}</td>
              <td>{el.completed ? "Complete" : "Uncomplete"}</td>
              <td>
                <div className="d-flex align-items-center gap-4 justify-content-center">
                  <UpdateComplete
                    complete={el.completed}
                    myId={el.id}
                    initialTodoText={el.todo}
                    dummy={"dummy"}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      dispatch(deleteTodo(el.id));
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableTodo;
