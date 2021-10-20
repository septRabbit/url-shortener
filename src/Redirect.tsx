import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import { Icon } from './components/Icon';

const Redirect: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const history = useHistory<string>();
  const [err, setErr] = useState(false);

  const getHash = async () => {
    try {
      const response = await axios(
        `https://miu.services/backend/api/short/${hash}`,
        // `http://localhost:5000/api/short/${hash}`,
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
      if (axios.isAxiosError(error)) {
        setErr(true);
        history.push('/404');
      }
    }
  };

  useEffect(() => {
    getHash();
  }, []);

  return (
    <>
      {!err ? (
        <div className='flex flex-col justify-center pt-12 text-center items-cemter'>
          <h1 className='my-10 ml-10 text-4xl text-white'>Redirecting...</h1>
          <img className='mx-auto w-60' src='/src/powered-by-vitawind-dark.png' alt='redirecting' />
        </div>
      ) : (
        <div className='flex flex-col justify-center px-6 pt-12 text-center items-cemter'>
          {/* <h1 className='mx-auto my-10 text-4xl text-white'>404</h1> */}
          <Icon.Notfound className='text-blue-400 h-96' />
          <button className='p-3 mx-auto my-10 text-xl text-blue-400 border-2 border-blue-400 rounded-xl' type='button' onClick={() => history.push('/')}>Back to Home</button>
        </div>
      )}
    </>
  );
};

export default Redirect;
