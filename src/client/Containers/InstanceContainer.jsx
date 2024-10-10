import React from 'react'
import { useLocation } from 'react-router-dom';

import InstanceCard from '../Components/InstanceCard.jsx';

// fill it with as many instance cards as we have instances
// so we need an array of our instances, and then render the array
// need to retrieve list of instances from the backend, then for each instance, create an instance card passing in necessary info as props

// regardless of page, we will always be fetching the array of instances
// based on the page, we want to pass in different props to our instance cards
// we can use useLocation to find the current react router url
// we can save a local state of what url location we are at, and when that state changes (use useEffect)
// pass that state as props to the instance card.

// IntanceContainer renders from OverviewManagementPage
const InstanceContainer = () => {
  // fetch array of instances from backend
  // for each instance in array, create an instance card passing in appropriate props.

  return (
    <div>
    <div>InstanceContainer</div>
    <InstanceCard />
    {/* {instance cards} */}
    </div>
  )
}

export default InstanceContainer