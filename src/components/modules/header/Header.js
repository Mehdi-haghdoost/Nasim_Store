// // "use client";

// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { refreshToken } from '@/Redux/actions/authThunks';
// // import { filterProducts } from '@/Redux/actions/filterThunks';
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';
// // import { useCategory } from '@/Redux/hooks/useCategory';
// // import { useFilter } from '@/Redux/hooks/useFilter';
// // import styles from './Header.module.css';
// // import MegaMenu from './MegaMenu';
// // import AuthHeader from './AuthHeader';
// // import ShoppingCart from '../CartOffcanvas/ShoppingCart';

// // function Header() {
// //   const dispatch = useDispatch();
// //   const router = useRouter();
// //   const { categories, loading, error } = useCategory();

// //   const { updateSearchTerm, updateCategories } = useFilter();

// //   const { user, isAuthenticated } = useSelector((state) => state.auth);
// //   const { items: cartItems, totalQuantity } = useSelector((state) => state.cart);

// //   const [activeHamburger, setActiveHamburger] = useState(false);
// //   const [activeSubMenu, setActiveSubMenu] = useState({});
// //   const [isShowBascket, setIsShowBascket] = useState(false);

// //   const [desktopSearchTerm, setDesktopSearchTerm] = useState('');
// //   const [mobileSearchTerm, setMobileSearchTerm] = useState('');

// //   useEffect(() => {
// //     if (!user) {
// //       dispatch(refreshToken());
// //     }
// //   }, [dispatch, user]);

// //   const showBascket = () => {
// //     setIsShowBascket((prev) => !prev);
// //   };

// //   const handleItemCheck = (index) => {
// //     setActiveSubMenu({
// //       ...activeSubMenu,
// //       [index]: !activeSubMenu[index],
// //     });
// //   };

// //   const handleSearch = (searchTerm, isDesktop = true) => {
// //     const trimmedSearchTerm = searchTerm.trim();

// //     if (trimmedSearchTerm) {
// //       updateSearchTerm(trimmedSearchTerm);
// //       updateCategories([]);

// //       router.push(`/categories?search=${encodeURIComponent(trimmedSearchTerm)}`);

// //       dispatch(filterProducts());

// //       if (isDesktop) {
// //         setDesktopSearchTerm('');
// //       } else {
// //         setMobileSearchTerm('');
// //         setActiveHamburger(false);
// //       }
// //     }
// //   };

// //   const handleDesktopSearch = (e) => {
// //     e.preventDefault();
// //     handleSearch(desktopSearchTerm, true);
// //   };

// //   const handleMobileSearch = (e) => {
// //     e.preventDefault();
// //     handleSearch(mobileSearchTerm, false);
// //   };

// //   const handleKeyPress = (e, searchTerm, isDesktop = true) => {
// //     if (e.key === 'Enter') {
// //       e.preventDefault();
// //       handleSearch(searchTerm, isDesktop);
// //     }
// //   };

// //   const categoryMap = categories.reduce((acc, category) => {
// //     acc[category.name] = category._id;
// //     return acc;
// //   }, {});

// //   const headerCategories = [
// //     { name: 'تلفن همراه', displayName: 'گوشی موبایل' },
// //     { name: 'لوازم جانبی', displayName: 'لوازم جانبی' }, 
// //     { name: 'لپتاپ', displayName: 'لپتاپ' }, 
// //   ];

// //   return (
// //     <header className={styles.header} style={{ minHeight: '100px' }}>
// //       <nav className="container-fluid">
// //         <div className="row align-items-center">
// //           <div className="col-lg-1 col-6 order-lg-1 order-1">
// //             <div className="d-flex align-items-center">
// //               <div className="d-block d-lg-none">
// //                 <i
// //                   type="button"
// //                   onClick={() => setActiveHamburger(true)}
// //                   className="bi bi-list font-30"
// //                 ></i>
// //                 <div
// //                   className={
// //                     activeHamburger
// //                       ? styles.hamburger_menu_show
// //                       : styles.hamburger_menu_hidden
// //                   }
// //                 >
// //                   <div className={styles.hamburger_menu_header}>
// //                     <h5 className="hamburger_menu_title">فروشگاه نسیم استور</h5>
// //                     <button
// //                       onClick={() => setActiveHamburger(false)}
// //                       className={`btn-close ${styles.hamburger_btn_close}`}
// //                     ></button>
// //                   </div>
// //                   <div className={styles.hamburger_body}>
// //                     <a href="/" className="text-center d-block mb-3">
// //                       <img
// //                         className="img-fluid"
// //                         width="200"
// //                         src="/images/logo.png"
// //                         alt="logo"
// //                       />
// //                     </a>
// //                     <div className="hamburger_body_bottom_form">
// //                       <div className={styles.search_form}>
// //                         <form onSubmit={handleMobileSearch}>
// //                           <div className={styles.search_field}>
// //                             <input
// //                               placeholder="جستجوی محصولات ..."
// //                               type="text"
// //                               className={`form-control ${styles.search_input}`}
// //                               value={mobileSearchTerm}
// //                               onChange={(e) => setMobileSearchTerm(e.target.value)}
// //                               onKeyPress={(e) => handleKeyPress(e, mobileSearchTerm, false)}
// //                             />
// //                             <button
// //                               type="submit"
// //                               className={`btn ${styles.search_btn} main-color-one-bg rounded-pill`}
// //                             >
// //                               <i className="bi bi-search"></i>
// //                             </button>
// //                           </div>
// //                         </form>
// //                       </div>
// //                     </div>
// //                     <ul className={`navbar-nav ${styles.hamburger_navbar}`}>
// //                       <li className={`nav-item ${styles.hamburger_navbar_item}`}>
// //                         <Link href="/" className="nav-link">
// //                           صفحه اصلی
// //                         </Link>
// //                       </li>

