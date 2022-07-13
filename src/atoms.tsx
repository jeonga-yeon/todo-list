import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface ItoDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<ItoDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
