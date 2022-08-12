import { FC, ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
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
          <div className="modal-box rounded-lg p-0" onClick={(e) => e.stopPropagation()}>
            <header className="flex justify-between items-center py-2 pl-5 pr-3 border-b border-b-gray-200">
              <div className="text-base font-semibold">{title}</div>
              <Button size="small" color="transparent" className="px-2" onClick={onClose}>
                <IoMdClose fontSize={18} />
              </Button>
            </header>
            <main className="flex flex-col gap-5 p-5">{children}</main>
            {footer && <footer className="p-5 pt-0">{footer}</footer>}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
