import axios from "axios"
const { useEffect } = require("react")
const { useState } = require("react")

const useFetch = (url) => {
    const [data,setdata] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try {
                const res = await axios.get(url)
                setdata(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()
    },[url])
    const reFetch = async() => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setdata(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }
    return {data,loading,error,reFetch}
}




export default useFetch