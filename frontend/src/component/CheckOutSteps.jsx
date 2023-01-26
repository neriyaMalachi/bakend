import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

function CheckOutSteps(props) {
  return (
<>
<Tabs variant='enclosed'>
  <TabList>
    <Tab className={props.step1 ? 'activ': ''} >Sign-in</Tab>
    <Tab className={props.step2 ? 'activ': ''}>shopping</Tab>
    <Tab className={props.step3 ? 'activ': ''}>Payment</Tab>
    <Tab className={props.step4 ? 'activ': ''}>Place Order</Tab>

  </TabList>
  <TabPanels>
    <TabPanel>
      <p>Sign-in!</p>
    </TabPanel>
    <TabPanel>
      <p>shopping!</p>
    </TabPanel>
    <TabPanel>
      <p>Payment!</p>
    </TabPanel>
    <TabPanel>
      <p>Place Order!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
</>
    )
}

export default CheckOutSteps