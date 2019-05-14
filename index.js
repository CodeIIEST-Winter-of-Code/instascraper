const puppeteer = require('puppeteer')
const fs=require('fs')
const https=require('https')
const keys=require('./keys')

const download = (url, destination) => new Promise((resolve,reject)=>
{
    const file=fs.createWriteStream(destination)

    https.get(url, response=>{
        response.pipe(file)
        
        file.on('finish',()=>{
            file.close(resolve(true))
        })
    })
    .on('error',error=>{
        fs.unlink(destination)
        reject(error.message)
    })
})

const getCred=async()=>{
    let user=keys.user
    let pass=keys.pass
    if(user.length===0 || pass.length==0)
    {
        console.log("Set the login credentials in keys.js")
        process.exit(1)
    }
    return [user,pass]
}
async function start() {
    const cred=await getCred()
    const user=cred[0]
    const pass=cred[1]
    console.log(user,pass)

	const browser = await puppeteer.launch({
         headless: false
 	})
    const page = await browser.newPage()
    page.setViewport({ width: 1280, height: 800 })

    await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher')

    const navigatiomPromise=page.waitForNavigation()

    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]',user);
    await page.type('input[name="password"]',pass);
    await page.click('button[type="submit"]');

    await navigatiomPromise
}
start();
