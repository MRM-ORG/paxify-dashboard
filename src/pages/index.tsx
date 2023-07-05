import Home from "@/components/pages/Home";
import ProtectedAuthWrapper from "@/components/pages/ProtectedAuthWrapper";

export default function HomePage() {
  return (
    <ProtectedAuthWrapper>
      <Home />
    </ProtectedAuthWrapper>
  );
}
