import React from "react";
import MainLayout from "../../../Layout/MainLayout";
import AddVideoForm from "../../components/Videos/AddVideoForm";

const AddVideo = () => {
  return (
    <MainLayout>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <AddVideoForm />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AddVideo;
