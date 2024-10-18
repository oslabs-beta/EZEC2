import React from 'react';

// InstanceBar renders from SubContainer
const InstanceBar = () => {
  return (
    <aside className='z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-templateGray-800 lg:block'>
      <div className='py-4 text-templateGray-500 dark:text-templateGray-400'>
        <a className='ml-6 text-lg font-bold text-templateGray-800 dark:text-templateGray-200'>EZEC2 ~Danny placeholder~</a>
        <ul className='mt-6'>
          {/* Should swap to component here: */}
          <li className='relative px-6 py-3'>
            <a className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-templateGray-800 dark:hover:text-templateGray-200 text-templateGray-800 dark:text-templateGray-100'>
              <span className='absolute inset-y-0 left-0 w-1 bg-templatePurple-600 rounded-tr-lg rounded-br-lg'></span>
              <svg
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'></path>
              </svg>
              <span className='ml-4'>Dashboard</span>
            </a>
          </li>
          {/* End of new component */}
          {/* placeholder side bar buttons: */}
          <li className='relative px-6 py-3'>
            <a className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-templateGray-800 dark:hover:text-templateGray-200 text-templateGray-800 dark:text-templateGray-100'>
              <svg
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'></path>
              </svg>
              <span className='ml-4'>Forms</span>
            </a>
          </li>
          <li className='relative px-6 py-3'>
            <a className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-templateGray-800 dark:hover:text-templateGray-200 text-templateGray-800 dark:text-templateGray-100'>
              <svg
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'></path>
              </svg>
              <span className='ml-4'>Danny the Database</span>
            </a>
          </li>
          <li className='relative px-6 py-3'>
            <a className='inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-templateGray-800 dark:hover:text-templateGray-200 text-templateGray-800 dark:text-templateGray-100'>
              <svg
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-5 h-5'
                aria-hidden='true'
              >
                <path d='M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'></path>
                <path d='M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'></path>
              </svg>
              <span className='ml-4'>Pacman</span>
            </a>
          </li>
          {/* end placeholder buttons */}
        </ul>
      </div>
    </aside>
  );
};

export default InstanceBar;
