import React from 'react'
import { Todo } from '../../types/model';
import SingleTodo from '../singleTodo/SingleTodo';
import { StrictModeDroppable } from '../strictModeDroppable/StrictModeDroppable';
import styles from './styles.module.css';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
    return (
        <div className={styles.container}>
            <StrictModeDroppable droppableId='TodoListTodo'>
                {
                    (provided, snapshot) => (
                        <div className={`${styles.todos} ${snapshot.isDraggingOver ? styles.dragactive : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className={`${styles.todos__heading}`}>Active Tasks</span>
                            {
                                todos.map((todo, index) => (
                                    <SingleTodo type='todos' index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </StrictModeDroppable>
            <StrictModeDroppable droppableId='TodoListCompleted'>
                {
                    (provided, snapshot) => (
                        <div className={`${styles.todos} ${styles.remove} ${snapshot.isDraggingOver ? styles.dragcomplete : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                            <span className={`${styles.todos__heading}`}>Completed Tasks</span>
                            {
                                completedTodos.map((todo, index) => (
                                    <SingleTodo type='completedTodos' index={index} todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos} />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </StrictModeDroppable>
        </div>
    )
}

export default TodoList