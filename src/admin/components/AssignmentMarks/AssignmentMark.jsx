import React, { useState } from "react";
import { useEditAssignmentMarkMutation } from "../../../features/assignmentMarks/assignmentMarksApi";
import { truncateString } from "../../../utils/sorter";
import toastify from "../../../utils/toastify";
import { useEffect } from "react";

const AssignmentMark = ({ assignmentMark }) => {
  const {
    id,
    student_name,
    totalMark,
    title,
    repo_link,
    createdAt,
    status,
    mark,
  } = assignmentMark || {};
  const [editAssignmentMark, { isSuccess, error }] =
    useEditAssignmentMarkMutation();

  const [assignMark, setAssignMark] = useState(0);

  useEffect(() => {
    if (error) {
      toastify.error(error);
    }

    if (isSuccess) {
      toastify.success(`${student_name} get ${assignMark} marks`);
    }
  }, [isSuccess, assignMark, student_name, error]);

  const handleMark = () => {
    if (assignMark > totalMark) {
      toastify.error(`Sorry!! You can't give marks above ${totalMark}`);
    } else if (assignMark < 0) {
      toastify.error("Sorry!! You can't give marks under 0");
    } else {
      editAssignmentMark({
        id,
        data: {
          mark: assignMark,
          status: "published",
        },
      });
    }
  };

  return (
    <tr>
      <td className="table-td">{truncateString(title, 35)}</td>
      <td className="table-td">{new Date(createdAt).toLocaleString()}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{truncateString(repo_link, 35)}</td>
      <td className="table-td input-mark">
        {status === "pending" && (
          <input
            type="number"
            value={assignMark}
            max={totalMark}
            onChange={(e) => setAssignMark(Number(e.target.value))}
          />
        )}
        {status === "published" && <p>{mark}</p>}
        {status === "pending" && (
          <svg
            onClick={handleMark}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )}
      </td>
      <td className="table-td">{totalMark}</td>
    </tr>
  );
};

export default AssignmentMark;
