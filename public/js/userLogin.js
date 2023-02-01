//Función para eliminar clases y mensajes de express validator
function modifyClasses(input,inputError,inputType){
    const inputToModify = document.querySelector('.' + input)
    inputToModify.classList.remove('is-invalid')
    const inputErrorToModify = document.querySelector('.' + inputError)
    if(inputErrorToModify){
        inputErrorToModify.innerHTML=''
    }
}

window.addEventListener("load",async()=>{

    const form = document.querySelector('form.form-login')

    form.addEventListener("submit",(e)=>{
        
        modifyClasses('email','email-error','input')
        modifyClasses('password','password-error','input')
                
        let errors = []
        
        //email validation
        const email = document.querySelector('.email')
        const divEmail = document.querySelector('.email-div')
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.value){
            errors.push("Debe completar el email")
            divEmail.innerHTML = '<input type="text" name="email" placeholder="Email" class="login-form-input email is-invalid">'
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
        }else{
            divPassword.innerHTML  = '<input type="password" name="password" class="register-form-input password" placeholder="Contraseña" value = ' + password.value + ' >'
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
})