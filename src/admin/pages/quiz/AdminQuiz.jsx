import React, { useEffect, useState } from "react";
import MainLayout from "../../../Layout/MainLayout";
import Quiz from "../../components/Quizzes/Quiz";
import { useNavigate } from "react-router-dom";
import { useGetQuizzesQuery } from "../../../features/quizzes/quizzesApi";

const AdminQuiz = () => {
  const [error, setError] = useState("");
  const {
    data: quizzes,
    isLoading,
    error: responseError,
  } = useGetQuizzesQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError) {
      setError("There was an response Error");
    }
  }, [responseError]);

  let content;
  if (error) {
    content = <div>{error}</div>;
  } else if (!error && isLoading) {
    content = <div>Loading...</div>;
  } else if (!error && !isLoading && quizzes.length === 0) {
    content = <div>No Quizzes Found!</div>;
  } else if (!error && !isLoading && quizzes.length > 0) {
    content = (
      <div className="overflow-x-auto mt-4">
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Question</th>
              <th className="table-th">Video</th>
              <th className="table-th justify-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-600/50">
            {quizzes?.map((quiz) => (
              <Quiz quiz={quiz} key={quiz.id} />
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
                onClick={() => navigate("/admin/quizzes/add")}
                className="btn ml-auto"
              >
                Add Quiz
              </button>
            </div>
            {content}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminQuiz;
