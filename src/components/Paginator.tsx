import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { selectCurrentPage, setCurrentPage } from "../redux/currentPageSlice"
import Pagination from '@mui/material/Pagination';
import { ChangeEvent } from 'react';
import { Box } from '@mui/material';

interface Props {
    maxPages: number | undefined
}

const Paginator = ({ maxPages }: Props) => {

    const currPage = useAppSelector(selectCurrentPage)
    const dispatch = useAppDispatch()

    const setPage = (event: ChangeEvent<unknown>, value: number) => {
        dispatch(setCurrentPage(value))
        console.log(value)
    }

    return (
        <Box sx={{
            'marginTop': '3rem',
            'marginBottom': '2rem'
        }}>
            <Pagination count={maxPages} page={currPage} onChange={setPage} />
        </Box>
    )
}

export default Paginator
