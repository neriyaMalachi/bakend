import { Box, Input, Stack, Text } from '@chakra-ui/react'
import React from 'react'

function AddUser() {
  return (
    <Box >
    <Text>AddUser</Text>

    <Stack spacing={3}>
  <Input placeholder='name' />
  <Input
    placeholder='email'
    _placeholder={{ opacity: 1, color: 'gray.500' }}
  />
  <Input
    color='teal'
    placeholder='password'
    _placeholder={{ color: 'inherit' }}
  />
  <Input
    color='white'
    placeholder='isAdmin'
    _placeholder={{ opacity: 0.4, color: 'inherit' }}
  />
</Stack>
</Box>
  )
}

export default AddUser