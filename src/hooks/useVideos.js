import {useState, useEffect} from "react";
import youtube from '../apis/youtube';

//the Custom Hook for video data-fetching logic
const useVideos = (defaultSearchTerm) => {

    const [videos, setVideos] = useState([]);

    useEffect( () => {

        search(defaultSearchTerm);

    }, [defaultSearchTerm] );

    // rename from "onTermSubmit" to "search" to be more common for custom hook
    const search =  async term => {
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        });

        setVideos(response.data.items);
    };

    // it is alternative which is popular in JS community
    // return {videos, search};
    // or alternative as by Convention of hook approach
    return [videos, search];
}

export default useVideos;