import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
} from '@windmill/react-ui';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white', // Set the text color here
  },
});

function ScheduleTable({ instanceList }) {
  const [schedule, setSchedule] = useState({});

  function saveSchedule() {
    console.log(schedule);
  }

  return (
    <TableContainer className='mb-8 dark:bg-templateGray-800'>
      <Table>
        <TableHeader>
          <tr className='text-xs font-semibold tracking-wide text-left text-templateGray-500 uppercase border-b bg-templateGray-50 dark:border-templateGray-600 dark:text-templateGray-400 dark:bg-templateGray-800'>
            <TableCell>Instance Name</TableCell>
            <TableCell>Instance ID</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>Stop Time</TableCell>
            <TableCell>Save Schedule</TableCell>
          </tr>
        </TableHeader>
        <TableBody className='dark:bg-templateGray-800 divide-y dark:divide-templateGray-700 text-templateGray-700 dark:text-templateGray-400 dark:border-templateGray-700'>
          {instanceList.map((instance, i) => {
            const nameTag = instance.tags.find((tag) => tag.Key === 'Name');
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
                      <TimePicker
                        label='Start Time'
                        onAccept={(value) => {
                          const newSchedule = Object.assign(
                            {},
                            { ...schedule }
                          );
                          newSchedule[instance.instanceId + '-start-time'] =
                            value;
                          setSchedule(newSchedule);
                        }}
                        id={instance.instanceId + '-start-time'}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <TimePicker
                        label='Stop Time'
                        onAccept={(value) => {
                          const newSchedule = Object.assign(
                            {},
                            { ...schedule }
                          );
                          newSchedule[instance.instanceId + '-stop-time'] =
                            value;
                          setSchedule(newSchedule);
                        }}
                        id={instance.instanceId + '-stop-time'}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      saveSchedule(e);
                    }}
                  >
                    Save Schedule
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScheduleTable;
