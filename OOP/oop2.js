"use strict"

/* -------------------------------------------------------
    OOP & CLASSES
------------------------------------------------------- *
//? OOP: Object Oriented Programming
//? DRY: Don't Repeat Yourself
//? BLUEPRINT: Taslak (Mimarların kullandığı mavi şablon kağıdı)
//? CLASS: Obje türetmek için kullanılacak şablon.

//! Class Declaration:
// class PascalCaseClassName{

// }
//! Class Expression:
const PascalCaseClassName = class {
    propertyName = "value" //* property, attribute, field
    undefinedProperty //* sadece tanimlama yapabiliriz(degeri undefined olur)
    methodName1(){
        return "method"
    }
}
/*----------------------------------------------- *
//? INSTANCE * bir class tan türetilen objedir.

class Car {

    isRunning = false

    //* Class icine gönderilen parametreleri alabilmek icin "constructer" methodu almak zorunda
    constructor(brand, model, year){
        this.brand = brand
        this.model = model
        this.year = year
    }

    runEngine(param1){
        this.isRunning = true
        return "Motor Calisti"
    }
}

// const PascalCaseInstanceName = new Car() //instance
// console.log(PascalCaseInstanceName);
// console.log(PascalCaseInstanceName.isRunning);
// console.log(PascalCaseInstanceName.runEngine("test-value"));

const Ford = new Car("Ford", "Mustang", 1967)
console.log(Ford);

const Mercedes = new Car ("Mercedes", "CLK200", 2010)
console.log(Mercedes);

// console.log(Ford.isRunning);
// Ford.isRunning = true
// console.log(Ford.isRunning);
// console.log(Mercedes.isRunning);

console.log(Ford.isRunning);
console.log(Ford.runEngine());
console.log(Ford.isRunning);


/*----------------------------------------------- */
//? INHERITANCE
//? Super: parent(üst)class - This: 

class Vehicle {
    vehicleIsActive = false

    constructor (vehicleType){
        this.vehicleType = vehicleType
    }
}

class Car extends Vehicle { //*Inheritance

    isRunning = false

    
    constructor(brand, model, year, vehicleType){
        super(vehicleType)
        //* super() parametresi parent-class i ifade eder her zaman üstte olmali
        this.brand = brand
        this.model = model
        this.year = year
    }

    runEngine(param1){
        this.isRunning = true
        return "Motor Calisti"
    }
}
// const Ford = new Car ("Ford", "Mustang", 1967)
// console.log(Ford);
const Ford = new Car ("Ford", "Mustang", 1967, "Car")
console.log(Ford);

/*----------------------------------------------- */
/*----------------------------------------------- */
/*----------------------------------------------- */
/*----------------------------------------------- */
/*----------------------------------------------- */