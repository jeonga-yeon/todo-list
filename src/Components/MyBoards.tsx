import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Board from "./Board";
import DeleteItem from "./DeleteItem";
import { Helmet } from "react-helmet";
import CreateBoard from "./CreateBoard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("boardImg/0.jpg");
  .boards__wrapper {
    margin: 0px 1000px;
  }
  .prev__div,
  .next__div {
    position: fixed;
    width: 60px;
    height: 560px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      .prev,
      .next {
        color: white;
      }
    }
  }
  .prev__div {
    left: 0px;
  }
  .next__div {
    right: 0px;
  }
  .prev,
  .next {
    color: transparent;
    font-size: 40px;
    transition: color 0.3s ease-in-out;
    cursor: pointer;
  }
  .boards__wrapper {
    transition: transform 0.6s ease-in-out;
  }
`;

const Boards = styled.div`
  display: flex;
  min-height: 200px;
  justify-content: center;
  align-items: center;
`;

const DeleteArea = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 250px;
  height: 80px;
`;

const CreateBoardForm = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 230px;
  height: 60px;
`;

function MyBoards() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const boardsWrapper = useRef<HTMLDivElement>(null);
  const [prev, setPrev] = useState(1);
  const [next, setNext] = useState(1);
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
  const onPrev = () => {
    if (boardsWrapper.current) {
      const prevX = 300 * prev;
      boardsWrapper.current.style.transform = `translateX(${prevX}px)`;
      setNext(0);
      setPrev((current) => current + 1);
    }
  };
  const onNext = () => {
    if (boardsWrapper.current) {
      const nextX = 300 * next;
      boardsWrapper.current.style.transform = `translateX(-${nextX}px)`;
      setPrev(0);
      setNext((current) => current + 1);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Helmet>
          <title>나의 할 일</title>
        </Helmet>
        <div className="boards__wrapper" ref={boardsWrapper}>
          <Droppable droppableId="boards" direction="horizontal" type="board">
            {(provided) => (
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
        </div>
        <CreateBoardForm>
          <CreateBoard />
        </CreateBoardForm>
        <div className="prev__div">
          <FontAwesomeIcon
            onClick={onPrev}
            icon={faChevronLeft}
            className="prev"
          />
        </div>
        <div className="next__div">
          <FontAwesomeIcon
            onClick={onNext}
            icon={faChevronRight}
            className="next"
          />
        </div>
        <DeleteArea>
          <DeleteItem />
        </DeleteArea>
      </Wrapper>
    </DragDropContext>
  );
}

export default MyBoards;
