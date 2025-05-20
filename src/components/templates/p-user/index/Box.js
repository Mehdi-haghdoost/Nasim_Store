// import React from 'react';
// import styles from './box.module.css';
// import Link from 'next/link';

// function Box({title,iconClass,href}) {
//   return (
//     <div className='col-lg-3 col-6 w-100-in-400'>
//         <Link href={href}>
//         <div className="content-box">
//             <div className="container-fluid">
//                 <div className="item">
//                     <div className="row align-items-center">
//                         <div className="col-2">
//                             <div className={styles.icon}>
//                                 <i className={`bi ${iconClass} main-color-one-color font-30`}></i>
//                             </div>
//                         </div>
//                         <div className="col-10">
//                             <h6 className='font-16 mb-0'>
//                                 {title}
//                                 <span className='badge rounded-pill badge-spn me-3'>5</span>
//                             </h6>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </Link>
//     </div>
//   )
// }

// export default Box

// src/components/templates/p-user/index/Box.js
import React from 'react'; 
import styles from './box.module.css'; 
import Link from 'next/link';  

function Box({title, iconClass, href, onClick, badgeCount}) {
  const content = (
    <div className="content-box">
      <div className="container-fluid">
        <div className="item">
          <div className="row align-items-center">
            <div className="col-2">
              <div className={styles.icon}>
                <i className={`bi ${iconClass} main-color-one-color font-30`}></i>
              </div>
            </div>
            <div className="col-10">
              <h6 className='font-16 mb-0'>
                {title}
                {badgeCount > 0 && (
                  <span className='badge rounded-pill badge-spn me-3'>{badgeCount}</span>
                )}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div className='col-lg-3 col-6 w-100-in-400' onClick={onClick} style={{ cursor: 'pointer' }}>
        {content}
      </div>
    );
  }

  return (
    <div className='col-lg-3 col-6 w-100-in-400'>
      <Link href={href}>
        {content}
      </Link>
    </div>
  );
}  

export default Box;