import React, {useState, useEffect} from "react";
import 'semantic-ui-css/semantic.min.css';
import SearchBar from './SearchBar';
// use this import on when run without custom hook useVideos
// import youtube from '../apis/youtube';
import VideoList from './VidList';
import VideoDetail from './VideoDetail';
import useVideos from '../hooks/useVideos';


const App = () => {

     const [selectedVideo, setSelectedVideo] = useState(null);

     const [videos, search] = useVideos('buildings');

    // any time when we get new list of videos or any time this
    // list changes run the function in inside this hook
    useEffect( () => {
        setSelectedVideo(videos[0]);
    }, [videos]);

    // WITHOUT the Custom Hook useVideos for video data-fetching logic

    // const [videos, setVideos] = useState([]);
    //
    //
    // useEffect( () => {
    //
    //     onTermSubmit('buildings');
    //
    // // empty [] means run the function of useEffect only one time when component (App) rendered (only once)
    // }, [] );
    //
    // const onTermSubmit =  async term => {
    //     const response = await youtube.get('/search', {
    //         params: {
    //             q: term
    //         }
    //     });
    //
    //     setVideos(response.data.items);
    //     setSelectedVideo(response.data.items[0]);
    // };

    return (
        <div className="ui container">
            {/* rename from "onTermSubmit" to "search" to be more common for custom hook */}
            <SearchBar onFormSubmit={search}/>
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail
                            video={selectedVideo}
                        />
                    </div>
                    <div className="five wide column">
                        {/*
                        refactor onVideoSelect={ setSelectedVideo } is equivalent of
                        onVideoSelect={ (video) => setSelectedVideo(video)  }
                        */}
                        <VideoList
                            videos={videos}
                            onVideoSelect={ setSelectedVideo }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;