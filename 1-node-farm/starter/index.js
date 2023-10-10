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


const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}

const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);
// in this case we declare the variable first by getting the json object, and we then print the data of the object 
// in the api route


const server = http.createServer((req, res) => {
    const pathName = req.url;
   
    



// Overview page
    if(pathName === '/' || pathName === '/overview'){
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
    