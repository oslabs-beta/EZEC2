import React from 'react';

// SearchBar renders from MainContainer
const SearchBar = () => {
  return (
    <div
    id='SearchBar'
      className='z-40 py-4 bg-white shadow-bottom dark:bg-templateGray-800'
    >
      <div className='container flex items-center justify-between h-full px-6 mx-auto text-templatePurple-600 dark:text-templatePurple-300'>
        <button className='p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple'>
          <svg
            fill='currentColor'
            viewBox='0 0 20 20'
            className='w-6 h-6'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div className='flex justify-start flex-1 lg:mr-32'>
          <div className='relative w-full max-w-xl mr-6 focus-within:text-templatePurple-500'>
            <div className='absolute inset-y-0 flex items-center pl-2'>
              <svg
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                className='w-4 h-4'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              className='block w-full text-sm focus:outline-none dark:text-templateGray-300 form-input leading-5 focus:border-templatePurple-400 dark:border-templateGray-600 focus:shadow-outline-purple dark:focus:border-templateGray-600 dark:focus:shadow-outline-gray dark:bg-templateGray-700 pl-8 text-templateGray-700 rounded-md'
              type='text'
              placeholder='Search for instances'
              aria-label='Search'
            ></input>
          </div>
        </div>
        <ul className='flex items-center flex-shrink-0 space-x-6'>
          <li className='flex'>
            {/* Dark/Light mode button */}
            <button
              className='rounded-md focus:outline-none focus:shadow-outline-purple'
              aria-label='Toggle color mode'
            >
              <svg
                fill='currentColor'
                viewBox='0 0 20 20'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </li>
          <li className='relative'>
            <button
              className='relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple'
              aria-label='Notifications'
              aria-haspopup='true'
            >
              <svg
                fill='currentColor'
                viewBox='0 0 20 20'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z'></path>
              </svg>
              <span
                aria-hidden='true'
                className='absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-templateRed-600 border-2 border-white rounded-full dark:border-templateGray-800'
              ></span>
            </button>
          </li>
          {/* <li className='relative'>
            <button
              className='rounded-full focus:shadow-outline-purple focus:outline-none'
              aria-label='Account'
              aria-haspopup='true'
            >
              <div
                className='relative rounded-full inline-block w-8 h-8 align-middle'
                aria-hidden='true'
              >
                <img
                  className='object-cover w-full h-full rounded-full'
                  src='https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;s=aa3a807e1bbdfd4364d1f449eaa96d82'
                  alt=''
                  loading='lazy'
                />
                <div
                  className='absolute inset-0 rounded-full shadow-inner'
                  aria-hidden='true'
                ></div>
              </div>
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
