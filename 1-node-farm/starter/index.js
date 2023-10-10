const fs = require('fs');

// const textIn = fs.readFileSync('./txt/input.txt' ,'utf-8'); // puts text in input.txt into a variable
// console.log(textIn);



// const textOut = `This is what we know about the avocado:: ${textIn}. /n Created on ${Date.now()}`;
// // creates a variable that contains text from the variable

// fs.writeFileSync('./txt/output.txt', textOut)
// // creates a file inside the specified directory based on the textOut variable

// console.log('file written');

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2) => {
//         console.log(data2)
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err,data3) => {
//             console.log(data3)

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('your file has been written')
//             })
            
//         })
        
//     })
// })
// console.log("will read file!")

const http = require('http') 
// gives networking capability


const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);
// in this case we declare the variable first by getting the json object, and we then print the data of the object 
// in the api route


const server = http.createServer((req, res) => {

    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){
        res.end('this is the OVERVIEW')
    }

    else if (pathName === '/product'){
        res.end('this is the product')
    }

    else if (pathName === '/api'){

        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data);

        
    }

    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'

        });
        res.end('Page not found')
    }
   
	
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
    })
    