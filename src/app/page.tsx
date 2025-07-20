'use client';

import { List } from '@/components/ui/List';
import { useTodos } from '@/context/Context';

const Icon = ({ path, className = 'w-6 h-6' }: { path: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const PlusIcon = () => <Icon path="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />;

export default function Home() {

  const { lists, createList } = useTodos();

  return (
    <>
      <header className="w-full text-center my-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Todo App</h1>
        <p className="text-slate-500 mt-2">Agrega tareas por listas</p>
      </header>
      <div className="bg-slate-50 font-sans text-slate-800">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">

          <div className="flex justify-center mb-8">
            <button
              onClick={createList}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
              <PlusIcon />
              Nueva Lista
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lists.map(list => (
              <List
                key={list.id}
                list={list}
              />
            ))}
          </div>

          {lists.length === 0 && (
            <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-slate-700">¡Empieza a agregar listas!</h2>
              <p className="text-slate-500 mt-2">Actualimente no tienes ninguna lista. <br />Crea una para organizar tus tareas.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
