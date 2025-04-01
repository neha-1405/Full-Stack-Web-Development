import express from &#39;express&#39;;
import fs from &#39;fs&#39;;
import path from &#39;path&#39;;
import { fileURLToPath } from &#39;url&#39;;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasksFile = path.join(__dirname, &#39;tasks.json&#39;);

const loadTasks = () =&gt; {
    if (!fs.existsSync(tasksFile)) return [];
    const data = fs.readFileSync(tasksFile, &#39;utf-8&#39;);
    return JSON.parse(data || &#39;[]&#39;);
};

const saveTasks = (tasks) =&gt; {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

let tasks = loadTasks();

const validateTask = (req, res, next) =&gt; {
    const { title, status } = req.body;
    if (!title || typeof title !== &#39;string&#39;) {
        return res.status(400).json({ error: &#39;Title is required and must be a string&#39; });
    }
    if (status &amp;&amp; ![&#39;pending&#39;, &#39;completed&#39;].includes(status)) {
        return res.status(400).json({ error: &#39;Invalid status value&#39; });
    }
    next();
};

app.post(&#39;/tasks&#39;, validateTask, (req, res) =&gt; {
    const { title, status = &#39;pending&#39; } = req.body;
    const task = { id: tasks.length + 1, title, status };
    tasks.push(task);
    saveTasks(tasks);
    res.status(201).json(task);
});

app.get(&#39;/tasks&#39;, (req, res) =&gt; {
    res.json(tasks);
});

app.get(&#39;/tasks/:id&#39;, (req, res) =&gt; {
    const task = tasks.find(t =&gt; t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: &#39;Task not found&#39; });
    }
    res.json(task);
});

app.put(&#39;/tasks/:id&#39;, validateTask, (req, res) =&gt; {
    const task = tasks.find(t =&gt; t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: &#39;Task not found&#39; });
    }
    const { title, status } = req.body;
    if (title) task.title = title;
    if (status) task.status = status;
    saveTasks(tasks);
    res.json(task);
});

app.delete(&#39;/tasks/:id&#39;, (req, res) =&gt; {
    const index = tasks.findIndex(t =&gt; t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: &#39;Task not found&#39; });
    }
    tasks.splice(index, 1);
    saveTasks(tasks);
    res.status(204).send();
});

app.use((req, res) =&gt; {
    res.status(404).json({ error: &#39;Endpoint not found&#39; });
});

app.listen(port, () =&gt; {
    console.log(`Server running at http://localhost:${port}`);
});
