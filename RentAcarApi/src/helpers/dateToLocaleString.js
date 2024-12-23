"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

//* dateToLocaleString(date:Date):

module.exports = function (dateData) {
  return dateData.toLocaleString("de-DE", {
    dateStyle: "full",
    timeStyle: "medium",
  });
};
