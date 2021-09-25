import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import { Icon } from './Icon';

export function Toast({ type }) {
  return createPortal(
    <div
      className={clsx(
        'relative',
        'flex items-center gap-4 py-2 px-4 rounded  border-2',
        'w-full md:w-auto',
        'transition-all duration-100 animate-moveDown',
        type === 'success' && 'bg-white border-green text-green',
      )}
    >
      <span className='w-8'>
        {' '}
        {type === 'success' && <Icon.Success />}
      </span>
      <p>URL is copied!!</p>
    </div>,
    document.getElementById('notice'),
  );
}

const Context = createContext(undefined);

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const setMessage = useCallback(
    (message) => {
      if (!message) return;

      console.log(message);
      const id = uuid();

      setMessages((queue) => [...queue, { id, message }]);

      setTimeout(() => {
        setMessages((queue) => queue.filter((pair) => pair.id !== id));
      }, 2000);
    },
    [setMessages],
  );

  return (
    <Context.Provider value={setMessage}>
      {children}

      {messages.map(({ id }) => (
        <Toast type='success' key={id} />
      ))}
    </Context.Provider>
  );
}

export function useToast() {
  const context = useContext(Context);

  if (!context) throw new Error('useToast should be use within ToastProvider');

  return context;
}
