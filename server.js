const http = require('http')
const path = require('path');
const {readFileSync} = require('fs');

//get all files 
const homePage = readFileSync('./public/index.html')
const homeStyles = readFileSync('./public/style.css')
const homeLogic = readFileSync('./script.js')
const navbar = readFileSync('./public/nav-bar.html')
const tailwindcss = readFileSync(path.join(__dirname, 'dist', 'output.css'));
//request,response
const server = http.createServer((req,res)=> {

const url = req.url;

//home page
if(url === '/') {
res.writeHead(200, {'content-type' : ' text/html'})
res.write(homePage);
res.end()
}


//styles
else if(url === '/styles.css') {
res.writeHead(200, {'content-type' : ' text/css'})
res.write(homeStyles);
res.end()
}

//tailwindcss
else if(url === '/output.css') {
    res.writeHead(200, {'content-type' : ' text/css'})
    res.write(tailwindcss);
    res.end()
    }


//nav-bar
else if(url === '/nav-bar.html') {
    res.writeHead(200, {'content-type' : ' text/html'})
    res.write(navbar);
    res.end()
    }

// //logo
// else if(url === '/logo.svg') {
// Res.writeHead(200, {'content-type' : ' image/svg+xml'})
// Res.write(homeImage);
// Res.end()
// }


//logic
else if(url === '/script.js') {
res.writeHead(200, {'content-type' : ' text/javascript'})
res.write(homeLogic);
res.end()
}


//404
else {
res.writeHead(404, {'content-type' : ' text/html'})
res.write('<h1> page not found </h1>');
res.end()
}

})


server.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});
