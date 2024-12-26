import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
import Footer from '@/components/modules/footer/Footer'
import Header from '@/components/modules/header/Header'
import CategoryBrand from '@/components/templates/categories/CategoryBrand'
import SearchFilters from '@/components/templates/categories/SearchFilters'
import React from 'react'

const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <CategoryBrand />
            <div className="content" style={{ overflowX: "hidden" }}>
                {/* filter mobile */}


                {/* end filter mobile */}

                <div className="row gy-3">
                    <div className="col-lg-3 d-lg-block d-none">
                        <SearchFilters />
                    </div>
                    <div className="col-lg-9"></div>
                </div>

            </div>

            <Footer />
        </>
    )
}

export default page