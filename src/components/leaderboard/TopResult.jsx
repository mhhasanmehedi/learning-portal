import React from "react";

const TopResult = ({ leaderBoard }) => {
  const topTwentyRank = leaderBoard.filter((item) => item.rank <= 20);

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Top 20 Result</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr className="border-b border-slate-600/50">
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {topTwentyRank?.map((data) => (
            <tr key={data.id} className="border-b border-slate-600/50">
              <td className="table-td text-center">
                {data.rank === 1 ? "🏆" : data.rank}
              </td>
              <td className="table-td text-center">{data.student_name}</td>
              <td className="table-td text-center">{data.quiz_mark || 0}</td>
              <td className="table-td text-center">
                {data.assignment_mark || 0}
              </td>
              <td className="table-td text-center">{data.totalCalMark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopResult;
