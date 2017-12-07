//payzippy 
function addAsync(a, b) {

    var promise = new Promise(function (cb) {
        if (a === 0)
            throw { errMsg: "Failed to calculate" };
        else cb(a + b);
    });

    return promise;
}

var prms = addAsync(0, 20);

prms.then(function (result) {
    console.log('result is ', result);
})
    .catch(function (err) {
        console.log('error ', err);
    });