import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import AuthContext from '../context/AuthContext';
import AppContext from '../context/AppContext';
import Layout from '../components/Layout';
import Alert from '../components/Alert';

export default function Home() {
  const { userAuth } = useContext(AuthContext);
  const { msg_file, url } = useContext(AppContext);

  // Get user from localstorage
  useEffect(() => {
    const token = localStorage.getItem('nodesend_token');
    if(token) {
      userAuth();
    }
  }, [userAuth]);

  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        {url ? (
          <>
            <p className='text-center text-2xl'>
              <span className='font-bold text-red-700 text-3xl mr-2'>Tu URL es:</span>
              {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/links/${url}`}
            </p>
            <button
              type='button'
              className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10'
              onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/links/${url}`)}
            >Copiar Enlace</button>
          </>

        ) : (
          <>
            {msg_file && <Alert>{msg_file}</Alert>}

            <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
              <Dropzone />
              <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
                <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>
                  Compartir archivos de forma senscilla y privada</h2>
                <p className='text-lg leading-loose mb-4'>
                  <span className='text-red-500 font-bold'> ReactNodeSend </span>
                  te permite compartir archivos con cifrado de extremo a extremo</p>
                <Link href='/Signup'>
                  <a className='text-red-500 font-bold text-lg hover:text-red-700'>Crea una cuenta para mayores beneficios</a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
