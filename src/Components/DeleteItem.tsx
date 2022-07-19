import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
`;

const Area = styled.div`
  width: 100%;
  height: 100%;
  background-color: purple;
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
        {(provided) => (
          <Area ref={provided.innerRef} {...provided.droppableProps}>
            <Span>Delete</Span>
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DeleteItem;
