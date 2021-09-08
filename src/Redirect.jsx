import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

function Redirect() {
  const { hash } = useParams();
  useEffect(async () => {
    try {
      const response = await axios(
        `http://20.89.157.220:5000/api/short/${hash}`,
        {
          headers: { 'content-type': 'application/json' },
          method: 'GET',
        },
      );

      if (response.status === 200) {
        const originalURL = response.data.url;
        window.location.href = originalURL;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log('Error', error.message);
      }
      console.log(error);
    }
  }, []);

  return (
    <div className='flex flex-col text-center justify-center items-cemter pt-20'>
      <h1 className='my-10 ml-10 text-white text-4xl'>Redirecting...</h1>
      <img className='w-60 mx-auto' src='/src/powered-by-vitawind-dark.png' alt='redirecting' />
    </div>
  );
}

export default Redirect;
