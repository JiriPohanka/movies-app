import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ImgPlaceholder from './utils/ImgPlaceholder'
import { Grid, Paper, Box, Typography } from '@mui/material'

const ItemBox = styled(Box)`
    display: flex;
    background-color: #f3f3f3;
    border-radius: 0.25rem;
    transition: background-color 200ms ease-out;
    &:hover {
        background-color: #ebf2fa;
    }
`

const StyledInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
`

const Img = styled.img`
    object-fit: cover;
    height: 150px;
    width: 100px;
`

const P = styled.p`
    margin-top: 0.25rem;
    font-size: 0.85rem;
    line-height: 1.3;
    color: black;
    min-width: 200px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    display: block;
    max-height: 150px;
`

const ResultItem = ({ data }: any) => {

    return (
        <Grid item xs={12} sm={6} lg={4}>
            <Paper elevation={0}>
                <ItemBox>
                    <StyledLink to={`/detail/${data.id}`}>
                        {data.poster_path ? <Img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} /> : <ImgPlaceholder width="100px" height="150px"><span>no image available</span></ImgPlaceholder>}
                    </StyledLink>
                    <StyledInfoBox>
                        <StyledLink to={`/detail/${data.id}`}>
                            <Typography variant="h3">{data.title}<span>{` (${parseInt(data.release_date, 10)})`}</span></Typography>
                        </StyledLink>
                        {data.overview
                            ?
                            <P>{data.overview.length <= 115 ? data.overview : data.overview.substring(0, 115) + '...'}</P>
                            :
                            <P>no description available</P>
                        }
                    </StyledInfoBox>
                </ItemBox>
            </Paper>
        </Grid>
    )
}

export default ResultItem
