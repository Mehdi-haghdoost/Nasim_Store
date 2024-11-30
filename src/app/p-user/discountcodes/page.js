import Layout from '@/components/layouts/UserPanelLayout'
import Pagination from '@/components/modules/p-user/pagination/Pagination'
import Table from '@/components/templates/p-user/discountcodes/Table'
import React from 'react'

const page = () => {
    return (
        <Layout>
            <div className="ui-boxs">
                <div className="ui-box">
                    <div className="ui-box-item ui-box-white">
                        <div className="ui-box-item-title" style={{ padding: "15px" }}>
                            <h4 className="fw-bold">
                                کد های تخفیف من
                            </h4>
                        </div>
                        <div className="ui-box-item-desc">
                            <Table />
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default page