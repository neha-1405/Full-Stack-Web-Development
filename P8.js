import express from &#39;express&#39;;
import fs from &#39;fs&#39;;
import path from &#39;path&#39;;
import { fileURLToPath } from &#39;url&#39;;
import { dirname } from &#39;path&#39;;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) =&gt; {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip}\n`;
    fs.appendFile(&#39;visits.log&#39;, logEntry, (err) =&gt; {
        if (err) {
            console.error(&#39;Error writing to log file:&#39;, err);

        }
        next();
    });
});

app.use(express.static(path.join(__dirname, &#39;public&#39;)));

app.get(&#39;/&#39;, (req, res) =&gt; {
    res.send(&#39;&lt;h1&gt;Welcome to My Express Server&lt;/h1&gt;&lt;p&gt;Try &lt;a href=&quot;/products&quot;&gt;/products&lt;/a&gt; for product
data.&lt;/p&gt;&#39;);
});

app.get(&#39;/logs&#39;, (req, res) =&gt; {
    fs.readFile(&#39;visits.log&#39;, &#39;utf8&#39;, (err, data) =&gt; {
        if (err) {
            return res.status(500).json({ error: &#39;Could not read log file&#39; });
        }
        const logs = data.trim().split(&#39;\n&#39;).map(entry =&gt; {
            const [timestamp, ip] = entry.split(&#39; - IP: &#39;);
            return { timestamp, ip };
        });
        res.json(logs);
    });
});
const products = [
    { id: 1, name: &#39;Laptop&#39;, category: &#39;electronics&#39; },
    { id: 2, name: &#39;Phone&#39;, category: &#39;electronics&#39; },
    { id: 3, name: &#39;Table&#39;, category: &#39;furniture&#39; }
];

const productRouter = express.Router();

productRouter.get(&#39;/&#39;, (req, res) =&gt; {
    const { category } = req.query;
    if (category) {
        return res.json(products.filter(product =&gt; product.category === category));
    }
res.json(products);
});

productRouter.get(&#39;/:id&#39;, (req, res) =&gt; {
    const product = products.find(p =&gt; p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: &#39;Product not found&#39; });
    }
    res.json(product);
});

app.use(&#39;/products&#39;, productRouter);

app.listen(port, () =&gt; {
    console.log(`✅ Server running at http://localhost:${port}`);
});
