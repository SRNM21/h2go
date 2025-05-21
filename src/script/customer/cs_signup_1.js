import '../main.js'

import {
    validateRequired,
    validateName,
    validatePhoneNumber,
    validateGender
} from '../../util/validation.js'

const fnameInput = $('#cs-fname')
const lnameInput = $('#cs-lname')
const contactNumInput = $('#cs-contact-num')
const genderInput = $('#cs-gender')
const addressInput = $('#cs-address')
const signupForm1 = $('#sign-up-1-form')

const fnameFB = $('#cs-fname-invalid-fb')
const lnameFB = $('#cs-lname-invalid-fb')
const contactNumFB = $('#cs-contact-num-invalid-fb')
const genderFB = $('#cs-gender-invalid-fb')
const addressFB = $('#cs-address-invalid-fb')

contactNumInput.on('input', function() 
{
    let value = $(this).val()
    const cleanedValue = value.replace(/[^0-9]/g, '')
    $(this).val(cleanedValue)
})

signupForm1.on('submit', function(e) 
{
    // ? Validate each input first and add feedback before final checking of form validation
    const isFnameValid = validateName(fnameInput, fnameFB)
    const isLnameValid = validateName(lnameInput, lnameFB)
    const isContactNumValid = validatePhoneNumber(contactNumInput, contactNumFB)
    const isGenderValid = validateGender(genderInput, genderFB)
    const isAddressValid = validateRequired(addressInput, addressFB)

    const areAllInputsValid = isFnameValid && isLnameValid && isContactNumValid && isGenderValid && isAddressValid

    if (areAllInputsValid)
    {
        window.location.href = '../../customer/auth/cs_sign_up_p2.html'
    }
    
    e.preventDefault()
})