
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

    if (!val) return invalidate(feedback, `${name} must be filled.`)

    return true
}

export function validateEmail(emailInput, emailFeedback)
{
    if (!validateRequired(emailInput, emailFeedback)) return false 

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const val = emailInput.val().trim()
    const name = emailInput.data('fb')

    if (!emailRegex.test(val))
    {
        return invalidate(emailFeedback, `Invalid ${name} format.`)
    }
    else if (val.length > 200)
    {
        return invalidate(emailFeedback, `${name} must be below 200 characters.`)
    }

    return true
}

//? HELPER 

function invalidate(container, feedback)
{
    container.text(feedback)
    return false
}