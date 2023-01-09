import { Spinner } from '@chakra-ui/react'
import React from 'react'

function LoadingBox() {
  return (
   <Spinner animation="border" role="status">
    <span  >Loading...</span>
   </Spinner>
  );
}

export default LoadingBox