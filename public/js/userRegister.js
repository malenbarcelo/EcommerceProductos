
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

    const form = document.querySelector('form.form-register')

    form.addEventListener("submit",(e)=>{
        
        modifyClasses('company','company-error','input')
        modifyClasses('cuit','cuit-error','input')
        modifyClasses('sector','sector-error','select')
        modifyClasses('email','email-error','input')
        modifyClasses('address','address-error','input')
        modifyClasses('city','city-error','input')
        modifyClasses('phoneNumber','phone-error','input')
        modifyClasses('password','password-error','input')
        modifyClasses('passwordConfirmation','passwordConfirmation-error','input')
        modifyClasses('image','image','input')
        
        let errors = []

        //company validation
        const name = document.querySelector('.company')
        const divName = document.querySelector('.company-div')

        if(!name.value){
            errors.push("Debe completar la razón social")
            divName.innerHTML = '<input type="text" name="company" placeholder="Razón Social" class="register-form-input company is-invalid">'
            divName.innerHTML += '<i class="fas fa-exclamation name-exclamation"></i>'

        }else if (name.value.length<3){
            errors.push("La razón social debe tener al menos 3 caracteres")
            divName.innerHTML = '<input type="text" name="company" placeholder="Razón Social" class="register-form-input company is-invalid" value = "' + name.value + '">'
            divName.innerHTML += '<i class="fas fa-exclamation name-exclamation"></i>'

        }else{
            divName.innerHTML = '<input type="text" name="company" placeholder="Razón Social" class="register-form-input company" value = "' + name.value + '">'
        }

        //email validation
        const email = document.querySelector('.email')
        const divEmail = document.querySelector('.email-div')
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.value){
            errors.push("Debe completar el email")
            divEmail.innerHTML = '<input type="text" name="email" class="register-form-input email is-invalid" placeholder = "Email">'
            divEmail.innerHTML += '<i class="fas fa-exclamation"></i>'
        }else if(!email.value.match(validRegex)){
            errors.push("Email inválido")
            divEmail.innerHTML = '<input type="text" name="email" class="register-form-input email is-invalid" placeholder = "Email" value = ' + email.value + '>'
            divEmail.innerHTML += '<i class="fas fa-exclamation"></i>'
        }else{
            divEmail.innerHTML = '<input type="text" name="email" class="register-form-input email" placeholder = "Email" value = ' + email.value + '>'
        }

        //password validation
        const password = document.querySelector('.password')
        const divPassword = document.querySelector('.password-div')
        var re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_?¿¡"/()+*])/
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!password.value){
            errors.push("Debe ingresar una contraseña")
            divPassword.innerHTML  = '<input type="password" name="password" class="register-form-input password is-invalid" placeholder="Contraseña">'
            divPassword.innerHTML += '<i class="fas fa-exclamation"></i>'
        }else if (password.value.length < 8){
            errors.push("La constraseña debe tener al menos 8 caracteres")
            divPassword.innerHTML  = '<input type="password" name="password" class="register-form-input password is-invalid" placeholder="Contraseña" value = "" >'
            divPassword.innerHTML += '<i class="fas fa-exclamation"></i>'
        }else if (!re.test(password.value)){
            errors.push('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un caracter especial')
            divPassword.innerHTML  = '<input type="password" name="password" class="register-form-input password is-invalid" placeholder="Contraseña" value = "" >'
            divPassword.innerHTML += '<i class="fas fa-exclamation"></i>'
        }else{
            divPassword.innerHTML  = '<input type="password" name="password" class="register-form-input password" placeholder="Contraseña" value = ' + password.value + ' >'
        }

        //Image
        const image = document.querySelector('.image')
        const divImage = document.querySelector('.image-div')
        const acceptedExtensions = ['.jpg','.jpeg','.png','.gif']
        let includeExtension = 0

        if(image.value){
            for(let i=0; i < acceptedExtensions.length; i++){
                if(image.value.includes(acceptedExtensions[i]))
                includeExtension += 1
            }

            if (includeExtension == 0){
                errors.push("Las extensiones de archivos aceptadas son ['.jpg','.jpeg','.png','.gif']")
                divImage.innerHTML = '<input type="file" class="register-form-input image is-invalid" name="image">'
                divImage.innerHTML += '<i class="fas fa-exclamation"></i>'
            }else{
                divImage.innerHTML = '<input type="file" class="register-form-input image" name="image">'
            }
        }else{
            divImage.innerHTML = '<input type="file" class="register-form-input image" name="image">'
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