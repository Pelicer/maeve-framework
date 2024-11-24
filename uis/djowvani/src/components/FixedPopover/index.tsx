import { useContext } from "react";
import styled from "styled-components";

import { WordCloudContext } from "@/context/wordCloudContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 15rem;
`;

const FixedPopover: React.FC = () => {
  const { fixedPopover: fixedPopoverContent } = useContext(WordCloudContext);
  return <Container>{fixedPopoverContent}</Container>;
};

export default FixedPopover;
