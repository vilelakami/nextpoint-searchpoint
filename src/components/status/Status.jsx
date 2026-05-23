import React from "react";

import {
    status
} from '../../utils/dados';

export default function Status(){ 
    return(
        <div className="flex items-center gap-4">
            {status.map((status) => (
                <button key={status.value} type="button" className="bg-gray-200 hover:bg-indigo-700 text-gray-400 hover:text-white text-sm font-normal py-1 px-3 rounded-full"> {status.label} </button>
            ))}
        </div>
    );
};