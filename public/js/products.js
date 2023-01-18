window.addEventListener("load",()=>{
    const target = document.querySelector(".span-pagination")
    
    target.addEventListener("click", (e)=>{   
        e.target.style.boder='red solid 1px'
        console.log('hola')
        
    })
})
