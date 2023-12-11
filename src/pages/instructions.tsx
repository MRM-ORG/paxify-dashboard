import Instructions from "@/components/pages/Instructions";
import ProtectedAuthWrapper from "@/components/pages/ProtectedAuthWrapper";

export default function InstructionsPage() {
  return (
    <ProtectedAuthWrapper>
      <Instructions />
    </ProtectedAuthWrapper>
  );
}
