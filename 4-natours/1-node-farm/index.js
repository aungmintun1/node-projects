
// const textIn = fs.readFileSync('./txt/input.txt' ,'utf-8'); // puts text in input.txt into a variable
// console.log(textIn);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

// const textOut = `This is what we know about the avocado:: ${textIn}. /n Created on ${Date.now()}`;
// // creates a variable that contains text from the variable
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

// fs.writeFileSync('./txt/output.txt', textOut)
// // creates a file inside the specified directory based on the textOut variable
// console.log('file written');
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------


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

/* 
1. data1 becomes 'read-this' from the text in start.txt

2. it then reads the read-this.txt file and stores the text in that file to data2. data2 is now 
The avocado 🥑 is also used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices.

3.it reads the text in append.txt which is 
APPENDIX: Generally, avocados 🥑 are served raw, but some cultivars can be cooked for a short time without becoming bitter.

4.last it writes a file which is filetext, in it it reads data2 variable followed by a space and data 3 variable text.

The avocado 🥑 is also used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices.
APPENDIX: Generally, avocados 🥑 are served raw, but some cultivars can be cooked for a short time without becoming bitter.
*/

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

const fs = require('fs');
// file sharing
const http = require('http');
// gives networking capability

const url = require('url');
// The module provides various utilities that allow you to work with URLs, such as parsing them, resolving them, and formatting them.

const replaceTemplate = require('./starter/modules/replaceTemplate');
// this is the function that replaces the %variables with JSON object properties that contain text.

const slugify = require('slugify');

const tempOverview = fs.readFileSync('./starter/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./starter/templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./starter/templates/template-product.html', 'utf-8');
// storing the html template files as variables

const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8');
//putting the JSON text into a variable, which will then be parsed into a JSON object.

const dataObj = JSON.parse(data);
// in this case we declare the variable first by getting the json object, and we then print the data of the object 
// in the api route


const server = http.createServer((req, res) => {
    
    console.log(url.parse(req.url, true))
    const { query, pathname} = url.parse(req.url, true);
    //takes the query and pathname properties in url object


// Overview page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'})
        
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    //in the res.end, we are outputting the template-overview html file when there is a request to /.
    //we have the JSON object in dataObj, that contains the text that we need to fill in for our template-card html file
    
    // we create a new array by using map, the array will be called cardsHTML
    // Each time we iterate through the array we are going through the 5 objects in the JSON file, which are the fruits. and we go through the card template html.
    // every time we iterate through the array, we put those arguments in the replaceTemplate function
    // the function is going to simply replace the words that we have filled in the p and h1 tags with the JSON object properties

    // after that, we make a variable called output
    // this is going to contain the overview html file, and replace the word productcards with the cards html code.
    
    }


    //product page
    else if (pathname === '/product'){
        

        res.writeHead (200, {'Content-type': 'text/html'});

        const product = dataObj[query.id];
        // this will pick the product object from the JSON array.
        // the query.id will substitute to the array index. if the id is 0 it gets the first element in the array

        const output = replaceTemplate(tempProduct, product);
        /* we put the html file and the JSON object as arguments into our replace template function 
           which is then going to replace the variables in our html with JSON DATA*/

        res.end(output);

        
    }

    else if (pathname === '/api'){

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
    