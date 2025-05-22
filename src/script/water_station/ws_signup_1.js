import '../main.js'

import {
    validateRequired,
    validateName,
    validatePhoneNumber,
} from '../../util/validation.js'

const wsnameInput = $('#ws-wsname')
const contactNumInput = $('#ws-contact-num')
const addressInput = $('#ws-address')
const signupForm1 = $('#sign-up-1-form')

const wsnameFB = $('#ws-wsname-invalid-fb')
const contactNumFB = $('#ws-contact-num-invalid-fb')
const addressFB = $('#ws-address-invalid-fb')

contactNumInput.on('input', function() 
{
    let value = $(this).val()
    const cleanedValue = value.replace(/[^0-9]/g, '')
    $(this).val(cleanedValue)
})

signupForm1.on('submit', function(e) 
{
    // ? Validate each input first and add feedback before final checking of form validation
    const isWSnameValid = validateName(wsnameInput, wsnameFB)
    const isContactNumValid = validatePhoneNumber(contactNumInput, contactNumFB)
    const isAddressValid = validateRequired(addressInput, addressFB)

    const areAllInputsValid = isWSnameValid && isContactNumValid && isAddressValid

    if (areAllInputsValid)
    {
        window.location.href = '../../water_station/auth/ws_sign_up_p2.html'
    }
    
    e.preventDefault()
})