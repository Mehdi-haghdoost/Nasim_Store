import React from 'react';
import Layout from '@/components/layouts/UserPanelLayout'
import styles from "@/styles/p-user/notifications.module.css";
import Pagination from '@/components/modules/p-user/pagination/Pagination';
import NotifCard from '@/components/modules/p-user/notification/notifCard';

const page = () => {
    return (
        <Layout>
            <div className="ui-boxs">
                <div className="ui-box">
                    <div className="ui-box-item ui-box-white">
                        <div className="ui-box-item-title">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className='fw-bold'>
                                    اطلاعیه ها
                                </h4>
                            </div>
                        </div>
                        <div className="ui-box-item-desc">
                            <NotifCard />
                            <NotifCard />
                            <NotifCard />
                            <NotifCard />
                        </div>
                    </div>
                </div>
            </div>
            <Pagination />
        </Layout>
    )
}

export default page