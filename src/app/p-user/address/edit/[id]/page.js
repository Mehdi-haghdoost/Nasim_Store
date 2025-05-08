import Layout from '@/components/layouts/UserPanelLayout';
import EditAddress from '@/components/templates/p-user/editAddress/EditAddress';
import React from 'react';

const page = ({ params }) => {
    const { id } = params;
    
    return (
        <Layout>
           <EditAddress addressId={id} />
        </Layout>
    );
};

export default page;