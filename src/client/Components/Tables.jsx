import React, { useContext } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
} from '@windmill/react-ui';

import { SearchBarContext } from '../Containers/MainContainer';

const badgeStyles = {
  running:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-templateGreen-700 bg-templateGreen-100 dark:bg-templateGreen-700 dark:text-templateGreen-100',
  pending:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-templateYellow-800 bg-templateYellow-100 dark:text-templateSlate-700 dark:bg-templateYellow-300',
  stopped:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-templateRed-700 bg-templateRed-100 dark:text-templateRed-100 dark:bg-templateRed-700',
  stopping:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-templateOrange-700 bg-templateOrange-100 dark:text-templateOrange-100 dark:bg-templateOrange-700',
  'shutting-down':
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-templateBlue-700 bg-templateBlue-100 dark:text-templateBlue-100 dark:bg-templateBlue-700',
  terminated:
    'inline-flex px-2 text-xs font-medium leading-5 rounded-full text-templateGray-700 bg-templateGray-100 dark:text-templateGray-100 dark:bg-templateGray-700',
};

const buttonStyles = {
  running:
    'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-templateGray-600 border-templateRed-700 border dark:text-templateGray-400 focus:outline-none active:bg-transparent hover:border-templateRed-500 focus:border-templateRed-500 active:text-templateRed-500 focus:shadow-outline-red',
  stopped:
    'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-templateGray-600 border-templateGreen-700 border dark:text-templateGray-400 focus:outline-none active:bg-transparent hover:border-templateGreen-500 focus:border-templateGreen-500 active:text-templateGray-500 focus:shadow-outline-gray',
  pending:
    'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-templateGray-600 border-templateGray-300 border dark:text-templateGray-400 focus:outline-none opacity-50 cursor-not-allowed bg-templateGray-300',
  stopping:
    'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-templateGray-600 border-templateGray-300 border dark:text-templateGray-400 focus:outline-none opacity-50 cursor-not-allowed bg-templateGray-300',
};

function Tables({ instanceList }) {
  const { search } = useContext(SearchBarContext);

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

  return (
    <>
      <div className='w-full overflow-auto'>
        <div
          id='Table'
          className='w-full overflow-auto rounded-lg shadow-xs mb-8'
        >
          <TableContainer className='mb-8 dark:bg-templateGray-800'>
            <Table>
              <TableHeader>
                <tr className='text-xs font-semibold tracking-wide text-left text-templateGray-500 uppercase border-b bg-templateGray-50 dark:border-templateGray-600 dark:text-templateGray-400 dark:bg-templateGray-800'>
                  <TableCell>Instance</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Security Groups</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </tr>
              </TableHeader>
              <TableBody className='dark:bg-templateGray-800 divide-y dark:divide-templateGray-700 text-templateGray-700 dark:text-templateGray-400 dark:border-templateGray-700'>
                {instanceList.map((instance, i) => {
                  const nameTag = instance.tags.find(
                    (tag) => tag.Key === 'Name'
                  );

                  if (
                    nameTag?.Value?.toUpperCase().includes(
                      search.toUpperCase()
                    ) ||
                    instance.instanceId
                      .toUpperCase()
                      .includes(search.toUpperCase()) ||
                    instance.securityGroups.some((group) =>
                      group.GroupName.toUpperCase().includes(
                        search.toUpperCase()
                      )
                    )
                  ) {
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          <div className='flex items-center text-sm'>
                            <div>
                              <p className='font-semibold'>{nameTag.Value}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className='text-sm'>{instance.instanceId}</span>
                        </TableCell>
                        <TableCell>
                          {instance.securityGroups.map((group, i) => {
                            if (i === instance.securityGroups.length - 1) {
                              return <span>{group.GroupName}</span>;
                            } else {
                              return <span>{group.GroupName}, </span>;
                            }
                          })}
                        </TableCell>
                        <TableCell>
                          <span className={badgeStyles[instance.state.Name]}>
                            {instance.state.Name}
                          </span>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
            <TableFooter className='dark:bg-templateGray-800 border-t dark:border-templateGray-600'></TableFooter>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Tables;
