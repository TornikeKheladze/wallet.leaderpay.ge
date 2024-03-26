import LoadingSpinner from "../../../components/layout/loadingSpinner/LoadingSpinner";
import GoBackBtn from "../../../assets/icons/GoBackBtn";
import { Toaster } from "react-hot-toast";
import { useService } from "./useService";
import ServiceSearch from "../ServiceCategories/ServiceSearch/ServiceSearch";
import ServiceForm from "../../../components/form/ServiceForm";
import WalletIcon from "../../../assets/icons/WalletIcon";
import TemplateButton from "./TemplateButton";
import ConfirmPaymentModal from "./ConfirmPaymentModal";
import SuccessModal from "./SuccessModal";

const Service = () => {
  const {
    service,
    lang,
    serviceResponse,
    fields,
    formSubmit,
    errorMessages,
    loadings,
    t,
    infoData,
    payMutate,
    smsMutate,
    states,
    setStates,
    defaultInfoParams,
    templateExicts,
    authHook: { cardMargin, backBtnClass, notAuthorized },
  } = useService();

  return (
    <div
      className={`card p-5 relative min-h-[200px] my-4 text-textPrimary ${cardMargin}`}
    >
      {infoData && states.isOpen ? (
        <ConfirmPaymentModal
          isOpen={states.isOpen}
          setIsOpen={setStates.setIsOpen}
          service={service}
          reqPayload={states.reqPayload}
          infoData={infoData?.data}
          payMutate={payMutate}
          smsMutate={smsMutate}
          payLoading={loadings.payLoading}
          errorMessages={errorMessages}
          smsLoading={loadings.smsLoading}
        />
      ) : (
        <></>
      )}

      <SuccessModal
        isOpen={states.successModal}
        setIsOpen={setStates.setSuccessModal}
      />

      <ServiceSearch />
      <Toaster position="bottom-right" reverseOrder={false} />
      <GoBackBtn className={backBtnClass} />
      {loadings.pageLoading && <LoadingSpinner blur />}
      <div className="flex md:flex-row flex-col mt-3 relative">
        <div className="flex flex-1 flex-col items-center md:justify-center md:gap-4 gap-2 justify-around">
          <h3 className="md:text-xl text-lg text-center">
            {service.lang[lang]}
          </h3>
          <img src={service.image} alt="" className="md:w-40 w-20" />
          {!notAuthorized && (
            <TemplateButton
              infoData={infoData}
              loading={loadings.templateLoading}
              templateExicts={templateExicts()}
            />
          )}
        </div>

        <div className="w-full flex-1 mt-3">
          {serviceResponse && (
            <ServiceForm
              defaultValues={defaultInfoParams}
              buttonLabel={
                !infoData ? (
                  <span>{t("check")}</span>
                ) : (
                  <>
                    <WalletIcon />
                    <span>{t("payWithWallet")}</span>
                  </>
                )
              }
              fields={
                states.withMerchant.length > 0 ? states.withMerchant : fields()
              }
              setWithMerchant={setStates.setWithMerchant}
              onSubmit={formSubmit}
              loading={
                loadings.infoLoading ||
                loadings.smsLoading ||
                loadings.payLoading
              }
              merchantButton={infoData ? true : false}
              merchantLoading={
                loadings.merchantInitLoading || loadings.merchantIsSuccess
              }
            />
          )}
          <p
            className={`${
              errorMessages.infoErrorMessage ||
              errorMessages.merchantErrorMessage
                ? "opacity-100"
                : "opacity-0"
            } mt-6 p-2 bg-error max-w-md mx-auto flex-1 text-center transition-opacity duration-200 text-white rounded-lg flex justify-center items-center`}
          >
            {t(
              errorMessages.infoErrorMessage ||
                errorMessages.merchantErrorMessage ||
                "somethingWentWrong"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
