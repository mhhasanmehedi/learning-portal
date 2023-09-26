import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditAssignmentMutation,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
} from "../../../features/assignment/assignmentApi";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import toastify from "../../../utils/toastify";

const EditAssignmentForm = () => {
  const [error, setError] = useState("");
  const [editAssignment, { isLoading, isSuccess, error: responseError }] =
    useEditAssignmentMutation();
  const { data: videos } = useGetVideosQuery();
  const { id } = useParams();
  const { data: assignment } = useGetAssignmentQuery(id);
  const { data: assignments } = useGetAssignmentsQuery();

  const [formData, setFormData] = useState({
    title: "",
    video_title: "",
    video_id: null,
    totalMark: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title,
        video_title: assignment.video_title,
        video_id: assignment.video_id,
        totalMark: assignment.totalMark,
      });
    }

    if (responseError) {
      setError("There was an response Error");
    }

    if (isSuccess) {
      navigate("/admin/assignments");
      toastify.success("Assignment updated successfully");
    }
  }, [responseError, isSuccess, navigate, assignment, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const findVideo = videos?.find(
      (video) => video.title === formData.video_title
    );

    const isAssignExist = assignments?.find(
      (assignment) => assignment?.video_id === findVideo?.id
    );

    if (
      !isAssignExist ||
      isAssignExist?.video_title === assignment?.video_title
    ) {
      editAssignment({
        id,
        data: {
          ...formData,
          video_id: findVideo.id,
        },
      });
    } else if (isAssignExist) {
      toastify.error("This video already has an assignment");
    }
  };

  return (
    <div className="mx-auto px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Assignment
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
              placeholder="Assignment Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="videoTitle" className="sr-only">
              Video Title
            </label>
            <select
              name="videoTitle"
              id="videoTitle"
              className="login-input rounded-t-md"
              value={formData.video_title}
              onChange={(e) =>
                setFormData({ ...formData, video_title: e.target.value })
              }
            >
              <option value="" hidden>
                Select Video
              </option>
              {videos?.map((video) => (
                <option key={video.id} value={video.video_title}>
                  {video.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="totalMark" className="sr-only">
              Total Mark
            </label>
            <input
              id="totalMark"
              name="totalMark"
              type="number"
              autoComplete="totalMark"
              required
              className="login-input rounded-b-md"
              placeholder="Total Mark"
              value={formData.totalMark}
              onChange={(e) =>
                setFormData({ ...formData, totalMark: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {error && (
          <div style={{ color: "red" }}>There was an Error occured</div>
        )}

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

export default EditAssignmentForm;
