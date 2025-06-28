"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import { authTypes } from "../../utils/constans";

export default function ClientPage() {
  const [authType, setAuthType] = useState(authTypes.LOGIN);
  const [canRender, setCanRender] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const quickCheck = async () => {
      try {
        const response = await fetch('https://nasim-backend.up.railway.app/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `{ me { _id } }` }),
          credentials: 'include'
        });

        const result = await response.json();
        
        if (result.data?.me) {
          router.replace('/');
          return;
        }
      } catch (error) {
        // خطا = لاگین نیست
      }
      
      setCanRender(true);
      setIsChecking(false);
    };

    quickCheck();
  }, [router]);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showLoginForm = () => setAuthType(authTypes.LOGIN);

  // تا چک نشده، فقط یه صفحه خالی نشون بده
  if (isChecking || !canRender) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ color: '#6c757d' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {authType === authTypes.LOGIN ? (
        <Login showRegisterForm={showRegisterForm} />
      ) : (
        <Register showLoginForm={showLoginForm} />
      )}
    </>
  );
}