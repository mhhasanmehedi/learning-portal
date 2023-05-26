import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      reverseOrder={false}
      position="top-right"
      toastOptions={{ duration: 2500 }}
    />
  );
};

export default ToastProvider;
