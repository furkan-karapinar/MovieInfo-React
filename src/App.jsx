import { useEffect, useRef, useState } from 'react'
import './App.css'
import FCard from './components/FCard'
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FiTv } from "react-icons/fi";
import { GrPrevious, GrNext } from "react-icons/gr";
import Swal from 'sweetalert2';




function App() {

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [pageCount, setPageCount] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [filmList, setFilmList] = useState([]);
  const searchInput = useRef();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }


  const searchFilmDetails = async (imdbcode) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${imdbcode}`);
      
      if (!response.ok) {
      errornotification(`HTTP error! Status: ${response.status}`);
      return null;
      }

      const dt = await response.json();

      if (dt.Response === "False") {
      errornotification(`Error from API: ${dt.Error}`);
      return null;
      }

      return dt;
    } catch (error) {
      errornotification(`Error fetching film details: ${error.message}`);
      return null;
    }
  };

  const searchFilm = async (query) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${query}&page=${pageCount}`);
      
      if (!response.ok) {
        errornotification(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data = await response.json();

      if (!data || data.Response === "False" || !data.Search) {
        errornotification(`Error from API: ${data?.Error || 'No data found'}`);
        setFilmList([]);
        setTotalResults(0);
        setWaiting(false);
        return;
      }

      const detailedFilms = [];
      setTotalResults(data.totalResults);

      for (const item of data.Search) {
        if (!item.imdbID) continue;

        const details = await searchFilmDetails(item.imdbID);
        if (!details) continue;

        const film = {
          image: details.Poster !== "N/A" ? details.Poster : null,
          title: details.Title || "Unknown Title",
          year: details.Year || "Unknown Year",
          director: details.Director || "Unknown Director",
          writer: details.Writer || "Unknown Writer",
          actors: details.Actors || "Unknown Actors",
          release: details.Released || "Unknown Release Date",
          duration: details.Runtime || "Unknown Duration",
          genre: details.Genre || "Unknown Genre",
          description: details.Plot || "No description available",
          rating: details.imdbRating || "N/A"
        };

        detailedFilms.push(film);
      }

      setFilmList(detailedFilms);
    } catch (error) {
      errornotification(`Error fetching data: ${error.message}`);
    } finally {
      setWaiting(false);
    }
  };


  const searchbtn = async (isNewSearch) => {
    if (searchInput.current.value === "") {
      searchInput.current.focus();
      return;
    }
    setWaiting(true);
    if (isNewSearch) {
      setPageCount(1);
    }
    const query = searchInput.current.value;
    await searchFilm(query, pageCount);
  }

  const nextpage = () => {
    if (pageCount < Math.ceil(totalResults / 10)) {
      setPageCount(pageCount + 1);
    }
  }
  const prevpage = () => {
    if (pageCount > 1) {
      setPageCount(pageCount - 1);
    }
  }

  const errornotification = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      theme: isDarkMode ? 'dark' : 'light',
      background: isDarkMode ? '#1a202c' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
    })
  }


  useEffect(() => {
    searchbtn(false);
  }, [pageCount]);

  return (
    <>
      <div className={isDarkMode ? 'dark ' : ''}>

        {waiting && (
          <div className="absolute text-red-500 bg-opacity-75 z-50 flex justify-center items-center min-h-screen w-full">
            <div className='bg-white border-2  dark:bg-gray-800 p-6 rounded-2xl shadow-2xl'>
              <div className='p-2'>
                <div
                  className="inline-block size-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span>
                </div>
              </div>

            </div>

          </div>
        )}

        <div className={'text-black dark:text-white dark:bg-gray-800 min-h-screen transition duration-500 ease-in-out'}>
          <div className="p-4 shadow-md flex justify-between items-center">
            <h1 className="flex gap-2 items-center text-2xl font-bold"><FiTv className='text-4xl text-red-600' /> MovieInfo</h1>
            <div className='flex items-center border-b-3 border-red-500 p-2 gap-2 w-1/3'>
              <input type="text" placeholder="Search" className="outline-0 text-black w-full dark:text-white placeholder-red-500" ref={searchInput} />
              <FaSearch className='text-red-600 text-xl cursor-pointer' onClick={() => searchbtn(true)} />
            </div>

            <button onClick={toggleDarkMode}
              className="px-4 py-2  rounded text-red-500 text-2xl focus:outline-none cursor-pointer">{isDarkMode ? <IoMdSunny /> : <IoMdMoon />}
            </button>
          </div>
          <div className="p-4">

            <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between items-center'>

              <div className='flex flex-col md:block lg:block xl:block items-center gap-2 mb-4'>
                <h2 className="text-xl font-semibold mb-2">Results Found in Search</h2>
                <div className="mb-4 border-b-4 border-red-600 w-80"></div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <p className='px-4 font-semibold'>{totalResults} result found. {pageCount}/{Math.ceil(totalResults / 10) || 1}</p>
                <button onClick={prevpage} className="px-4 py-2 border-3 border-red-500 text-red-500 text-xl rounded hover:text-white hover:bg-red-500"><GrPrevious/></button>
                <button onClick={nextpage} className="px-4 py-2 border-3 border-red-500 text-red-500 text-xl rounded hover:text-white hover:bg-red-500"><GrNext/></button>
              </div>
            </div>

            <div className="grid grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-5">

              {
                filmList.map((item, index) => (
                  <FCard key={index} film_data={item} isDarkMode={isDarkMode} />
                ))
              }

            </div>
          </div>

        </div>
      </div>
     

    </>
  )
}

export default App
