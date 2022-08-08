import React, { useContext, useState } from "react"
import AppContext from "../context/AppContext";

const Form = () => {
    const [passwordOn, setPasswordOn] = useState(false);
    const { addPassword, addDownloads } = useContext(AppContext);

    return (
        <form className='w-full mt-20'>
            <div>
                <label htmlFor='downloads' className='text-gray-800'>Eliminar tras:</label>
                <select
                    id='downloads'
                    className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px4 pr-8 rounded leading-none focus:border-gray-500'
                    onChange={e => addDownloads(e.target.value)}
                    >
                    <option value='' disabled>-- Seleccione --</option>
                    <option value='1'>1 Descarga</option>
                    <option value='5'>5 Descargas</option>
                    <option value='10'>10 Descargas</option>
                    <option value='20'>20 Descargas</option>
                </select>
            </div>
            <div className='mt-4'>
                <div className='flex items-center'>
                    <label htmlFor='downloads' className='text-gray-800 mr-2'>Proteger con contraseña</label>
                    <input
                        type='checkbox'
                        onChange={() => setPasswordOn(!passwordOn)}
                    />
                </div>
                {passwordOn &&
                    <input
                        type='password'
                        className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px4 pr-8 rounded leading-none focus:border-gray-500'
                        onChange={e => addPassword(e.target.value)}
                    />
                }
            </div>
        </form>
    )
}

export default Form
