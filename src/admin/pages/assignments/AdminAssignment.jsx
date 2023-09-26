import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../Layout/MainLayout";
import Assignment from "../../components/Assignments/Assignment";
import { useGetAssignmentsQuery } from "../../../features/assignment/assignmentApi";

const AdminAssignment = () => {
  const [error, setError] = useState("");
  const {
    data: assignments,
    isLoading,
    isError,
    error: responseError,
  } = useGetAssignmentsQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError) {
      setError("There was an response Error");
    }
  }, [responseError]);

  let content;
  
  if (isError && error) {
    content = <div>{error}</div>;
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && !isError && assignments.length === 0) {
    content = <div>No Assignments Found!</div>;
  } else if (!isLoading && !isError && assignments.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Title</th>
              <th className="table-th">Video Title</th>
              <th className="table-th">Mark</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {assignments?.map((assignment) => (
              <Assignment assignment={assignment} key={assignment.id} />
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
                onClick={() => navigate("/admin/assignments/add")}
                className="btn ml-auto"
              >
                Add Assignment
              </button>
            </div>
            {content}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminAssignment;
