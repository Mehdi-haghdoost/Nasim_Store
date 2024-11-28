import React from 'react';
import Layout from '@/components/layouts/UserPanelLayout';
import Pagination from '@/components/modules/p-user/pagination/Pagination';
import styles from "@/styles/p-user/comments.module.css";
import CommentItem from '@/components/modules/p-user/comments/CommentItem';

const page = () => {
    return (
        <Layout>
            <div className="ui-boxs">
                <div className="ui-box">
                    <div className="ui-box-item ui-box-white">
                        <div className="ui-box-item-title" style={{ padding: "15px" }}>
                            <h4 className="fw-bold">
                                دیدگاه های من
                            </h4>
                        </div>
                        <div className="ui-box-item-desc">
                            <div className={styles.comments}>
                                <CommentItem />
                                <CommentItem />
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default page;