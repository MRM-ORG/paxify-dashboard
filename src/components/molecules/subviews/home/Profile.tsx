import styled from "styled-components";

interface IProfileProps {}

const Container = styled.div`
  padding: 24px;
`;

const ManageProfile: React.FC<IProfileProps> = () => {
  return (
    <Container>
      <h1>Settings</h1>
    </Container>
  );
};

export default ManageProfile;
