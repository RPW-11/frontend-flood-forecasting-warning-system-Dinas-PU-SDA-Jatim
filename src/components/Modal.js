import React, { useState } from 'react';

const Modal = ({component, modalTitle='', message='', close}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (isOpen)
    return (
      <div className="flex justify-center items-center h-screen">
          <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md">
              <div className="flex justify-end">
                <button
                  onClick={() => {setIsOpen(false); close()}}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &#10005;
                </button>
              </div>
              <div className="my-4">
                <h2 className="text-lg font-bold mb-2">{modalTitle}</h2>
                <p>{message}.</p>
              </div>
              {component}
            </div>
          </div>
      </div>
    );
};

export default Modal;
