const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

const requestLogger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} request to ${url} from ${ip}`);

    next();
}

const infoLogger = (req, res, next) => {
    console.log(`[INFO] Request received: ${req.method} ${req.url}`);
    next();
};

function debugLogger(req, res, next) {
    console.log(`[DEBUG] ${req.method} request to ${req.url} with headers: ${JSON.stringify(req.headers)}`);
    next();
}

app.use(requestLogger);
app.use(morgan('combined'));
app.use(infoLogger);
app.use(debugLogger);

// Sample routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/data', (req, res) => {
    res.json({ message: 'Data received' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});