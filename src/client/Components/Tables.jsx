import React, { useState, useEffect } from 'react';

// import PageTitle from '../components/Typography/PageTitle'
// import SectionTitle from '../components/Typography/SectionTitle'

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui';

const badgeStyles = {
  running:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100',
  pending:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-800 bg-yellow-100 dark:text-slate-700 dark:bg-yellow-300',
  stopped:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700',
  stopping:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-orange-700 bg-orange-100 dark:text-orange-100 dark:bg-orange-700',
  'shutting-down':
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-blue-700 bg-blue-100 dark:text-blue-100 dark:bg-blue-700',
  terminated:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-700',
};

const buttonStyles = {
  running:
    'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-gray-600 border-red-700 border dark:text-gray-400 focus:outline-none active:bg-transparent hover:border-red-500 focus:border-red-500 active:text-red-500 focus:shadow-outline-red',
  stopped:
    'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-gray-600 border-green-700 border dark:text-gray-400 focus:outline-none active:bg-transparent hover:border-green-500 focus:border-green-500 active:text-gray-500 focus:shadow-outline-gray',
  pending:
    'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-gray-600 border-gray-300 border dark:text-gray-400 focus:outline-none opacity-50 cursor-not-allowed bg-gray-300',
  stopping:
    'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-gray-600 border-gray-300 border dark:text-gray-400 focus:outline-none opacity-50 cursor-not-allowed bg-gray-300',
};

// original button styling
// 'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-gray-600 border-gray-300 border dark:text-gray-400 focus:outline-none active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:shadow-outline-gray'

// import response from '../utils/demo/tableData';
// make a copy of the data, for the second table
// const response2 = response.concat([]);

// for developerment, parent component is page container
function Tables({ instanceList }) {
  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */

  console.log(instanceList, instanceList[0].state.Name);

  function handleStop(instanceIds) {
    if (!Array.isArray(instanceIds)) {
        instanceIds = [instanceIds];
    }
    const data = {
      instanceIds: instanceIds,
    };

    fetch('/ec2/stopInstance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function handleStart(instanceIds) {
    if (!Array.isArray(instanceIds)) {
        instanceIds = [instanceIds];
    }
    const data = {
      instanceIds: instanceIds,
    };

    fetch('/ec2/startInstance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1);
  const [pageTable2, setPageTable2] = useState(1);

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([]);
  const [dataTable2, setDataTable2] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  //   const totalResults = response.length;

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    // setDataTable1(
    //   response.slice(
    //     (pageTable1 - 1) * resultsPerPage,
    //     pageTable1 * resultsPerPage
    //   )
    // );
  }, [pageTable1]);

  // on page change, load new sliced data
  // here you would make another server request for new data
  //   useEffect(() => {
  //     // setDataTable2(
  //     //   response2.slice(
  //     //     (pageTable2 - 1) * resultsPerPage,
  //     //     pageTable2 * resultsPerPage
  //     //   )
  //     // );
  //   }, [pageTable2]);

  return (
    <>
      {/* <PageTitle>Tables</PageTitle> */}

      {/* <SectionTitle>Simple table</SectionTitle> */}
      <TableContainer className='mb-8'>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Instance</TableCell>
              <TableCell>ID? (or other data?)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {instanceList.map((instance, i) => {
              const nameTag = instance.tags.find((tag) => tag.Key === 'Name');
              return (
                <TableRow key={i}>
                  <TableCell>
                    <div className='flex items-center text-sm'>
                      <div>
                        <p className='font-semibold'>{nameTag.Value}</p>
                        {/* <p className='text-xs text-gray-600 dark:text-gray-400'>
                          {instance.instanceId}
                        </p> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>{instance.instanceId}</span>
                  </TableCell>
                  <TableCell>
                    <span className={badgeStyles[instance.state.Name]}>
                      {instance.state.Name}
                    </span>
                    {/* <span className={badgeStyles['pending']}>pending</span>
                    <span className={badgeStyles['stopped']}>stopped</span>
                    <span className={badgeStyles['stopping']}>stopping</span>
                    <span className={badgeStyles['shutting-down']}>shutting down</span>
                    <span className={badgeStyles['terminated']}>terminated</span> */}
                  </TableCell>
                  <TableCell>
                    {/* <button
                      className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-gray-600 border-red-700 border dark:text-gray-400 focus:outline-none active:bg-transparent hover:border-red-500 focus:border-red-500 active:text-gray-500 focus:shadow-outline-gray'
                      type='button'
                    >
                      Stop Instance
                    </button> */}
                    {instance.state.Name !== 'shutting-down' &&
                      instance.state.Name !== 'terminated' && (
                        <button
                          className={buttonStyles[instance.state.Name]}
                          onClick={
                            instance.state.Name === 'running'
                              ? () => {
                                  handleStop(instance.instanceId);
                                }
                              : () => {
                                  handleStart(instance.instanceId);
                                }
                          }
                        >
                          {instance.state.Name === 'running'
                            ? 'Stop Instance'
                            : 'Start Instance'}
                        </button>
                      )}
                    {/* <span className='text-sm'>
                      Every Day I dunno
                    </span> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter>
          {/* <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label='Table navigation'
          /> */}
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Tables;
