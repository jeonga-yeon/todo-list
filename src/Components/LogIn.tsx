import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../atoms";
import React from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

interface IForm {
  name: string;
  password: string;
  password1?: string;
}

function LogIn() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ name, password }: IForm) => {
    const user = {
      name,
      password,
    };
    setUserInfo(user);
    setValue("password", "");
  };
  const onValidPassword = ({ password1 }: IForm) => {
    if (userInfo.password === password1) {
      navigate("/boards");
    } else {
      setError(
        "password1",
        { message: "패스워드가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
  };
  return (
    <Wrapper>
      {userInfo.name === "" ? (
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="이름을 입력해주세요..."
          />
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="비밀번호를 입력해주세요..."
          />
          <button>확인</button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit(onValidPassword)}>
          <h1>Hello {userInfo.name}</h1>
          <input
            {...register("password1", { required: true })}
            type="password"
            placeholder="비밀번호를 입력해주세요..."
          />
          <button>확인</button>
          <span>{errors?.password1?.message}</span>
        </Form>
      )}
    </Wrapper>
  );
}

export default LogIn;
