"use client";
import React, { useState } from 'react';
import Login from '@/components/templates/login-register/Login'
import Register from '@/components/templates/login-register/Register'
import { authTypes } from "../../utils/constans";

function page() {
  const [authtype,setAuthType] = useState(authTypes.LOGIN);
  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showLoginForm = () => setAuthType(authTypes.LOGIN);
  return (
    <>
    {authtype === authTypes.LOGIN ? (
      <Login showRegisterForm={showRegisterForm} />
    ) : (
      <Register showLoginForm={showLoginForm} />
    )}
    </>
  )
}

export default page