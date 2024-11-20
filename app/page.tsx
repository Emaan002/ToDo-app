"use client";

import { useState } from "react";

interface Task {
  id: number;
  text: string;
}

export default function Home() {
  const [task, setTask] = useState<string>(""); 
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [showDropdown, setShowDropdown] = useState<boolean>(false); 

  const timeOptions = [
    "6:00 AM - 7:00 AM",
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
  ];

 
  const addTask = () => {
    if (task.trim()) {
      const newTask: Task = { id: Date.now(), text: task };
      setTasks([...tasks, newTask]); 
      setTask(""); 
    }
  };

 
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id)); 
  };

  
  const selectTime = (time: string) => {
    setTask((prevTask) => `${prevTask} (${time})`);
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-mono bg-gray-100">
      <div className="bg-[#62825D] rounded-lg shadow-lg shadow-green-900 bg-[url(/bg.png)] w-full max-w-lg">
        <h1 className="flex justify-center text-2xl md:text-3xl font-bold mb-6 mt-3 text-[#47a544]">
          Make your To-Do List
        </h1>

        <div className="mb-8 px-4">
          <div className="relative flex justify-center items-center gap-2">
        
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a task"
              className="flex-1 px-4 py-2 border rounded-l-md border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-800"
              onFocus={() => setShowDropdown(false)} 
            />

           
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="bg-green-950 text-white px-4 py-2 rounded-r-md hover:bg-green-600/25 focus:outline-none"
            >
              Time
            </button>

           
            {showDropdown && (
              <div className="absolute z-10 w-[300px] text-black bg-white border border-gray-300 rounded-md shadow-lg mt-12 left-1/2 transform -translate-x-1/2">
                {timeOptions.map((time) => (
                  <div
                    key={time}
                    onClick={() => selectTime(time)}
                    className="px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                  >
                    {time}
                  </div>
                ))}
              </div>
            )}
          </div>

       
          <div className="flex justify-center mt-4">
            <button
              onClick={addTask}
              className="bg-green-950 text-white px-4 py-2 rounded-md hover:bg-green-600/25  sm:w-auto lg:w-auto"
            >
              Add Task
            </button>
          </div>
        </div>

      
        <ul className="mt-6 px-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 mb-2 bg-white rounded-md shadow-md"
            >
              <span className="text-gray-800 font-medium">{task.text}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
