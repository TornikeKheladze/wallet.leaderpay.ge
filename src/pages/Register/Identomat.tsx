import { useState } from "react";
import Modal from "../../components/modal/Modal";
import SuccessIcon from "../../assets/icons/SuccessIcon";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { registerStep2 } from "../../services/authorization";

const Identomat: React.FC = () => {
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const src = localStorage.getItem("iframe_url") || "";
  const token = localStorage.getItem("token") || "";
  const { mutate: stepTwoMutate } = useMutation<any, any, any>({
    mutationFn: registerStep2,
    onSuccess() {
      setSuccessModal(true);
      setTimeout(() => {
        navigate("/login");
        localStorage.removeItem("iframe_url");
        localStorage.removeItem("token");
      }, 2000);
    },
    onError(data) {
      console.log(data);
      setErrorMessage(data.response.data.message);
      setErrorModal(true);
      setTimeout(() => {
        localStorage.removeItem("iframe_url");
        localStorage.removeItem("token");
      }, 2000);
    },
  });

  addEventListener("message", function (e) {
    if (e.origin !== "https://widget.identomat.com") return;
    if (e.data !== "DONE") return;
    stepTwoMutate({ token });
  });

  return (
    <>
      <Modal isOpen={successModal} setIsOpen={setSuccessModal}>
        <div className="xl:px-52 xl:text-3xl xl:py-16 md:px-24 sm:px-14 px-8 md:text-xl text-lg flex flex-col gap-6 xl:gap-10 justify-center items-center">
          <SuccessIcon className="text-green-600 w-32 h-32" />
          <span>რეგისტრაცია დასრულებულია</span>
          <Link
            className="button_primary flex text-sm xl:text-xl items-center gap-3"
            to={"/login"}
          >
            შესვლა
          </Link>
        </div>
      </Modal>
      <Modal isOpen={errorModal} setIsOpen={setErrorModal}>
        <div className="xl:px-52 xl:text-3xl xl:py-16 md:px-24 sm:px-14 px-8 md:text-xl text-lg flex flex-col gap-6 xl:gap-10 justify-center items-center">
          <h3 className="text-error">დაფიქსირდა შეცდომა!</h3>
          <span>{errorMessage}</span>
        </div>
      </Modal>
      <iframe
        className=" top-0 left-0 h-screen w-screen z-100"
        src={src}
        allow="camera"
      ></iframe>
    </>
  );
};

export default Identomat;
