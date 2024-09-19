import { useState, useEffect, useRef } from 'react';

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const optionsRef = useRef(options);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, optionsRef.current);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]); // Aquí solo se observa `url`

    return { data, loading, error };
};

export default useFetch;
