import apiSlice from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
      providesTags: ["Assignments"],
    }),

    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
      providesTags: (result, error, arg) => [{ type: "Assignment", id: arg }],
    }),

    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assignments"],
    }),

    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Assignments",
        { type: "Assignment", id: arg.id },
      ],
    }),

    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useEditAssignmentMutation,
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
