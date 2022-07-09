import { FC, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import Divider from "../Divider";
import Button from "../Form/Button";

interface ModalProps {
  title?: ReactNode | string;
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal: FC<ModalProps> = ({ title, show, onClose, children, footer }) => {
  return (
    <>
      {show && (
        <div className="modal modal-open" onClick={onClose}>
          <div className="modal-box rounded-sm" onClick={(e) => e.stopPropagation()}>
            <Button size="small" color="transparent" className="absolute right-2 top-2" circle onClick={onClose}>
              <IoMdClose />
            </Button>
            <div className="text-medium">{title}</div>
            {children}
            {footer && <>{footer}</>}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
