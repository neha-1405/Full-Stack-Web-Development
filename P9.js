import express from &#39;express&#39;;
import fs from &#39;fs&#39;;
import path from &#39;path&#39;;
import jwt from &#39;jsonwebtoken&#39;;
import cookieParser from &#39;cookie-parser&#39;;

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = &#39;your_secret_key&#39;;
const orders = [];
const users = [];
app.use((req, res, next) =&gt; {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile(&#39;server.log&#39;, logEntry, (err) =&gt; {
        if (err) {
            console.error(&#39;Error writing to log file:&#39;, err);
        }
    });
    next();
});

const authenticate = (req, res, next) =&gt; {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: &#39;Unauthorized&#39; });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: &#39;Invalid token&#39; });
    }
};

const authorizeAdmin = (req, res, next) =&gt; {
    if (req.user.role !== &#39;admin&#39;) {
        return res.status(403).json({ error: &#39;Forbidden&#39; });
    }
    next();
};

const orderRouter = express.Router();

orderRouter.post(&#39;/&#39;, authenticate, (req, res) =&gt; {
    const { item, quantity } = req.body;
    if (!item || !quantity) {
        return res.status(400).json({ error: &#39;Missing required fields&#39; });
    }
    const order = { id: orders.length + 1, item, quantity, user: req.user.username };
    orders.push(order);
    res.status(201).json(order);
});

orderRouter.get(&#39;/&#39;, authenticate, (req, res) =&gt; {
    res.json(orders);
});

orderRouter.get(&#39;/:id&#39;, authenticate, (req, res) =&gt; {
    const order = orders.find(o =&gt; o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({ error: &#39;Order not found&#39; });
    }
    res.json(order);
});

orderRouter.put(&#39;/:id&#39;, authenticate, (req, res) =&gt; {
    const order = orders.find(o =&gt; o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({ error: &#39;Order not found&#39; });
    }

    const { item, quantity } = req.body;
    if (item) order.item = item;
    if (quantity) order.quantity = quantity;
    res.json(order);
});

orderRouter.delete(&#39;/:id&#39;, authenticate, authorizeAdmin, (req, res) =&gt; {
    const index = orders.findIndex(o =&gt; o.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: &#39;Order not found&#39; });
    }
    orders.splice(index, 1);
    res.status(204).send();
});

app.use(&#39;/orders&#39;, orderRouter);

app.post(&#39;/auth/register&#39;, (req, res) =&gt; {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ error: &#39;Missing required fields&#39; });
    }
    users.push({ username, password, role });
    res.status(201).json({ message: &#39;User registered&#39; });
});

app.post(&#39;/auth/login&#39;, (req, res) =&gt; {
    const { username, password } = req.body;
    const user = users.find(u =&gt; u.username === username &amp;&amp; u.password === password);
    if (!user) {

        return res.status(401).json({ error: &#39;Invalid credentials&#39; });
    }
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: &#39;1h&#39; });
    res.cookie(&#39;token&#39;, token, { httpOnly: true }).json({ message: &#39;Logged in&#39; });
});

app.post(&#39;/auth/logout&#39;, (req, res) =&gt; {
    res.clearCookie(&#39;token&#39;).json({ message: &#39;Logged out&#39; });
});

app.use((err, req, res, next) =&gt; {
    console.error(err.stack);
    res.status(500).json({ error: &#39;Internal Server Error&#39; });
});

app.use((req, res) =&gt; {
    res.status(404).json({ error: &#39;Endpoint not found&#39; });
});

app.listen(port, () =&gt; {
    console.log(`Server running at http://localhost:${port}`);
});
