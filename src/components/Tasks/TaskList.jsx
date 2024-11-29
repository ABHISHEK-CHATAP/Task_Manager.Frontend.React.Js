/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Card, Modal } from 'flowbite-react';
import axios from '../../api/axiosConfig';
import { TbEdit } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const TaskList = ({ tasks, fetchTasks, handleEditTaskData }) => {
    // console.log("task -",tasks)

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState(null);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      };

      const handleEdit =(task)=>{
        handleEditTaskData(task, true);
      }

      const confirmDelete = async () => {
        try {
          if (taskIdToDelete) {
            await axios.delete(`/tasks/${taskIdToDelete}`);
            fetchTasks();
            setTaskIdToDelete(null); // Reset the task to delete
          }
          setOpenDeleteModal(false); // Close modal
        } catch (error) {
          console.error(error.response.data.message);
        }
      };
    
      const handleDelete = (id) => {
        setTaskIdToDelete(id); // Set the task ID to delete
        setOpenDeleteModal(true); // Open confirmation modal
      };

  return (
    <>
    <ul>
      {tasks.length !== 0 ? (
        tasks.map((task) => (
            <Card
              className=" max-w-screen-md mx-auto mt-5 justify-between "
              key={task._id}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {task.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
              {task.description}
              </p>
    
              <div className='flex justify-between'>
                {/* card buttons  */}
                <div className="flex flex-wrap gap-2">
                  <Button size="xs" gradientMonochrome="teal" onClick={() => handleEdit(task)}>
                    <TbEdit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="xs" gradientMonochrome="failure" onClick={() => handleDelete(task._id)}>
                    <MdDeleteForever className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
                {/* card buttons  */}
                <div className='text-yellow-950 dark:text-gray-500 font-mono mobile:text-xs mobile:mt-1'>{formatDate(task.createdAt)}</div>
              </div>
            </Card>
          ))
      ) : (
        <>
        <h1 className='text-2xl font-mono mt-5 text-center text-green-400 font-bold dark:text-yellow-50'> No Tasks Added ..!</h1>
        </>
      )
      }
    </ul>


    {/* code for delete confirm model  */}
    <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Task ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default TaskList;
