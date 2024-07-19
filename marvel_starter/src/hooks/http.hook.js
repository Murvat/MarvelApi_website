import { useState, useCallback } from "react";

//we are creating a custom hook to optimiz  fetch reguest and error handling
export const useHttp = () => {
    const [loading, setLoading] = useState(false);//state respnsible for loading spinner 
    const [error, setError] = useState(null);//state responsible for error png
    // variablae request posseses a data fetched by fetch request 
    //we use useCallback to cache our data then pass variables via async function 
    //befor reguest we switch value of loading to true then make reguest
    //if it isn't worked it returns an error message;
    //in case it works it returns and variable data with json format of this data
    const request = useCallback(async (
        url,
        method = 'GET',
        body = null,
        headers = { 'Content-Type': 'application/' }) => {

        setLoading(true);
        try {
            const response = await fetch(url, { method, body, headers })

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status:${response.status}`)
            }
            //variable data keeps our data fetched by reguest and turns it into json file
            const data = await response.json();
            //eventually when our reguest finished we dont need spinner so we change its value to false
            setLoading(false);

            return data;



        } catch (e) {
            //in case we have an error we still dont need spinner so we turn its value to false 
            //and turn vlaue of error to e.message
            setLoading(false);
            setError(e.message);
            throw e;
        }



    }, [])
    //at the end of process we want to be able to use it again , so after every 
    //error we clean it up WHEN WE CALL IT
    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
}