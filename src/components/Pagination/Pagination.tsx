import './Pagination.scss'

import React from 'react'
import classNames from 'classnames'

interface IPaginationProps {
    currentPageNo: number // 当前页码
    count: number // 条目总数
    handlePageClick: (pageNo: number) => void
    pageSize: number
    maxLength?: number // 同时可见的页码最大数量，默认7个
}

const enum actions {
    LEFT,
    LEFTMOST,
    RIGHT,
    RIGHTMOST
}

export default class Pagination extends React.Component<IPaginationProps, any> {
    handleJumpClick = (action: actions, isDisabled: boolean) => {
        if (isDisabled) {
            return
        }

        const { count, currentPageNo, handlePageClick, pageSize } = this.props
        const pageCount = Math.ceil(count / pageSize)

        switch (action) {
            case actions.LEFT:
                handlePageClick(currentPageNo - 1)
                break
            case actions.LEFTMOST:
                handlePageClick(1)
                break
            case actions.RIGHT:
                handlePageClick(currentPageNo + 1)
                break
            case actions.RIGHTMOST:
                handlePageClick(pageCount)
                break
        }
    }
    renderPages = () => {
        const { count, currentPageNo, handlePageClick, maxLength = 7, pageSize } = this.props
        const pageCount = Math.ceil(count / pageSize)
        const halfLength = Math.ceil(maxLength / 2)
        let startIndex = Math.max(0, currentPageNo - halfLength)
        const endIndex = Math.min(pageCount, startIndex + maxLength)
        
        if(pageCount < startIndex + maxLength){
            startIndex = Math.max(0, pageCount - maxLength)
        }

        let content = []

        for (let i = startIndex; i < endIndex; i++) {
            const styles = classNames({
                block: true,
                active: currentPageNo === i + 1
            })
            content.push(
                <div
                    key={i}
                    className={styles}
                    onClick={() => {
                        handlePageClick(i + 1)
                    }}
                >
                    {i + 1}
                </div>
            )
        }

        return content
    }
    render() {
        const { count, currentPageNo, pageSize } = this.props
        const pageCount = Math.ceil(count / pageSize)

        if (!count) {
            return null
        }

        const leftStyles = classNames({
            block: true,
            disabled: currentPageNo === 1
        })

        const rightStyles = classNames({
            block: true,
            disabled: currentPageNo === pageCount
        })

        return (
            <div className="pagination">
                <div
                    className={leftStyles}
                    onClick={() => {
                        this.handleJumpClick(actions.LEFTMOST, currentPageNo === 1)
                    }}
                >
                    &lt;&lt;
                </div>
                <div
                    className={leftStyles}
                    onClick={() => {
                        this.handleJumpClick(actions.LEFT, currentPageNo === 1)
                    }}
                >
                    &lt;
                </div>
                {this.renderPages()}
                <div
                    className={rightStyles}
                    onClick={() => {
                        this.handleJumpClick(actions.RIGHT, currentPageNo === pageCount)
                    }}
                >
                    &gt;
                </div>
                <div
                    className={rightStyles}
                    onClick={() => {
                        this.handleJumpClick(actions.RIGHTMOST, currentPageNo === pageCount)
                    }}
                >
                    &gt;&gt;
                </div>
            </div>
        )
    }
}
