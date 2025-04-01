import express from &#39;express&#39;;
import fs from &#39;fs&#39;;
import path from &#39;path&#39;;
import { fileURLToPath } from &#39;url&#39;;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use((req, res, next) =&gt; {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip}\n`;
    fs.appendFile(&#39;visits.log&#39;, logEntry, (err) =&gt; {
        if (err) {
            console.error(&#39;Error writing to log file:&#39;, err);
        }
    });
    next();
});

app.use(express.static(path.join(__dirname, &#39;public&#39;)));

app.get(&#39;/&#39;, (req, res) =&gt; {
    res.send(&#39;Welcome to my Express server!&#39;);
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

app.listen(port, () =&gt; {
    console.log(`Server running at http://localhost:${port}`);
});
