import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from './components/Form';
import Card from './components/Card';

function clsx(...className) {
  return className.filter(Boolean).join(' ');
}

function Home() {
  return (
    <main className="px-6 md:px-20 grid lg:grid-cols-2 place-content-center gap-5 md:gap-20 max-w-screen-xl mx-auto">
      <section className="text-blue-500 my-auto text-center lg:text-left space-y-8 lg:space-y-8">
        <h1 className="text-2xl lg:text-4xl font-bold">Best URL Shortener</h1>

        <p className="text-lg fonot-semibold"> Easy Link Shortening</p>
      </section>

      <section className="space-y-5">
        <p className="text-white text-center font-semibold text-2xl px-12">
          Try It for Free!!
        </p>

        <Card>
          <Form />
        </Card>
      </section>
    </main>
  );
}

export default Home;
