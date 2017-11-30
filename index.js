var http = require('http');  //import
var fs = require('fs');

//callback
function handleRequests(req, res) {
    switch (req.url) {
        case '/':
            var data = fs.readFileSync("index.html");
            res.write(data);
            res.end();
            break;
        case '/products':
            //JSON
            var products = [
                { id: 1, brand: "Nokia", model: "N8", price: 200 },
                { id: 2, brand: "Samsung", model: "S8", price: 1200 },
                { id: 3, brand: "Apple", model: "IPhone X", price: 1300 }
            ];

            res.write(JSON.stringify(products));
            res.end();
            break;
        case '/books':
            res.write("List of books");
            res.end();
            break;
        default:
            res.write("Hello NodeJs");
            res.end();
            break;
    }

}


var server = http.createServer(handleRequests);

server.listen(3000);

console.log("Server is running on 3000");