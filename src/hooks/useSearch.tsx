import { useState, useEffect, useRef } from "react"
import { SearchResult } from "../components/SearchResultsList"
import { selectSearchResult } from "../redux/searchResultSlice"
import { useAppSelector } from "./redux"
import VARS from "../VARS"
import { selectCurrentPage } from "../redux/currentPageSlice"

const useSearch = (query: string, pageNum: number = 1): SearchResult => {

    const globalResult = useAppSelector(selectSearchResult)
    const currentPage = useAppSelector(selectCurrentPage)
    const timeNow = (new Date()).getTime()
    const [results, setResults] = useState<SearchResult>({ data: [], query: "", currPage: globalResult.currPage, error: false, loading: false, timestamp: timeNow })
    const timeout: any = useRef()

    useEffect(() => {

        // reset resultsList if there is no query
        if (query === "") {
            setResults({ data: [], query, currPage: 1, error: false, loading: false, timestamp: timeNow })
            return
        }

        // if relevant search results are already there and are 
        //no longer than 5 mins old, don't fetch new data again
        if (query === globalResult.query &&
            globalResult.currPage === pageNum &&
            Date.now() - results.timestamp < 300000) {
            setResults(globalResult)
            return
        }
        console.log(globalResult.currPage, pageNum, currentPage)

        const doApiRequest = async () => {

            const requestDate = (new Date()).getTime()

            // show spinner
            setResults({ data: [], query, currPage: 1, error: false, loading: true, timestamp: (new Date()).getTime() })


            try {
                const response = await fetch('https://api.themoviedb.org/3/search/movie?' + new URLSearchParams({
                    api_key: VARS.tmdApiKey,
                    language: 'en-US',
                    query,
                    page: pageNum.toString(),
                    include_adult: 'false',
                }))

                if (response.status === 200) {
                    const data = await response.json()
                    console.log(data)
                    setResults({ data: data.results, query, currPage: pageNum, error: false, loading: false, timestamp: requestDate, totalPages: data.total_pages })
                }

                if (response.status === 422) {
                    setResults({ data: [], query, currPage: pageNum, error: true, loading: false, timestamp: requestDate })
                    throw new Error("query not found")
                }

                if (response.status === 503) {
                    setResults({ data: [], query, currPage: pageNum, error: true, loading: false, timestamp: requestDate })
                    throw new Error("service not available")
                }
            }
            catch (err) {
                setResults({ data: [], query, currPage: pageNum, error: true, loading: false, timestamp: requestDate })
                console.error("failed to fetch (useSearch): ", err)
            }
        }

        // clear current timeout
        clearTimeout(timeout.current)

        // set new timeout for debouncing
        timeout.current = setTimeout(() => doApiRequest(), 350)

    }, [query, pageNum])

    return results
}

export default useSearch
