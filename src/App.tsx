import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/inputField/InputField';
import { Todo } from './types/model';
import TodoList from './components/todoList/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'))
  const [completedTodos, setCompletedTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('completedTodos') || '[]'))

  useEffect(() => {
    let complete = JSON.parse(localStorage.getItem('completedTodos') || '[]');
    setCompletedTodos(complete);
  }, [todos])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || (destination.droppableId === source.droppableId && destination.index == source.index)) return;
    console.log(result)
    let add, active = todos, complete = completedTodos;
    if (source.droppableId === 'TodoListTodo') {
      add = active[source.index];
      active.splice(source.index, 1);
      if (destination.droppableId === 'TodoListCompleted') {
        complete.splice(destination.index, 0, add);
        complete = complete.map((todo, idx) =>
          idx == destination.index ? { ...todo, isDone: !todo.isDone } : todo
        );
      } else {
        active.splice(destination.index, 0, add);
      }
    } else if (source.droppableId === 'TodoListCompleted' && destination.droppableId === 'TodoListCompleted') {
      add = complete[source.index];
      complete.splice(source.index, 1);
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);

    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    localStorage.setItem('todos', JSON.stringify(todos));

  }

  return (
    
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='App'>
          <span className="heading">TaskJourney</span>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
        </div>
      </DragDropContext>
  )
}

export default App
