'use client';

import { useState } from "react";
import { TodoList, useTodos } from "@/context/Context";
import { Task } from "./Task";

interface Props {
  list: TodoList;
}

const Icon = ({ path, className = 'w-6 h-6' }: { path: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const TrashIcon = () => <Icon path="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z" />;

export const List = ({ list }: Props) => {

  const { updateListTitle, deleteList, addTask } = useTodos();

  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    addTask(list.id, newTaskText);

    setNewTaskText('');
  };

  return (
    <div key={list.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={list.title}
          onChange={e => updateListTitle(list.id, e.target.value)}
          className="text-2xl font-bold text-slate-800 bg-transparent w-full focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md -ml-2 px-2 py-1"
          aria-label="Título de la lista"
        />
        <button
          onClick={() => deleteList(list.id)}
          className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full -mr-2"
          aria-label="Eliminar lista"
        >
          <TrashIcon />
        </button>
      </div>

      <div className="flex-grow space-y-3 mb-4 pr-2 -mr-2 overflow-y-auto" style={{ maxHeight: '300px' }}>
        {list.tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            list={list}
          />
        ))}
        {list.tasks.length === 0 && (
          <p className="text-slate-400 text-center py-4">No hay tareas aún.</p>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-200">
        <form
          className="flex gap-2"
          onSubmit={handleAddTask}
        >
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Añadir nueva tarea..."
            className="flex-grow border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            disabled={!newTaskText.trim()}
          >
            Añadir
          </button>
        </form>
      </div>
    </div>
  )
}
