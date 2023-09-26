import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import MainLayout from "../../../Layout/MainLayout";
import Video from "../../components/Videos/Video";

const AdminVideos = () => {
  const [error, setError] = useState("");
  const {
    data: videos,
    isLoading,
    isError,
    error: responseError,
  } = useGetVideosQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError) {
      setError("There was an response Error");
    }
  }, [responseError]);

  let content;
  if (isError && error) {
    content = <div>{error}</div>;
  } else if (!isError && isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && !isError && videos.length === 0) {
    content = <div>No Videos Found!</div>;
  } else if (!isLoading && !isError && videos.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Video Title</th>
              <th className="table-th">Description</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {videos?.map((video) => (
              <Video video={video} key={video.id} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                onClick={() => navigate("/admin/videos/add")}
                className="btn ml-auto"
              >
                Add Video
              </button>
            </div>

            {content}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminVideos;
