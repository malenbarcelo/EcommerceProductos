//Función para eliminar clases y mensajes de express validator
/*function modifyClasses(input,inputError,inputType){

    const inputToModify = document.querySelector('.' + input)
    inputToModify.classList.remove('is-invalid')

    const faExclamation = document.querySelector('.' + input + '-exclamation')
        if(faExclamation){
            faExclamation.classList.remove('fas')
            faExclamation.classList.remove('fa-exclamation')
    }

    const inputErrorToModify = document.querySelector('.' + inputError)
    if(inputErrorToModify){
        inputErrorToModify.innerHTML=''
    }
}

window.addEventListener("load",async()=>{

    const form = document.querySelector('form.form-create-product')

    form.addEventListener("submit",(e)=>{

        modifyClasses('item','item-error','input')
        modifyClasses('description','description-error','input')
        modifyClasses('category','category-error','select')
        modifyClasses('price','price-error','input')
        modifyClasses('discount2','discount2-error','input')
        modifyClasses('stock','stock-error','input')
        modifyClasses('image','image-error','input')


        let errors = []

        //item validation
        const item = document.querySelector('.item')
        const divItem = document.querySelector('.item-div')
        console.log(item.value)

        if(!item.value){
            errors.push("Debe ingresar el código del producto")
            divItem.innerHTML = '<input type="text" class="create-product-form-input item is-invalid" name="item" placeholder="Código del producto">'
            divItem.innerHTML += '<i class="fas fa-exclamation item-exclamation"></i>'
        }else if (item.value.length < 2){
            errors.push("El código debe tener al menos 2 caracteres")
            divItem.innerHTML = '<input type="text" class="create-product-form-input item is-invalid" name="item" placeholder="Código del producto" value =' + item.value + '>'
            divItem.innerHTML += '<i class="fas fa-exclamation item-exclamation"></i>'
        }else{
            divItem.innerHTML = '<input type="text" class="create-product-form-input item" name="item" placeholder="Código del producto" value =' + item.value + '>'
        }

        //description validation
        const description = document.querySelector('.description')
        const divDescription = document.querySelector('.description-div')

        if(!description.value){
            errors.push("Debe ingresar una descripción")
            divDescription.innerHTML = '<input type="text" class="create-product-form-input description is-invalid" name="description" placeholder="Descripción">'
            divDescription.innerHTML += '<i class="fas fa-exclamation name-exclamation"></i>'
        }else if(description.value.length < 10){
            errors.push("La descripción debe tener al menos 10 caracteres")
            divDescription.innerHTML = '<input type="text" class="create-product-form-input description is-invalid" name="description" placeholder="Descripción" value = "' + description.value + '">'
            divDescription.innerHTML += '<i class="fas fa-exclamation name-exclamation"></i>'
        }else{
            console.log(description.value)
            divDescription.innerHTML = '<input type="text" class="create-product-form-input description" name="description" placeholder="Descripción" value = "' + description.value + '">'
        }

        //image validation

        const image = document.querySelector('.image')
        const divImage = document.querySelector('.image-div')
        const acceptedExtensions = ['.jpg','.jpeg','.png','.gif']
        let includeExtension = 0

        if(!image.value){
            errors.push("Debe incluir una imagen")
            divImage.innerHTML = '<input type="file" class="create-product-form-input image is-invalid" name="image">'
            divImage.innerHTML += '<i class="fas fa-exclamation"></i>'
        } else {
            for(let i=0; i < acceptedExtensions.length; i++){
                if(image.value.includes(acceptedExtensions[i]))
                includeExtension += 1
            }
            if (includeExtension == 0){
                errors.push("Las extensiones de archivos aceptadas son ['.jpg','.jpeg','.png','.gif']")
                divImage.innerHTML = '<input type="file" class="create-product-form-input image is-invalid" name="image">'
                divImage.innerHTML += '<i class="fas fa-exclamation"></i>'
            }else{
                divImage.innerHTML = '<input type="file" class="create-product-form-input image" name="image">'
            }
        }

        if (errors.length > 0){
            e.preventDefault()
            let ulErrors = document.querySelector('div.div-errors ul')
            ulErrors.innerHTML = ''
            for(let i =0; i<errors.length;i++){
                ulErrors.innerHTML += '<li>' + errors[i] +'</li>'
            }
        }

    })
})*/