import React, { useState } from &quot;react&quot;;

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(&quot;&quot;);

  // Function to add a task
  const addTask = () =&gt; {
    if (newTask.trim() === &quot;&quot;) return; // Prevent adding empty tasks
    setTasks([...tasks, newTask]);
    setNewTask(&quot;&quot;);
  };

  // Function to remove a task by index
  const removeTask = (index) =&gt; {
    setTasks(tasks.filter((_, i) =&gt; i !== index));
  };

  return (
    &lt;div style={styles.container}&gt;
      &lt;h1&gt;To-Do List&lt;/h1&gt;

      {/* Input &amp; Add Button */}
      &lt;div&gt;
        &lt;input
          type=&quot;text&quot;
          value={newTask}
          onChange={(e) =&gt; setNewTask(e.target.value)}
          placeholder=&quot;Enter a task...&quot;
          style={styles.input}
        /&gt;
        &lt;button onClick={addTask} style={styles.button}&gt;
          Add Task
        &lt;/button&gt;
      &lt;/div&gt;

      {/* Task List */}
      {tasks.length &gt; 0 ? (
        &lt;ul style={styles.list}&gt;
          {tasks.map((task, index) =&gt; (
            &lt;li key={index} style={styles.listItem}&gt;
              {task}
              &lt;button onClick={() =&gt; removeTask(index)} style={styles.deleteButton}&gt;
                ❌
              &lt;/button&gt;
            &lt;/li&gt;
          ))}
        &lt;/ul&gt;

      ) : (
        &lt;p style={styles.emptyMessage}&gt;No tasks yet! Add a new task above. ��&lt;/p&gt;
      )}
    &lt;/div&gt;
  );
}

// Simple inline styles for better appearance
const styles = {
  container: {
    textAlign: &quot;center&quot;,
    marginTop: &quot;50px&quot;,
    fontFamily: &quot;Arial, sans-serif&quot;,
  },
  input: {
    padding: &quot;10px&quot;,
    marginRight: &quot;10px&quot;,
    width: &quot;250px&quot;,
    fontSize: &quot;16px&quot;,
  },
  button: {
    padding: &quot;10px 15px&quot;,
    fontSize: &quot;16px&quot;,
    cursor: &quot;pointer&quot;,
    backgroundColor: &quot;#28a745&quot;,
    color: &quot;white&quot;,
    border: &quot;none&quot;,
    borderRadius: &quot;5px&quot;,
  },
  list: {

    listStyle: &quot;none&quot;,
    padding: 0,
    marginTop: &quot;20px&quot;,
  },
  listItem: {
    display: &quot;flex&quot;,
    justifyContent: &quot;space-between&quot;,
    alignItems: &quot;center&quot;,
    padding: &quot;10px&quot;,
    borderBottom: &quot;1px solid #ccc&quot;,
    fontSize: &quot;18px&quot;,
  },
  deleteButton: {
    backgroundColor: &quot;red&quot;,
    color: &quot;white&quot;,
    border: &quot;none&quot;,
    padding: &quot;5px 10px&quot;,
    cursor: &quot;pointer&quot;,
  },
  emptyMessage: {
    fontSize: &quot;18px&quot;,
    color: &quot;#888&quot;,
    marginTop: &quot;20px&quot;,
  },
};
export default TodoApp;

import React from &quot;react&quot;;
import ReactDOM from &quot;react-dom/client&quot;; // ✅ Correct import for React 18

import TodoApp from &quot;./App&quot;;

const root = ReactDOM.createRoot(document.getElementById(&quot;root&quot;)); // ✅ Correct method
root.render(&lt;TodoApp /&gt;);
