import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import styled from "styled-components";
// @ts-ignore
import Modal from "react-modal";

interface ILoadingPageProps {
  isLoading: boolean;
}

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "45vw",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    overflow: "hidden",
    maxHeight: "90vh",
    zIndex: 10,
    border: 0,
    backgroundColor: "transparent",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.65)",
    zIndex: 9,
  },
};

const InnerContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingPage: React.FC<ILoadingPageProps> = (props) => {
  return (
    <Modal
      isOpen={props.isLoading}
      ariaHideApp={false}
      style={customStyles}
      onRequestClose={() => {}}>
      <InnerContainer>
        <LoadingSpinner width={48} height={48} />
      </InnerContainer>
    </Modal>
  );
};

export default LoadingPage;
