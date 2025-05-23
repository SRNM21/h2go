import '../main.js'

import {
    validateEmail,
    validatePassword
} from '../../util/validation.js'

const emailInput = $('#cs-email')
const passwordInput = $('#cs-password')
const confirmPasswordInput = $('#cs-confirm-password')
const showPassBtn = $('#show-password-btn')
const checkTerms = $('#terms-check')
const signupBtn = $('#cs-signup-btn')
const signupForm2 = $('#sign-up-2-form')

const emailFB = $('#cs-email-invalid-fb')
const passwordFB = $('#cs-password-invalid-fb')
const confirmPasswordFB = $('#cs-confirm-password-invalid-fb')
const checkTermsFB = $('#cs-terms-check-invalid-fb')

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
        window.location.href = '../../customer/auth/cs_verification.html'
    }
    
    e.preventDefault()
})