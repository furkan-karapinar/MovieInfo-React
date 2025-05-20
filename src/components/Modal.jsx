'use client'

import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IoClose } from "react-icons/io5";

const Modal = ({film_data ,isDarkMode, isOpen,  setIsOpen}) => {

  return (
    <Dialog open={isOpen} onClose={setIsOpen} className={`relative z-10 ${isDarkMode ? 'dark' : ''}`}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-800/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <DialogPanel className=" fixed inset-0 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden flex">
          <img src={film_data.image} alt="Alita" className="w-1/3 h-auto object-cover" />
          <div className="p-6 w-2/3">
          <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2  text-3xl text-black dark:text-white  hover:text-red-500 font-medium rounded"><IoClose />
              </button>
            </div>
            <DialogTitle className="text-4xl font-bold text-gray-900 dark:text-white">{film_data.title}</DialogTitle>
            <p className="mt-4 text-lg  text-gray-900 dark:text-white">{film_data.description}</p>
            <div className="mt-6">
              <p className="text-lg font-medium text-gray-800 dark:text-white"><b className='text-black dark:text-red-500'>Director:</b> {film_data.director}</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white mt-2"><b className='text-black dark:text-red-500'>Writers:</b> {film_data.writer}</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white mt-2"><b className='text-black dark:text-red-500'>Actors:</b> {film_data.actors}</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white mt-2"><b className='text-black dark:text-red-500'>Genre:</b> {film_data.genre}</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white mt-2"><b className='text-black dark:text-red-500'>Rating:</b> {film_data.rating}/10</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white mt-2"><b className='text-black dark:text-red-500'>Release Date:</b> {film_data.release}</p>
            </div>
            
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  )
}

export default Modal