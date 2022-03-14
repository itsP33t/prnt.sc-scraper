#!/usr/bin/env node
// https://P33t.net | https://github.com/itsP33t
// parser originally from https://github.com/Derks-cz/lightshot-parser but modified to work with typescript
// dependencies
// 
const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);
const chalk = require('chalk') // import wasnt working for some reason
const nfetch = require ("node-fetch")
const cheerio = require('cheerio')
const fs = require("fs")
const buffer = require('buffer')
const path = require("path")
/**
 *@param {Number} [quantity] Number of screenshots
 *@param {String} [src] Where to download directory
 *@param {Number} [delay] Delay in sending the request
 *@param {String} [pattern] String pattern
 **/
function imgParser(quantity, src, delay = 1000, pattern = null) {
  let c = quantity
  async function getImg() {
    if (c > 0) {
      try {
        const randomString = "abcdefghijklmnopqrstuvwxyz1234567890"
        let url = ""
        if (pattern) {
          url = pattern
          for (let i = 0; i < 6 - pattern.length; i++) {
            url += randomString[Math.floor(Math.random() * randomString.length)]
          }
        } else {
          for (let i = 0; i < 6; i++) {
            url += randomString[Math.floor(Math.random() * randomString.length)]
          }
        }
        const response = await nfetch(`https://prnt.sc/${url}`)
        const bufferResponse = await response.arrayBuffer()
        const bf = buffer.Buffer.from(bufferResponse)
        const decoder = new TextDecoder("utf-8")
        const decode = decoder.decode(bf)
        const $ = cheerio.load(decode)
        const rows = $(".screenshot-image")
        if (rows[0].attribs.src &&!rows[0].attribs.src.startsWith("/") && !rows[0].attribs.src.match(/i.imgur/g)){
          c--
          let img = await nfetch(rows[0].attribs.src)
          const response = await img.arrayBuffer()
          const imgBuffer = buffer.Buffer.from(response)
          fs.writeFileSync(path.join(src, `${getHash()}.png`),imgBuffer,"binary")
            console.log(chalk.green(`[WORKER]${chalk.yellow(` Downloaded screenshot, ${c} screenshots left`)}`))
        }
      } catch (e) {
        
      }
      setTimeout(() => {
        getImg()
      }, delay)
    }
  }
  getImg()
}
function getHash() {
  const c = "abcdefghijklmnopqrstuvwxyz1234567890"
  let hash = ""
  for (let i = 0; i < 7; i++) {
    hash += c[Math.floor(Math.random() * c.length)]
  }
  return hash
}
module.exports = imgParser
let qnt
const inquirer = require('inquirer') 
async function getQuantity() {
    const answers = await inquirer.prompt({
      name: 'quantity',
      type: 'number',
      message: 'How much pictures you want to download?',
      default() {
        return '100';
      },
    });
    qnt = answers.quantity
  }
// setting up logo
const logo = (`
${chalk.cyan('prnt.sc scraper')}
${chalk.red('V 2.0.0')}
${chalk.blue('----------------')}
`)
// init
const init = (`
${chalk.green('[WORKER]',chalk.yellow('Checking if folder img exists'))}
`)
createDirIfNotExists('img')
console.log(chalk.green('[WORKER]',chalk.yellow('Check success!'))
)
// starting service
console.log(logo)
console.log(init)
console.log(chalk.green('[INPUT]',chalk.yellow('How many images you want? \n')))
getQuantity().then(() => {
    console.log(chalk.green('[WORKER]',chalk.yellow('Starting service')))
    imgParser(qnt,"./img",1000)
})

