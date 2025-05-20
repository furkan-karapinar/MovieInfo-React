import React, { useState } from 'react'
import Modal from './Modal';

const FCard = ({film_data, isDarkMode}) => {

    const [isOpen, setIsOpen] = useState(false);
    const handleCardClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        
        <div  className="relative w-[250px] h-[370px] m-4 overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 gap-3">
          {isOpen && <Modal film_data={film_data} isDarkMode={isDarkMode} isOpen={isOpen} setIsOpen={setIsOpen}/>} 
           <img src={film_data.image} alt="Film Cover" className="w-full h-full object-fill" />
            <div  className="absolute inset-0 bg-gray-800 bg-opacity-70 text-white p-4 flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity duration-300 dark:bg-opacity-80 dark:bg-gray-600">
                <div>
                    <h2 onClick={handleCardClick} className="text-xl hover:text-red-500 cursor-pointer font-semibold mb-2">{film_data.title}</h2>
                    <p className="text-sm mb-2">{film_data.year} | {film_data.duration} - {film_data.genre}</p>
                    <p className="text-xs leading-relaxed line-clamp-4 my-6">{film_data.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">IMDB: {film_data.rating}</span>
                    <div className="flex">
                        {Array.from({ length: 5 }, (_, index) => (
                            <span
                                key={index}
                                className={
                                    index < Math.round(film_data.rating / 2)
                                        ? "text-yellow-400"
                                        : "text-gray-400 dark:text-gray-900"
                                }
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FCard