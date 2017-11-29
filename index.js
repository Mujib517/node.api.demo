//synchronous function
function add(a, b) {
    a++;
    a++;
    b--;

    return a + b;
}

add(3,5);

// var result = add(2, 3);
// console.log(result);

//asynchrounous op. (tailor)
function addAsync(a, b, cb) {

    console.log("Started.");
    //simulate some delay
    setTimeout(function () {
        var c = a + b;
        cb(c);
    }, 2000); //2 secs

    console.log("Stopped");
}



function callback(result) {
    console.log(result);
}
//person
addAsync(2, 3, callback);
