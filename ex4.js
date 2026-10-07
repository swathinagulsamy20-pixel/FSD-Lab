const http = require('http');

const server = http.createServer((req, res) => {
    // Handle GET request
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome to Node.js Server</h1>
            <p>GET request handled successfully.</p>
        `);
    }

    // Handle GET request for /about
    else if (req.method === 'GET' && req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>About Page</h1>
            <p>This page is created using Node.js.</p>
        `);
    }

    // Handle POST request
    else if (req.method === 'POST' && req.url === '/data') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });

            res.end(JSON.stringify({
                message: 'POST request handled successfully',
                receivedData: body
            }));
        });
    }

    // Handle invalid requests
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});