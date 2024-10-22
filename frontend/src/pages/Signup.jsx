import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { localhost } from "../localhost";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            value={firstName}
            placeholder="John"
            label={"First Name"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <InputBox
            value={lastName}
            placeholder="Doe"
            label={"Last Name"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <InputBox
            value={username}
            placeholder="harkirat@gmail.com"
            label={"Email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            value={password}
            placeholder="123456"
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign up"}
              onClick={async () => {
                const response = await axios.post(
                  `${localhost}/api/v1/user/signup`,
                  { username, firstName, lastName, password }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
