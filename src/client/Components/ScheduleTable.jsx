import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from '@windmill/react-ui';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useQuery } from '@tanstack/react-query';

import { SearchBarContext } from '../Containers/MainContainer';

function ScheduleTable({ instanceList }) {
  const { search } = useContext(SearchBarContext);

  let initialSchedule = {};

  instanceList.map((instance) => {
    initialSchedule[instance.instanceId] = {
      startHour: null,
      startMinute: null,
      startDate: null,
      stopHour: null,
      stopMinute: null,
      stopDate: null,
      dayOfWeek: [],
    };
  });

  const [schedule, setSchedule] = useState(initialSchedule);
  //   const [savedSchedule, setSavedSchedule] = useState('') -- for rerendering upon schedule clear

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['scheduleData'],
    queryFn: async () => {
      return await fetch('/scheduler/scheduleJob/')
        .then((res) => res.json())
        .then((data) => {
          const newSchedule = Object.assign({}, { ...schedule });
          if (data.length) {
            data.map((scheduleItem) => {
              const cronSchedule = scheduleItem.cronSchedule.split(' ');
              const minute = cronSchedule[0];
              const hour = cronSchedule[1];
              const dayOfWeek = cronSchedule[4].split(',');
              const instanceId = scheduleItem.instanceId[0];
              const jobType = scheduleItem.jobType;

              if (jobType === 'startInstance') {
                newSchedule[instanceId].startHour = hour;
                newSchedule[instanceId].startMinute = minute;
                newSchedule[instanceId].startDate = new Date();
                newSchedule[instanceId].startDate.setHours(hour);
                newSchedule[instanceId].startDate.setMinutes(minute);
              }

              if (jobType === 'stopInstance') {
                newSchedule[instanceId].stopHour = hour;
                newSchedule[instanceId].stopMinute = minute;
                newSchedule[instanceId].stopDate = new Date();
                newSchedule[instanceId].stopDate.setHours(hour);
                newSchedule[instanceId].stopDate.setMinutes(minute);
              }
              newSchedule[instanceId].dayOfWeek = dayOfWeek;
              setSchedule(newSchedule);
            });
          }
          return data;
        });
    },
  });

  async function saveSchedule(e) {
    const instanceToBeSaved = e.target.id.split('|')[0];
    if (schedule.hasOwnProperty(instanceToBeSaved)) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(schedule[instanceToBeSaved]);

      if (
        schedule[instanceToBeSaved].startHour !== null ||
        schedule[instanceToBeSaved].startMinute !== null
      ) {
        const startBody = JSON.stringify({
          minute: schedule[instanceToBeSaved].startMinute,
          hour: schedule[instanceToBeSaved].startHour,
          timezone: 'America/New_York',
          dayOfWeek: schedule[instanceToBeSaved].dayOfWeek,
          jobAction: 'startInstance',
          instanceIds: [instanceToBeSaved],
        });

        const startRequestOptions = {
          method: 'POST',
          headers: headers,
          body: startBody,
          redirect: 'follow',
        };
        await fetch('/scheduler/scheduleJob', startRequestOptions);
      }

      if (
        schedule[instanceToBeSaved].stopHour !== null ||
        schedule[instanceToBeSaved].stopMinute !== null
      ) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const stopBody = JSON.stringify({
          minute: schedule[instanceToBeSaved].stopMinute,
          hour: schedule[instanceToBeSaved].stopHour,
          timezone: 'America/New_York',
          dayOfWeek: schedule[instanceToBeSaved].dayOfWeek,
          jobAction: 'stopInstance',
          instanceIds: [instanceToBeSaved],
        });

        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: stopBody,
          redirect: 'follow',
        };

        await fetch('/scheduler/scheduleJob', requestOptions);
        refetch();
        alert('Schedule saved');
      }
    } else {
      alert('No schedule set for this instance');
    }
  }

  async function deleteSchedule(e) {
    const instanceToClearSchedule = e.target.id.split('|')[0];
    if (schedule.hasOwnProperty(instanceToClearSchedule)) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const deleteStartBody = JSON.stringify({
        jobAction: 'startInstance',
        instanceIds: [instanceToClearSchedule],
      });

      const deleteStartOptions = {
        method: 'DELETE',
        headers: headers,
        body: deleteStartBody,
        redirect: 'follow',
      };

      await fetch('/scheduler/scheduleJob', deleteStartOptions);

      const deleteStopBody = JSON.stringify({
        jobAction: 'stopInstance',
        instanceIds: [instanceToClearSchedule],
      });

      const deleteStopOptions = {
        method: 'DELETE',
        headers: headers,
        body: deleteStopBody,
        redirect: 'follow',
      };

      await fetch('/scheduler/scheduleJob', deleteStopOptions);

      const newSchedule = Object.assign({}, { ...schedule });
      newSchedule[instanceToClearSchedule].startHour = null;
      newSchedule[instanceToClearSchedule].startMinute = null;
      newSchedule[instanceToClearSchedule].startDate = null;
      newSchedule[instanceToClearSchedule].stopHour = null;
      newSchedule[instanceToClearSchedule].stopMinute = null;
      newSchedule[instanceToClearSchedule].stopDate = null;
      newSchedule[instanceToClearSchedule].dayOfWeek = [];
      setSchedule(newSchedule);
      refetch();
    } else {
      alert('No schedule set for this instance');
    }
  }

  function handleCheckboxClick(e) {
    const instanceToBeSaved = e.target.id.split('|')[1];
    const dayToBeAdded = e.target.id.split('|')[0];
    const checked = e.target.checked;
    const newSchedule = Object.assign({}, { ...schedule });

    if (!newSchedule.hasOwnProperty(instanceToBeSaved)) {
      newSchedule[instanceToBeSaved] = {
        startHour: null,
        startMinute: null,
        stopHour: null,
        stopMinute: null,
        dayOfWeek: [],
      };
    }

    if (checked) {
      newSchedule[instanceToBeSaved].dayOfWeek.push(dayToBeAdded);
    } else {
      newSchedule[instanceToBeSaved].dayOfWeek = newSchedule[
        instanceToBeSaved
      ].dayOfWeek.filter((day) => day !== dayToBeAdded);
    }

    setSchedule(newSchedule);
  }

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <TableContainer className='mb-8 dark:bg-templateGray-800'>
      <Table>
        <TableHeader>
          <tr className='text-xs font-semibold tracking-wide text-left text-templateGray-500 uppercase border-b bg-templateGray-50 dark:border-templateGray-600 dark:text-templateGray-400 dark:bg-templateGray-800'>
            <TableCell>Instance Name</TableCell>
            <TableCell>Instance ID</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>Stop Time</TableCell>
            <TableCell>Days</TableCell>
            <TableCell></TableCell>
          </tr>
        </TableHeader>
        <TableBody className='dark:bg-templateGray-800 divide-y dark:divide-templateGray-700 text-templateGray-700 dark:text-templateGray-400 dark:border-templateGray-700'>
          {instanceList.map((instance, i) => {
            const nameTag = instance.tags.find((tag) => tag.Key === 'Name');
            if (
              nameTag?.Value?.toUpperCase().includes(search.toUpperCase()) ||
              instance.instanceId.toUpperCase().includes(search.toUpperCase())
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <div style={{ background: 'white' }}>
                          <TimePicker
                            slotProps={{ field: { clearable: true } }}
                            value={
                              schedule[instance.instanceId].startDate
                                ? dayjs(schedule[instance.instanceId].startDate)
                                : null
                            }
                            //   label='Start Time'
                            onAccept={(value) => {
                              const newSchedule = Object.assign(
                                {},
                                { ...schedule }
                              );
                              newSchedule[instance.instanceId].startHour =
                                value.$H;
                              newSchedule[instance.instanceId].startMinute =
                                value.$m;

                              setSchedule(newSchedule);
                            }}
                            id={instance.instanceId + '-start-time'}
                          />
                        </div>
                      </DemoContainer>
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['TimePicker']}>
                        <div style={{ background: 'white' }}>
                          <TimePicker
                            slotProps={{ field: { clearable: true } }}
                            value={
                              schedule[instance.instanceId].stopDate
                                ? dayjs(schedule[instance.instanceId].stopDate)
                                : null
                            }
                            onAccept={(value) => {
                              const newSchedule = Object.assign(
                                {},
                                { ...schedule }
                              );
                              newSchedule[instance.instanceId].stopHour =
                                value.$H;
                              newSchedule[instance.instanceId].stopMinute =
                                value.$m;

                              setSchedule(newSchedule);
                            }}
                            id={instance.instanceId + '-stop-time'}
                          />
                        </div>
                      </DemoContainer>
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell>
                    <div style={{ background: 'white' }}>
                      <input
                        type='checkbox'
                        id={'Sun|' + instance.instanceId}
                        name='Sun'
                        value='0'
                        onClick={handleCheckboxClick}
                        checked={
                          schedule[instance.instanceId].dayOfWeek.indexOf(
                            'Sun'
                          ) === -1
                            ? false
                            : true
                        }
                      ></input>
                      <label for={'Sun|' + instance.instanceId}> Sunday</label>
                      <br />
                      <input
                        type='checkbox'
                        id={'Mon|' + instance.instanceId}
                        name='Mon'
                        value='1'
                        onClick={handleCheckboxClick}
                        checked={
                          schedule[instance.instanceId].dayOfWeek.indexOf(
                            'Mon'
                          ) === -1
                            ? false
                            : true
                        }
                      ></input>
                      <label for={'Mon|' + instance.instanceId}> Monday</label>
                      <br />
                      <input
                        type='checkbox'
                        id={'Tue|' + instance.instanceId}
                        name='Tue'
                        value='2'
                        onClick={handleCheckboxClick}
                        checked={
                          schedule[instance.instanceId].dayOfWeek.indexOf(
                            'Tue'
                          ) === -1
                            ? false
                            : true
                        }
                      ></input>
                      <label for={'Tue|' + instance.instanceId}> Tuesday</label>
                      <br />
                      <input
                        type='checkbox'
                        id={'Wed|' + instance.instanceId}
                        name='Wed'
                        value='3'
                        onClick={handleCheckboxClick}
                        checked={
                          schedule[instance.instanceId].dayOfWeek.indexOf(
                            'Wed'
                          ) === -1
                            ? false
                            : true
                        }
                      ></input>
                      <label for={'Wed|' + instance.instanceId}>
                        {' '}
                        Wednesday
                      </label>
                      <br />
                      <input
                        type='checkbox'
                        id={'Thu|' + instance.instanceId}
                        name='Thu'
                        value='4'
                        onClick={handleCheckboxClick}
                        checked={
                          schedule[instance.instanceId].dayOfWeek.indexOf(
                            'Thu'
                          ) === -1
                            ? false
                            : true
                        }
                      ></input>
                      <label for={'Thu|' + instance.instanceId}>
                        {' '}
                        Thursday
                      </label>
                      <br />
                      <input
                        type='checkbox'
                        id={'Fri|' + instance.instanceId}
                        name='Fri'
                        value='5'
                        onClick={handleCheckboxClick}
                        checked={
                          schedule[instance.instanceId].dayOfWeek.indexOf(
                            'Fri'
                          ) === -1
                            ? false
                            : true
                        }
                      ></input>
                      <label for={'Fri|' + instance.instanceId}> Friday</label>
                      <br />
                      <input
                        type='checkbox'
                        id={'Sat|' + instance.instanceId}
                        name='Sat'
                        value='6'
                        onClick={handleCheckboxClick}
                        checked={
                          schedule[instance.instanceId].dayOfWeek.indexOf(
                            'Sat'
                          ) === -1
                            ? false
                            : true
                        }
                      ></input>
                      <label for={'Sat|' + instance.instanceId}>
                        {' '}
                        Saturday
                      </label>
                      <br />
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={(e) => {
                        saveSchedule(e);
                      }}
                      id={instance.instanceId + '|save-button'}
                      className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-templateGray-600 border-templateGreen-700 border dark:text-templateGray-400 focus:outline-none active:bg-transparent hover:border-templateGreen-500 focus:border-templateGreen-500 active:text-templateGray-500 focus:shadow-outline-gray'
                    >
                      Save Schedule
                    </button>
                    <br />
                    <button
                      onClick={(e) => {
                        deleteSchedule(e);
                      }}
                      id={instance.instanceId + '|clear-button'}
                      className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-templateGray-600 border-templateRed-700 border dark:text-templateGray-400 focus:outline-none active:bg-transparent hover:border-templateRed-500 focus:border-templateRed-500 active:text-templateRed-500 focus:shadow-outline-red'
                    >
                      Clear Schedule
                    </button>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScheduleTable;
