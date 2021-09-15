import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';

function Button({ children, className }) {
  return (
    <button
      aria-label='button'
      type='submit'
      className={clsx(
        'rounded w-full transform-colors duration-500',
        className,
      )}
    >
      {children}
    </button>
  );
}

function Input({
  id, label, type = 'text', error,
}) {
  const [_value, setValue] = useState('');

  return (
    <div>
      <div className='relative flex flex-col justify-start items-center'>
        <label
          htmlFor={id}
          className='w-full p-2 my-4 flex items-center text-base font-semibold text-gray-700'
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={id}
          className={clsx(
            'w-full p-2 px-3 rounded peer',
            !error ? 'border' : 'border-2 border-red',
          )}
          value={_value}
          onChange={(e) => setValue(e.target.value)}
        />

        {error && (
          <svg
            className='absolute top-12 -right-8 p-9 h-full text-red'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='6' cy='6' r='5' fill='currentColor' />
            <rect x='5' y='3' width='2' height='4.5' rx='1' fill='white' />
            <rect x='5' y='8.5' width='2' height='2' rx='1' fill='white' />
          </svg>
        )}
      </div>

      {error && (
        <div className='flex justify-end mt-1'>
          <strong className='text-xs text-red'>{error}</strong>
        </div>
      )}
    </div>
  );
}

function Expire(data) {
  const date = new Date(+new Date() + 8 * 3600 * 1000).getTime();
  let calculateTime = 0;
  if (data.liveTime !== 'none') {
    calculateTime = date + data.liveTime * 60 * 1000;
    const totalDate = new Date(calculateTime).toISOString();
    return totalDate;
  }
}

function Form() {
  const history = useHistory();

  const [field, setField] = useState({
    id: 'originalURL',
    label: 'Enter the long URL',
    error: false,
    errorMsg: 'URL cannot be empty',
  });

  async function onSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());

    const sendData = { url: data.originalURL };

    if (data.liveTime !== 'none') {
      sendData.expireAt = Expire(data);
    }

    if (data.originalURL.length === 0) {
      setField((field) => ({
        ...field,
        error: true,
      }));
    } else {
      // Send Post request to backend
      try {
        const response = await axios('http://20.89.157.220:5000/api/short', {
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          data: sendData,
        });

        console.log(sendData);
        if (response.status === 200) {
          const short = response.data.shortUrl;
          history.push('/result', { data: short });
        }
      } catch (error) {
        if (error.response) {
          console.log('Error: ', error.response.data);
        } else {
          console.log('Error: ', error.message);
        }
        console.log('Error: ', error);
      }
    }
  }

  return (
    <form className='space-y-8 lg:p-6 bg-white rounded-lg shadow-lg p-4' onSubmit={onSubmit}>
      <Input
        type='url'
        id={field.id}
        label={field.label}
        error={field.error && field.errorMsg}
      />

      <div className='flex justify-between items-center'>
        <label htmlFor='Url-live-time'>
          Url Live Time:
          <select
            className='flex-1 border border-blue-600 rounded ml-4 p-2 text-blue-600'
            name='liveTime'
            id='liveTime'
          >
            <option value='none'>None</option>
            <option value='30'>30 min</option>
            <option value='60'>1 hr</option>
            <option value='240'>4 hrs</option>
            <option value='480'>8 hrs</option>
            <option value='3600'>1 day</option>
            <option value='25200'>7 days</option>
          </select>
        </label>
      </div>

      <Button className='p-2 bg-green shadow-solid text-white active:shadow-none active:bg-green-700 hover:bg-green-600'>
        Make miuURL
      </Button>

      <p className='text-xs text-blue-grayish text-center px-4'>
        By clicking the button, you are agreeing to our
        {' '}
        <a href='/' className='text-red font-bold'>
          Terms and Services and Use of Cookies.
        </a>
      </p>
    </form>
  );
}

export default Form;
