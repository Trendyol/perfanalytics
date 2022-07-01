import { FC, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Form/Button";

interface ModalProps {
  title?: ReactNode | string;
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ title, show, onClose, children }) => {
  return (
    <>
      {show && (
        <div className="modal modal-open" onClick={onClose}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <Button
              size="small"
              color="transparent"
              className="absolute right-2 top-2"
              circle
              onClick={onClose}
            >
              <IoMdClose />
            </Button>
            <h3 className="text-lg font-bold">{title}</h3>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
