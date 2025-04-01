const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    // Default to index.html if the root is accessed
    if (filePath == './') {
        filePath = './P4.html';
    }

    // Get the file extension to determine the correct MIME type
    const extname = String(path.extname(filePath)).toLowerCase();

    let contentType = 'text/html'; // Default MIME type
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }

    // Check if the file exists, if so, serve it, otherwise send a 404 error
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // File not found, send 404 error
                fs.readFile('./404.html', (error, errorContent) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1>', 'utf-8');
                });
            } else {
                // Internal server error
                res.writeHead(500);
                res.end('Sorry, there was a problem with the server.', 'utf-8');
            }
        } else {
            // Serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Set the server to listen on port 8080
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
