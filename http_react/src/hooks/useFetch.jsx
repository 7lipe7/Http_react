import { useState, useEffect } from "react";


export const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fatchData = async (url) => {
            const res = await fetch(url);
            const json = await res.json();

            Data(json);

        }
        fatchData();
    }, [url]);

    return {data}
}