import React, { Children, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import Pagination from './Pagination';
import { ParamsType } from '../types';

type PropTypes = {
    columns: { header: string, body?: any, field: string }[]
    data: any[]
    checkbox?: boolean
    onPageChange : (p:{offset: number, limit:number} &{} ) => void
    limit: number
    count: number
    onSelect ?: (d:string[]) => void
    updateParams ?: React.Dispatch<React.SetStateAction<ParamsType>>

}

const TableData = ({ columns, data, checkbox,onPageChange,count,limit, onSelect,updateParams }: PropTypes) => {
    const [selected,setSelected] = useState<string[]>([])
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.checked ){
            const newSelected  = [...selected, e.target.id]
            setSelected(newSelected)
        } else {
            const newSelected =  selected.filter(s=> s !== e.target.id)
            setSelected(newSelected)
        }
    }
    const selectAll = (e: React.ChangeEvent<HTMLInputElement>) =>{
        if(e.target.checked ){
            const newSelected  = data.map(d=> d.id)
            setSelected(newSelected)
        } else {
            setSelected([])
        }
    }
    useEffect(()=>{
        onSelect?.(selected)
    },[selected])
    return (
        <>
            <Table responsive striped>
                <thead>
                    <tr>
                        {checkbox && <th><FormCheckInput onChange={selectAll}/></th>}
                        {
                            Children.toArray(columns.map(({ header }) => <th>{header}</th>))
                        }
                    </tr>
                </thead>
                <tbody>
                    {Children.toArray(data.map(d =>
                        <tr>
                            {checkbox && <td><FormCheckInput id={d.id} checked={selected.includes(d.id)} onChange={onChange}/></td>}
                            {
                                Children.toArray(columns.map(({ field, body: Body }) => Body ? <td><Body {...d} /></td> : <td>{d[field]}</td>))
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination count={count} limit={limit} onPageChange={onPageChange} updateParams={updateParams}/>
        </>
    )
}

export default TableData