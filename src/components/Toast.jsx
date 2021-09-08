import React, { useState } from 'react';

function Toast({value}) {
  // const shortURL = `${window.location.origin}/${location.state.data}`;
  return (
    <div className="flex justify-center">
      <div className="absolute top-2 px-6 py-4 bg-white shadow-md flex flex-col rounded text-gray-700 ">
        <h4 className="mb-3 text-xl">Copied MuiUrl:</h4>
        <p className="text-blue-500">{value}</p>
      </div>
    </div>
  );
}


export default Toast;
