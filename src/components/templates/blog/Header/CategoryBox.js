import React from 'react'
import styles from './CategoryBox.module.css';

const CategoryBox = () => {
  return (
    <div className="content-box">
      <div className="container-fluid">
        <div className={styles.side_right_blog}>
          <div className={styles.search_form}>
            <form action="">
              <div className={styles.search_filed}>
                <input type="text" placeholder='جستجوی مقالات ...'
                  className={`form-control ${styles.search_input}`}
                />
                <button type='submit'
                  className={`btn ${styles.search_btn} main-color-one-bg rounded-pill`}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
          <div className={styles.navbar_blog}>
            <nav className="navbar">
              <ul className="navbar-nav">
                <li className={`navbar-item ${styles.mco_hover}`}>
                  <a href="" className="nav-link">
                    <i className="bi bi-newspaper font-25 ms-3"></i>
                    جدیدترین مطالب
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="" className="nav-link">
                    <i className="bi bi-bounding-box-circles font-25 ms-3"></i>
                    علم و تکنولوژی
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="" className="nav-link">
                    <i className="bi bi-controller font-25 ms-3"></i>
                    بازی ویدیویی
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="" className="nav-link">
                    <i className="bi bi-journal-richtext font-25 ms-3"></i>
                    کتاب و ادبیات
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="" className="nav-link">
                    <i className="bi bi-film font-25 ms-3"></i>
                    هنر و سینما
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="" className="nav-link">
                    <i className="bi bi-cup-hot font-25 ms-3"></i>
                    سبک زندگی
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryBox