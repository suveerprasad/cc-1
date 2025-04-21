const express = require('express');
const fs = require('fs');
const soap = require('strong-soap').soap;
const path = require('path');

const app = express();
const PORT = 8000;

const service = {
  HelloService: {
    HelloPort: {
      sayHello(args) {
        console.log('SOAP called with:', args);
        return {
          greeting: `Hello, ${args.name}!`
        };
      }
    }
  }
};

const wsdl = fs.readFileSync('service.wsdl', 'utf8');

const http = require('http');
const server = http.createServer(app);

app.get('/ui', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

soap.listen(server, '/wsdl', service, wsdl, () => {
  console.log(`✅ SOAP service running at http://localhost:${PORT}/wsdl?wsdl`);
});

server.listen(PORT, () => {
  console.log(`🚀 Express listening on http://localhost:${PORT}`);
});
