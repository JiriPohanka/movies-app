import { styled } from '@mui/material/styles';
import { selectQuery, setQuery } from '../redux/querySlice'
import { setCurrentPage } from '../redux/currentPageSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { ChangeEvent } from "react"
import TextField from '@mui/material/TextField';

const Input = styled(TextField)`
    font-size: 1.25rem;
    margin: 2rem 0 2rem 0;
`

const SearchField = () => {

    const dispatch = useAppDispatch()
    const query = useAppSelector(selectQuery)

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
