const puppeteer = require('puppeteer')
const fs=require('fs')
const path=require('path')
const keys=require('./keys')

const getCred=async()=>{
    const user=keys.user
    const pass=keys.pass
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

    await page.goto('https://www.instagram.com/')
    
}
start();
