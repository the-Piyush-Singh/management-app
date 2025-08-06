import React, { useEffect, useState } from "react";
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
import Task from "../components/Task";
import { showToast } from "../helper/showToast";

const TaskListPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRefresh(false);
    const getTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/task/get-all-task`
        );
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const responseData = await response.json();
        setTasks(responseData);
      } catch (err) {
        showToast("error", err.message);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, [refresh]);

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/task/delete-task/${taskId}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to delete task");
      }
      showToast("success", responseData.message);
      setRefresh(true);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">My Tasks</h1>

      {loading ? (
        <>Loading...</>
      ) : tasks?.status ? (
        tasks.taskData.length > 0 ? (
          tasks.taskData.map((task) => (
            <Task key={task._id} props={task} onDelete={deleteTask} />
          ))
        ) : (
          <>0 Task.</>
        )
      ) : (
        <>Failed to load tasks.</>
      )}
    </div>
  );
};

export default TaskListPage;
