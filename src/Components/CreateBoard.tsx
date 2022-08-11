import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  input {
    border: none;
    height: 25px;
    padding: 5px;
    border-radius: 5px;
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
  button {
    display: flex;
    align-items: center;
    border: none;
    height: 25px;
    padding: 5px;
    color: white;
    background-color: rgba(99, 205, 218, 1);
    border-radius: 5px;
  }
`;

interface IForm {
  board: string;
}

function CreateBoard() {
  const setBoards = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ board }: IForm) => {
    setBoards((allBoards) => {
      return {
        ...allBoards,
        [board]: [],
      };
    });
    setValue("board", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("board", { required: true })}
        id="board__title"
        type="text"
        placeholder="보드 제목 입력..."
        autoComplete="off"
      />
      <button>Add</button>
    </Form>
  );
}

export default CreateBoard;
