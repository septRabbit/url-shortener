import React from 'react';
import Form from './components/Form';

function Home() {
  return (
    <main className='grid max-w-screen-xl gap-5 px-6 mx-auto md:px-20 lg:grid-cols-2 place-content-center md:gap-20'>
      <section className='my-auto space-y-8 text-center text-blue-500 lg:text-left lg:space-y-8'>
        <h1 className='text-2xl font-bold lg:text-4xl'>Best URL Shortener</h1>

        <p className='text-lg fonot-semibold'>Easy Link Shortening</p>
      </section>

      <section className='space-y-5'>
        <p className='px-12 text-2xl font-semibold text-center text-white'>
          Try It for Free!!
        </p>
        <Form />
      </section>
    </main>
  );
}

export default Home;
