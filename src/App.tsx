import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import DeleteItem from "./Components/DeleteItem";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
  min-height: 200px;
  justify-content: center;
  align-items: center;
`;

const DeleteArea = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 250px;
  height: 200px;
  background-color: pink;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === "delete") {
      setToDos((allBoards) => {
        const changedBoard = [...allBoards[source.droppableId]];
        changedBoard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: changedBoard,
        };
      });
      return;
    }
    if (destination?.droppableId === source.droppableId) {
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
    }
    if (destination.droppableId !== source.droppableId) {
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
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
      <DeleteArea>
        <DeleteItem />
      </DeleteArea>
    </DragDropContext>
  );
}

export default App;
