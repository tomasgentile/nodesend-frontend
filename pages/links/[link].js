import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import axiosClient from "../../config/axios";
import AppContext from "../../context/AppContext";
import Alert from "../../components/Alert";

export async function getServerSideProps({ params }) {
  const { link } = params;
  const response = await axiosClient(`/api/links/${link}`);

  return {
    props: {
      link: response.data
    }
  }
}

export async function getSererSidePaths() {
  const links = await axiosClient('/api/links');
  return {
    paths: links.data.links.map(link => ({
      params: { link: link.url }
    })),
    fallback: false
  }
}

const LinkPage = ({ link }) => {
  const { showAlert, msg_file } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [withPassword, setWithPassword] = useState(link.password);

  const verifyPassword = async e => {
    e.preventDefault();
    const data = { password };

    try {
      const response = await axiosClient.post(`/api/links/${link.link}`, data);
      setWithPassword(response.data.password);
      link.file = response.data.file;
    } catch (error) {
      showAlert(error.response.data.msg);
    }
  }

  return (
    <Layout>
      {withPassword ? (
        <>
          <p className="text-center">Este enlance esta protegido con un password, colocalo a continuación</p>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              {msg_file && <Alert />}
              <form
                onSubmit={e => verifyPassword(e)}
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="password"
                  >Password</label>
                  <input
                    type='password'
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='password'
                    placeholder='Password del Enlace'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type='submit'
                  className='bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-2'
                  value='Validar Password'
                />

              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
          <div className="flex items-center justify-center  mt-10">
            <a
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/${link.file}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">Aquí</a>
          </div>
        </>
      )}

    </Layout>
  )
}

export default LinkPage;
