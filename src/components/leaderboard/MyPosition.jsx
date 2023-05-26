import React from "react";
import { useSelector } from "react-redux";

const MyPosition = ({ leaderBoard }) => {
  const { user } = useSelector((state) => state.auth);

  const findPosition = leaderBoard?.find((item) => item.student_id === user.id);

  return (
    <div>
      <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr>
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-2 border-cyan">
            <td className="table-td text-center font-bold">
              {findPosition?.rank === 1 ? "🏆" : findPosition?.rank}
            </td>
            <td className="table-td text-center font-bold">
              {findPosition?.student_name}
            </td>
            <td className="table-td text-center font-bold">
              {findPosition?.quiz_mark}
            </td>
            <td className="table-td text-center font-bold">
              {findPosition?.assignment_mark}
            </td>
            <td className="table-td text-center font-bold">
              {findPosition?.totalCalMark}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyPosition;
