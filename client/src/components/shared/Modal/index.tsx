import useScrollControl from "@hooks/useScrollControl";
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
  useScrollControl(show ? false : true);

  return (
    <>
      {show && (
        <div className="modal modal-open" onClick={(e) => e.stopPropagation()}>
          <div className="modal-box rounded-lg p-0">
            <header className="flex justify-between items-center py-3 pl-5 pr-3 border-b border-b-gray-200">
              <div className="text-md font-semibold text-gray-700">{title}</div>
              <Button size="small" color="transparent" className="px-2" onClick={onClose}>
                <IoMdClose fontSize={18} />
              </Button>
            </header>
            <main className="flex flex-col gap-5 p-5">{children}</main>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
