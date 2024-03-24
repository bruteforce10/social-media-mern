import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import CostumInput from "./CostumInput";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Please enter a valid email").required("required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const FormPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (values, actions) => {
    console.log(values);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    actions.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, actions) => {
    const loggedResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedResponse.json();
    actions.resetForm();
    console.log(loggedIn);
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const onSubmit = async (values, actions) => {
    if (isLogin) await login(values, actions);
    if (isRegister) await register(values, actions);
  };

  return (
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, resetForm }) => (
        <Form>
          <div className="space-y-4 mb-6">
            {isRegister && (
              <>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 ">
                  <CostumInput
                    label={"Firstname"}
                    name="firstName"
                    type="text"
                    placeholder="Enter your firstname"
                  />
                  <CostumInput
                    label={"Lastname"}
                    name="lastName"
                    type="text"
                    placeholder="Enter your Lastname"
                  />
                </div>
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    const url = URL.createObjectURL(acceptedFiles[0]);
                    setImageUrl(url);
                    setFieldValue("picture", acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className="h-16 border-2 border-dashed border-secondary rounded-lg flex justify-center items-center"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <div className="flex gap-x-4 items-center">
                          <img
                            src={imageUrl}
                            alt="profile"
                            className="w-10 rounded-md"
                          />
                          <p>{values.picture.name}</p>
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </>
            )}

            <CostumInput
              label={"Email"}
              name="email"
              type="email"
              placeholder="Enter your email"
            />

            <CostumInput
              label={"Password"}
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {isRegister && (
              <CostumInput
                label={"Confirm Password"}
                name="confirmPassword"
                type="password"
                placeholder="Enter your Confirm password"
              />
            )}
            <div
              className="cursor-pointer"
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
            >
              {isLogin ? (
                <p>
                  Don't have an account?{" "}
                  <span className="text-primary underline underline-offset-1">
                    {" "}
                    Sign Up here.
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span className="text-primary underline underline-offset-1">
                    {" "}
                    Login here.
                  </span>
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary hover:bg-primary transition-all text-white py-3 rounded-lg"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormPage;
