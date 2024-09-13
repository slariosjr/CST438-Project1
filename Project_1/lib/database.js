const fs = require('fs');
const mysql = require('mysql2');




const sqlFilePath = '"C:\Users\sergi\Desktop\databaseCon.sql"';




fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
 if (err) {
   console.error('Error reading SQL file:', err);
   return;
 }




 const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',     
   password: 'Sl012285.',     
   database: 'Project1_DB'
 });


 // Connect to the MySQL server
 connection.connect((err) => {
   if (err) {
     console.error('Error connecting to the database:', err);
     return;
   }
   console.log('Connected to the database.');


  
   connection.query(sql, (err, results) => {
     if (err) {
       console.error('Error executing SQL file:', err);
       return;
     }
     console.log('SQL file executed successfully:', results);


     // Close the database connection
     connection.end();
   });
 });
});
