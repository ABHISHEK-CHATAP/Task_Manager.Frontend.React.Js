/* eslint-disable react/prop-types */
import  { useState, useEffect, useContext } from 'react';
import TaskFormModal from '../components/Tasks/TaskFormModal';
import TaskList from '../components/Tasks/TaskList';
import axios from '../api/axiosConfig';
import { Button, Navbar, Banner } from "flowbite-react";
import {  toast } from 'react-toastify';
import { ThemeContext } from '../Context/ThemeContext';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Dashboard = ({setAuth}) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [openModal, setOpenModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    }

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('/tasks');
      setTasks(data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const receiveEditDataFromTaskList = (task, boolean) => {
    setOpenModal(boolean);
    console.log("Edit data received in Dashboard before -", task); //data
    console.log("Dashboard editingTask before set -", editingTask); // null
    setEditingTask(task); // Schedule the state update
    console.log("Edit data received in Dashboard after-", task); //data
    console.log("Dashboard editingTask after set -", editingTask); // null
  };
  
  // UseEffect to log state after update
  useEffect(() => {
    console.log("Dashboard editingTask updated in useEffect -", editingTask);
  }, [editingTask]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    toast.success(' Logout successful', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
  };
  return (
    <>
      {/* NavBar  */}
      <Navbar fluid rounded className=" top-0 left-0 w-full">
        <div>
          <Navbar.Brand href="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcoEQeY4JWn85V3rQiXKg1mlEr0eAUMqyb4rH-NXEm1vJE6StXnwVb517IRTfjHhgY5Sc&usqp=CAU"
              className="mr-3 h-6 sm:h-9"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Task Manager{" "}
            </span>
          </Navbar.Brand>
        </div>

        <Navbar.Toggle />
        <Navbar.Collapse>
            <div className="flex mobile:mx-5 mobile:gap-2">
                <Button className="mx-3 " onClick={handleLogout}>
                    Logout
                </Button>

                <Button
                    onClick={toggleTheme}
                    className="flex align-middle mobile:mt-2"
                    outline
                    pill
                >
                    {theme === "light" ? (
                    <MdDarkMode className="mr-2 h-5 w-5" />
                    ) : (
                    <MdOutlineLightMode className="mr-2 h-5 w-5" />
                    )}
                    {theme === "light" ? " Dark " : " Light "}
                </Button>
            </div>
        </Navbar.Collapse>
      </Navbar>
      {/* NavBar  */}

      {/* banner  */}
      <Banner className="mb-4">
        <div className=" max-w-screen-md mx-auto mt-2 justify-between border-b border-gray-200 bg-gray-50 px-10 py-2 dark:border-gray-600 dark:bg-gray-700">
          <div className="flex justify-between ">
            <h1 className="mt-2 text-lg font-bold">My Tasks</h1>
            <Button
              outline
              gradientDuoTone="greenToBlue"
              onClick={() => setOpenModal(true)}
            >
              Add Task
            </Button>
          </div>
        </div>
      </Banner>
      {/* banner  */}

      <div className="w-5/6 mx-auto">
        <hr />
      </div>

      <div>
        <TaskFormModal
          fetchTasks={fetchTasks}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          handleEditTaskData={receiveEditDataFromTaskList}
        />
      </div>
    </>
  );
};

export default Dashboard;
