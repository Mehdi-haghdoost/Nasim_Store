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
  const router = useRouter();

  // اطمینان از اینکه در client side هستیم
  useEffect(() => {
    setIsClient(true);
  }, []);

  // چک کردن authentication بلافاصله بعد از client ready شدن
  useEffect(() => {
    if (!isClient) return;

    const quickAuthCheck = async () => {
      try {
        const response = await fetch('https://nasim-backend.up.railway.app/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query Me { me { _id } }`
          }),
          credentials: 'include'
        });

        const result = await response.json();
        
        if (result.data && result.data.me) {
          // کاربر لاگین است، فوراً redirect
          router.replace('/');
        }
      } catch (error) {
        // خطا = کاربر لاگین نیست، صفحه را نمایش بده
      }
    };

    quickAuthCheck();
  }, [isClient, router]);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showLoginForm = () => setAuthType(authTypes.LOGIN);

  // تا client side hydration کامل نشود، loading نمایش می‌دهیم
  if (!isClient) {
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

