import React from 'react'
import styles from '@/styles/p-user/wishlists.module.css';
import Layout from '@/components/layouts/UserPanelLayout';
import Card from '@/components/modules/p-user/wishlists/product';
import Pagination from '@/components/modules/p-user/pagination/Pagination';

const page = () => {
    return (
        <Layout>
            <div className="ui-boxs">
                <div className="ui-box">
                    <div className="ui-box-item ui-box-white">
                        <div className="ui-box-item-title">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="fw-bold">
                                    علاقه مندی ها
                                </h4>
                            </div>
                        </div>
                        <div className="ui-box-item-desc">
                            <section>
                                <Card />
                                <Card />
                                <Card />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination />
        </Layout>
    )
}

export default page;