import React, { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import Todo from "../components/Todo";
import "../styles/TaskList.css";
import { FaPlus } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function TaskList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const userid = 1;

  async function reloadData() {
    let data;
    try {
      const res = await fetch(`/getUserTasks/${userid}`);
      data = await res.json();
    } catch (e) {
      console.log(e);
    }

    if (data && data.length !== 0) {
      data && setTodos(data.tasks);
      setLoading(false);
    }
  }

  useEffect(() => {
    reloadData();
    return () => {};
  }, []);

  const addTodo = (todo) => {
    if (!todo.task || /^\s*$/.test(todo.task)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const addFromAccordion = async (todo) => {
    const newtask = {
      userid: userid,
      task: todo,
      taskid: Math.floor(Math.random() * 10000),
      complete: false,
    };
    const newTodos = [newtask, ...todos];
    setTodos(newTodos);

    await fetch("/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newtask),
    }).catch((error) => {
      console.log(error);
      return;
    });
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.task || /^\s*$/.test(newValue.task)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.taskid === todoId ? newValue : item))
    );
  };

  const removeTodo = async (id) => {
    const removedArr = [...todos].filter((todo) => todo.taskid !== id);
    setTodos(removedArr);
    // window.location.reload(false);
  };

  const completeTodo = async (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.taskid === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodos(updatedTodos);

    let val = updatedTodos.filter((obj) => {
      return obj.taskid === id;
    });

    const b = val[0].complete;

    await fetch("/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, val: b }),
    }).catch((error) => {
      console.log(error);
      return;
    });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <h1 className="mt-5">Make A List Of Your Most Important Tasks</h1>
        <div className="row mt-5">
          <div className="col-sm-12 col-lg-6">
            <div className="todo-container">
              <TodoForm userid={userid} onSubmit={addTodo} />
              {loading ? (
                <div>
                  <p>Loading all your tasks</p>
                  <p>
                    <img alt="loading" src={"../img/loading.gif"}></img>
                  </p>
                </div>
              ) : (
                <Todo
                  todos={todos}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                  userid={userid}
                />
              )}
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <h2 className="mb-2">Some Common Tasks</h2>
            <div className="dropdown-container">
              <div className="accordion" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Table Decor
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div className="accordion-task">
                        <p>Centerpieces</p>
                        <FaPlus
                          className="plus-icon"
                          onClick={() => addFromAccordion("Centerpieces")}
                        />
                      </div>
                      <div className="accordion-task">
                        <p>Florals</p>
                        <FaPlus
                          className="plus-icon"
                          onClick={() => addFromAccordion("Florals")}
                        />
                      </div>
                      <div className="accordion-task">
                        <p>Escort Cards</p>
                        <FaPlus
                          className="plus-icon"
                          onClick={() => addFromAccordion("Escort Cards")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      Reception
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div className="accordion-task">
                        <p>Baker</p>
                        <FaPlus
                          className="plus-icon"
                          onClick={() => addFromAccordion("Baker")}
                        />
                      </div>
                      <div className="accordion-task">
                        <p>Balloons</p>
                        <FaPlus
                          className="plus-icon"
                          onClick={() => addFromAccordion("Balloons")}
                        />
                      </div>
                      <div className="accordion-task">
                        <p>Cake</p>
                        <FaPlus
                          className="plus-icon"
                          onClick={() => addFromAccordion("Cake")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      Ceremony
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div className="accordion-task">
                        <p>Bartender</p>
                        <FaPlus
                          className="plus-icon"
                          onClick={() => addFromAccordion("Bartender")}
                        />
                      </div>
                      <div className="accordion-task">
                        <p>Caterer</p>
                        <FaPlus
                          className="plus-icon"
                          onClick={() => addFromAccordion("Caterer")}
                        />
                      </div>
                      <div className="accordion-task">
                        <p>Music</p>
                        <FaPlus
                          className="plus-icon"
                          onClick={() => addFromAccordion("Music")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

TaskList.proptype = {};
