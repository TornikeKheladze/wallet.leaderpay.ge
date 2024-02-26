import { ReactNode, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../../assets/icons/CloseIcon";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: "-100%", opacity: 0 },
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay z-50 pt-3 bg-bgCard"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            className="modal-content relative"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            style={{
              background: "#2B3139",
              padding: "20px",
              borderRadius: "5px",
            }}
            onClick={stopPropagation}
          >
            <button
              type="button"
              className="w-6 h-6 rounded-full absolute top-1 right-1 bg-red-500 group hover:bg-red-800 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon className="text-white h-6 w-6" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
