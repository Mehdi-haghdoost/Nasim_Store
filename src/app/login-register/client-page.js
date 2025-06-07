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
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import { authTypes } from "../../utils/constans";

export default function ClientPage() {
  const [authType, setAuthType] = useState(authTypes.LOGIN);
  const [isClient, setIsClient] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    if (!isClient) return;

    const checkAuthentication = async () => {
      try {
        // تست مستقیم GraphQL برای چک کردن authentication
        const response = await fetch(
          process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://nasim-backend.up.railway.app/graphql',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                query Me {
                  me {
                    _id
                    username
                  }
                }
              `
            }),
            credentials: 'include'
          }
        );

        const result = await response.json();

        if (result.data && result.data.me) {
          console.log('کاربر قبلاً لاگین شده، هدایت به صفحه اصلی...');
          router.push('/');
          return;
        }
      } catch (error) {
        console.log('کاربر لاگین نیست');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [isClient, router]);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showLoginForm = () => setAuthType(authTypes.LOGIN);

  // تا client side hydration کامل نشود، loading نمایش می‌دهیم
  if (!isClient || isCheckingAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">در حال بارگذاری...</span>
          </div>
          <p className="text-muted">
            {!isClient ? "در حال آماده‌سازی صفحه..." : "در حال بررسی احراز هویت..."}
          </p>
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