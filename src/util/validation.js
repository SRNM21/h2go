
export function initializeFormValidation() 
{
    'use strict'

    const forms = $('.needs-validation')

    forms.each(function() {
        const form = $(this)
        
        form.on('submit', function(event) 
        {
            if (!form[0].checkValidity()) 
            {
                event.preventDefault()
                event.stopPropagation()
            }

            form.addClass('was-validated')
        })
    })
}

export function validateRequired(input, feedback)
{
    const val = input.val().trim()
    const name = input.data('fb')

    if (!val) return invalidate(input, feedback, `${name} must be filled.`)

    return validate(input, feedback)
}

export function validateName(nameInput, nameFeedback)
{
    const alphaRegex = /^[\p{L}\s]*$/u
    const val = nameInput.val().trim()
    const name = nameInput.data('fb')

    if (!validateRequired(nameInput, nameFeedback)) return false 

    if (!alphaRegex.test(val))
    {
        return invalidate(nameInput, nameFeedback, `${name} must not contain invalid characters.`)
    }
    else if (val.length < 2)
    {
        return invalidate(nameInput, nameFeedback, `${name} is too short.`)
    }
    else if (val.length > 100)
    {
        return invalidate(nameInput, nameFeedback, `${name} is too long.`)
    }

    return validate(nameInput, nameFeedback)
}

export function validateGender(genderInput, genderFeedback)
{
    const val = genderInput.find(':selected').val()
    const name = genderInput.data('fb')

    if (!val) return invalidate(genderInput, genderFeedback, `${name} must be filled.`)

    return validate(genderInput, genderFeedback)
}

export function validateEmail(emailInput, emailFeedback)
{
    if (!validateRequired(emailInput, emailFeedback)) return false 

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const val = emailInput.val().trim()
    const name = emailInput.data('fb')

    if (!emailRegex.test(val))
    {
        return invalidate(emailInput, emailFeedback, `Invalid ${name} format.`)
    }
    else if (val.length > 200)
    {
        return invalidate(emailInput, emailFeedback, `${name} must be below 200 characters.`)
    }

    return validate(emailInput, emailFeedback)
}

export function validatePhoneNumber(phoneNumberInput, phoneNumberFeedback)
{
    if (!validateRequired(phoneNumberInput, phoneNumberFeedback)) return false 

    const val = phoneNumberInput.val().trim()
    const name = phoneNumberInput.data('fb')

    let numStartRegex = /^09/
    let numRegex = /^09\d{9}$/

    if (!numStartRegex.test(val))
    {
        return invalidate(phoneNumberInput, phoneNumberFeedback, `${name} must start with \'09\'.`)
    }
    else if (!numRegex.test(val))
    {
        return invalidate(phoneNumberInput, phoneNumberFeedback, `${name} must contain only numbers.`)
    }
    else if (val.length != 11)
    {
        return invalidate(phoneNumberInput, phoneNumberFeedback, `${name} must be 11 digits.`)
    }

    return validate(phoneNumberInput, phoneNumberFeedback)
}

export function validatePassword(passwordInput, passwordFeedback, confirmPasswordInput, confirmPasswordFeedback) 
{
    if (!validateRequired(passwordInput, passwordFeedback)) return false 

    const val = passwordInput.val().trim()
    const name = passwordInput.data('fb')

    let symRegex = /[^\w\s]/

    if (val.length < 8) 
    {
        return invalidate(passwordInput, passwordFeedback, `${name} must be at least 8 characters.`)
    }
    
    let lower = false
    let upper = false
    let num = false
    let sym = false

    for (let c of val) 
    {
        if (c >= 'a' && c <= 'z') lower = true
        else if (c >= 'A' && c <= 'Z') upper = true
        else if (c >= '0' && c <= '9') num = true
        else if (symRegex.test(val)) sym = true
    }

    if (!(lower && upper && num && sym))
    {
        return invalidate(passwordInput, passwordFeedback, `${name} must have lowercase, uppercase, numbers, and symbols.`)
    }

    if (val !== confirmPasswordInput.val().trim())
    {
        return invalidate(confirmPasswordInput, confirmPasswordFeedback, 'Password does not match')
    }

    validate(passwordInput, passwordFeedback)
    return validate(confirmPasswordInput, confirmPasswordFeedback)
}

//? HELPER 

function validate(input, container)
{
    container.text('')
    input.removeClass('is-invalid');
    return true
}

function invalidate(input, container, feedback)
{
    container.text(feedback)
    input.addClass('is-invalid');
    return false
}