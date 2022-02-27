import { useState, useEffect } from "react"
import { MovieFetchResult } from "../components/SearchResultsList"
import VARS from "../VARS"

const useMovieDetail = (movieId?: string) => {

    const [movieInfo, setMovieInfo] = useState<MovieFetchResult>({ error: false, loading: true })

    useEffect(() => {

        const doApiRequest = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?` +
                    new URLSearchParams({
                        api_key: VARS.tmdApiKey,
                        language: "en-US",
                        append_to_response: "credits"
                    }))
                if (response.status === 200) {
                    const data = await response.json()
                    setMovieInfo({ data: data, error: false, loading: false })
                    console.log(data)
                }

                if (response.status === 401) {
                    setMovieInfo({ error: true, loading: false })
                    throw new Error("401: invalid api key")
                }

                if (response.status === 404) {
                    setMovieInfo({ error: true, loading: false })
                    throw new Error("404: movie id not found")
                }
            }
            catch (er) {
                // in case of loss of internet connection
                setMovieInfo({ error: true, loading: false })
                console.error("failed to fetch movie detail (useMovieDetail): ", er)
            }
        }

        setTimeout(() => doApiRequest(), 200)

    }, [movieId])

    return movieInfo
}

export default useMovieDetail
