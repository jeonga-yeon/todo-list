import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../atoms";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    animation: fadeIn 0.5s linear;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    position: fixed;
    top: 80px;
    h1 {
      text-align: center;
      font-size: 35px;
      color: white;
      font-weight: 600;
    }
  }
`;

const Form = styled.form`
  width: 400px;
  padding: 30px;
  label {
    padding-left: 10px;
    font-size: 25px;
    margin-bottom: 5px;
    font-weight: 600;
    color: #0a3d62;
    width: 100%;
  }
  input {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 20px;
    padding: 20px 20px;
    border-radius: 30px;
    border: none;
    &:focus {
      outline: none;
      background-color: #dff9fb;
    }
    &:hover {
      background-color: #dff9fb;
    }
  }
  .btn__save {
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      width: 60px;
      height: 40px;
      border: none;
      background-color: #22a6b3;
      border-radius: 15px;
      color: white;
      font-weight: 600;
      font-size: 16px;
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        color: #0a3d62;
      }
    }
  }
`;

const WrapConfirm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 100vh;
  h1 {
    position: fixed;
    top: 200px;
    font-size: 70px;
    font-weight: 600;
    color: #0a3d62;
  }
`;

const ConfirmForm = styled.form`
  width: 100%;
  padding: 30px;
  label {
    padding-left: 10px;
    font-size: 25px;
    font-weight: 600;
    color: #0a3d62;
    width: 100%;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  input {
    width: 100%;
    padding: 20px 20px;
    border-radius: 30px;
    border: none;
    &:focus {
      outline: none;
      background-color: #dff9fb;
    }
    &:hover {
      background-color: #dff9fb;
    }
  }
  button {
    text-align: center;
    width: 60px;
    height: 50px;
    border: none;
    background-color: #22a6b3;
    border-radius: 20px;
    color: white;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    margin-left: 5px;
    &:hover {
      color: #0a3d62;
    }
  }
`;

interface IForm {
  name: string;
  password: string;
  password1?: string;
}

function LogIn() {
  const wrapper = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    const IMG_NUMBER = 3;

    const paintImage = (imgNumber: number) => {
      if (wrapper.current) {
        const image = new Image();
        image.src = `images/${imgNumber}.jpg`;
        wrapper.current.prepend(image);
      }
    };

    const genRandom = () => {
      const number = Math.floor(Math.random() * IMG_NUMBER);
      return number;
    };

    const randomNumber = genRandom();
    paintImage(randomNumber);
  }, []);
  return (
    <Wrapper ref={wrapper}>
      {userInfo.name === "" ? (
        <FormContainer>
          <div className="title">
            <h1>오늘의 할 일은 무엇인가요?</h1>
          </div>
          <Form className="form__save" onSubmit={handleSubmit(onValid)}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              {...register("name", { required: true })}
              type="text"
              placeholder="이름을 입력해주세요..."
              required
            />
            <label htmlFor="password">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="비밀번호를 입력해주세요..."
              id="password"
              required
            />
            <div className="btn__save">
              <button>Save</button>
            </div>
          </Form>
        </FormContainer>
      ) : (
        <WrapConfirm>
          <h1>Hello {userInfo.name}</h1>
          <ConfirmForm
            className="form__confirm"
            onSubmit={handleSubmit(onValidPassword)}
          >
            <label htmlFor="confirm">Password</label>
            <div>
              <input
                id="confirm"
                {...register("password1", { required: true })}
                type="password"
                placeholder="비밀번호를 입력해주세요..."
                required
              />
              <button>Enter</button>
            </div>
            <span>{errors?.password1?.message}</span>
          </ConfirmForm>
        </WrapConfirm>
      )}
    </Wrapper>
  );
}

export default LogIn;
