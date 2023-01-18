window.addEventListener("load",()=>{
    const inputSearch = document.querySelector("input.search-bar")
    const hrefProductSearched = document.querySelector(".div-magnifying-glass a")
    let productSearched = ''
    const acceptedKeys = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','/','*','-','+','.','&','%']
        
    inputSearch.addEventListener("keypress", (e)=>{
        if(acceptedKeys.indexOf(e.key)!=-1){
            productSearched += e.key
        }
        hrefProductSearched.innerHTML = '<a href="/products/product-detail/' + productSearched + '"><i class="fa-solid fa-magnifying-glass"></i></a>'
    })

    inputSearch.addEventListener("keypress", (e)=>{
        if(e.keyCode == 13){
            hrefProductSearched.innerHTML = '<a href="/products/product-detail/' + productSearched + '"><i class="fa-solid fa-magnifying-glass"></i></a>'
            document.querySelector("#id-fa-magnifying-glass").click()
            console.log(hrefProductSearched.innerHTML)
        }
        
    })
    
})

