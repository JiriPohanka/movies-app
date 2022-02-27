import { styled } from '@mui/material/styles';
import { selectQuery, setQuery } from '../redux/querySlice'
import { setCurrentPage } from '../redux/currentPageSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ChangeEvent, useEffect } from "react"
import TextField from '@mui/material/TextField';
import { selectCurrentPage } from '../redux/currentPageSlice';
import useSearch from '../hooks/useSearch';
import { setSearchResult } from '../redux/searchResultSlice';

const Input = styled(TextField)`
    font-size: 1.25rem;
    margin: 2rem 0 2rem 0;
`

const SearchField = () => {

    const query = useAppSelector(selectQuery)
    const currPage = useAppSelector(selectCurrentPage)

    // fetch data
    let data = useSearch(query, currPage)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setSearchResult(data))
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(event.target.value))
        dispatch(setCurrentPage(1))
    }

    return (
        <div>
            <Input variant="outlined" value={query} onChange={handleChange} />
        </div>
    )
}

export default SearchField
