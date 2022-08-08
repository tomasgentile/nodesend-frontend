import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import AppContext from '../context/AppContext';
import AuthContext from '../context/AuthContext';
import Form from './Form';

const Dropzone = () => {
    const { showAlert, uploadFiles, loading, createLink } = useContext(AppContext);
    const { auth } = useContext(AuthContext);

    const onDropRejected = () => {
        showAlert('No se pudo subir el archivo correctamente, el líimite es 1MB, crear una cuenta gratis para subir archivos más grandes');
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        // FormData Object
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        const filename = acceptedFiles[0].path;
        uploadFiles(formData, filename);
    }, [uploadFiles]);

    // Extract dropzone content
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

    const fileslist = acceptedFiles.map(file => (
        <li
            key={file.lastModified}
            className='bg-white flex-1 p-3 mb-4 shadow-lg rounded'
        >
            <p className='font-bold text-xl'>{file.path}</p>
            <p className='text-sm text-gray-500'>{(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
    ));

    return (
        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4'>
            {acceptedFiles.length > 0 ? (
                <div className='w-full'>
                    <h4 className='text-2xl  font-bold text-center mb-4'>Archivos</h4>
                    <ul>
                        {fileslist}
                    </ul>
                    {auth ? <Form /> : 'Inicia Sesión para más opciones'}
                    {loading ? (
                        <p className='my-10 text-center text-gray-600'>Subiendo archivo...</p>
                    ) : (
                        <button
                            type='button'
                            className='bg-blue-700 w-full py-3 rounded-lg text-white my-10'
                            onClick={() => createLink()}
                        >Crear enlace</button>
                    )}

                </div>
            ) : (
                <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
                    <input className='h-100' {...getInputProps()} />
                    {isDragActive ?
                        <p className='text-2xl text-center text-gray-600'>
                            Suelta el archivo
                        </p> : (
                            <div className='text-center'>
                                <p className='text-2xl text-center text-gray-600'>Selecciona un archivo y arrastralo aquí</p>
                                <button
                                    className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'
                                    type='button'
                                >Selecciona archivos para subir</button>
                            </div>
                        )}
                </div>
            )
            }
        </div >
    )
}

export default Dropzone;
