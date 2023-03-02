import { Box, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'

function AddUser() {
  const submitHandler =()=>{
    
  }
  return (
  <form onSubmit={submitHandler} >
    <Box >
    <Text>AddUser</Text>

    <Stack spacing={3}>
  <Input placeholder='name' />
  <Input
    placeholder='email'
  />
  <Input
    color='teal'
    placeholder='password'
  />
  <Input
    color='white'
    placeholder='isAdmin'
  />
</Stack>
</Box>
</form>
  )
}

export default AddUser