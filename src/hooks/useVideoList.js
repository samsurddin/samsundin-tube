import { useEffect, useState } from "react";
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";

const useVideoList = (page) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {

        async function fetchVideos() {
        // Database releted works

        const db = getDatabase();
        // Grab database table
        const videoRef = ref(db, "videos");
        // Select table for fetching data from database
        const videoQuery = query(
            videoRef,
            orderByKey(),
            startAt("" + page),
            limitToFirst(8)
        );


        try{
            setError(false);
            setLoading(true);

            const snapshot =  await get(videoQuery)
            setLoading(false);

            if(snapshot.exists()){
                setVideos((prevVideos)=>{
                    return [...prevVideos,...Object.values(snapshot.val())]
                });
            }else{
                setHasMore(false);
            }

        }catch(error){
            console.log(error);
            setLoading(false);
            setError(true);
        }

        }

        fetchVideos();

    }, [page]);

    return {
        loading,
        error,
        videos,
        hasMore
    }
};

export default useVideoList;
