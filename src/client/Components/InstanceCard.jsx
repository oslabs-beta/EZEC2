import { DnsNameState } from '@aws-sdk/client-ec2';
import React from 'react';

// InstanceCard renders from InstanceContainer
const InstanceCard = ({ instanceId, state, tags, name }) => {
  function handleStop() {
    const data = {
      instanceId: instanceId,
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

  function handleStart() {
    const data = {
      instanceId: instanceId,
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
    <div>
      <div className='instance-name'>{name}</div>
      <div className='instance-id'>{instanceId}</div>
      <button onClick={() => handleStop()}>Stop Instance</button>
      <button onClick={() => handleStart()}>Start Instance</button>
    </div>
  );
};

export default InstanceCard;
