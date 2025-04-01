import React, { useState } from &#39;react&#39;;

function AddTask({ onAddTask }) {
  const [task, setTask] = useState(&#39;&#39;);

  const handleSubmit = (e) =&gt; {
    e.preventDefault();
    if (task) {
      onAddTask(task);
      setTask(&#39;&#39;);
    }
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;label htmlFor=&quot;task-title&quot;&gt;Task Title&lt;/label&gt;
      &lt;input
        id=&quot;task-title&quot;
        type=&quot;text&quot;
        value={task}
        onChange={(e) =&gt; setTask(e.target.value)}
        required
      /&gt;
      &lt;button type=&quot;submit&quot;&gt;Add Task&lt;/button&gt;
    &lt;/form&gt;
  );
}
export default AddTask;

import { render, screen } from &#39;@testing-library/react&#39;;
import TaskList from &#39;./TaskList&#39;;

test(&#39;renders a list of tasks&#39;, () =&gt; {
  const tasks = [
    { id: 1, title: &#39;Test Task 1&#39; },
    { id: 2, title: &#39;Test Task 2&#39; },
  ];

  render(&lt;TaskList tasks={tasks} /&gt;);

  tasks.forEach(task =&gt; {
    expect(screen.getByText(task.title)).toBeInTheDocument();
  });

});

test(&#39;displays &quot;No tasks available&quot; if the list is empty&#39;, () =&gt; {
  render(&lt;TaskList tasks={[]} /&gt;);

  expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();
});

import { render, screen, fireEvent, waitFor } from &#39;@testing-library/react&#39;;
import AddTask from &#39;./AddTask&#39;;

test(&#39;submits the form with valid data&#39;, async () =&gt; {
  const handleAddTask = jest.fn();
  render(&lt;AddTask onAddTask={handleAddTask} /&gt;);

  const input = screen.getByLabelText(/task title/i);
  const button = screen.getByText(/add task/i);

  fireEvent.change(input, { target: { value: &#39;New Task&#39; } });
  fireEvent.click(button);

  await waitFor(() =&gt; expect(handleAddTask).toHaveBeenCalledWith(&#39;New Task&#39;));
});

test(&#39;clears the form after submission&#39;, async () =&gt; {
  render(&lt;AddTask onAddTask={jest.fn()} /&gt;);

  const input = screen.getByLabelText(/task title/i);
  const button = screen.getByText(/add task/i);

  fireEvent.change(input, { target: { value: &#39;New Task&#39; } });
  fireEvent.click(button);

  expect(input.value).toBe(&#39;&#39;);
});
import React from &#39;react&#39;;

function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return &lt;p&gt;No tasks available&lt;/p&gt;;
  }

  return (
    &lt;ul&gt;
      {tasks.map(task =&gt; (
        &lt;li key={task.id}&gt;{task.title}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

export default TaskList;

import React, { useState } from &#39;react&#39;;

function AddTask({ onAddTask }) {
  const [task, setTask] = useState(&#39;&#39;);

  const handleSubmit = (e) =&gt; {
    e.preventDefault();
    if (task) {
      onAddTask(task);
      setTask(&#39;&#39;);
    }
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;label htmlFor=&quot;task-title&quot;&gt;Task Title&lt;/label&gt;
      &lt;input
        id=&quot;task-title&quot;
        type=&quot;text&quot;
        value={task}
        onChange={(e) =&gt; setTask(e.target.value)}
        required
      /&gt;
      &lt;button type=&quot;submit&quot;&gt;Add Task&lt;/button&gt;
    &lt;/form&gt;
  );
}

export default AddTask;
