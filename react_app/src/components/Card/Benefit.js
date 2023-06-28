import { Center, ListItem } from "@chakra-ui/react";
import React from "react";
import { useDrag } from "react-dnd";
import { Button, UncontrolledTooltip } from "reactstrap";

const Benefit = ({ item, benefitType, onDropPlayer, index }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: benefitType,
    item: () => ({ ...item, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <ListItem
      p="2"
      borderRadius="md"
      boxShadow="md"
      mb="2"
      textAlign="auto"
      ref={dragRef}
      bg={
        isDragging
          ? benefitType === "benefit"
            ? "yellow.600"
            : "teal.400"
          : "white"
      }
      color={isDragging ? "white" : "black"}
    >
      <Button
        className="btn-tooltip"
        color="primary"
        id={"tooltip" + item.id}
        size="sm"
      >
        상세설명
      </Button>
      <UncontrolledTooltip
        delay={0}
        placement="left"
        target={"tooltip" + item.id}
        trigger="hover focus"
      >
        {item.detail}
      </UncontrolledTooltip>
      <span style={{ marginLeft: 50 }}>{item.benefitName}</span>
    </ListItem>
  );
};

export default Benefit;
