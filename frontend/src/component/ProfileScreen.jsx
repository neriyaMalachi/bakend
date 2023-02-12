import { Store } from "../Store";
import {Helmet} from 'react-helmet-async'
import { useContext, useState } from "react";
import {
    FormControl,
    FormLabel,
}from '@chakra-ui/react'
function ProfileScreen() {
const [name,setName]=useState(userInfo.name);
const [email,setEmail]=useState(userInfo.email);
const [password,setPassword]=useState('');
const [confirmPassword,setConfirmPassword]=useState('');

const submitHandler =async()=>{

}



  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;


  return( 
  <>
  <Helmet>
    <title>User Profile</title>
  </Helmet>

  <h1>User Profile</h1>
<form onSubmit={submitHandler}>

<FormLabel>Name</FormLabel>
<FormControl 
value={name}
onChange={(e)=> setName(e.target.value)}
required
/>



<FormLabel>Email</FormLabel>
<FormControl 
value={email}
onChange={(e)=> setEmail(e.target.value)}
required
/>

<FormLabel>Password</FormLabel>
<FormControl 
value={password}
onChange={(e)=> setPassword(e.target.value)}
required
/>



<FormLabel>confirm Password</FormLabel>
<FormControl 
value={confirmPassword}
onChange={(e)=> setConfirmPassword(e.target.value)}
required
/>
</form>
  </>
  )}

export default ProfileScreen;
