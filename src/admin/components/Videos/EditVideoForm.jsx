import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditVideoMutation,
  useGetVideoQuery,
} from "../../../features/videos/videosApi";
import toastify from "../../../utils/toastify";

const EditVideoForm = () => {
  const { id } = useParams();
  const { data: video } = useGetVideoQuery(id);
  const [editVideo, { isLoading, isSuccess, error: responseError }] =
    useEditVideoMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    views: "",
    duration: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (video) {
      setFormData({
        title: video?.title,
        description: video?.description,
        url: video?.url,
        views: video?.views,
        duration: video?.duration,
      });
    }

    if (responseError) {
      toastify.error("There was an error");
    }

    if (isSuccess) {
      navigate("/admin/videos");
      toastify.success("Video updated successfully!");
    }
  }, [responseError, isSuccess, navigate, video]);

  const handleSubmit = (e) => {
    e.preventDefault();

    editVideo({ id, data: formData });
  };

  return (
    <div className="mx-auto px-5 lg:px-0">
      <div>
        {/* <img
          className="h-12 mx-auto"
          src="/assets/image/learningportal.png"
          alt="Logo"
        /> */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Video
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              autoComplete="title"
              required
              className="login-input rounded-t-md"
              placeholder="Video Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="login-input "
              placeholder="Description"
              style={{ minHeight: "120px" }}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
          </div>
          <div>
            <label htmlFor="url" className="sr-only">
              Url
            </label>
            <input
              id="url"
              name="url"
              type="text"
              autoComplete="url"
              required
              className="login-input"
              placeholder="Url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="views" className="sr-only">
              Views
            </label>
            <input
              id="views"
              name="views"
              type="text"
              autoComplete="views"
              required
              className="login-input rounded-b-md"
              placeholder="Views"
              value={formData.views}
              onChange={(e) =>
                setFormData({ ...formData, views: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="duration" className="sr-only">
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              type="text"
              autoComplete="duration"
              required
              className="login-input rounded-b-md"
              placeholder="Duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <button
            disabled={isLoading}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVideoForm;
