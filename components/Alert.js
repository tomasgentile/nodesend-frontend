import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AppContext from "../context/AppContext";

const Alert = () => {
    const { message } = useContext(AuthContext);
    const { msg_file } = useContext(AppContext);

    return (
        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-l text-center text-white mx-auto">
            {message || msg_file}
        </div>
    )
}

export default Alert;
