const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {

    // GET request
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.write(`
            <h2>GET and POST Form Data</h2>

            <h3>GET Method</h3>
            <form action="/get" method="GET">
                Name:
                <input type="text" name="name" required>
                <br><br>

                Email:
                <input type="email" name="email" required>
                <br><br>

                <input type="submit" value="Submit GET">
            </form>

            <hr>

            <h3>POST Method</h3>
            <form action="/post" method="POST">
                Name:
                <input type="text" name="name" required>
                <br><br>

                Email:
                <input type="email" name="email" required>
                <br><br>

                <input type="submit" value="Submit POST">
            </form>
        `);

        res.end();
    }

    // Process GET form data
    else if (req.method === "GET" && req.url.startsWith("/get")) {

        const url = new URL(req.url, `http://${req.headers.host}`);

        const name = url.searchParams.get("name");
        const email = url.searchParams.get("email");

        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(`
            <h2>GET Form Data</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <a href="/">Go Back</a>
        `);
    }

    // Process POST form data
    else if (req.method === "POST" && req.url === "/post") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const formData = querystring.parse(body);

            const name = formData.name;
            const email = formData.email;

            res.writeHead(200, { "Content-Type": "text/html" });

            res.end(`
                <h2>POST Form Data</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <a href="/">Go Back</a>
            `);
        });
    }

    // Invalid URL
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h2>404 - Page Not Found</h2>");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});