import apiSlice from "../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => "/quizMark",
      providesTags: ["QuizMarks"],
    }),

    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["QuizMarks"],
    }),
  }),
});

export const { useGetQuizMarksQuery, useAddQuizMarkMutation } = quizMarkApi;
