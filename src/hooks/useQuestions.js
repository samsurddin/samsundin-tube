import { useEffect, useState } from "react";
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";

const useQuestions = (videoId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        async function fetchQuestions() {
        // Database releted works

        const db = getDatabase();
        // Grab database table
        const quizRef = ref(db, "quiz/"+ videoId+ "/questions");
        // Select table for fetching data from database
        const quizQuery = query(
            quizRef,
            orderByKey(),
        );


        try{
            setError(false);
            setLoading(true);

            const snapshot =  await get(quizQuery)
            setLoading(false);

            if(snapshot.exists()){
                setQuestions((prevQuestions)=>{
                    return [...prevQuestions,...Object.values(snapshot.val())]
                });
            }
        }catch(error){
            console.log(error);
            setLoading(false);
            setError(true);
        }

        }

        fetchQuestions();

    }, [videoId]);

    return {
        loading,
        error,
        questions,
        
    }
};

export default useQuestions;
