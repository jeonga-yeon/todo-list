import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Area = styled.div<{ isDraggingOver: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isDraggingOver ? "rgba(253, 121, 168, 0.25)" : "transparent"};
  border-radius: 30px;
  box-shadow: ${(props) =>
    props.isDraggingOver
      ? "-1px -1px 50px rgba(253, 121, 168, 0.5)"
      : "transparent"};
`;

const Span = styled.span`
  font-size: 30px;
  color: white;
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

function DeleteItem() {
  return (
    <Wrapper>
      <Droppable droppableId="delete">
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Span>Delete</Span>
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DeleteItem;
