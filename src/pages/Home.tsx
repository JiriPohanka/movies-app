import { styled } from "@mui/material";
import SearchField from "../components/SearchField";
import SearchResults from "../components/SearchResultsList";
import { Box } from "@mui/material";

const FlexBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #fdfdfd;
    padding: 0px 1rem;
`

const Home = (props: any) => {

    return (
        <FlexBox>
            <SearchField />
            <SearchResults />
        </FlexBox>
    )
}

export default Home
