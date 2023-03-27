import { useEffect, useState } from "react";
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";

const useAnswers = (videoId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {

        async function fetchAnswers() {
        // Database releted works

        const db = getDatabase();
        // Grab database table
        const answerRef = ref(db, "answers/"+ videoId+ "/questions");
        // Select table for fetching data from database
        const answerQuery = query(
            answerRef,
            orderByKey(),
        );


        try{
            setError(false);
            setLoading(true);

            const snapshot =  await get(answerQuery)
            setLoading(false);

            if(snapshot.exists()){
                setAnswers((prevAnswers)=>{
                    return [...prevAnswers,...Object.values(snapshot.val())]
                });
            }
        }catch(error){
            console.log(error);
            setLoading(false);
            setError(true);
        }

        }

        fetchAnswers();

    }, [videoId]);

    return {
        loading,
        error,
        answers,
        
    }
};

export default useAnswers;
