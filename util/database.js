const mysql2=require("mysql2")


const pool=mysql2.createPool({
    host:"localhost",
    user:"root",
    database:'shop',
    password:"Piyush@nyc85"
})


module.exports=pool.promise()