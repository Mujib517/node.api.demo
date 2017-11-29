// equality check ==, ===

//sloppy mode
console.log(12 == 12);
console.log(12 === 12);
console.log(12 == '12'); //true conversion + equality check
console.log('12' === 12);  //false. Strict equality check

function newFun(){
    'use strict';
    //write
}

//1. Object literals
var mobile = {
    width: 3.5,
    height: 5,
    color: 'black',
    makeCall: function () {
        console.log("Calling...");
    }
};

//2. Constructor function
function Employee() {

    this.id = 123;

    this.name = "Mujib";

    this.display = function () {
        console.log(this.id, this.name);
    }
}

//3. Object.create
var emp = Object.create({}, {
    id: { value: 10, configurable: true, writable: false, enumerable: true },
    name: { value: "Mujib", configurable: false, writable: false, enumerable: false },
    dept: { value: "HR", configurable: false, writable: false, enumerable: true },
    active: { value: true, configurable: false, writable: false, enumerable: true },
});

// Object.defineProperty(emp, 'id', { writable: true });

emp.id = 100;

// console.log(emp.id);

// for (var key in emp) {
//     console.log(key);
// }



// var arr=[1,2,3];


// for (var key in mobile) {
//     console.log(mobile[key])
// }


// mobile["makeCall"]();
// console.log(mobile["height"]);