import { useContext } from "react";
import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
// import img from '../../assets/images/task_manager-img.jpg';


// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcoEQeY4JWn85V3rQiXKg1mlEr0eAUMqyb4rH-NXEm1vJE6StXnwVb517IRTfjHhgY5Sc&usqp=CAU"
const NavigationBar = () => {
const navigate = useNavigate();

const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Navbar fluid rounded className="fixed top-0 left-0 w-full">
        <Navbar.Brand href="/">
          <span className="mr-4 self-center whitespace-nowrap text-2xl font-semibold dark:text-white font-serif">
            Task Manager{" "}
          </span>
        </Navbar.Brand>

       
        <Navbar.Toggle />
        <Navbar.Collapse>
          <div className="flex mobile:mt-2 mobile:mx-7 ">
          
          <Button
            onClick={toggleTheme}
            className="flex align-middle"
            outline pill
          >
            {theme === "light" ? (<MdDarkMode className="mr-2 h-5 w-5" />) : (<MdOutlineLightMode className="mr-2 h-5 w-5" />)}
            {theme === "light" ? " Dark " : " Light "}
          </Button>

          <Button className="mx-3" onClick={() => navigate("/login")}>
            Login
          </Button>

          <Button onClick={() => navigate("/register")}>Sign up</Button>

        </div>
      </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar
