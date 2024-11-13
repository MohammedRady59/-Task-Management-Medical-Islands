import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import TableTodo from "./components/TableTodo";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

const socket = io("http://localhost:3001");

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    socket.on("todosUpdated", (updatedTodos) => {
      setTodos(updatedTodos);
    });

    return () => {
      socket.off("todosUpdated");
    };
  }, []);

  return (
    <Container className="mt-3">
      <Home socket={socket} />
      <TableTodo todos={todos} socket={socket} />
    </Container>
  );
}

export default App;
