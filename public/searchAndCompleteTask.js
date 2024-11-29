// 2. Search Tasks
// Allow users to search tasks by title or description.

// Update TaskList Component
// javascript
// Copy code
// const [search, setSearch] = useState("");

// const filteredTasks = tasks.filter(task =>
//   task.title.toLowerCase().includes(search.toLowerCase()) ||
//   task.description.toLowerCase().includes(search.toLowerCase())
// );

// return (
//   <div>
//     <input
//       type="text"
//       placeholder="Search tasks..."
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//     />
//     <ul>
//       {filteredTasks.map((task) => (
//         <li key={task._id}>
//           <h3>{task.title}</h3>
//           <p>{task.description}</p>
//           <button onClick={() => setEditingTask(task)}>Edit</button>
//           <button onClick={() => handleDelete(task._id)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   </div>
// );
// 3. Task Completion Status
// Add a checkbox to mark tasks as complete.

// Update TaskForm Component
// javascript
// Copy code
// <input
//   type="checkbox"
//   name="completed"
//   checked={formData.completed}
//   onChange={() => setFormData({ ...formData, completed: !formData.completed })}
// />
// Update TaskList Component
// javascript
// Copy code
// {tasks.map((task) => (
//   <li key={task._id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
//     <input
//       type="checkbox"
//       checked={task.completed}
//       onChange={() => toggleComplete(task._id)}
//     />
//     <h3>{task.title}</h3>
//     <p>{task.description}</p>
//   </li>
// ))}