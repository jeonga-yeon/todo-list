# Kanban ToDo-List

할 일을 카테고리별로 나누어 체크할 수 있는 칸반 투두리스트  
//링크첨부
<br />
<br />

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
<hr />
파일 구조

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

사용 기술

```
React, Typescript, Recoil, styled-components
```

<br />
