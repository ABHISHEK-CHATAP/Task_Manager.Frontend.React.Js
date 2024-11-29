/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig';
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";

const TaskFormModal = ({ fetchTasks, editingTask, setEditingTask , openModal, setOpenModal}) => {
  const [formData, setFormData] = useState(editingTask || { title: '', description: '' });

  console.log("editingTask from FormModal --" , editingTask);
  // setFormData({
  //   formData.title : editingTask.title,
  //   formData.description : editingTask.description
  // })

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
      });
    } else {
      setFormData({ title: '', description: '' });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      if (editingTask) {
        console.log("editing task -", editingTask);
        await axios.put(`/tasks/${editingTask._id}`, formData);
      } else {
        await axios.post('/tasks', formData);
      }
      setFormData({ title: '', description: '' });
      setEditingTask(null);
      fetchTasks();
      setOpenModal(false);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
     <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{editingTask ? 'Update Task Information' : 'Add Task Information'}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className='mx-5'>
                 <div className="max-w-md">
                    <div className="mb-2 block">
                    <Label value=" Title" />
                    </div>
                    <TextInput
                    className='w-full'
                    name="title"
                    type="text"
                    value={formData.title}
                    placeholder="Task Title "
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="max-w-md mt-3">
                    <div className="mb-2 block">
                    <Label value=" Description" />
                    </div>
                    <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Add a task description..." required rows={4} />
                </div>
                 <Button className='mt-5' type="submit">{editingTask ? 'Update Task' : 'Add Task'}</Button>    
            </form>
          </div>
        </Modal.Body>
      </Modal>
    
    </>
  );
};

export default TaskFormModal;
