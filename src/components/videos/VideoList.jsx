import React, { useEffect } from "react";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import { useState } from "react";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const [error, setError] = useState("");
  const {
    data: videos,
    isLoading,
    isSuccess,
    error: responseError,
  } = useGetVideosQuery();

  useEffect(() => {
    if (responseError) {
      setError("There was an response Error");
    }
  }, [responseError]);
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {isSuccess && videos?.length === 0 && <div>No Videos Found!</div>}
      {!isLoading &&
        isSuccess &&
        videos?.length > 0 &&
        videos?.map((video) => <VideoItem key={video.id} video={video} />)}
    </div>
  );
};

export default VideoList;
