import React, { Children, SetStateAction, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Pagination from 'react-bootstrap/Pagination';
import _ from 'lodash'
import { ParamsType } from '../types';

type PropTypes = {
    limit: number
    count: number
    onPageChange : (p:{offset: number, limit:number} &{} ) => void
    updateParams ?: React.Dispatch<React.SetStateAction<ParamsType>>
}
const PaginationElement = ({ limit, count,onPageChange, updateParams }: PropTypes) => {
    const [page, setPage] = useState<number>(1)
    const [pagesCount, setPagesCount] = useState<number[]>([])
    useEffect(() => {
        const pages: number[] = _.range(1, Math.ceil((count )/limit)+1)
        setPagesCount(pages)
    }, [count])
    const changePageHandler = (n: number) =>{
        n < 1 && (n = 1) || n > (pagesCount.at(-1)??1) && (n = pagesCount.at(-1)??1)
        if( n !== page) {
            setPage(n)
            onPageChange({limit, offset: limit * (n-1)})
            updateParams?.(p => {return{...p, offset: limit * (n-1)}})
        }
    }
    return (
        <Pagination>
            <Pagination.First onClick={()=> changePageHandler(1)}/>
            <Pagination.Prev onClick={()=> changePageHandler(page-1)}/>
            {Children.toArray(pagesCount.map(p => <Pagination.Item active={page === p} onClick={()=> changePageHandler(p)}>{p}</Pagination.Item>))}
            <Pagination.Next onClick={()=> changePageHandler(page+1)}/>
            <Pagination.Last onClick={()=> changePageHandler(pagesCount.at(-1)??1)}/>
        </Pagination>
    )
}


const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(PaginationElement)