import { useEffect } from "react";

const useScrollControl = (isScrollable: boolean) => {
  const disableScroll = () => {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.height = "initial";
    document.body.style.overflow = "initial";
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isScrollable) {
        enableScroll();
      } else {
        disableScroll();
      }
    }
  }, [isScrollable]);
};

export default useScrollControl;
