import { useQuery } from "react-query";
import {
  getAML,
  getAboutUs,
  getPrivacyInfo,
  getRules,
  getServicePageInfo,
} from "../../services/infos";
import LoadingSpinner from "../../components/layout/loadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";

const Info = () => {
  const { page } = useParams();

  type AxiosFunction = () => Promise<AxiosResponse<any, any>>;

  const fetchFunc = (): AxiosFunction => {
    switch (page) {
      case "aboutUs":
        return getAboutUs;
      case "amlPolicy":
        return getAML;
      case "walletRules":
        return getRules;
      case "termsOfService":
        return getServicePageInfo;
      case "privacyAndSecurity":
        return getPrivacyInfo;
      default:
        return getAboutUs;
    }
  };

  const { isLoading, data } = useQuery([page], fetchFunc());

  return (
    <div>
      {isLoading && <LoadingSpinner blur />}
      <div className="card p-5 text-2xl font-bold text-center md:mt-10 mt-20">
        <h1>{data?.data.data.title}</h1>
      </div>

      <div
        className="card p-5 mt-8 mb-4"
        dangerouslySetInnerHTML={{ __html: data?.data.data.text }}
      />
    </div>
  );
};

export default Info;
// import GoogleMapReact from "google-map-react";

// export default function SimpleMap() {
//   const defaultProps = {
//     center: {
//       lat: 10.99835602,
//       lng: 77.01502627,
//     },
//     zoom: 11,
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: "100vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <div lat={59.955413} lng={30.337844}>
//           My Marker
//         </div>
//       </GoogleMapReact>
//     </div>
//   );
// }
