import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../../types/model';
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.css';

interface Props {
    type: string;
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ type, index, todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, todo: editTodo } : todo
            )
        );
        setEdit(false);
        localStorage.setItem(type, JSON.stringify(todos));
    };
    const handleDelete = (id: number) => {
        let newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem(type, JSON.stringify(newTodos));
    };
    const handleDone = (id: number) => {
        let newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        );
        let complete = JSON.parse(localStorage.getItem('completedTodos') || '[]');
        let add = newTodos[index];
        newTodos.splice(index, 1);
        complete.splice(index, 0, add);
        setTodos(newTodos);
        localStorage.setItem(type, JSON.stringify(newTodos));
        localStorage.setItem('completedTodos', JSON.stringify(complete));
    };
    

    
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])
    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form className={`${styles.todos__single} ${snapshot.isDragging ? styles.drag : ""}`}
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    {
                        edit ? (
                            <input
                                value={editTodo}
                                onChange={(e) => setEditTodo(e.target.value)}
                                className={`${styles.todos__single_text}`}
                                ref={inputRef}
                            />
                        ) : todo.isDone ? (
                            <s className={`${styles.todos__single_text}`}>{todo.todo}</s>
                        ) : (
                            <span className={`${styles.todos__single_text}`}>{todo.todo}</span>
                        )
                    }
                    {
                        type === 'todos' ? (
                            <div>
                                <span className={`${styles.icon}`} onClick={() => {
                                    if (!edit && !todo.isDone) {
                                        setEdit(!edit)
                                    }
                                }
                                }>
                                    <FaEdit />
                                </span>
                                <span className={`${styles.icon}`} onClick={() => handleDelete(todo.id)}>
                                    <MdDelete />
                                </span>
                                <span className={`${styles.icon}`} onClick={() => handleDone(todo.id)}>
                                    <MdDone />
                                </span>
                            </div>
                        ) : (
                            <div>
                                <span className={`${styles.icon}`} onClick={() => handleDelete(todo.id)}>
                                    <MdDelete />
                                </span>
                            </div>
                        )
                    }
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo