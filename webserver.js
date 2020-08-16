const jsonServer = require('json-server');
const http = require('http');
const URL = require('url');
const fs = require('fs');
var jsonfile = null;
var index = null;

fs.readFile('./server.json','utf8',(err,data)=>{
    if(err) throw err;
    jsonfile = JSON.parse(data);
    index = jsonfile.flags.idd;
});

const server1 = jsonServer.create();
const router = jsonServer.router('server.json');
const middlewares = jsonServer.defaults();
//server1.use(middlewares);
//server1.use(router);
//server1.listen(9001,()=>{});

//function upadtepara(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){
function upadtepara(qry){
    let data ={
        "id" : 0,
        //"voltage" : 0,
        //"current" : 0,
        //"frequency" : 0
        "a" : 0,
        "b" : 0,
        "c" : 0,
        "d" : 0,
        "e" : 0,
        "f" : 0,
        "g" : 0,
        "h" : 0,
        "i" : 0,
        "j" : 0,
        "k" : 0,
        "l" : 0,
        "m" : 0,
        "n" : 0,
        "o" : 0
    };

    data.id = jsonfile.flags.idd = ++index;
    data.a = qry.a; //console.log(data.voltage);
    data.b = qry.b; //console.log(data.current);
    data.c = qry.c; //console.log(data.frequency);
    data.d = qry.d; //console.log(data.voltage);
    data.e = qry.e; //console.log(data.current);
    data.f = qry.f; //console.log(data.frequency);
    data.g = qry.g; //console.log(data.voltage);
    data.h = qry.h; //console.log(data.current);
    data.i = qry.i; //console.log(data.frequency);
    data.j = qry.j; //console.log(data.voltage);
    data.k = qry.k; //console.log(data.current);
    data.l = qry.l; //console.log(data.frequency);
    data.m = qry.m; //console.log(data.voltage);
    data.n = qry.n; //console.log(data.current);
    data.o = qry.o; //console.log(data.frequency);


    return data;

}
const server2 = http.createServer((request,response)=>{
    //response.write('request2 recieved');
    fs.readFile('./server.json','utf8',(err,data) => {
        if (err) {
          return console.log(err);
        }
        
        response.write(JSON.stringify(JSON.parse(data), null, 4));
        response.write("hi");
        response.end();
      });
    //response.end();
    //console.log(URL.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',true))
});




function throughdata(response){
    fs.readFile('./server.json','utf8',(err,data) => {
        if (err) {
          return console.log(err);
        }
        
        response.write(JSON.stringify(JSON.parse(data), null, 4));
        response.write("hi");
        response.end();
      });
}




const server = http.createServer((request,response)=>{
    

    //favicon request:START
    if (request.url === '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end();
        console.log('favicon requested');
        return;
    }//favicon request:END

    let x = URL.parse(request.url,true);
    console.log(x);

    if(x.query.test == 1){
        throughdata(response);
    }

    else if(x.query.a != undefined){

        response.write('request recieved');
        response.end();

        //let data = upadtepara(x.query.v,x.query.i,x.query.freq);
        let data = upadtepara(x.query);

        jsonfile.para.push(data);//JSON.stringify(data));
        console.log(jsonfile);
        fs.writeFile('./server.json',JSON.stringify(jsonfile,null,4),'utf8',(err)=>{console.log('writeError');})
    }
    else{
        response.write('invalid request recieved');
        response.end();
    }
});

 server.listen(process.env.PORT || 9000,()=>{console.log('server is running');});
 //server2.listen(process.env.PORT || 9002,()=>{console.log('server2 is running');});

 