// //                       {headerCategories.map((category, index) => {
// //                         const categoryId = categoryMap[category.name];
// //                         return (
// //                           <li key={category.name} className={`nav-item ${styles.hamburger_navbar_item}`}>
// //                             <Link
// //                               href={categoryId ? `/categories?categoryId=${categoryId}` : '#'}
// //                               className="nav-link"
// //                               onClick={() => {
// //                                 setActiveHamburger(false);
// //                               }}
// //                             >
// //                               {category.displayName}
// //                             </Link>
// //                           </li>
// //                         );
// //                       })}
// //                     </ul>
// //                   </div>
// //                 </div>
// //                 <div
// //                   className={
// //                     activeHamburger
// //                       ? styles.hamburger_backdrop
// //                       : styles.hamburger_backdrop_hidden
// //                   }
// //                 ></div>
// //               </div>
// //               <div>
// //                 <Link href="/">
// //                   <div className="logo">
// //                     <img
// //                       className="img-fluid"
// //                       src="/images/logo.png"
// //                       alt="logo"
// //                     />
// //                   </div>
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="d-lg-none d-block col-6 order-lg-5 order-2">
// //             <div className="d-flex align-items-center justify-content-end">
// //               <div
// //                 className={styles.avatar}
// //                 onClick={() => handleItemCheck(15)}
// //               >
// //                 {isAuthenticated && user ? (
// //                   <span
// //                     className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill`}
// //                   >
// //                     <i className="bi bi-person-circle font-20 text-muted me-1"></i>
// //                     {user.username || 'کاربر'}
// //                   </span>
// //                 ) : (
// //                   <Link
// //                     href="/login-register"
// //                     className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill`}
// //                   >
// //                     <i className="bi bi-person-circle font-20 text-muted me-1"></i>
// //                     <span>ورود</span>
// //                   </Link>
// //                 )}
// //                 <ul
// //                   className={`navbar-nav ${activeSubMenu[15]
// //                     ? styles.avatar_dropdown_show
// //                     : styles.avatar_dropdown_hide
// //                     }`}
// //                 >
// //                   <li>
// //                     <Link href="/p-user" className={styles.avatar_dropdown_item}>
// //                       <i className="bi bi-house-door"></i>پروفایل
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link href="/p-user/orders" className={styles.avatar_dropdown_item}>
// //                       <i className="bi bi-cart-check"></i>سفارش‌های من
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link href="/p-user/wishlists" className={styles.avatar_dropdown_item}>
// //                       <i className="bi bi-heart"></i>محصولات مورد علاقه
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <button onClick={() => {
// //                       handleItemCheck(15);
// //                     }} className={styles.avatar_dropdown_item}>
// //                       <i className="bi bi-arrow-right-square"></i>خروج از حساب کاربری
// //                     </button>
// //                   </li>
// //                 </ul>
// //               </div>
// //               <button
// //                 onClick={showBascket}
// //                 className={`btn btn-light shadow-sm ${styles.action_link}`}
// //                 style={{ position: 'relative' }}
// //               >
// //                 <i className="bi bi-basket font-30"></i>
// //                 {totalQuantity > 0 && (
// //                   <span className={`${styles.header_cart_counter} main-color-one-bg rounded-pill`}>
// //                     {totalQuantity}
// //                   </span>
// //                 )}
// //               </button>
// //             </div>
// //           </div>

// //           <div className="col-lg-7 order-lg-2 d-lg-block d-none">
// //             <div className="search-form">
// //               <form onSubmit={handleDesktopSearch}>
// //                 <div className={styles.search_field}>
// //                   <input
// //                     type="text"
// //                     placeholder="جستجوی محصولات ..."
// //                     className={`form-control ${styles.search_input}`}
// //                     value={desktopSearchTerm}
// //                     onChange={(e) => setDesktopSearchTerm(e.target.value)}
// //                     onKeyPress={(e) => handleKeyPress(e, desktopSearchTerm, true)}
// //                   />
// //                   <button
// //                     type="submit"
// //                     className={`btn main-color-one-bg ${styles.search_btn} rounded-pill`}
// //                   >
// //                     <i className="bi bi-search"></i>
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>

// //           <AuthHeader showBascket={showBascket} />
// //         </div>

// //         <MegaMenu />
// //       </nav>
// //       {isShowBascket && (
// //         <ShoppingCart
// //           isShowBascket={isShowBascket}
// //           showBascket={showBascket}
// //         />
// //       )}
// //     </header>
// //   );
// // }

// // export default Header;

// "use client";

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { refreshToken, logoutUser } from '@/Redux/actions/authThunks';
// import { filterProducts } from '@/Redux/actions/filterThunks';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useCategory } from '@/Redux/hooks/useCategory';
// import { useFilter } from '@/Redux/hooks/useFilter';
// import styles from './Header.module.css';
// import MegaMenu from './MegaMenu';
// import AuthHeader from './AuthHeader';
// import ShoppingCart from '../CartOffcanvas/ShoppingCart';

// function Header() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { categories, loading, error } = useCategory();

//   const { updateSearchTerm, updateCategories } = useFilter();

//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const { items: cartItems, totalQuantity } = useSelector((state) => state.cart);

//   const [activeHamburger, setActiveHamburger] = useState(false);
//   const [activeSubMenu, setActiveSubMenu] = useState({});
//   const [isShowBascket, setIsShowBascket] = useState(false);

//   const [desktopSearchTerm, setDesktopSearchTerm] = useState('');
//   const [mobileSearchTerm, setMobileSearchTerm] = useState('');

//   useEffect(() => {
//     if (!user) {
//       dispatch(refreshToken());
//     }
//   }, [dispatch, user]);

//   const showBascket = () => {
//     setIsShowBascket((prev) => !prev);
//   };

//   const handleItemCheck = (index) => {
//     setActiveSubMenu({
//       ...activeSubMenu,
//       [index]: !activeSubMenu[index],
//     });
//   };

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser());
//       setActiveSubMenu({});
//       setActiveHamburger(false);
//       router.push('/');
//     } catch (error) {
//       console.error('خطا در خروج:', error);
//     }
//   };

//   const handleSearch = (searchTerm, isDesktop = true) => {
//     const trimmedSearchTerm = searchTerm.trim();

//     if (trimmedSearchTerm) {
//       updateSearchTerm(trimmedSearchTerm);
//       updateCategories([]);

//       router.push(`/categories?search=${encodeURIComponent(trimmedSearchTerm)}`);

//       dispatch(filterProducts());

//       if (isDesktop) {
//         setDesktopSearchTerm('');
//       } else {
//         setMobileSearchTerm('');
//         setActiveHamburger(false);
//       }
//     }
//   };

//   const handleDesktopSearch = (e) => {
//     e.preventDefault();
//     handleSearch(desktopSearchTerm, true);
//   };

//   const handleMobileSearch = (e) => {
//     e.preventDefault();
//     handleSearch(mobileSearchTerm, false);
//   };

//   const handleKeyPress = (e, searchTerm, isDesktop = true) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSearch(searchTerm, isDesktop);
//     }
//   };

//   const categoryMap = categories.reduce((acc, category) => {
//     acc[category.name] = category._id;
//     return acc;
//   }, {});

//   const headerCategories = [
//     { name: 'تلفن همراه', displayName: 'گوشی موبایل' },
//     { name: 'لوازم جانبی', displayName: 'لوازم جانبی' }, 
//     { name: 'لپتاپ', displayName: 'لپتاپ' }, 
//   ];

//   return (
//     <header className={styles.header} style={{ minHeight: '100px' }}>
//       <nav className="container-fluid">
//         <div className="row align-items-center">
//           <div className="col-lg-1 col-6 order-lg-1 order-1">
//             <div className="d-flex align-items-center">
//               <div className="d-block d-lg-none">
//                 <i
//                   type="button"
//                   onClick={() => setActiveHamburger(true)}
//                   className="bi bi-list font-30"
//                 ></i>
//                 <div
//                   className={
//                     activeHamburger
//                       ? styles.hamburger_menu_show
//                       : styles.hamburger_menu_hidden
//                   }
//                 >
//                   <div className={styles.hamburger_menu_header}>
//                     <h5 className="hamburger_menu_title">فروشگاه نسیم استور</h5>
//                     <button
//                       onClick={() => setActiveHamburger(false)}
//                       className={`btn-close ${styles.hamburger_btn_close}`}
//                     ></button>
//                   </div>
//                   <div className={styles.hamburger_body}>
//                     <a href="/" className="text-center d-block mb-3">
//                       <img
//                         className="img-fluid"
//                         width="200"
//                         src="/images/logo.png"
//                         alt="logo"
//                       />
//                     </a>
//                     <div className="hamburger_body_bottom_form">
//                       <div className={styles.search_form}>
//                         <form onSubmit={handleMobileSearch}>
//                           <div className={styles.search_field}>
//                             <input
//                               placeholder="جستجوی محصولات ..."
//                               type="text"
//                               className={`form-control ${styles.search_input}`}
//                               value={mobileSearchTerm}
//                               onChange={(e) => setMobileSearchTerm(e.target.value)}
//                               onKeyPress={(e) => handleKeyPress(e, mobileSearchTerm, false)}
//                             />
//                             <button
//                               type="submit"
//                               className={`btn ${styles.search_btn} main-color-one-bg rounded-pill`}
//                             >
//                               <i className="bi bi-search"></i>
//                             </button>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                     <ul className={`navbar-nav ${styles.hamburger_navbar}`}>
//                       <li className={`nav-item ${styles.hamburger_navbar_item}`}>
//                         <Link href="/" className="nav-link">
//                           صفحه اصلی
//                         </Link>
//                       </li>

//                       {headerCategories.map((category, index) => {
//                         const categoryId = categoryMap[category.name];
//                         return (
//                           <li key={category.name} className={`nav-item ${styles.hamburger_navbar_item}`}>
//                             <Link
//                               href={categoryId ? `/categories?categoryId=${categoryId}` : '#'}
//                               className="nav-link"
//                               onClick={() => {
//                                 setActiveHamburger(false);
//                               }}
//                             >
//                               {category.displayName}
//                             </Link>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 </div>
//                 <div
//                   className={
//                     activeHamburger
//                       ? styles.hamburger_backdrop
//                       : styles.hamburger_backdrop_hidden
//                   }
//                   onClick={() => setActiveHamburger(false)}
//                 ></div>
//               </div>
//               <div>
//                 <Link href="/">
//                   <div className="logo">
//                     <img
//                       className="img-fluid"
//                       src="/images/logo.png"
//                       alt="logo"
//                     />
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="d-lg-none d-block col-6 order-lg-5 order-2">
//             <div className="d-flex align-items-center justify-content-end">
//               <div className={styles.avatar}>
//                 {isAuthenticated && user ? (
//                   <>
//                     <span
//                       className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill ms-4`}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         handleItemCheck(15);
//                       }}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <i className="bi bi-person-circle font-20 text-muted ms-1"></i>
//                       {user.username || 'کاربر'}
//                     </span>

//                     <ul
//                       className={`navbar-nav ${activeSubMenu[15]
//                         ? styles.avatar_dropdown_show
//                         : styles.avatar_dropdown_hide
//                         }`}
//                     >
//                       <li>
//                         <Link 
//                           href="/p-user" 
//                           className={styles.avatar_dropdown_item}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setActiveHamburger(false);
//                             handleItemCheck(15);
//                           }}
//                         >
//                           <i className="bi bi-house-door"></i>پروفایل
//                         </Link>
//                       </li>
//                       <li>
//                         <Link 
//                           href="/p-user/orders" 
//                           className={styles.avatar_dropdown_item}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setActiveHamburger(false);
//                             handleItemCheck(15);
//                           }}
//                         >
//                           <i className="bi bi-cart-check"></i>سفارش‌های من
//                         </Link>
//                       </li>
//                       <li>
//                         <Link 
//                           href="/p-user/wishlists" 
//                           className={styles.avatar_dropdown_item}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setActiveHamburger(false);
//                             handleItemCheck(15);
//                           }}
//                         >
//                           <i className="bi bi-heart"></i>محصولات مورد علاقه
//                         </Link>
//                       </li>
//                       <li>
//                         <button 
//                           onClick={(e) => {
//                             e.preventDefault();
//                             e.stopPropagation();
//                             handleLogout();
//                           }} 
//                           className={styles.avatar_dropdown_item}
//                           style={{ width: '100%', textAlign: 'right', border: 'none', background: 'none' }}
//                         >
//                           <i className="bi bi-arrow-right-square"></i>خروج از حساب کاربری
//                         </button>
//                       </li>
//                     </ul>
//                   </>
//                 ) : (
//                   <Link
//                     href="/login-register"
//                     className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill ms-4`}
//                   >
//                     <i className="bi bi-person-circle font-20 text-muted ms-1"></i>
//                     <span>ورود</span>
//                   </Link>
//                 )}
//               </div>

//               <button
//                 onClick={showBascket}
//                 className={`btn btn-light shadow-sm ${styles.action_link}`}
//                 style={{ position: 'relative' }}
//               >
//                 <i className="bi bi-basket font-30"></i>
//                 {totalQuantity > 0 && (
//                   <span className={`${styles.header_cart_counter} main-color-one-bg rounded-pill`}>
//                     {totalQuantity}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="col-lg-7 order-lg-2 d-lg-block d-none">
//             <div className="search-form">
//               <form onSubmit={handleDesktopSearch}>
//                 <div className={styles.search_field}>
//                   <input
//                     type="text"
//                     placeholder="جستجوی محصولات ..."
//                     className={`form-control ${styles.search_input}`}
//                     value={desktopSearchTerm}
//                     onChange={(e) => setDesktopSearchTerm(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, desktopSearchTerm, true)}
//                   />
//                   <button
//                     type="submit"
//                     className={`btn main-color-one-bg ${styles.search_btn} rounded-pill`}
//                   >
//                     <i className="bi bi-search"></i>
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           <AuthHeader showBascket={showBascket} />
//         </div>

//         <MegaMenu />
//       </nav>

//       {/* Backdrop برای بستن dropdown موبایل */}
//       {activeSubMenu[15] && (
//         <div 
//           className={styles.avatar_backdrop}
//           onClick={() => handleItemCheck(15)}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             zIndex: 999
//           }}
//         />
//       )}

//       {isShowBascket && (
//         <ShoppingCart
//           isShowBascket={isShowBascket}
//           showBascket={showBascket}
//         />
//       )}
//     </header>
//   );
// }

// export default Header;


// "use client";

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { refreshToken, logoutUser } from '@/Redux/actions/authThunks';
// import { filterProducts } from '@/Redux/actions/filterThunks';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useCategory } from '@/Redux/hooks/useCategory';
// import { useFilter } from '@/Redux/hooks/useFilter';
// import styles from './Header.module.css';
// import MegaMenu from './MegaMenu';
// import AuthHeader from './AuthHeader';
// import ShoppingCart from '../CartOffcanvas/ShoppingCart';

// function Header() {
//   const dispatch = useDispatch();
//   const router = useRouter();
  
//   // Redux hooks - همیشه فراخوانی میشن ولی محافظت میشن
//   const categoryHook = useCategory();
//   const filterHook = useFilter();
//   const authState = useSelector((state) => state.auth || { user: null, isAuthenticated: false });
//   const cartState = useSelector((state) => state.cart || { items: [], totalQuantity: 0 });

//   // State های کامپوننت
//   const [mounted, setMounted] = useState(false);
//   const [activeHamburger, setActiveHamburger] = useState(false);
//   const [activeSubMenu, setActiveSubMenu] = useState({});
//   const [isShowBascket, setIsShowBascket] = useState(false);
//   const [desktopSearchTerm, setDesktopSearchTerm] = useState('');
//   const [mobileSearchTerm, setMobileSearchTerm] = useState('');

//   // Safe data - فقط بعد از mount استفاده میشه
//   const categories = mounted ? (categoryHook?.categories || []) : [];
//   const { updateSearchTerm, updateCategories } = mounted ? filterHook : { updateSearchTerm: () => {}, updateCategories: () => {} };
//   const { user, isAuthenticated } = mounted ? authState : { user: null, isAuthenticated: false };
//   const { items: cartItems, totalQuantity } = mounted ? cartState : { items: [], totalQuantity: 0 };

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (mounted && !user) {
//       dispatch(refreshToken());
//     }
//   }, [dispatch, user, mounted]);

//   const showBascket = () => {
//     setIsShowBascket((prev) => !prev);
//   };

//   const handleItemCheck = (index) => {
//     setActiveSubMenu({
//       ...activeSubMenu,
//       [index]: !activeSubMenu[index],
//     });
//   };

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser());
//       setActiveSubMenu({});
//       setActiveHamburger(false);
//       router.push('/');
//     } catch (error) {
//       console.error('خطا در خروج:', error);
//     }
//   };

//   const handleSearch = (searchTerm, isDesktop = true) => {
//     if (!mounted) return;

//     const trimmedSearchTerm = searchTerm.trim();

//     if (trimmedSearchTerm) {
//       updateSearchTerm(trimmedSearchTerm);
//       updateCategories([]);

//       router.push(`/categories?search=${encodeURIComponent(trimmedSearchTerm)}`);

//       dispatch(filterProducts());

//       if (isDesktop) {
//         setDesktopSearchTerm('');
//       } else {
//         setMobileSearchTerm('');
//         setActiveHamburger(false);
//       }
//     }
//   };

//   const handleDesktopSearch = (e) => {
//     e.preventDefault();
//     handleSearch(desktopSearchTerm, true);
//   };

//   const handleMobileSearch = (e) => {
//     e.preventDefault();
//     handleSearch(mobileSearchTerm, false);
//   };

//   const handleKeyPress = (e, searchTerm, isDesktop = true) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSearch(searchTerm, isDesktop);
//     }
//   };

//   // Safe category mapping
//   const categoryMap = mounted && categories.length > 0 ? categories.reduce((acc, category) => {
//     acc[category.name] = category._id;
//     return acc;
//   }, {}) : {};

//   const headerCategories = [
//     { name: 'تلفن همراه', displayName: 'گوشی موبایل' },
//     { name: 'لوازم جانبی', displayName: 'لوازم جانبی' }, 
//     { name: 'لپتاپ', displayName: 'لپتاپ' }, 
//   ];

//   // Loading state
//   if (!mounted) {
//     return (
//       <header className={styles.header} style={{ minHeight: '100px' }}>
//         <nav className="container-fluid">
//           <div className="row align-items-center">
//             <div className="col-lg-1 col-6 order-lg-1 order-1">
//               <div className="d-flex align-items-center">
//                 <div>
//                   <Link href="/">
//                     <div className="logo">
//                       <img
//                         className="img-fluid"
//                         src="/images/logo.png"
//                         alt="logo"
//                       />
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
            
//             <div className="d-lg-none d-block col-6 order-lg-5 order-2">
//               <div className="d-flex align-items-center justify-content-end">
//                 <div className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill ms-4`}>
//                   <i className="bi bi-person-circle font-20 text-muted ms-1"></i>
//                   <span>...</span>
//                 </div>
//                 <button className={`btn btn-light shadow-sm ${styles.action_link}`}>
//                   <i className="bi bi-basket font-30"></i>
//                 </button>
//               </div>
//             </div>

//             <div className="col-lg-7 order-lg-2 d-lg-block d-none">
//               <div className="search-form">
//                 <div className={styles.search_field}>
//                   <input
//                     type="text"
//                     placeholder="جستجوی محصولات ..."
//                     className={`form-control ${styles.search_input}`}
//                     disabled
//                   />
//                   <button
//                     className={`btn main-color-one-bg ${styles.search_btn} rounded-pill`}
//                     disabled
//                   >
//                     <i className="bi bi-search"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     );
//   }

//   return (
//     <header className={styles.header} style={{ minHeight: '100px' }}>
//       <nav className="container-fluid">
//         <div className="row align-items-center">
//           <div className="col-lg-1 col-6 order-lg-1 order-1">
//             <div className="d-flex align-items-center">
//               <div className="d-block d-lg-none">
//                 <i
//                   type="button"
//                   onClick={() => setActiveHamburger(true)}
//                   className="bi bi-list font-30"
//                 ></i>
//                 <div
//                   className={
//                     activeHamburger
//                       ? styles.hamburger_menu_show
//                       : styles.hamburger_menu_hidden
//                   }
//                 >
//                   <div className={styles.hamburger_menu_header}>
//                     <h5 className="hamburger_menu_title">فروشگاه نسیم استور</h5>
//                     <button
//                       onClick={() => setActiveHamburger(false)}
//                       className={`btn-close ${styles.hamburger_btn_close}`}
//                     ></button>
//                   </div>
//                   <div className={styles.hamburger_body}>
//                     <a href="/" className="text-center d-block mb-3">
//                       <img
//                         className="img-fluid"
//                         width="200"
//                         src="/images/logo.png"
//                         alt="logo"
//                       />
//                     </a>
//                     <div className="hamburger_body_bottom_form">
//                       <div className={styles.search_form}>
//                         <form onSubmit={handleMobileSearch}>
//                           <div className={styles.search_field}>
//                             <input
//                               placeholder="جستجوی محصولات ..."
//                               type="text"
//                               className={`form-control ${styles.search_input}`}
//                               value={mobileSearchTerm}
//                               onChange={(e) => setMobileSearchTerm(e.target.value)}
//                               onKeyPress={(e) => handleKeyPress(e, mobileSearchTerm, false)}
//                             />
//                             <button
//                               type="submit"
//                               className={`btn ${styles.search_btn} main-color-one-bg rounded-pill`}
//                             >
//                               <i className="bi bi-search"></i>
//                             </button>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                     <ul className={`navbar-nav ${styles.hamburger_navbar}`}>
//                       <li className={`nav-item ${styles.hamburger_navbar_item}`}>
//                         <Link href="/" className="nav-link">
//                           صفحه اصلی
//                         </Link>
//                       </li>

//                       {headerCategories.map((category, index) => {
//                         const categoryId = categoryMap[category.name];
//                         return (
//                           <li key={category.name} className={`nav-item ${styles.hamburger_navbar_item}`}>
//                             <Link
//                               href={categoryId ? `/categories?categoryId=${categoryId}` : '#'}
//                               className="nav-link"
//                               onClick={() => {
//                                 setActiveHamburger(false);
//                               }}
//                             >
//                               {category.displayName}
//                             </Link>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 </div>
//                 <div
//                   className={
//                     activeHamburger
//                       ? styles.hamburger_backdrop
//                       : styles.hamburger_backdrop_hidden
//                   }
//                   onClick={() => setActiveHamburger(false)}
//                 ></div>
//               </div>
//               <div>
//                 <Link href="/">
//                   <div className="logo">
//                     <img
//                       className="img-fluid"
//                       src="/images/logo.png"
//                       alt="logo"
//                     />
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>

//           <div className="d-lg-none d-block col-6 order-lg-5 order-2">
//             <div className="d-flex align-items-center justify-content-end">
//               <div className={styles.avatar}>
//                 {isAuthenticated && user ? (
//                   <>
//                     <span
//                       className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill ms-4`}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         handleItemCheck(15);
//                       }}
//                       style={{ cursor: 'pointer' }}
//                     >
//                       <i className="bi bi-person-circle font-20 text-muted ms-1"></i>
//                       {user.username || 'کاربر'}
//                     </span>

//                     <ul
//                       className={`navbar-nav ${activeSubMenu[15]
//                         ? styles.avatar_dropdown_show
//                         : styles.avatar_dropdown_hide
//                         }`}
//                     >
//                       <li>
//                         <Link 
//                           href="/p-user" 
//                           className={styles.avatar_dropdown_item}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setActiveHamburger(false);
//                             handleItemCheck(15);
//                           }}
//                         >
//                           <i className="bi bi-house-door"></i>پروفایل
//                         </Link>
//                       </li>
//                       <li>
//                         <Link 
//                           href="/p-user/orders" 
//                           className={styles.avatar_dropdown_item}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setActiveHamburger(false);
//                             handleItemCheck(15);
//                           }}
//                         >
//                           <i className="bi bi-cart-check"></i>سفارش‌های من
//                         </Link>
//                       </li>
//                       <li>
//                         <Link 
//                           href="/p-user/wishlists" 
//                           className={styles.avatar_dropdown_item}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setActiveHamburger(false);
//                             handleItemCheck(15);
//                           }}
//                         >
//                           <i className="bi bi-heart"></i>محصولات مورد علاقه
//                         </Link>
//                       </li>
//                       <li>
//                         <button 
//                           onClick={(e) => {
//                             e.preventDefault();
//                             e.stopPropagation();
//                             handleLogout();
//                           }} 
//                           className={styles.avatar_dropdown_item}
//                           style={{ width: '100%', textAlign: 'right', border: 'none', background: 'none' }}
//                         >
//                           <i className="bi bi-arrow-right-square"></i>خروج از حساب کاربری
//                         </button>
//                       </li>
//                     </ul>
//                   </>
//                 ) : (
//                   <Link
//                     href="/login-register"
//                     className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill ms-4`}
//                   >
//                     <i className="bi bi-person-circle font-20 text-muted ms-1"></i>
//                     <span>ورود</span>
//                   </Link>
//                 )}
//               </div>

//               <button
//                 onClick={showBascket}
//                 className={`btn btn-light shadow-sm ${styles.action_link}`}
//                 style={{ position: 'relative' }}
//               >
//                 <i className="bi bi-basket font-30"></i>
//                 {totalQuantity > 0 && (
//                   <span className={`${styles.header_cart_counter} main-color-one-bg rounded-pill`}>
//                     {totalQuantity}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           <div className="col-lg-7 order-lg-2 d-lg-block d-none">
//             <div className="search-form">
//               <form onSubmit={handleDesktopSearch}>
//                 <div className={styles.search_field}>
//                   <input
//                     type="text"
//                     placeholder="جستجوی محصولات ..."
//                     className={`form-control ${styles.search_input}`}
//                     value={desktopSearchTerm}
//                     onChange={(e) => setDesktopSearchTerm(e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, desktopSearchTerm, true)}
//                   />
//                   <button
//                     type="submit"
//                     className={`btn main-color-one-bg ${styles.search_btn} rounded-pill`}
//                   >
//                     <i className="bi bi-search"></i>
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* AuthHeader و MegaMenu فقط بعد از mount */}
//           {mounted && <AuthHeader showBascket={showBascket} />}
//         </div>

