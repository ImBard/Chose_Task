import { useState, KeyboardEvent } from 'react'
import './App.css'
import { Trash } from '@phosphor-icons/react';

function App() {

  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [chosenTask, setChosenTask] = useState<string>("");

  const handleTaskd = (value: string) => {
    if (value == "") {
      alert("You need to write a task on input!");
    } else {
      setTasks([value, ...tasks]);
      setNewTask("");
    }

  }

  const handleNewTask = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (newTask === "") {
        alert("You need to write a task on input!");
      } else {
        setTasks([newTask, ...tasks]);
        setNewTask("");
      }
    }
  }

  function removeTask(task: string) {
    const index: number = tasks.indexOf(task);

    const newArray = [...tasks.slice(0, index), ...tasks.splice(index + 1)];
    setTasks(newArray);
    if (task === chosenTask) {
      setChosenTask("");
    }
  }

  function raffle() {

    const index = Math.floor(Math.random() * tasks.length);

    setChosenTask(tasks[index]);

    setInterval(() => {
      setLoading(false);
    }, 1000
    )


  }

  return (
    <div className='main'>
      <div className='card'>

        <h1 className='title'>
          What I should to do?
        </h1>
        {!loading &&
          <>
            <div className='inputDiv'>


              <input
                type="text"
                className='taskInput'
                placeholder='Type any task here'
                autoFocus={true}

                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleNewTask}
              />

              <button
                className='saveButton'
                onClick={() => handleTaskd(newTask)}
              >
                Save
              </button>
            </div>

            {chosenTask && tasks.length > 0 &&
              <div className='taskChosen'>
                <span>Your task is</span>
                <h2 className='myTask'>
                  {chosenTask}
                </h2>
              </div>
            }

            <h1 className='title' style={{ fontSize: 18, marginTop: 15 }}>
              Tasks
            </h1>
            <div className='tasks'>

              {tasks.length == 0 ?
                <span style={{ textAlign: 'center', color: "gray" }}>
                  No task created yet
                </span>

                : tasks.map((task) => {
                  return (
                    <div className='taskDiv'>
                      <input type="text" value={task} className='savedInput' />
                      <button
                        onClick={() => removeTask(task)}
                        className='buttonTask'>
                        <Trash size={25} weight="fill" className='trash' />
                      </button>
                    </div>
                  )
                })
              }
            </div>
            <button
              className='raffleButton'
              onClick={() => [raffle(), setLoading(true)]}
            >
              Raffle
            </button>
          </>
        }

        {loading &&
          <div style={{
            height: 250,
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: "column"
          }}>
            <img src="load.gif"
              alt="Img loading task"
              style={{ width: 60, marginBottom: 35 }}
            />
            <h2>Loading...</h2>
          </div>
        }
      </div>
    </div >
  )
}

export default App
