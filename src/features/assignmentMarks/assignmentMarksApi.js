import apiSlice from "../api/apiSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => "/assignmentMark",
      providesTags: ["AssignmentMarks"],
    }),

    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "AssignmentMarks",
        { type: "AssignmentMark", id: arg.id },
      ],
    }),

    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "AssignmentMarks",
        { type: "AssignmentMark", id: arg.id },
      ],
    }),

    // getAssignment: builder.query({
    //   query: (id) => `/assignments/${id}`,
    //   providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }],
    // }),

    // deleteAssignment: builder.mutation({
    //   query: (id) => ({
    //     url: `/assignments/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Assignments"],
    // }),
  }),
});

export const {
  useGetAssignmentMarksQuery,
  useEditAssignmentMarkMutation,
  useAddAssignmentMarkMutation,
} = assignmentMarksApi;
