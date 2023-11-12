import { Row } from "@/styles/common";
import { THEME } from "@/utils/theme";
import styled from "styled-components";

interface IToggleProps {
  selected: boolean;
  toggleSelected: () => void;
}

const Container = styled.div`
  width: 80px;
  background-color: ${THEME.white2};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  user-select: none;
  border-radius: 25px;
  padding: 2px;
  height: 32px;
  position: relative;
  transition: all 1s ease;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.45);
  }
`;

const DialogButton = styled.div`
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: #002b49;
  color: white;
  padding: 8px 12px;
  border-radius: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: unset;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  left: 45px;
  top: 0;
  transition: all 0.3s ease;
  height: 100%;
  width: 45%;
`;

const Toggle = (props: IToggleProps) => {
  const { selected, toggleSelected } = props;

  return (
    <Row gap="15px">
      Monthly
      <Container onClick={toggleSelected}>
        <DialogButton
          style={
            selected
              ? {
                  left: "0",
                }
              : {}
          }
          className={selected ? "" : "disabled"}></DialogButton>
      </Container>
      Yearly
    </Row>
  );
};

export default Toggle;
