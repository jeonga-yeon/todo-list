# Kanban ToDo-List

할 일을 카테고리별로 나누어 체크할 수 있는 칸반 투두리스트  
https://jeonga-yeon.github.io/todo-list/
<br />
<br />

## 주요 기능

✅ 비밀번호 설정  
사용자의 이름과 패스워드를 입력해 데이터를 저장  
![login](https://user-images.githubusercontent.com/76932302/184075049-ebec6671-9eff-45c8-bf2c-d57f243e70e2.gif)

<br />
✅ 로그인    
<br />
패스워드를 입력해 사용자 정보와 일치하면 칸반 보드로 이동

![password](https://user-images.githubusercontent.com/76932302/184075488-d8ba67be-c509-485a-86d6-ab5512adaeaf.gif)
<br />  
✅ 투두 리스트

- 카테고리별로 할 일을 체크할 수 있다. To Do, Doing, Done 보드가 기본 설정
  ![투두](https://user-images.githubusercontent.com/76932302/184078726-bad30cf9-8e9f-46b1-9841-02c94e0d30eb.gif)
- 보드의 생성, 삭제, 순서 교체
  ![투두1](https://user-images.githubusercontent.com/76932302/184087475-3c711b08-ded2-4653-bcbb-f9107d88c979.gif)
  ![투두2](https://user-images.githubusercontent.com/76932302/184087707-65473203-82e7-43c6-8deb-af55770ee97d.gif)

<br />

## 문제 해결

1. localStorage.setItem 함수를 form의 유효성을 검정하는 onValid 함수에 위치 시킴  
   -> 맨 처음 입력한 값은 storage에 저장되지 않음  
   -> 페이지를 새로고침 하면 localStorage 정보가 삭제됨

   이를 해결하기 위해

   ```
   import { recoilPersist } from "recoil-persist";

   const { persistAtom } = recoilPersist({
    key: "boards",
    storage: localStorage,
   });
   ```

   recoil-persist를 설치하고 import 한 후 key 값과 storage 설정

   ```
   export const toDoState = atom<IToDoState>({
    key: "listBoards",
    default: {
      "To Do": [],
      Doing: [],
      Done: [],
    },
    effects_UNSTABLE: [persistAtom],
   });
   ```

   위와 같이 effects_UNSTABLE: [persistAtom] 항목을 추가

   <br />

2. 보드의 순서를 바꿀 때 튕김 현상이 일어나며 실행되지 않음  
   -> Droppable 컴포넌트의 요소에 direction="horizontal"를 추가해줘야 했다.
   ```
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
   ```

<br />

## 파일 구조

    src
      - components
        - Board.tsx
        - CreateBoard.tsx
        - DeleteItem.tsx
        - DraggableCard.tsx
        - logIn.tsx
        - MyBoards.tsx
      - App.tsx
      - atoms.tsx
      - index.tsx

<br />

## 사용 기술

```
React, Typescript, Recoil, styled-components
```

<br />
