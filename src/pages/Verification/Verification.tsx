import { useQuery } from "react-query";
import { verificationStep1 } from "../../services/authorization";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Verification = () => {
  const navigate = useNavigate();
  const { isLoading: step1Loading } = useQuery({
    queryKey: "verificationStep1",
    queryFn: verificationStep1,
    onSuccess(data) {
      navigate("/profile/verification/step2");
      localStorage.setItem("verification_url", data.data.iframe_url);
      localStorage.setItem("verification_token", data.data.token);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return <div>{step1Loading && <LoadingSpinner blur />}</div>;
};

export default Verification;
