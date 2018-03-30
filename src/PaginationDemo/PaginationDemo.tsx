import React from 'react'
import Pagination from '../components/Pagination/Pagination'

export default class PaginationDemo extends React.Component<any, any> {
    state = {
        currentPageNo: 1
    }
    handlePageChange = (nextPage: number) => {
        this.setState({
            currentPageNo: nextPage
        })
    }
    render() {
        const { currentPageNo } = this.state

        return (
            <div className="pagination-demo">
                <Pagination
                    currentPageNo={currentPageNo}
                    count={100}
                    pageSize={9}
                    handlePageClick={this.handlePageChange}
                />
            </div>
        )
    }
}
