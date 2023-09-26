import apiSlice from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/quizzes",
      providesTags: ["Quizzes"],
    }),

    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
      providesTags: (result, error, arg) => [{ type: "Quiz", id: arg }],
    }),

    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizzes"],
    }),

    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Quizzes",
        { type: "Quiz", id: arg.id },
      ],
    }),

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useEditQuizMutation,
  useAddQuizMutation,
  useDeleteQuizMutation,
} = quizzesApi;
