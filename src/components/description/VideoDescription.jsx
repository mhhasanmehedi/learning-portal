import React, { useState } from "react";
import { useGetAssignmentsQuery } from "../../features/assignment/assignmentApi";
import { useGetAssignmentMarksQuery } from "../../features/assignmentMarks/assignmentMarksApi";
import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";
import AssignModal from "./AssignModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetQuizMarksQuery } from "../../features/quizMark/quizMarkApi";

const VideoDescription = ({ video }) => {
  const { id, title, description, createdAt } = video;
  const { data: assignments } = useGetAssignmentsQuery();
  const { data: getAssignMarks } = useGetAssignmentMarksQuery();
  const { data: quizzes } = useGetQuizzesQuery();
  const { data: quizMarks } = useGetQuizMarksQuery();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const timestamp = new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = timestamp.toLocaleDateString("en-US", options);

  const findAssignment = assignments?.find(
    (assignment) => assignment.video_id === id
  );

  const findAssignMark = getAssignMarks?.find((item) => {
    if (item?.student_id === user.id) {
      return item.assignment_id === findAssignment?.id;
    }
  });

  let assignmentBtn;

  if (findAssignment) {
    assignmentBtn = (
      <div
        onClick={() => setOpenModal(true)}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        এসাইনমেন্ট
      </div>
    );
  }

  if (findAssignMark?.status === "pending") {
    assignmentBtn = (
      <div className="px-3 font-bold py-1 border border-cyan rounded-full text-sm bg-cyan text-black">
        Pending
      </div>
    );
  } else if (findAssignMark?.status === "published") {
    assignmentBtn = (
      <div className="px-3 font-bold py-1 border border-cyan rounded-full text-sm bg-cyan text-black">
        প্রাপ্ত নম্বর {findAssignMark?.mark}
      </div>
    );
  }

  const isQuiz = quizzes?.find((quiz) => quiz.video_id === video?.id);

  const findQuizMark = quizMarks?.find((quizMark) => {
    if (quizMark?.video_id == video?.id) {
      return quizMark?.student_id === user?.id;
    }
  });

  // Quiz Button
  let quizBtn;

  if (isQuiz) {
    quizBtn = (
      <Link
        to={`/quiz/${id}`}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        কুইজে অংশগ্রহণ করুন
      </Link>
    );
  }
  if (findQuizMark) {
    quizBtn = (
      <div className="px-3 font-bold py-1  rounded-full text-sm bg-cyan text-primary">
        কুইজ জমা দিয়েছেন
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {title}
        </h1>
        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {formattedDate}
        </h2>

        <div className="flex gap-4">
          {assignmentBtn}

          {quizBtn}

          {/* {isQuiz && (
            <Link
              to={`/quiz/${id}`}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              কুইজে অংশগ্রহণ করুন
            </Link>
          )} */}
        </div>
        <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
      </div>
      {openModal === true ? (
        <AssignModal
          setOpenModal={setOpenModal}
          assignment={findAssignment}
          video={video}
          student={user}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default VideoDescription;
