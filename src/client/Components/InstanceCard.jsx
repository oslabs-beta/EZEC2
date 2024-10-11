import React from 'react';

// InstanceCard renders from InstanceContainer
const InstanceCard = () => {
  // write two onclick functions, one sending a request to the backend to stop an instance, one to start it
  // stop: /ec2/stopInstance
  // start: /ec2/startInstance

  const instanceId = ''; // add instance id here

  function handleStop() {
    // need instance id
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
      <div>InstanceCard</div>
      <button onClick={() => handleStop()}>Stop Instance</button>
      <button onClick={() => handleStart()}>Start Instance</button>
    </div>
  );
};

export default InstanceCard;