//         {mounted && <MegaMenu />}
//       </nav>

//       {/* Conditional elements فقط بعد از mount */}
//       {mounted && activeSubMenu[15] && (
//         <div 
//           className={styles.avatar_backdrop}
//           onClick={() => handleItemCheck(15)}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             zIndex: 999
//           }}
//         />
//       )}

//       {mounted && isShowBascket && (
//         <ShoppingCart
//           isShowBascket={isShowBascket}
//           showBascket={showBascket}
//         />
//       )}
//     </header>
//   );
// }

// export default Header;

"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken, logoutUser } from '@/Redux/actions/authThunks';
import { filterProducts } from '@/Redux/actions/filterThunks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCategory } from '@/Redux/hooks/useCategory';
import { useFilter } from '@/Redux/hooks/useFilter';
import { useCart } from '@/Redux/hooks/useCart'; // اضافه کردن useCart
import styles from './Header.module.css';
import MegaMenu from './MegaMenu';
import AuthHeader from './AuthHeader';
import ShoppingCart from '../CartOffcanvas/ShoppingCart';

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories, loading, error } = useCategory();
  const { updateSearchTerm, updateCategories } = useFilter();
  
  // استفاده از useCart برای دریافت اطلاعات سبد خرید
  const { items: cartItems, totalQuantity, isReady: cartReady } = useCart();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [activeHamburger, setActiveHamburger] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState({});
  const [isShowBascket, setIsShowBascket] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [desktopSearchTerm, setDesktopSearchTerm] = useState('');
  const [mobileSearchTerm, setMobileSearchTerm] = useState('');

  // اضافه کردن client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !user) {
      dispatch(refreshToken());
    }
  }, [dispatch, user, isClient]);

  // Debug log برای Header
  useEffect(() => {
    if (isClient) {
      console.log('🏠 Header Debug:', {
        isAuthenticated,
        cartItems: cartItems?.length || 0,
        totalQuantity,
        cartReady,
        user: user?.username
      });
    }
  }, [isClient, isAuthenticated, cartItems, totalQuantity, cartReady, user]);

  const showBascket = () => {
    setIsShowBascket((prev) => !prev);
  };

  const handleItemCheck = (index) => {
    setActiveSubMenu({
      ...activeSubMenu,
      [index]: !activeSubMenu[index],
    });
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      setActiveSubMenu({});
      setActiveHamburger(false);
      router.push('/');
    } catch (error) {
      console.error('خطا در خروج:', error);
    }
  };

  const handleSearch = (searchTerm, isDesktop = true) => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm) {
      updateSearchTerm(trimmedSearchTerm);
      updateCategories([]);

      router.push(`/categories?search=${encodeURIComponent(trimmedSearchTerm)}`);

      dispatch(filterProducts());

      if (isDesktop) {
        setDesktopSearchTerm('');
      } else {
        setMobileSearchTerm('');
        setActiveHamburger(false);
      }
    }
  };

  const handleDesktopSearch = (e) => {
    e.preventDefault();
    handleSearch(desktopSearchTerm, true);
  };

  const handleMobileSearch = (e) => {
    e.preventDefault();
    handleSearch(mobileSearchTerm, false);
  };

  const handleKeyPress = (e, searchTerm, isDesktop = true) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchTerm, isDesktop);
    }
  };

  const categoryMap = categories.reduce((acc, category) => {
    acc[category.name] = category._id;
    return acc;
  }, {});

  const headerCategories = [
    { name: 'تلفن همراه', displayName: 'گوشی موبایل' },
    { name: 'لوازم جانبی', displayName: 'لوازم جانبی' }, 
    { name: 'لپتاپ', displayName: 'لپتاپ' }, 
  ];

  // اگر client-side نیست، نمایش ساده
  if (!isClient) {
    return (
      <header className={styles.header} style={{ minHeight: '100px' }}>
        <nav className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-1 col-6 order-lg-1 order-1">
              <div className="d-flex align-items-center">
                <div>
                  <Link href="/">
                    <div className="logo">
                      <img
                        className="img-fluid"
                        src="/images/logo.png"
                        alt="logo"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="d-lg-none d-block col-6 order-lg-5 order-2">
              <div className="d-flex align-items-center justify-content-end">
                <div className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill ms-4`}>
                  <i className="bi bi-person-circle font-20 text-muted ms-1"></i>
                  <span>...</span>
                </div>
                <button className={`btn btn-light shadow-sm ${styles.action_link}`}>
                  <i className="bi bi-basket font-30"></i>
                </button>
              </div>
            </div>

            <div className="col-lg-7 order-lg-2 d-lg-block d-none">
              <div className="search-form">
                <div className={styles.search_field}>
                  <input
                    type="text"
                    placeholder="جستجوی محصولات ..."
                    className={`form-control ${styles.search_input}`}
                    disabled
                  />
                  <button
                    className={`btn main-color-one-bg ${styles.search_btn} rounded-pill`}
                    disabled
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className={styles.header} style={{ minHeight: '100px' }}>
      <nav className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-1 col-6 order-lg-1 order-1">
            <div className="d-flex align-items-center">
              <div className="d-block d-lg-none">
                <i
                  type="button"
                  onClick={() => setActiveHamburger(true)}
                  className="bi bi-list font-30"
                ></i>
                <div
                  className={
                    activeHamburger
                      ? styles.hamburger_menu_show
                      : styles.hamburger_menu_hidden
                  }
                >
                  <div className={styles.hamburger_menu_header}>
                    <h5 className="hamburger_menu_title">فروشگاه نسیم استور</h5>
                    <button
                      onClick={() => setActiveHamburger(false)}
                      className={`btn-close ${styles.hamburger_btn_close}`}
                    ></button>
                  </div>
                  <div className={styles.hamburger_body}>
                    <a href="/" className="text-center d-block mb-3">
                      <img
                        className="img-fluid"
                        width="200"
                        src="/images/logo.png"
                        alt="logo"
                      />
                    </a>
                    <div className="hamburger_body_bottom_form">
                      <div className={styles.search_form}>
                        <form onSubmit={handleMobileSearch}>
                          <div className={styles.search_field}>
                            <input
                              placeholder="جستجوی محصولات ..."
                              type="text"
                              className={`form-control ${styles.search_input}`}
                              value={mobileSearchTerm}
                              onChange={(e) => setMobileSearchTerm(e.target.value)}
                              onKeyPress={(e) => handleKeyPress(e, mobileSearchTerm, false)}
                            />
                            <button
                              type="submit"
                              className={`btn ${styles.search_btn} main-color-one-bg rounded-pill`}
                            >
                              <i className="bi bi-search"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <ul className={`navbar-nav ${styles.hamburger_navbar}`}>
                      <li className={`nav-item ${styles.hamburger_navbar_item}`}>
                        <Link href="/" className="nav-link">
                          صفحه اصلی
                        </Link>
                      </li>

                      {headerCategories.map((category, index) => {
                        const categoryId = categoryMap[category.name];
                        return (
                          <li key={category.name} className={`nav-item ${styles.hamburger_navbar_item}`}>
                            <Link
                              href={categoryId ? `/categories?categoryId=${categoryId}` : '#'}
                              className="nav-link"
                              onClick={() => {
                                setActiveHamburger(false);
                              }}
                            >
                              {category.displayName}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div
                  className={
                    activeHamburger
                      ? styles.hamburger_backdrop
                      : styles.hamburger_backdrop_hidden
                  }
                  onClick={() => setActiveHamburger(false)}
                ></div>
              </div>
              <div>
                <Link href="/">
                  <div className="logo">
                    <img
                      className="img-fluid"
                      src="/images/logo.png"
                      alt="logo"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="d-lg-none d-block col-6 order-lg-5 order-2">
            <div className="d-flex align-items-center justify-content-end">
              <div className={styles.avatar}>
                {isAuthenticated && user ? (
                  <>
                    <span
                      className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill ms-4`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleItemCheck(15);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="bi bi-person-circle font-20 text-muted ms-1"></i>
                      {user.username || 'کاربر'}
                    </span>

                    <ul
                      className={`navbar-nav ${activeSubMenu[15]
                        ? styles.avatar_dropdown_show
                        : styles.avatar_dropdown_hide
                        }`}
                    >
                      <li>
                        <Link 
                          href="/p-user" 
                          className={styles.avatar_dropdown_item}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHamburger(false);
                            handleItemCheck(15);
                          }}
                        >
                          <i className="bi bi-house-door"></i>پروفایل
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/p-user/orders" 
                          className={styles.avatar_dropdown_item}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHamburger(false);
                            handleItemCheck(15);
                          }}
                        >
                          <i className="bi bi-cart-check"></i>سفارش‌های من
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/p-user/wishlists" 
                          className={styles.avatar_dropdown_item}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHamburger(false);
                            handleItemCheck(15);
                          }}
                        >
                          <i className="bi bi-heart"></i>محصولات مورد علاقه
                        </Link>
                      </li>
                      <li>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleLogout();
                          }} 
                          className={styles.avatar_dropdown_item}
                          style={{ width: '100%', textAlign: 'right', border: 'none', background: 'none' }}
                        >
                          <i className="bi bi-arrow-right-square"></i>خروج از حساب کاربری
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link
                    href="/login-register"
                    className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill ms-4`}
                  >
                    <i className="bi bi-person-circle font-20 text-muted ms-1"></i>
                    <span>ورود</span>
                  </Link>
                )}
              </div>

              <button
                onClick={showBascket}
                className={`btn btn-light shadow-sm ${styles.action_link}`}
                style={{ position: 'relative' }}
              >
                <i className="bi bi-basket font-30"></i>
                {/* نمایش تعداد فقط اگر cartReady باشد */}
                {cartReady && totalQuantity > 0 && (
                  <span className={`${styles.header_cart_counter} main-color-one-bg rounded-pill`}>
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="col-lg-7 order-lg-2 d-lg-block d-none">
            <div className="search-form">
              <form onSubmit={handleDesktopSearch}>
                <div className={styles.search_field}>
                  <input
                    type="text"
                    placeholder="جستجوی محصولات ..."
                    className={`form-control ${styles.search_input}`}
                    value={desktopSearchTerm}
                    onChange={(e) => setDesktopSearchTerm(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, desktopSearchTerm, true)}
                  />
                  <button
                    type="submit"
                    className={`btn main-color-one-bg ${styles.search_btn} rounded-pill`}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <AuthHeader showBascket={showBascket} />
        </div>

        <MegaMenu />
      </nav>

      {activeSubMenu[15] && (
        <div 
          className={styles.avatar_backdrop}
          onClick={() => handleItemCheck(15)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 999
          }}
        />
      )}

      {isShowBascket && (
        <ShoppingCart
          isShowBascket={isShowBascket}
          showBascket={showBascket}
        />
      )}
    </header>
  );
}

export default Header;