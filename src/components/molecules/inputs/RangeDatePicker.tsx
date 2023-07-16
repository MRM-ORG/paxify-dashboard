import { THEME } from "@/utils/theme";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

interface IRangeDatePickerProps {
  dateRange: [Date | null, Date | null];
  setDateRange: (dateRange: [Date | null, Date | null]) => void;
}

const CustomDatePicker = styled(
  // @ts-ignore
  dynamic(import("react-datepicker"), {
    ssr: false,
  })
)`
  height: 40px;
  padding: 0 10px;
  min-width: 165px;
  border-radius: 4px;
  border: 1px solid ${THEME.primary};
`;
const RangeDatePicker: React.FC<IRangeDatePickerProps> = (props) => {
  const [startDate, endDate] = props.dateRange;

  return (
    <CustomDatePicker
      // @ts-ignore
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update: any) => {
        props.setDateRange(update);
      }}
      isClearable={true}
    />
  );
};

export default RangeDatePicker;
