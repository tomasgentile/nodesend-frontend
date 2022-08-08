import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { resetApp } = useContext(AppContext);

  const router = useRouter();

  const redirect = () => {
    resetApp();
    router.push('/');
  }

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <img
        onClick={() => redirect()}
        className='w-64 mb-8 md:mb-0 cursor-pointer'
        src='/logo.svg'
      />
      <div>
        {user ? (
          <div className='flex items-center'>
            <p className='mr-4'>Nombre de usuario:
              <span className='font-bold ml-2'>{user.name}</span>
            </p>
            <button
              type='button'
              className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'
              onClick={() => logout()}
            >Cerrar Sesión</button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2'>
                Iniciar Sesión</a>
            </Link>
            <Link href="/singup">
              <a className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>
                Crear Cuenta</a>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header