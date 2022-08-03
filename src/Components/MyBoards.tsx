import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";
import DeleteItem from "./DeleteItem";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("boardImg/0.jpg");
`;

const Boards = styled.div`
  display: flex;
  min-height: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const DeleteArea = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 250px;
  height: 80px;
`;

function MyBoards() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (source.droppableId === "boards") {
      setToDos((allBoards) => {
        const changedBoard = Object.entries(allBoards);
        const movingBoard = changedBoard[source.index];
        changedBoard.splice(source.index, 1);
        changedBoard.splice(destination.index, 0, movingBoard);
        return Object.fromEntries(changedBoard);
      });
    } else if (destination.droppableId === "delete") {
      setToDos((allBoards) => {
        const changedBoard = [...allBoards[source.droppableId]];
        changedBoard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: changedBoard,
        };
      });
    } else if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const changedBoard = [...allBoards[source.droppableId]];
        const taskObj = changedBoard[source.index];
        changedBoard.splice(source.index, 1);
        changedBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: changedBoard,
        };
      });
    } else if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Helmet>
          <title>나의 할 일</title>
        </Helmet>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(provided, snapshot) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  key={boardId}
                  boardId={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
      <DeleteArea>
        <DeleteItem />
      </DeleteArea>
    </DragDropContext>
  );
}

export default MyBoards;
