import { useMutation } from "react-query";
import { verificationStep2 } from "../../services/authorization";
import GoBackBtn from "../../assets/icons/GoBackBtn";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import SuccessIcon from "../../assets/icons/SuccessIcon";

const storageSrcKey = "verification_url";
const storageTokenKey = "verification_token";

const VerificationStep2 = () => {
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const src = localStorage.getItem(storageSrcKey) || "";
  const token = localStorage.getItem(storageTokenKey) || "";

  const { mutate: stepTwoMutate } = useMutation({
    mutationFn: verificationStep2,
    onSuccess() {
      setSuccessModal(true);
      localStorage.removeItem(storageSrcKey);
      localStorage.removeItem(storageTokenKey);
    },
    onError(data: any) {
      setErrorMessage(data.response.data.message);
      setErrorModal(true);
      localStorage.removeItem(storageSrcKey);
      localStorage.removeItem(storageTokenKey);
    },
  });

  addEventListener("message", function (e) {
    if (e.origin !== "https://widget.identomat.com") return;
    if (e.data !== "DONE") return;
    stepTwoMutate({ token });
  });

  return (
    <div>
      <GoBackBtn className="!left-6" to={"/profile"} />
      <div className="">
        <iframe
          className=" top-0 left-0 h-screen w-screen z-100"
          src={src}
          allow="camera"
        ></iframe>
      </div>
      <Modal isOpen={successModal} setIsOpen={setSuccessModal}>
        <div className="xl:px-52 xl:text-3xl xl:py-16 md:px-24 sm:px-14 px-8 md:text-xl text-lg flex flex-col gap-6 xl:gap-10 justify-center items-center">
          <SuccessIcon className="text-green-600 w-32 h-32" />
          <span>ვერიფიკაცია დასრულებულია</span>
          <Link
            className="button_primary flex text-sm xl:text-xl items-center gap-3"
            to={"/profile"}
          >
            პროფილზე დაბრუნება
          </Link>
        </div>
      </Modal>
      <Modal isOpen={errorModal} setIsOpen={setErrorModal}>
        <div className="xl:px-52 xl:text-3xl xl:py-16 md:px-24 sm:px-14 px-8 md:text-xl text-lg flex flex-col gap-6 xl:gap-10 justify-center items-center">
          <h3 className="text-error">დაფიქსირდა შეცდომა!</h3>
          <span>{errorMessage}</span>
        </div>
      </Modal>
    </div>
  );
};

export default VerificationStep2;
