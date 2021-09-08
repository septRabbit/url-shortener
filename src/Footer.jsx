import React from 'react';

function Footer() {
  return (
    <footer className='bg-blue-400 text-white px-6 py-4 mt-4 shadow-top md:fixed bottom-0 relative w-full'>
      <h2 className='text-center'>
        If you like our website, please donate us to upgrade from
        {' '}
        <b>alpha</b>
        {' '}
        to
        {' '}
        <b>beta</b>
      </h2>
      <h2 className='text-center'>Contact Line ID: Alpha </h2>
    </footer>
  );
}

export default Footer;
