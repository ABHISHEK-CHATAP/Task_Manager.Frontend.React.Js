/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "../../api/axiosConfig";
import {Alert, Card, Label, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Layouts/NavigationBar";
import {  toast } from 'react-toastify';


const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      setAuth(true);
      toast.success(' Login successful', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
      navigate("/dashboard")    
    } catch (error) {
      setErrMsg(error.response.data.message);
      toast.error(' Failed to Login, try again ..!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  return (
    <>
     {/* NavBar  */}
     <NavigationBar/>
    {/* NavBar  */}
    <div className="grid place-items-center min-h-screen bg-gray-100 dark:bg-slate-800 dark:text-white">
      <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg mb-10">
        <div className="mb-3">
            <h1 className="text-2xl font-serif font-bold "><span className="text-3xl text-green-400">WELCOME </span> Log In To Your Account</h1>
        </div>
        {/* alert box  */}
        <Alert className={errMsg ? "block" : "hidden"} color="failure" icon={HiInformationCircle}>
          <span className="font-medium">{errMsg} !</span> 
        </Alert>
        {/* alert box  */}

        <form onSubmit={handleSubmit}>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label value=" Email" />
            </div>
            <TextInput
              name="email"
              type="email"
              icon={HiMail}
              placeholder="name@example.com"
              onChange={handleChange}
              required
            />
          </div>
          <div className="max-w-md mt-3">
            <div className="mb-2 block">
              <Label value=" Password" />
            </div>
            <TextInput
              name="password"
              type="password"
              icon={RiLockPasswordFill}
              onChange={handleChange}
              placeholder="enter password"
              required
            />
          </div>
          <Button type="submit" gradientMonochrome="success" className="mt-4">
            Login
          </Button>
          <div className="mt-5 flex justify-center">
            <p>
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-green-500 underline">
                Sign up
              </a>
            </p>
          </div>
          <div className="mt-2 flex justify-center">
            OR
          </div>
          <div className="mt-2 flex justify-center">
            <p>
              <a href="/" className="text-green-500 underline">
                Back to Home
              </a>
            </p>
          </div>
        </form>
      </Card>
    </div>
    </>
  );
};

export default Login;
