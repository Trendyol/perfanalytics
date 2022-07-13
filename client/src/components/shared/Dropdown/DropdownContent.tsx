import { FC, ReactNode } from "react";

const DropdownContent: FC<DropdownContentProps> = ({ targetElement, children }) => {
  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div tabIndex={0}>{targetElement}</div>
      <ul tabIndex={0} className="dropdown-content menu shadow rounded-lg absolute -top-4 -left-[calc(100%-40px)] overflow-hidden bg-white !right-0">
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
