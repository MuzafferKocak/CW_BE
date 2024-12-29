"use strict";
/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/

const Sale = require("../models/sale")


module.exports = {
    list: async (req,res)=>{
        /*
        #swagger.tags = ["Sales"]
        #swagger.summary = "List Sale"
        #swagger.description = `
            You can send query with endpoint for filter[], search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */

    },
    create: async (req,res)=>{
        /*
        #swagger.tags = ["Sales"]
        #swagger.summary = "Create Sale"
         #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Sale'
            }
        }
    */

    },
    read: async (req,res)=>{
        /*
        #swagger.tags = ["Sales"]
        #swagger.summary = "Get Single Sale"
    */

    },
    update: async (req,res)=>{
        /*
        #swagger.tags = ["Sales"]
        #swagger.summary = "Update Sale"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
             schema: {
                $ref: '#/definitions/Sale'
            }
        }
    */

    },
    delete: async (req,res)=>{
        /*
        #swagger.tags = ["Sales"]
        #swagger.summary = "Delete Sale"
    */

    },
}