import React from 'react'
import styles from './BlogVideoItem.module.css';
import Link from 'next/link'

const BlogVideoItem = ({col,img}) => {
  return (
    <div className={col}>
    <div className={styles.tv_block_item}>
        <Link href={'/blog'}>
            <img src={img} className='img-fluid' alt="" />
            <div className={styles.desc}>
                <h3 className={styles.title}>انتخاب هارد اکسنترنال مناسب </h3>
                <div className={styles.date}>
                    <span className="text-date">9 مرداد 1402</span>
                </div>
            </div>
        </Link>
    </div>
</div>
  )
}

export default BlogVideoItem