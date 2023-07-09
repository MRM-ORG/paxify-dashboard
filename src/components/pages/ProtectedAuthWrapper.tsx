import { navigateNewPage } from "@/utils/navigate";
import { USER_LOGIN } from "@/utils/routes";
import React, { useEffect, useState } from "react";

interface IProtectedAdminPageWrapperProps {
  children: React.ReactNode;
}

const ProtectedAuthWrapper: React.FC<IProtectedAdminPageWrapperProps> = (
  props
) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check firebase auth status here
    const user = localStorage.getItem("user");
    if (!user) {
      navigateNewPage(USER_LOGIN());
    } else {
      setIsLoading(false);
    }
  }, []);

  return !isLoading && <div>{props.children}</div>;
};

export default ProtectedAuthWrapper;
