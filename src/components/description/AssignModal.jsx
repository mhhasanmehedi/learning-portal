import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddAssignmentMarkMutation } from "../../features/assignmentMarks/assignmentMarksApi";
import toastify from "../../utils/toastify";

const AssignModal = ({ assignment, setOpenModal, video, student }) => {
  const [error, setError] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [addAssignmentMark, { isLoading, isSuccess, error: responseError }] =
    useAddAssignmentMarkMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (responseError) {
      setError("There was an response Error");
    }

    if (isSuccess) {
      setOpenModal(false);
      toastify.success("Assignment submitted successfully!");
    }
  }, [responseError, isSuccess, navigate, setOpenModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addAssignmentMark({
      student_id: student.id,
      student_name: student.name,
      assignment_id: assignment.id,
      title: assignment.title,
      createdAt: new Date(),
      totalMark: assignment.totalMark,
      mark: 0,
      repo_link: repoLink,
      status: "pending",
    });
  };

  return (
    <div
      className="h-screen grid place-items-center"
      style={{
        position: "fixed",
        left: "0",
        top: "0",
        right: "0",
        bottom: "0",
        background: "#rgb(0 0 0 / 38%)",
        backdropFilter: "blur(2px)",
        zIndex: "1000",
        margin: "0",
      }}
    >
      <div
        className="mx-auto px-5 lg:px-0"
        style={{
          background: "#080E1B",
          borderRadius: "5px",
          padding: "30px",
          width: "600px",
        }}
      >
        <div>
          <img
            className="h-12 mx-auto"
            src="/assets/image/learningportal.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Submit Your Assignment
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="repoLink" className="sr-only">
                Repo Link
              </label>
              <input
                id="repoLink"
                name="repoLink"
                type="text"
                required
                className="login-input rounded-t-md"
                placeholder="Github Repo Link"
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div style={{ color: "red" }}>There was an Error Occured</div>
          )}

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              {isLoading ? "Loading.." : "Sign In"}
            </button>

            <button
              type="submit"
              onClick={() => setOpenModal(false)}
              style={{ background: "#FF0000", marginTop: "10px" }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignModal;
