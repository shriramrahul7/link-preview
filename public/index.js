const getInfo = async (e) => {
    
    e.preventDefault();
    url = textBox.value

    if (! url.startsWith("http")) {
        url = "http://" + url
    }

    if (url){
        try {
            resp = await fetch('http://localhost:3000/scrape', {
            method : "POST", 
            body : JSON.stringify({url}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            })   
        } catch (error) {
            console.error("unsuccessful post")
        }

        jsonData = await resp.json()
        // console.log(jsonData)
    }

    renderCard(jsonData)
}

const resetCard = () => {
    cardImg.src = "https://i.stack.imgur.com/y9DpT.jpg"
    cardDesc.textContent = "Example ( Previews info about the links )"
    cardTitle.textContent = "Link Previewer"
    cardUrl.textContent = "Link Previewer"
    cardUrl.href = "#"
    cardKeyword.textContent = ""
}

const renderCard = (jsonData) => {
    
    resetCard();

    if (jsonData.img){
        cardImg.src = jsonData.img;
        cardImg.classList.remove('hidden')
    }
    cardDesc.textContent = jsonData.desc
    cardTitle.textContent = jsonData.title
    cardUrl.textContent = jsonData.sitename || jsonData.url || jsonData.orgURL
    cardUrl.href = jsonData.url || jsonData.orgURL

    if (jsonData.keywords) {
        keywords = jsonData.keywords.split(",")
        keywords = keywords.map(key => {
            content = key.trim()
            const li = document.createElement('li')
            li.textContent = content
            li.classList.add("bg-red-400", "px-2" , "py-1", "rounded-md");
            cardKeyword.appendChild(li)
        })
    }
    

}

button.addEventListener('click', getInfo)