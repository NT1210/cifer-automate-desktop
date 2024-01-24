const puppeteer = require("puppeteer")

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

async function extract(){
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\Chrome.exe"
    })
    
    const page = await browser.newPage()

    // By making use of page.exporseFunction, you can use this function inside page.evaluate()
    await page.exposeFunction("sliceByNumber", (array, number) => {
        const length = Math.ceil(array.length / number)

        return new Array(length).fill().map((_, i) =>
          array.slice(i * number, (i + 1) * number)
        )
    })
    
    await page.goto("https://ciferquery.singlewindow.cn/")

    await page.type('#registerTypeName', "18")

    await delay(1500)

    await page.type('#countryName', "俄罗斯-Russia")

    await delay(1500)

    await page.click('span[id="chaxun"]')

    await delay(1000)


    const lastPageNum = await page.evaluate(() => {
        let links = document.querySelectorAll(".page-item")
        // Be careful so as not to do .slice(-1). The last element is ">"
        return Array.from(links).slice(-2)[0].textContent
    })


    let extractedArr = []

    for(let i=0; i<lastPageNum; i++){
        const dataPerPage = await page.evaluate(() => {

            let tableBody = document.querySelectorAll("tbody td")
            let temparr = []
            tableBody.forEach(ele => temparr.push(ele.textContent))
            temparr.shift()
            let slicedArr = window.sliceByNumber(temparr, 10)

            return slicedArr
        })
        

        // console.log(dataPerPage)
        extractedArr.push(dataPerPage)
    
        delay(1500)
        await page.click(".page-next a")
    }

    // The arr structure of extractedArr is [[[ele1], [ele2]...], [[ele1], [ele2]...]...]
    // By flatteing, you can create arr such as [[ele1], [ele2], [ele3]...]
    let flattedArr = extractedArr.flat()

    browser.close()

    return flattedArr
}


module.exports = {extract}