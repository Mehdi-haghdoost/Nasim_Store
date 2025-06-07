// "use client";
// import React, { useState, useEffect } from "react";
// import Login from "@/components/templates/login-register/Login";
// import Register from "@/components/templates/login-register/Register";
// import { authTypes } from "../../utils/constans";

// export default function ClientPage() {
//   const [authType, setAuthType] = useState(authTypes.LOGIN);
//   const [isClient, setIsClient] = useState(false);

//   // اطمینان از اینکه در client side هستیم
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const showRegisterForm = () => setAuthType(authTypes.REGISTER);
//   const showLoginForm = () => setAuthType(authTypes.LOGIN);

//   // تا client side hydration کامل نشود، loading نمایش می‌دهیم
//   if (!isClient) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="text-center">
//           <div className="spinner-border text-primary mb-3" role="status">
//             <span className="visually-hidden">در حال بارگذاری...</span>
//           </div>
//           <p className="text-muted">در حال آماده‌سازی صفحه...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {authType === authTypes.LOGIN ? (
//         <Login showRegisterForm={showRegisterForm} />
//       ) : (
//         <Register showLoginForm={showLoginForm} />
//       )}
//     </>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import { authTypes } from "../../utils/constans";
import { checkAuth } from "@/Redux/actions/authThunks";

export default function ClientPage() {
  const [authType, setAuthType] = useState(authTypes.LOGIN);
  const [isClient, setIsClient] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // اطمینان از اینکه در client side هستیم
  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    if (!isClient || hasCheckedAuth) return;

    const performAuthCheck = async () => {

      if (isAuthenticated && user) {
        console.log('کاربر در Redux لاگین است، هدایت به صفحه اصلی');
        router.replace('/');
        return;
      }


      const hasRefreshToken = document.cookie.includes('refreshToken=') && 
                            !document.cookie.includes('refreshToken=;') &&
                            !document.cookie.includes('refreshToken=undefined');

      if (hasRefreshToken) {
        console.log('Refresh token موجود است، چک کردن authentication...');
        try {
          const result = await dispatch(checkAuth());
          if (result.payload && result.payload.user) {
            console.log('Authentication موفق، هدایت به صفحه اصلی');
            router.replace('/');
            return;
          }
        } catch (error) {
          console.log('Authentication ناموفق:', error);
        }
      }
      setHasCheckedAuth(true);
    };

    performAuthCheck();
  }, [isClient, isAuthenticated, user, dispatch, router, hasCheckedAuth]);


  useEffect(() => {
    if (hasCheckedAuth && isAuthenticated && user) {
      console.log('کاربر authenticate شد، هدایت به صفحه اصلی');
      router.replace('/');
    }
  }, [isAuthenticated, user, hasCheckedAuth, router]);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showLoginForm = () => setAuthType(authTypes.LOGIN);


  if (!isClient || !hasCheckedAuth || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">در حال بارگذاری...</span>
          </div>
          <p className="text-muted">در حال آماده‌سازی صفحه...</p>
        </div>
      </div>
    );
  }


  if (isAuthenticated && user) {
    return null;
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