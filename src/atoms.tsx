import { atom } from "recoil";

interface ItoDoState {
  [key: string]: string[];
}

export const toDoState = atom<ItoDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    Doing: ["c", "d", "e"],
    Done: ["f"],
  },
});
