import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {addTodo,toggleTodo,removeTodo} from './redux/TodoSlice'

const Todo = () => {
    const [text, setText] = useState("");
    const [editId,setEditId] = useState(null)
    const todos = useSelector((state) => state.todos)
    const dispatch = useDispatch();
    useEffect(()=>{
        const saveTodos = JSON.parse(localStorage.getItem("todos")) || [];
        if(saveTodos.length > 0){
            saveTodos.foreach((todo)=>{
                dispatch({
                    type:"todos/loadFromStorage",
                    payload: todo,
                })
            })
        }

    },[dispatch])


    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos))

    },[todos])

    const handelAddTodo = () =>{
        if(editId.trim()){
            if(editId){
                dispatch(editId());
                dispatch(addTodo(`${text} (Modify)`));
                setEditId(null)
            } else{
                dispatch(addTodo(text))
                setText("")
            }
        } 
    }

    const handelEditTodo = (todo) =>{
        setText(todo.text)
        setEditId(todo.id)
    }

    return (
        <div>
            dfdd
        </div>
    );
};

export default Todo;