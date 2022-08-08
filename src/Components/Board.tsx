import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  .icon__times {
    position: absolute;
    right: 10px;
    color: transparent;
    &:hover {
      color: #bdc3c7;
    }
    font-size: 25px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  color: #0a3d62;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "rgba(255, 234, 167, 0.4)"
      : props.isDraggingFromThis
      ? "rgba(248, 165, 194, 0.4)"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
  height: 500px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(189, 195, 199, 0.7);
    border-radius: 4px;
  }
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    height: 30px;
    border: none;
    padding-left: 20px;
    &::placeholder {
      color: #0a3d62;
    }
    &:focus {
      outline: none;
      background-color: #dff9fb;
    }
    &:hover {
      background-color: #dff9fb;
    }
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  const onClick = (boardId: string) => {
    setToDos((allBoards) => {
      const deletedBoard = { ...allBoards };
      delete deletedBoard[boardId];
      return deletedBoard;
    });
  };
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Title>{boardId}</Title>
          <FontAwesomeIcon
            icon={faTimes}
            className="icon__times"
            onClick={() => onClick(boardId)}
          />
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`${boardId} 입력`}
            />
          </Form>
          <Droppable droppableId={boardId}>
            {(provided, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Board;
