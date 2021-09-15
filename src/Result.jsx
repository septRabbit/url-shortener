import React, { useRef } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { QRCode } from 'react-qr-svg';
import clsx from 'clsx';
import { useToast } from './components/Toast';

/* global ClipboardItem */
function copyToClipboard(text) {
  const type = 'text/plain';
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  return navigator.clipboard.write(data);
}

function Result() {
  const location = useLocation();
  const history = useHistory();
  const shortURL = `${window.location.origin}/${location.state.data}`;
  const setToast = useToast();
  const myInput = useRef(null);

  const onClick = () => {
    if (!myInput.current) return;
    myInput.current.select();
    copyToClipboard(shortURL);
    setToast('Copy To Clipboard');
  };

  return (
    <div>
      <main
        className={clsx(
          'px-6 md:px-20 grid  max-w-screen-xl mx-auto',
          'lg:grid-cols-2 place-content-center gap-10 md:gap-20',
        )}
      >
        <section
          className={clsx(
            ' my-auto text-center  space-y-8 lg:space-y-8',
            'text-blue-500 lg:text-left',
          )}
        >
          <h1 className='text-2xl lg:text-4xl font-bold'>Best URL Shortening WebApp</h1>
          <p className='text-base'> Easy Link Shortening</p>
        </section>

        <section className='space-y-8 flex flex-col justify-center items-center md:mx-1'>
          <div className='flex flex-row items-center'>
            <input
              readOnly
              className='border border-blue-400 w-80 px-3 py-2 rounded-lg text-gray-600 bg-white'
              value={shortURL}
              ref={myInput}
            />

            <button type='button' onClick={onClick} className='ml-2 bg-white py-1.5 px-3 rounded-lg'>
              <i className='far fa-copy text-xl text-gray-700' />
            </button>
          </div>

          <QRCode
            className='border-2 border-blue-300 p-2 rounded-md'
            bgColor='#FFFFFF'
            fgColor='#000000'
            level='Q'
            style={{ width: 220 }}
            value={shortURL}
          />
          <button
            type='button'
            onClick={() => history.push('/')}
            className='border-2 border-blue-400 text-blue-400 p-2 rounded-xl'
          >
            Shorten a new URL
          </button>
        </section>
      </main>
    </div>
  );
}

export default Result;
