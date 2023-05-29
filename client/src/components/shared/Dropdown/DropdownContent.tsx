import { FC, ReactNode } from "react";

const DropdownContent: FC<DropdownContentProps> = ({ targetElement, children }) => {
  return (
    <div className="dropdown dropdown-hover dropdown-end py-4">
      <div tabIndex={0}>{targetElement}</div>
      <ul tabIndex={0} className="dropdown-content menu shadow rounded-lg absolute top-[70px] w-52 right-0 overflow-hidden bg-white">
        {children}
      </ul>
    </div>
  );
};

interface DropdownContentProps {
  children: ReactNode;
  targetElement: ReactNode;
}

export default DropdownContent;
