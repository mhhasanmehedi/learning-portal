import React from "react";
import MainLayout from "../../../Layout/MainLayout";
import AddAssignmentForm from "../../components/Assignments/AddAssignmentForm";

const AddAssignment = () => {
  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <AddAssignmentForm />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AddAssignment;
