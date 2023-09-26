import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import {
  useEditQuizMutation,
  useGetQuizQuery,
} from "../../../features/quizzes/quizzesApi";
import toastify from "../../../utils/toastify";

const EditQuizForm = () => {
  const [editQuiz, { isLoading, isSuccess, error: responseError }] =
    useEditQuizMutation();
  const { id } = useParams();
  const { data: getQuiz } = useGetQuizQuery(id);
  const { data: videos } = useGetVideosQuery();

  const [question, setQuestion] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [optionOne, setOptionOne] = useState({
    id: 1,
    isCorrect: false,
    option: "",
  });
  const [optionTwo, setOptionTwo] = useState({
    id: 2,
    isCorrect: false,
    option: "",
  });
  const [optionThree, setOptionThree] = useState({
    id: 3,
    isCorrect: false,
    option: "",
  });
  const [optionFour, setOptionFour] = useState({
    id: 4,
    isCorrect: false,
    option: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError) {
      toastify.error("There was an error");
    }

    if (getQuiz) {
      setQuestion(getQuiz?.question);
      setVideoTitle(getQuiz?.video_title);
      setOptionOne(getQuiz?.options[0]);
      setOptionTwo(getQuiz?.options[1]);
      setOptionThree(getQuiz?.options[2]);
      setOptionFour(getQuiz?.options[3]);
    }

    if (isSuccess) {
      navigate("/admin/quizzes");
      toastify.success("Quiz Updated successfully!");
    }
  }, [responseError, isSuccess, navigate, id, getQuiz]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const findVideo = videos?.find((video) => video.title === videoTitle);

    editQuiz({
      id,
      data: {
        question,
        video_title: videoTitle,
        video_id: findVideo.id,
        options: [optionOne, optionTwo, optionThree, optionFour],
      },
    });
  };

  return (
    <div className="mx-auto px-5 lg:px-0">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
          Edit Quiz
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="videoTitle" className="sr-only">
              Video Title
            </label>
            <select
              name="videoTitle"
              id="videoTitle"
              className="login-input rounded-t-md"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
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
            <label htmlFor="question" className="sr-only">
              Question
            </label>
            <input
              id="question"
              name="question"
              type="text"
              required
              className="login-input rounded-t-md"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="totalMark"
              name="totalMark"
              type="text"
              required
              className="login-input rounded-b-md"
              placeholder="Option One"
              value={optionOne.option}
              onChange={(e) =>
                setOptionOne({ ...optionOne, option: e.target.value })
              }
            />
            <label style={{ display: "flex" }}>
              <span style={{ whiteSpace: "nowrap", margin: "0 5px" }}>
                Correct Answer
              </span>
              <input
                type="checkbox"
                checked={optionOne.isCorrect}
                onChange={(e) =>
                  setOptionOne({ ...optionOne, isCorrect: e.target.checked })
                }
              />
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="totalMark"
              name="totalMark"
              type="text"
              required
              className="login-input rounded-b-md"
              placeholder="Option Two"
              value={optionTwo.option}
              onChange={(e) =>
                setOptionTwo({ ...optionTwo, option: e.target.value })
              }
            />
            <label style={{ display: "flex" }}>
              <span style={{ whiteSpace: "nowrap", margin: "0 5px" }}>
                Correct Answer
              </span>
              <input
                type="checkbox"
                checked={optionTwo.isCorrect}
                onChange={(e) =>
                  setOptionTwo({ ...optionTwo, isCorrect: e.target.checked })
                }
              />
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="totalMark"
              name="totalMark"
              type="text"
              required
              className="login-input rounded-b-md"
              placeholder="Option Three"
              value={optionThree.option}
              onChange={(e) =>
                setOptionThree({ ...optionThree, option: e.target.value })
              }
            />
            <label style={{ display: "flex" }}>
              <span style={{ whiteSpace: "nowrap", margin: "0 5px" }}>
                Correct Answer
              </span>
              <input
                type="checkbox"
                checked={optionThree.isCorrect}
                onChange={(e) =>
                  setOptionThree({
                    ...optionThree,
                    isCorrect: e.target.checked,
                  })
                }
              />
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="totalMark"
              name="totalMark"
              type="text"
              required
              className="login-input rounded-b-md"
              placeholder="Option Four"
              value={optionFour.option}
              onChange={(e) =>
                setOptionFour({ ...optionFour, option: e.target.value })
              }
            />
            <label style={{ display: "flex" }}>
              <span style={{ whiteSpace: "nowrap", margin: "0 5px" }}>
                Correct Answer
              </span>
              <input
                type="checkbox"
                checked={optionFour.isCorrect}
                onChange={(e) =>
                  setOptionFour({ ...optionFour, isCorrect: e.target.checked })
                }
              />
            </label>
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

export default EditQuizForm;
