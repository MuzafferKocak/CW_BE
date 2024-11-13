"use strict";

/*//? OPP => Object Oriented Programming */

/*//! ------------- OBJECTS ------------ *

//* JS' de ditekt obje olusturabilirim (Class#a ihtiyac duymadan) Obje isimlendirmede: PascalCase veya camelCase isimlendirme yapabiliriz

const exampleObject = {
    propertyName: "value", //*property, attribute, field
    methodName: function(){ //* method
        return "bu bir method'dur"
    },
    methodNameAlternative(){
        return "buda bir method'dur"
    }
}
console.log(exampleObject.propertyName);
console.log(exampleObject.methodName());
console.log(exampleObject.methodNameAlternative());

/*----------------------------------------------*
const Car = {
  brand: "Ford",
  model: "Mustang",
  year: 1967,
  isAutoGear: true,
  colors: ["White", "Red"],
  details: {
    color1: "white",
    color2: "red",
    engineSize: 4900,
  },
  startEngine: function () {
    return "Engine started";
  },
};
console.log(Car.brand);
console.log(Car.colors);
console.log(Car.colors[0]);
console.log(Car.details);
console.log(Car.details.engineSize);
console.log(Car.startEngine());
console.log(Car.startEngine("ok"));

//? Alternative Style:
console.log(Car["brand"]);
console.log(Car["colors"]);
console.log(Car["colors"][0]);
console.log(Car["details"]);
console.log(Car["details"]["engineSize"]);
console.log(Car["startEngine"]());
/*----------------------------------------------*
//? "This" keyword

const Car = {
    brand: "Ford",
    model: "Mustang",
    year: 1967,
    isAutoGear: true,
    colors: ["White", "Red"],
    details: {
      color1: "white",
      color2: "red",
      engineSize: 4900,
    },
    startEngine: function (parametre = "default") {
      return "Engine started";
    },
    getDetails: function(){
        // return this.details
        // return this
        return this.startEngine()
    },
    arrowFunction: ()=>{
        //* Arrow Function is GlobalScope. (Not working this keyword in hire)
        return this
    }
  };

//   console.log(Car.getDetails()); //* Functions are in LocalScope
  console.log(Car.arrowFunction()); //* Arrow Func. are in GlobalScope
/*----------------------------------------------*
//? ARRAY DESTRUCTURING

const testArray = ["value0", "value1", "value2", "value3", "value4"];

// const var0 = testArray[0]
// const var1 = testArray[1]
// const var2 = testArray[2]
// const varOther = testArray.slice(3,5)

//? Siralama önemli
const [var0, var1, var2, ...varOther] = testArray;
console.log(var0, var1, var2, varOther);

//? Rest Operatör (Toplayici) (Esittirin sol tarafinda)
const [firstItem, secondItem, ...others] = testArray;
console.log(firstItem,secondItem, others);

//? Spread Operatör (Dagitici) (Esittirin sag tarafinda)
const newArray = [...testArray, "value5", "value6"]
/*----------------------------------------------*/
//? OBJECT DESTRUCTURING

const Car = {
    brand: "Ford",
    model: "Mustang",
    year: 1967,
    isAutoGear: true,
    colors: ["White", "Red"],
    details: {
      color1: "white",
      color2: "red",
      engineSize: 4900,
    },
    startEngine: function (parametre = "default") {
      return "Engine started";
    },
}

//* Siralama önemli degil, key isimleri önemli
//? Rest Operator:
// const {year, model, brand, ...others}= Car
// console.log(year, model, brand, others);
//? Isim degisikligi yapma:
//const {year, model: newName, brand, ...others} = Car
//console.log(year, newName, brand, others);

//? Default deger atama:
//const {year, model: newName, brand, type = "default-value", ...others} = Car
//console.log(year, newName, brand, type, others);
/*----------------------------------------------*

//? Spread Operator:
const newObj = {
    ...Car,
    newKey: "new-value"
}
console.log(newObj);
/*----------------------------------------------*/

//? Object to JSON (JSON Objenin string hali)
//console.log(typeof Car, Car);
// const json = JSON.stringify(Car)
// console.log(typeof json, json);

//? JSON to Object:
// const obj = JSON.parse(json)
// console.log(typeof obj, obj);

//? Object to Array


/*----------------------------------------------*/
/*----------------------------------------------*/
