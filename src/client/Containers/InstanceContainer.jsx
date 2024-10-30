import React from 'react';
import { useEffect, useState, useContext } from 'react';

import InstanceCard from '../Components/InstanceCard.jsx';
import { InstanceContext } from '../App.jsx';
import { SearchBarContext } from './MainContainer.jsx';

// IntanceContainer renders from OverviewManagementPage
const InstanceContainer = () => {
  const { fetchDetails, instanceDetails, setInstanceDetails } =
    useContext(InstanceContext);
  const { search } = useContext(SearchBarContext);

  let [instanceCards, setInstanceCards] = useState(null);
  console.log(instanceDetails);

  const createCards = () => {
    const cards = [];
    const colors = [
      '#4e79a7',
      '#f28e2c',
      '#e15759',
      '#76b7b2',
      '#59a14f',
      '#edc949',
      '#af7aa1',
      '#ff9da7',
      '#9c755f',
      '#bab0ab',
    ];

    // searching
    if (search.length === 0) {
      console.log('no search');
      for (let i = 0; i < instanceDetails.length; i++) {
        const nameTag = instanceDetails[i].tags.find(
          (tag) => tag.Key === 'Name'
        );
        const name = nameTag ? nameTag.Value : 'Unnamed Instance';
        const colorIndex = i >= colors.length ? i % colors.length : i;
        cards.push(
          <InstanceCard
            key={instanceDetails[i].instanceId}
            name={name}
            instanceId={instanceDetails[i].instanceId}
            chartColor={colors[colorIndex]}
          />
        );
      }
    } else {
      console.log('searching');
      for (let i = 0; i < instanceDetails.length; i++) {
        const nameTag = instanceDetails[i].tags.find(
          (tag) => tag.Key === 'Name'
        );
        const name = nameTag ? nameTag.Value : null;
        const colorIndex = i >= colors.length ? i % colors.length : i;
        if (
          instanceDetails[i].instanceId
            .toUpperCase()
            .includes(search.toUpperCase()) ||
          name.toUpperCase().includes(search.toUpperCase())
        ) {
          cards.push(
            <InstanceCard
              key={instanceDetails[i].instanceId}
              name={name}
              instanceId={instanceDetails[i].instanceId}
              chartColor={colors[colorIndex]}
            />
          );
        }
      }
    }
    setInstanceCards(cards);
  };

  useEffect(() => {
    if (!instanceDetails) fetchDetails();
    if (!!instanceDetails) createCards();
  }, [instanceDetails, search]);

  return (
    <div className='container grid px-6 mx-auto'>
      <div className='grid gap-6 mb-8 md:grid-cols-2'>{instanceCards}</div>
    </div>
  );
};

export default InstanceContainer;
