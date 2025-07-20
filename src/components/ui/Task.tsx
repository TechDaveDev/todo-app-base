'use client';

import { Task as TaskType, TodoList, useTodos } from "@/context/Context";

interface Props {
  task: TaskType;
  list: TodoList
}

const Icon = ({ path, className = 'w-6 h-6' }: { path: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const TrashIcon = () => <Icon path="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z" />;

export const Task = ({ task, list }: Props) => {

  const { deleteTask, toggleTask, updateTaskText } = useTodos();

  return (
    <div key={task.id} className="flex items-center gap-3 group">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(list.id, task.id)}
        className="h-5 w-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
      />
      <input
        type="text"
        value={task.text}
        onChange={(e) => updateTaskText(list.id, task.id, e.target.value)}
        className={`flex-grow bg-transparent focus:outline-none focus:bg-slate-100 rounded-md px-2 py-1 ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}
      />
      <button
        onClick={() => deleteTask(list.id, task.id)}
        className="text-slate-300 hover:text-red-500 transition-colors"
        aria-label="Eliminar tarea"
      >
        <TrashIcon />
      </button>
    </div>
  )
}
