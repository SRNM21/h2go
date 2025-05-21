import '../main.js'

import {
    validateEmail,
    validatePassword
} from '../../util/validation.js'

const emailInput = $('#ws-email')
const passwordInput = $('#ws-password')
const confirmPasswordInput = $('#ws-confirm-password')
const showPassBtn = $('#show-password-btn')
const checkTerms = $('#terms-check')
const signupBtn = $('#ws-signup-btn')
const signupForm2 = $('#sign-up-2-form')

const emailFB = $('#ws-email-invalid-fb')
const passwordFB = $('#ws-password-invalid-fb')
const confirmPasswordFB = $('#ws-confirm-password-invalid-fb')
const checkTermsFB = $('#ws-terms-check-invalid-fb')

console.log('asdasdsad');


var show = false

showPassBtn.on('click', function() 
{
    passwordInput.prop('type', show ? 'password' : 'text')
    confirmPasswordInput.prop('type', show ? 'password' : 'text')
    showPassBtn.text(show ? 'SHOW' : 'HIDE')

    show = !show
})

checkTerms.on('change', function() { signupBtn.prop('disabled', !$(this).is(':checked')) })

signupForm2.on('submit', function(e) 
{
    // ? Validate each input first and add feedback before final checking of form validation
    const isEmailValid = validateEmail(emailInput, emailFB)
    const isPasswordValid = validatePassword(
        passwordInput,
        passwordFB,
        confirmPasswordInput,
        confirmPasswordFB
    )

    const isTermsValid = checkTerms.is(':checked')

    if (!isTermsValid)
    {
        checkTermsFB.text('Make sure you agree to Terms and condition & Privacy Policy before signing up.')
        checkTerms.addClass('is-invalid');
    }

    const areAllInputsValid = isEmailValid && isPasswordValid && isTermsValid

    if (areAllInputsValid)
    {
        window.location.href = '../../water_station/pages/ws_p_dashboard.xml?signed-in=true'
    }
    
    e.preventDefault()
})