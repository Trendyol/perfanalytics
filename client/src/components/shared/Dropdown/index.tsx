import { FC, ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
  targetElement: ReactNode;
}

const Content: FC<ContentProps> = ({ targetElement, children }) => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="btn m-1">
        {targetElement}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48"
      >
        {children}
      </ul>
    </div>
  );
};

interface ItemProps {
  children: ReactNode;
  onClick?: () => void;
}

const Item: FC<ItemProps> = ({ children, onClick }) => {
  return (
    <li>
      <a onClick={onClick}>{children}</a>
    </li>
  );
};

export default {
  Content,  
  Item,
};
