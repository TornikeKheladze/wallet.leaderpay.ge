import { ReactNode, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import TopBar from "./topBar/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserInfo } from "../../services/authorization";
import { useDispatch } from "react-redux";
import { saveUser } from "../../store/userSlice";
import CardHead from "./cardHead/CardHead";
import { getTemplates } from "../../services/template";
import { saveTemplates } from "../../store/templateSlice";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./footer/Footer";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useQuery({
    queryKey: "getUserInfo",
    queryFn: getUserInfo,
    onSuccess: (data) => {
      dispatch(saveUser(data.data));
    },
    onError: () => {
      navigate("/");
      toast.error("unauthorized");
    },
  });

  useQuery({
    queryKey: "getTemplates",
    queryFn: getTemplates,
    onSuccess(data) {
      dispatch(saveTemplates(data.data.data));
    },
  });

  useEffect(() => {
    const serviceCategoriesDiv = document.getElementById("service_categories");
    if (serviceCategoriesDiv) {
      serviceCategoriesDiv.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <>
      <div className="md:ml-20 mt-16 md:mb-0 mb-16">
        <Toaster position="bottom-right" reverseOrder={false} />

        <Sidebar />
        <TopBar />
        <div className="md:pt-4 xl:pt-6 lg:min-h-screen">
          <div className="card px-8 py-5">
            <CardHead />
          </div>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
