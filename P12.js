const mongoose = require(&#39;mongoose&#39;);
require(&#39;dotenv&#39;).config();

const connectDB = async () =&gt; {
  try {
    await mongoose.connect(process.env.MONGO_URI); // No need for useNewUrlParser &amp; useUnifiedTopology
    console.log(&#39;✅ MongoDB Connected&#39;);
  } catch (error) {
    console.error(&#39;❌ MongoDB Connection Error:&#39;, error.message);
    process.exit(1);

  }
};
module.exports = connectDB;

const mongoose = require(&#39;mongoose&#39;);

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: [&#39;Pending&#39;, &#39;Completed&#39;], default: &#39;Pending&#39; },
  dueDate: { type: Date }
}, { timestamps: true });
const Task = mongoose.model(&#39;Task&#39;, taskSchema);
module.exports = Task;

const express = require(&#39;express&#39;);
const Task = require(&#39;../models/Task&#39;);
const router = express.Router();

router.post(&#39;/tasks&#39;, async (req, res) =&gt; {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = new Task({ title, description, status, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: &#39;Error creating task&#39;, error });
  }
});

router.get(&#39;/tasks&#39;, async (req, res) =&gt; {
  try {
    const { status, dueDate } = req.query;
    let filter = {};
    if (status) filter.status = status;
if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: &#39;Error fetching tasks&#39;, error });
  }
});

router.get(&#39;/tasks/:id&#39;, async (req, res) =&gt; {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: &#39;Task not found&#39; });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: &#39;Invalid Task ID&#39;, error });
  }
});

router.put(&#39;/tasks/:id&#39;, async (req, res) =&gt; {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: &#39;Task not found&#39; });
    res.json(updatedTask);
  } catch (error) {

    res.status(400).json({ message: &#39;Invalid Task ID or Data&#39;, error });
  }
});

router.delete(&#39;/tasks/:id&#39;, async (req, res) =&gt; {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: &#39;Task not found&#39; });
    res.json({ message: &#39;Task deleted successfully&#39; });
  } catch (error) {
    res.status(400).json({ message: &#39;Invalid Task ID&#39;, error });
  }
});

module.exports = router;
