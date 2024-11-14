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
/*----------------------------------------------- */
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
        return "Motor Calisti"
    }
}

// const PascalCaseInstanceName = new Car() //instance
// console.log(PascalCaseInstanceName);
// console.log(PascalCaseInstanceName.isRunning);
// console.log(PascalCaseInstanceName.runEngine("test-value"));

const Ford = new Car("Ford", "Mustang", 1967)
console.log(Ford);


/*----------------------------------------------- */
/*----------------------------------------------- */
/*----------------------------------------------- */
/*----------------------------------------------- */
/*----------------------------------------------- */
/*----------------------------------------------- */