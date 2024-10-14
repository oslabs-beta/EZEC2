import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import InstanceCard from '../Components/InstanceCard.jsx';

// regardless of page, we will always be fetching the array of instances
// based on the page, we want to pass in different props to our instance cards
// we can use useLocation to find the current react router url
// we can save a local state of what url location we are at, and when that state changes (use useEffect)
// pass that state as props to the instance card.

// IntanceContainer renders from OverviewManagementPage
const InstanceContainer = () => {
  let [instanceDetails, setInstanceDetails] = useState(null);
  let [instanceCards, setInstanceCards] = useState(null);
  console.log(instanceDetails);

  const fetchDetails = async () => {
    try {
      const response = await fetch('/ec2/getInstanceDetails');
      const data = await response.json();
      setInstanceDetails(data.instanceList);
    } catch (e) {
      console.log('Error fetching instance details: ', e);
    }
  };

  const createCards = () => {
    const cards = [];
    for (let i = 0; i < instanceDetails.length; i++) {
      cards.push(
        <InstanceCard
          key={instanceDetails[i].instanceId}
          {...instanceDetails[i]}
        />
      );
    }
    setInstanceCards(cards);
  };

  useEffect(() => {
    if (!instanceDetails) fetchDetails();
    if (!!instanceDetails && !instanceCards) createCards();
  }, [instanceDetails, instanceCards]);

  return (
    <div>
      <div>InstanceContainer</div>
      {instanceCards}
    </div>
  );
};

export default InstanceContainer;
