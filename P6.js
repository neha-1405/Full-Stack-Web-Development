const http = require(&#39;http&#39;);
const fs = require(&#39;fs&#39;);
const path = require(&#39;path&#39;);
const usersFile = path.join(__dirname, &#39;users.json&#39;);
function getUsers() {
    if (!fs.existsSync(usersFile)) return [];
    return JSON.parse(fs.readFileSync(usersFile, &#39;utf8&#39;));
}
function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}
const server = http.createServer((req, res) =&gt; {
    if (req.method === &#39;GET&#39; &amp;&amp; req.url === &#39;/users&#39;) {
        const users = getUsers();
        res.writeHead(200, { &#39;Content-Type&#39;: &#39;application/json&#39; });

        res.end(JSON.stringify(users));
    } else if (req.method === &#39;POST&#39; &amp;&amp; req.url === &#39;/users&#39;) {
        let body = &#39;&#39;;
        req.on(&#39;data&#39;, chunk =&gt; { body += chunk.toString(); });
        req.on(&#39;end&#39;, () =&gt; {
            try {
                const newUser = JSON.parse(body);
                const users = getUsers();
                newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
                users.push(newUser);
                saveUsers(users);
                res.writeHead(201, { &#39;Content-Type&#39;: &#39;application/json&#39; });
                res.end(JSON.stringify(newUser));
            } catch (err) {
                res.writeHead(400, { &#39;Content-Type&#39;: &#39;text/plain&#39; });
                res.end(&#39;Invalid JSON&#39;);
            }
        });
    } else if (req.method === &#39;DELETE&#39; &amp;&amp; req.url.startsWith(&#39;/users/&#39;)) {
        const id = parseInt(req.url.split(&#39;/&#39;)[2]);
        let users = getUsers();
        const filteredUsers = users.filter(user =&gt; user.id !== id);
        if (users.length === filteredUsers.length) {
            res.writeHead(404, { &#39;Content-Type&#39;: &#39;text/plain&#39; });
            res.end(&#39;User not found&#39;);
        } else {
            saveUsers(filteredUsers);
            res.writeHead(200, { &#39;Content-Type&#39;: &#39;text/plain&#39; });
            res.end(&#39;User deleted&#39;);
        }

    } else {
        res.writeHead(404, { &#39;Content-Type&#39;: &#39;text/plain&#39; });
        res.end(&#39;Not Found&#39;);
    }
});
const PORT = 3000;
server.listen(PORT, () =&gt; console.log(`Server running on port ${PORT}`));
