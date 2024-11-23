import React from 'react'
import styles from '@/styles/p-user/profile.module.css';
import Layout from '@/components/layouts/UserPanelLayout';
import UserProfile from '@/components/templates/p-user/profile/UserProfile';

const page = () => {

    return (
        <Layout>
            <UserProfile />
        </Layout>
    )
}

export default page