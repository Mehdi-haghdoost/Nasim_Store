import React from 'react';
import styles from './UserProfile.module.css';
import DataTable from './DataTable';

const UserProfile = () => {
    return (
        <main>
            <div className="ui-boxs">
                <div className="ui-box">
                    <div className="ui-box-item ui-box-white">
                        <div className="ui-box-item-title">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="fw-bold">
                                    اطلاعات شخصی
                                </h4>
                                <button
                                    style={{ padding: "4px 12px" }}
                                    className="btn btn-sm main-color-one-bg waves-effect waves-light">
                                    ویرایش
                                    <i className="bi bi-pencil-fill text-white"></i>
                                </button>
                            </div>
                        </div>
                        <div className="ui-box-item-desc p-0">
                            <DataTable />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default UserProfile