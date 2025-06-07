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
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import { authTypes } from "../../utils/constans";

export default function ClientPage() {
  const [authType, setAuthType] = useState(authTypes.LOGIN);
  const [isClient, setIsClient] = useState(false);

  // اطمینان از اینکه در client side هستیم
  useEffect(() => {
    setIsClient(true);
  }, []);

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