import toast from "react-hot-toast";

const options = {
  id: "toast",
};

const toastify = {
  success(message) {
    toast.success(message, options);
  },

  error(message) {
    toast.error(message, options);
  },
};

export default toastify;
