require(&#39;dotenv&#39;).config();  const express = require(&#39;express&#39;);  
const mongoose = require(&#39;mongoose&#39;); const User = require(&#39;./models/user&#39;);

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =&gt; console.log(&#39;✅ MongoDB Connected&#39;))
.catch(err =&gt; console.error(&#39;❌ MongoDB Connection Error:&#39;, err));

app.post(&#39;/add-user&#39;, async (req, res) =&gt; {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.json({ message: &#39;✅ User added successfully&#39;, user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get(&#39;/users&#39;, async (req, res) =&gt; {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =&gt; console.log(`�� Server running on por ${PORT}`));
