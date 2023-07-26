import { navigateNewPage } from "@/utils/navigate";
import { USER_LOGIN } from "@/utils/routes";
import { THEME } from "@/utils/theme";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IProtectedAdminPageWrapperProps {
  children: React.ReactNode;
}

const RightPane = styled.div`
  overflow: auto;
  height: 100vh;
  display: flex;
  padding: 24px;
  background-color: ${THEME.background0};
`;

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

  return !isLoading && <RightPane>{props.children}</RightPane>;
};

export default ProtectedAuthWrapper;
