const form = document.querySelector('form');
const toast = document.querySelector('.toast');
const checkbox = document.querySelector('#checkbox');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const queryType = document.querySelector('#query-type');
const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
const radios = document.querySelectorAll('input[type="radio"]');
const checkboxSvg = document.querySelector('#checkbox-icon');
const radioSvg = document.querySelector('.radio-icon');
const checkMark = document.querySelector('#checkmark');

let errorList = {}
let readyForSubmit = true;

form.addEventListener('submit', handleSubmit);


function handleSubmit(e){
    console.log("handling submit");
    errorList = {};
    e.preventDefault();   
    checkForEmptyFields(); 
    handleEmailInputs();
    handleRadioInputs();
    handleCheckbox();
    console.log("ran the validations");
    if(Object.keys(errorList).length === 0){
        console.log("all good");
        showToast();
    } else {
        console.log(errorList);
        return
    }
}

function checkForEmptyFields(){
    textInputs.forEach(input => {

        const errorId = input.id + '-error';
        const error = document.querySelector(`#${errorId}`);

        if(input.value === ''){    
            console.log(errorId);
            error.classList.remove('hide');
            input.classList.add('red');
            errorList[errorId] = `${input.id} was empty`;
        }
        else{
            input.classList.remove('red');
            error.classList.add('hide');
        }
    });
}

function handleEmailInputs(){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const invalidError = document.querySelector('#invalid-email-error');  
    
    if ("email-error" in errorList){
        return
}

    if (regex.test(email.value)){
        email.classList.remove('red');
        invalidError.classList.add('hide')
    } else {email.classList.add('red');
        invalidError.classList.remove('hide')
        errorList['invalid-email-error'] = `Please enter a valid email address`;
    }
    }


function handleCheckbox(){
    const checkboxError = document.querySelector('#checkbox-error');
    console.log(checkboxError)
    console.log(checkbox.checked)
    if(checkbox.checked){
        checkboxError.classList.add('hide');
    } else {
        checkboxError.classList.remove('hide');
        errorList['checkbox-error'] = `Please consent to being contacted`;
    }
}

function handleRadioInputs(){
    console.log(radios)
    const radioError = document.querySelector('#radio-error');
    console.log(radioError)
    let checked = Array.from(radios).some(radio => radio.checked); 

    if(checked){
        radioError.classList.add('hide');
    } else {
        radioError.classList.remove('hide');
        errorList['radio-error'] = `Please select a query type`;
    } 
}

checkbox.addEventListener('change', handleCheckboxStyle);


radios.forEach(radio => {
    radio.addEventListener('change', handleRadioStyle);
})

function handleCheckboxStyle() {
    console.log("handling checkbox");

    if (checkbox.checked) {
        checkboxSvg.classList.remove('unchecked');
        checkMark.classList.remove('unchecked');   
    } else {
        checkboxSvg.classList.add('unchecked');
        checkMark.classList.add('unchecked'); 
    }
}

function handleRadioStyle(){
    radios.forEach(radio => {
        let radioIconN = radio.getAttribute('data-value');
        let radioIcon = document.querySelector(`#radio-icon${radioIconN}`);
        let radioThing = document.querySelector(`#radio${radioIconN}`);
        console.log(radioThing)
        console.log(radioIcon)
        if (radio.checked){
            radioIcon.classList.remove('hide');
            radioThing.classList.add('removed');

        } else {
            radioIcon.classList.add('hide');  
            radioThing.classList.remove('removed')
        }
    })
}

function showToast(){
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}


