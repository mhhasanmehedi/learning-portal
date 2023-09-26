import React, { useEffect, useState } from "react";
import MainLayout from "../../../Layout/MainLayout";
import AssignmentMark from "../../components/AssignmentMarks/AssignmentMark";
import { useGetAssignmentMarksQuery } from "../../../features/assignmentMarks/assignmentMarksApi";

const AdminAssignmentMark = () => {
  const [error, setError] = useState("");
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    error: responseError,
  } = useGetAssignmentMarksQuery();

  useEffect(() => {
    if (responseError) {
      setError("There was an response Error");
    }
  }, [responseError]);

  const pendingCount = assignmentMarks?.filter(
    (item) => item.status === "pending"
  ).length;

  const markSentCount = assignmentMarks?.filter(
    (item) => item.status === "published"
  ).length;

  let content;

  if (isError && error) {
    content = <div>{error}</div>;
  } else if (!isError && isLoading) {
    content = <div>Loading...</div>;
  } else if (!isError && !isLoading && assignmentMarks.length === 0) {
    content = <div>No Assignment Marks Found!</div>;
  } else if (!isError && !isLoading && assignmentMarks.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Assignment</th>
              <th className="table-th">Date</th>
              <th className="table-th">Student Name</th>
              <th className="table-th">Repo Link</th>
              <th className="table-th">Mark</th>
              <th className="table-th">Total Mark</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {assignmentMarks?.map((assignmentMark) => (
              <AssignmentMark
                key={assignmentMark.id}
                assignmentMark={assignmentMark}
              />
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
            <ul className="assignment-status">
              <li>
                Total <span>{assignmentMarks?.length}</span>
              </li>
              <li>
                Pending
                <span>{pendingCount}</span>
              </li>
              <li>
                Mark Sent <span>{markSentCount}</span>
              </li>
            </ul>

            {content}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminAssignmentMark;
