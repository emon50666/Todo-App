import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from "./redux/todoSlice";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";

const TodoApp = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (savedTodos.length > 0) {
      savedTodos.forEach((todo) => {
        dispatch({
          type: "todos/loadFromStorage",
          payload: todo,
        });
      });
    }
  }, [dispatch]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    console.log("Saving to localStorage:", todos); // Debug log
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  

  const handleAddTodo = () => {
    if (text.trim()) {
      if (editId) {
        dispatch(removeTodo(editId));
        dispatch(addTodo(`${text} (Modified)`));
        setEditId(null); // Clear the edit state
      } else {
        dispatch(addTodo(text));
      }
      setText(""); // Clear input field
    }
  };

  const handleEditTodo = (todo) => {
    setText(todo.text);
    setEditId(todo.id);
  };

  return (
    <>
      <div className="min-h-screen bg-black/10 flex flex-col items-center py-10">
        <h1 className="text-2xl lg:text-4xl font-bold mb-6 font-mono">Personal Todo App</h1>

        <div className="w-11/12  lg:max-w-[430px] mb-6">
          <div className="flex items-center">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write today's work"
              className="flex-grow px-4 py-2 bg-gray-50 rounded-l-md focus:outline-none focus:bg-blue-50 text-green-700 font-semibold"
            />
            <button
              className="px-4 py-2 bg-blue-800   lg:text-md lg:font-semibold text-white rounded-r-md hover:bg-blue-600"
              onClick={handleAddTodo}
            >
              {editId ? "Edit Todo" : "Add"}
            </button>
          </div>
        </div>

        {/* Conditionally show the <ul> if todos.length > 1 */}
        {todos.length > 0 && (
          <ul className="w-11/12 shadow-md rounded-md p-5 space-y-4 max-w-lg">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex justify-between items-center p-3 rounded-lg shadow-sm ${
                  todo.completed ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <div
                  className={`flex flex-col cursor-pointer ${
                    todo.completed
                      ? "line-through text-green-500"
                      : "text-gray-800"
                  }`}
                  onClick={() => dispatch(toggleTodo(todo.id))}
                >
                  <span>{todo.text}</span>
                  <span>{new Date(todo.id).toLocaleString()}</span>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditTodo(todo)}
                    className="text-xl text-green-600"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-2xl text-red-700"
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TodoApp;
