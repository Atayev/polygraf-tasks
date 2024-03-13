console.log("content script loaded")

chrome.runtime.sendMessage({message:"contentLoaded"});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const { message } = request
        if(!message) return;
        if(!isAmazonPage()) {
            chrome.runtime.sendMessage({message:"notAproduct"})
            return;
        } 
         scapeProduct().then((res)=> {
            console.log(JSON.stringify(res, 0 , 2))
            chrome.runtime.sendMessage({
                message:"scrapeComplete",
                data:res
            })
        })
    }
);





const isAmazonPage = () => {
    let url = window.location.href
    return url.includes("amazon.com") && url.includes("/dp/")
}



const scapeProduct = async function () {

    let title = document.querySelector("#productTitle").textContent.trim()
    let priceWhole = document.querySelector(".a-price-whole").textContent.trim()
    let priceSign = document.querySelector(".a-price-symbol").textContent.trim()
    let priceFraction = document.querySelector(".a-price-fraction").textContent.trim()
    let price = `${priceSign} ${priceWhole}.${priceFraction}`
    let img = document.querySelector("#landingImage").src
    let reviews_count = document.querySelector("#acrCustomerReviewText").textContent.trim()
    let platform_rating = document.querySelector(".reviewCountTextLinkedHistogram").title.trim()
    let sellerInfo = document.querySelector("#bylineInfo")
    let sellerName= sellerInfo.textContent.replace("Visit the", "").trim()
    let seller_url = sellerInfo.href
    let seller_id = seller_url.split("/")[6].split("?")[0]
    let productUrl = window.location.href;
    let product = {
        title,
        price,
        img,
        reviews_count,
        platform_rating,
        seller : {
            seller_id,
            sellerName,
            seller_url,
            platform: {
                name: "amazon",
                url: "https://www.amazon.com"
            }
        },
        url:productUrl
    }
    let reviews = Array.from(document.querySelectorAll(".review")).map(( item ) => {
        let username = item.querySelector(".a-profile-name").textContent.trim()
        let profile_url = item.querySelector(".a-profile").href
        let review_text  = item.querySelector(".review-text-content").textContent.trim()
        let review_id = item.id
        let review_rating = parseInt(item.querySelector(".review-rating").textContent.trim())
        let profile_id = profile_url?.split("/")[5]
        return {
            id:review_id,
            review:review_text, 
            is_recomended:review_rating > 3  ?  true : false,
            author: {
                id:profile_id,
                full_name:username,
                profile_url:profile_url,
            }
        }
    })
    


    return  {
         product,
         reviews
    }
}