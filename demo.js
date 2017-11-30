function addAsync(a, b, phonenumber) {

    setTimeout(function () {
        var c = a + b;
        phonenumber(
            { url: '/products', remoteAddr: '127.0.1.2', isAuthenticated: true }, 
            { headers: [{ 'content-type': 'application/json' }] });
    }, 2000);
}


function callback(req, res) {
    console.log('req: ',req);
    console.log('res: ',res);
}

addAsync(2, 3, callback)