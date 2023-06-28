import { ChakraProvider } from "@chakra-ui/react";
import BenefitList from "components/Card/BenefitList";
// import BenefitList from "components/Card/BenefitList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function BenefitCustomPage(props) {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ChakraProvider>
          <BenefitList />
        </ChakraProvider>
      </DndProvider>
    </>
  );
}

export default BenefitCustomPage;
