import { createTheme, responsiveFontSizes } from "@mui/material"

let theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 1000,
            lg: 1300,
            xl: 1536,
        },
    },
    typography: {
        h1: {

        },
        h2: {

        },
        h3: {
            lineHeight: '1.35',
            fontWeight: '400',
            fontSize: '1.3rem',
            '@media (min-width:700px)': {
                fontSize: '1rem',
                lineHeight: '1.2'
            }
        }
    }
})


export default theme
