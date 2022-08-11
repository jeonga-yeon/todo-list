import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "boards",
  storage: localStorage,
});

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "listBoards",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: "user",
  default: {
    name: "",
    password: "",
  },
  effects_UNSTABLE: [persistAtom],
});
