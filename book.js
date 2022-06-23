let dbparams={
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'kolhapur',
	port:3306
};

const mysql = require('mysql2');
const con =mysql.createConnection(dbparams)

const express = require('express');
const app = express();



app.use(express.static('abc'));

app.get("/getbooks",  (req, res) =>{
    let input = req.query.x;
    
    console.log (input);

    let output ={booksfromid:false, bookdetails:{bookid: 10, bookname:'hamlet', price:200}};

  con.query('select * from book where bookid=?',[input],(error,rows)=>
  {
    if(rows.length >0){
        output.booksfromid = true;
        output.bookdetails = rows[0];

    }
    res.send(output);
  }
  );

    });

    app.get("/updatebooks",  (req, res) =>{
        let output = false;
        
        console.log (input);
    
        let input ={
            bookno: req.query.bookno, bookname: req.query.bookname, price: req.query.price
        };
    
      con.query('update book set bookname = ? , price = ? bookid=?',[input.bookname,input.price,input.bookid],(error,whtoinsert)=>
      {
        if(error){
            
    
        }
        else if (whtoinsert.affectedRows>0)
        output=true;

        res.send(output);
      }
      );
    
        });
app.get("/getallbooks",  (req, res) =>{
           
        
          con.query('select * from book',[],(error,rows)=>{
            res.send(rows);
                
        
            }
            
          );

         });

         app.listen(8081,function(){
            console.log("server listning at port 8081");
         });
    