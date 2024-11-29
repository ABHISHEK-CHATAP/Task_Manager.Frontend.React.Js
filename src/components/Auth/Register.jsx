import  { useState } from 'react';
import axios from '../../api/axiosConfig';
import { Card, Label, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../Layouts/NavigationBar';
import {  toast } from 'react-toastify';


const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', formData);
    //   alert('User registered successfully!');
      toast.success(' User registered successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
     navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(' Failed to registered user, try again ..!', {
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
     <div className="grid place-items-center min-h-screen bg-gray-100  dark:bg-slate-800 dark:text-white">
      <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg mb-10">
      <div className="mb-3">
            <h1 className="text-2xl font-serif font-bold "><span className="text-3xl text-green-400">WELCOME </span> Create An Account</h1>
        </div>
        <form onSubmit={handleSubmit}>
            {/* name field  */}
            <div className="max-w-md">
            <div className="mb-2 block">
              <Label value=" Name" />
            </div>
            <TextInput
              name="name"
              type="text"
              icon={MdOutlineDriveFileRenameOutline}
              placeholder="enter name"
              onChange={handleChange}
              required
            />
          </div>
          {/* name field  */}
          {/* email field  */}
          <div className="max-w-md mt-3">
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
          {/* email field  */}
          {/* password field  */}
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
          {/* password field  */}

          <Button type="submit" gradientMonochrome="success" className="mt-4">
            Register
          </Button>
        </form>
      </Card>
    </div>

    </>
  );
};

export default Register;
