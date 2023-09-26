import React, { useEffect, useState } from "react";
import Player from "../components/description/Player";
import VideoDescription from "../components/description/VideoDescription";
import MainLayout from "../Layout/MainLayout";
import { useGetVideoQuery } from "../features/videos/videosApi";
import { useParams } from "react-router-dom";
import VideoList from "../components/videos/VideoList";

const Home = () => {
  const [error, setError] = useState("");
  const { id } = useParams();

  const {
    data: video,
    isSuccess,
    isLoading,
    error: responseError,
  } = useGetVideoQuery(id);

  useEffect(() => {
    if (responseError) {
      setError("There was an response Error");
    }

    if (isSuccess) {
      setError("");
    }
  }, [responseError, id, isSuccess]);

  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              {error && <div>{error}</div>}
              {isLoading && <div>Loading...</div>}
              {isSuccess && video && (
                <>
                  <Player url={video.url} />
                  <VideoDescription video={video} />
                </>
              )}
            </div>
            <VideoList />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
