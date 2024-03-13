    let scrapeButton = document.getElementById("scrape")
    scrapeButton.disabled = true;
    let body = document.querySelector("body")



    scrapeButton.addEventListener("click", function () {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            let activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "scrape"});
        });
    })



    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            const {message, data} = request 
            if(!message) return ;
            let infoText = document.createElement("span")
            if(message === "contentLoaded") {
                scrapeButton.disabled= false;
            }
            if(message === "scrapeComplete") {
                infoText.textContent = "Scrape complete"
                body.append(infoText)
            }
            if(message === "notAproduct") {
                infoText.textContent="Not a product page"    
                body.append(infoText)
            }
        })