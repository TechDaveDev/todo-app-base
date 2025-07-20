'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  title: string;
  tasks: Task[];
}

interface TodoContextType {
  lists: TodoList[];
  createList: () => void;
  deleteList: (listId: string) => void;
  updateListTitle: (listId: string, newTitle: string) => void;
  addTask: (listId: string, taskText: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
  toggleTask: (listId: string, taskId: string) => void;
  updateTaskText: (listId: string, taskId: string, newText: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {

  const [lists, setLists] = useState<TodoList[]>([]);

  useEffect(() => {
    try {
      const storedLists = localStorage.getItem('todoLists');
      if (storedLists) {
        setLists(JSON.parse(storedLists));
      } else {
        setLists([
          {
            id: crypto.randomUUID(),
            title: 'Lista de Ejemplo',
            tasks: [
              { id: crypto.randomUUID(), text: 'Aprender SSR con Next.js', completed: true },
              { id: crypto.randomUUID(), text: 'Solucionar problema de params con páginas slug en Next.js', completed: true },
              { id: crypto.randomUUID(), text: 'Desplegar Todo App en vercel', completed: false },
            ],
          },
        ]);
      }
    } catch (error) {
      console.error("Error al cargar datos desde localStorage:", error);
      setLists([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todoLists', JSON.stringify(lists));
    } catch (error) {
      console.error("Error al guardar datos en localStorage:", error);
    }
  }, [lists]);

  const createList = () => {
    const newList: TodoList = {
      id: crypto.randomUUID(),
      title: 'Nueva Lista',
      tasks: [],
    };
    setLists(prevLists => [...prevLists, newList]);
  };

  const deleteList = (listId: string) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
  };

  const updateListTitle = (listId: string, newTitle: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? { ...list, title: newTitle } : list
      )
    );
  };

  const addTask = (listId: string, taskText: string) => {
    if (!taskText.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: taskText,
      completed: false,
    };
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
      )
    );
  };

  const toggleTask = (listId: string, taskId: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          }
          : list
      )
    );
  };

  const deleteTask = (listId: string, taskId: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );
  };

  const updateTaskText = (listId: string, taskId: string, newText: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, text: newText } : task
            ),
          }
          : list
      )
    );
  };

  const value = {
    lists,
    createList,
    deleteList,
    updateListTitle,
    addTask,
    deleteTask,
    toggleTask,
    updateTaskText,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos debe ser usado dentro de un TodoProvider');
  }
  return context;
};