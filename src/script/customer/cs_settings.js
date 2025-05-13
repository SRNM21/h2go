import '../main.js'

import {
    notify
} from '../../util/helper.js'

import {
    validateRequired,
    validateName,
    validatePhoneNumber,
    validateGender,
    validateEmail,
    validatePassword
} from '../../util/validation.js'

//* FORMS

const bcrypt = dcodeIO.bcrypt

const verificationModal = $('#verification-modal')
const verifyEmailData = $('#verify-email-data')
const verifyBtn = $('#verify-btn')

//* PROFILE

const hiddenDataName = $('#hidden-data-for-name')
const hiddenDataGender = $('#hidden-data-for-gender')

const personalDetailsForm = $('#profile-form')
var personalDetailsInputs = {}
var personalDetailsFeedbacks = {}

const cancelEditPersonalDetailsBtn = $('#cancel-edit-details-btn')
const editPersonalDetailsBtn = $('#edit-details-btn')

const confirmDiscardBtn = $('#confirm-discard-btn')

//* ACCOUNT

const accountForm = $('#account-form')
var accountInputs = {}
var accountFeedbacks = {}

const cancelEditEmailBtn = $("#cancel-edit-email-btn")
const editEmailBtn = $('#edit-email-btn')

var CURRENT_EDIT

//* ACCOUNT DELETION

const deleteAcountForm = $('#deletion-form')
var deleteAccountInputs = {}
var deleteAccountFeedbacks = {}

const deleteAccountBtn = $('#delete-account-btn')
const confirmDeleteAccountBtn = $('#confirm-delete-account-btn')

const deleteAccountSuccessModal = $('#deletion-success-modal')

//* SECURITY

const changePasswordForm = $('#change-password-form')

var changePasswordInputs = {}
var changePasswordFeedbacks = {}

const changePasswordModal = $('#change-pass-modal')
const changePasswordBtn = $('#change-password-btn')

const showPasswordBtn = $('#show-pass-btn')
const saveChangedPasswordBtn = $('#save-change-pass-btn')
var show = false

var AUTH_MODE

let qrCode
const qrCodeHolder = $('#qr-code')
const secretKeyHolder = $('#secret-key')

const tfaSwitch = $('#tfa-switch')
const tfaCard = $('.tfa-card')

const tfaAuthModeApp = $('#tfa-mode-auth-app')
const tfaAuthModeSms = $('#tfa-mode-auth-sms')

const tfaAuthOTPModal = $('#otp-modal')
const tfaAuthOTPModalIllustration = $('.otp-illustration-holder img')
const tfaAuthOTPModalText = $('#otp-text')
const tfaAuthOTPModalSubmitBtn = $('#otp-submit-btn')

const tfaAuthModeAppModal = $('#auth-mode-app-modal')

// #region RELOAD DATA

$(window).on('load', function ()
{  
    getInputAndFeedbacks()
    initializeInputs()

    //! FOR DEBUGGING PURPOSES
    console.log('personal details in:', personalDetailsInputs)
    console.log('personal details fb:', personalDetailsFeedbacks)
    console.log('account in:', accountInputs)
    console.log('account fb:', accountFeedbacks)
    console.log('delete account in:', deleteAccountInputs)
    console.log('delete account fb:', deleteAccountFeedbacks)
    console.log('change password in:', changePasswordInputs)
    console.log('change password fb:', changePasswordFeedbacks)
})

function initializeInputs()
{
    initializePersonalDetailsInputs()
    initializeDeleteAccountInputs()
}

function getInputAndFeedbacks()
{
    personalDetailsForm.find('.has-validation').each(function () 
    {
        const input = $(this).find('input, select, textarea').first()
        const feedback = $(this).find('.invalid-feedback').first()

        if (input.length) 
        {
            const key = input.attr('id').replace('cs-', '').replace(/-/g, '') || 'unknown'

            personalDetailsInputs[key] = input
            personalDetailsFeedbacks[key] = feedback
        }
    })

    accountForm.find('.has-validation').each(function () 
    {
        const input = $(this).find('input, select, textarea').first()
        const feedback = $(this).find('.invalid-feedback').first()

        if (input.length) 
        {
            const key = input.attr('id').replace('cs-', '').replace(/-/g, '') || 'unknown'

            accountInputs[key] = input
            accountFeedbacks[key] = feedback
        }
    })

    deleteAcountForm.find('.has-validation').each(function () 
    {
        const input = $(this).find('input, select, textarea').first()
        const feedback = $(this).find('.invalid-feedback').first()

        if (input.length) 
        {
            const key = input.attr('id').replace('del-', '').replace(/-/g, '') || 'unknown'

            deleteAccountInputs[key] = input
            deleteAccountFeedbacks[key] = feedback
        }
    })

    changePasswordForm.find('.has-validation').each(function () 
    {
        const input = $(this).find('input, select, textarea').first()
        const feedback = $(this).find('.invalid-feedback').first()

        if (input.length) 
        {
            const key = input.attr('id').replace('cs-', '').replace(/-/g, '') || 'unknown'

            changePasswordInputs[key] = input
            changePasswordFeedbacks[key] = feedback
        }
    })
}

// #endregion RELOAD DATA

// #region VERIFY 

verifyBtn.on('click', function () 
{  
    if (CURRENT_EDIT == 'PROFILE SAVE')
    {
        savePersonalDetails()
    }
    else if (CURRENT_EDIT == 'SECURITY SAVE')
    {
        saveSecurity()
    }
    else if (CURRENT_EDIT == 'CHANGE PASSWORD')
    {
        changePasswordModal.modal('show')
    }
    else if (AUTH_MODE == 'AUTH APP')
    {
        let secretKey = generateSE(32)

        if (qrCode == null) 
        {        
            qrCode = new QRCode(qrCodeHolder.attr('id'), secretKey)
        } 
        else 
        {
            qrCode.makeCode(secretKey);
        }

        secretKeyHolder.text(secretKey)
        tfaAuthModeAppModal.modal('show')
        tfaAuthOTPModalText.text('Enter the 6-digit code on your authenticator app')
        tfaAuthOTPModalIllustration.attr('src', '../../../assets/svg/TwoFactorAuth.svg')

    }
    else if (AUTH_MODE == 'AUTH APP DISABLE')
    {
        tfaAuthOTPModal.modal('show')
    }
    else if (AUTH_MODE == 'AUTH SMS')
    {
        AUTH_MODE = 'AUTH SMS VERIFY'

        let num = personalDetailsInputs.contactnum.attr('data-initial')
        
        tfaAuthOTPModal.modal('show')
        tfaAuthOTPModalIllustration.attr('src', '../../../assets/svg/MessageOTP.svg')
        tfaAuthOTPModalText.text(`Enter the 6-digit code that was sent to ${ num.substring(0, 2) }******${ num.substring(8, 11) }`)
    }
    else if (AUTH_MODE == 'AUTH SMS DISABLE')
    {
        console.log('MODAL AUTH SMS')
    }
})

confirmDiscardBtn.on('click', () => {

    if (CURRENT_EDIT == 'PROFILE')
    {
        enableAllPersonalDetails(false)
        editPersonalDetailsBtn.text('Edit Details')
        editPersonalDetailsBtn.prop('onclick', null).off('click')
        editPersonalDetailsBtn.on('click', () => editBtnFunction())
        Object.values(personalDetailsInputs).forEach(input => input.val(input.attr('data-initial')))
    }
    else if (CURRENT_EDIT == 'SECURITY')
    {
        enableAllSecurity(false)
        editEmailBtn.text('Edit Email')
        editEmailBtn.prop('onclick', null).off('click')
        editEmailBtn.on('click', () => editEmailBtnFunction())
        Object.values(accountInputs).forEach(input => input.val(input.attr('data-initial')))
    }
})

// #endregion VERIFY

// #region PERSONAL DETAILS 

function initializePersonalDetailsInputs()
{
    let name = hiddenDataName.val().split(' ')
    personalDetailsInputs.fname.val(name[0])
    personalDetailsInputs.lname.val(name[1])
    personalDetailsInputs.fname.attr('data-initial', name[0])
    personalDetailsInputs.lname.attr('data-initial', name[1])
    personalDetailsInputs.gender.prop('selectedIndex', hiddenDataGender.val() == 'M' ? 1 : 2)
    personalDetailsInputs.contactnum.on('input', function() 
    {
        let value = $(this).val()
        const cleanedValue = value.replace(/[^0-9]/g, '')
        $(this).val(cleanedValue)
    })
}

personalDetailsForm.on('submit', function(e) 
{
    // ? Validate each input first and add feedback before final checking of form validation
    e.preventDefault()

    const validations = {
        fname: validateName,
        lname: validateName,
        contactnum: validatePhoneNumber,
        gender: validateGender,
        address: validateRequired
    }

    let allValid = true

    for (const key in personalDetailsInputs) 
    {
        const input = personalDetailsInputs[key]
        const feedback = personalDetailsFeedbacks[key]
        const validate = validations[key]

        if (validate) 
        {
            const isValid = validate(input, feedback)
            if (!isValid) allValid = false
        }
    }

    if (allValid)
    {
        CURRENT_EDIT = 'PROFILE SAVE'
        verifyEmailData.text(accountInputs.email.attr('data-initial'))
        verificationModal.modal('toggle')
    }
})

function enablePersonalDetails(enable = true) 
{  
    personalDetailsForm
        .find('input, select, textarea')
        .prop('disabled', !enable)
}

function enableCancelEditPersonalDetailsBtn(enable = true)
{
    cancelEditPersonalDetailsBtn.prop('disabled', !enable)

    if (enable) cancelEditPersonalDetailsBtn.show() 
    else cancelEditPersonalDetailsBtn.hide()
}

function enableAllPersonalDetails(enable)
{
    enableCancelEditPersonalDetailsBtn(enable)
    enablePersonalDetails(enable)
}

function savePersonalDetails()
{
    Object.values(personalDetailsInputs).forEach(input => {
        input.attr('data-initial', input.val())
    })

    enableAllPersonalDetails(false)
    editPersonalDetailsBtn.text('Edit Details')
    editPersonalDetailsBtn.prop('onclick', null).off('click')
    editPersonalDetailsBtn.on('click', () => editBtnFunction())
}

editPersonalDetailsBtn.on('click', () => editBtnFunction())

function editBtnFunction()
{
    enableAllPersonalDetails(true)

    CURRENT_EDIT = 'PROFILE'

    editPersonalDetailsBtn.text('Save')
    editPersonalDetailsBtn.prop('onclick', null).off('click')
    editPersonalDetailsBtn.on('click', () => personalDetailsForm.trigger('submit'))
}

// #endregion PERSONAL DETAILS 

// #region ACCOUNT

accountForm.on('submit', function(e) 
{
    // ? Validate each input first and add feedback before final checking of form validation
    e.preventDefault()
    
    if (validateEmail(accountInputs.email, accountFeedbacks.email))
    {
        CURRENT_EDIT = 'SECURITY SAVE'
        verifyEmailData.text(accountInputs.email.attr('data-initial'))
        verificationModal.modal('toggle')
    }
})

function enableSecurity(enable = true) 
{  
    accountInputs.email.prop('disabled', !enable)
}

function enableCancelEditEmailBtn(enable = true)
{
    cancelEditEmailBtn.prop('disabled', !enable)

    if (enable) cancelEditEmailBtn.show() 
    else cancelEditEmailBtn.hide()
}

function enableAllSecurity(enable)
{
    enableCancelEditEmailBtn(enable)
    enableSecurity(enable)
}

function saveSecurity()
{
    Object.values(accountInputs).forEach(input => {
        input.attr('data-initial', input.val())
    })

    enableAllSecurity(false)
    editEmailBtn.text('Edit Details')
    editEmailBtn.prop('onclick', null).off('click')
    editEmailBtn.on('click', () => editEmailBtnFunction())
}

editEmailBtn.on('click', () => editEmailBtnFunction())

function editEmailBtnFunction()
{
    enableAllSecurity(true)

    CURRENT_EDIT = 'SECURITY'

    editEmailBtn.text('Save')
    editEmailBtn.prop('onclick', null).off('click')
    editEmailBtn.on('click', () => accountForm.trigger('submit'))
}

// #endregion SECURITY

// #region DELETE ACCOUNT

var accountDeletionVerifiedEmail = false
var accountDeletionVerifiedPassword = false
var accountDeletionVerifiedText = false
var accountDeletionFilledOut = false

function initializeDeleteAccountInputs()
{
    deleteAccountInputs.email.on('input', function () 
    {  
        accountDeletionVerifiedEmail = $(this).val() == accountInputs.email.attr('data-initial')
        deleteAccountFormObserver()
    })

    deleteAccountInputs.pass.on('input', function () 
    {  
        accountDeletionVerifiedPassword = $(this).val().length >= 8
        deleteAccountFormObserver()
    })

    deleteAccountInputs.verify.on('input', function () 
    {  
        accountDeletionVerifiedText = $(this).val() == $(this).attr('data-compare')
        deleteAccountFormObserver()
    })
}

function deleteAccountFormObserver()
{
    accountDeletionFilledOut = accountDeletionVerifiedEmail && accountDeletionVerifiedPassword && accountDeletionVerifiedText

    confirmDeleteAccountBtn.prop('disabled', !accountDeletionFilledOut)

    if (accountDeletionFilledOut) confirmDeleteAccountBtn.on('click', () => confirmDeleteAccountBtnFunction())
    else confirmDeleteAccountBtn.prop('onclick', null).off('click')
}

deleteAccountBtn.on('click', function () 
{  
    Object.values(deleteAccountInputs).forEach(input =>input.val(''))
})

function confirmDeleteAccountBtnFunction()
{
    let passVal = deleteAccountInputs.pass.val()
    let passCompare = deleteAccountInputs.pass.attr('data-compare')

    bcrypt.compare(passVal, passCompare, function (err, result) 
    {
        if (err) 
        {
            notify('danger', err)
            return
        }

        if (!result) 
        {
            notify('danger', 'Password is incorrect!')
            return
        } 

        deleteAccountSuccessModal.modal('show')
    })
}

// #region DELETE ACCOUNT

// #region SECURITY

changePasswordBtn.on('click', () => {
    CURRENT_EDIT = 'CHANGE PASSWORD'
    verifyEmailData.text(accountInputs.email.attr('data-initial'))
})

changePasswordForm.on('submit', function (e) 
{  
    // ? Validate each input first and add feedback before final checking of form validation
    e.preventDefault()
    
    if (validatePassword(
        changePasswordInputs.changepassword,
        changePasswordFeedbacks.changepassword,
        changePasswordInputs.confirmchangepassword,
        changePasswordFeedbacks.confirmchangepassword,
    ))
    {
        notify('success', 'Password is successfully changed.')
        changePasswordInputs.changepassword.val('')
        changePasswordInputs.confirmchangepassword.val('')
        changePasswordInputs.confirmchangepassword.text('')
        changePasswordFeedbacks.confirmchangepassword.text('')
        changePasswordModal.modal('hide')
    }
})

saveChangedPasswordBtn.on('click', function() 
{
    changePasswordForm.trigger('submit')
})

showPasswordBtn.on('click', function () 
{  
    changePasswordInputs.changepassword.prop('type', show ? 'password' : 'text')
    changePasswordInputs.confirmchangepassword.prop('type', show ? 'password' : 'text')
    showPasswordBtn.text(show ? 'SHOW' : 'HIDE')

    show = !show
})

tfaSwitch.on('change', function () 
{
    const isTfaEnabled = $(this).is(':checked')

    if (isTfaEnabled) 
    {
        tfaCard.fadeIn('fast')
    } 
    else 
    {
        tfaCard.fadeOut('fast')
    }
})

tfaAuthModeApp.on('click', () => tfaAuthModeAppFunction())
tfaAuthModeSms.on('click', () => tfaAuthModeSMSFunction())

function tfaAuthModeAppFunction() 
{  
    verificationModal.modal('show')
    verifyEmailData.text(accountInputs.email.val())
    AUTH_MODE = 'AUTH APP'
}

function tfaAuthModeSMSFunction()
{
    AUTH_MODE = 'AUTH SMS'

    if (tfaAuthModeApp.text() == 'Disable')
    {
        tfaAuthOTPModal.modal('show')
        tfaAuthOTPModalText.text('Enter the 6-digit code on your authenticator app')
        tfaAuthOTPModalIllustration.attr('src', '../../../assets/svg/TwoFactorAuth.svg')
    }
    else 
    {
        verificationModal.modal('show')
        verifyEmailData.text(accountInputs.email.val())
    }
}

function generateSE(length) 
{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    const randomArray = new Uint8Array(length)
    crypto.getRandomValues(randomArray)

    randomArray.forEach((number) => {
        result += chars[number % chars.length]
    })

    return result
}

tfaAuthOTPModalSubmitBtn.on('click', function () 
{  
    if (AUTH_MODE == 'AUTH APP DISABLE')
    {
        tfaAuthModeApp.text('Enable')
        tfaAuthModeApp.prop('onclick', null).off('click')
        tfaAuthModeApp.on('click', () => tfaAuthModeAppFunction())

        tfaAuthOTPModal.modal('hide')
        notify('success', 'Authentication app is disabled successfully.')
    }
    else if (AUTH_MODE == 'AUTH APP')
    {
        tfaAuthModeApp.text('Disable')
        tfaAuthModeApp.prop('onclick', null).off('click')
        tfaAuthModeApp.on('click', function () 
        {  
            AUTH_MODE = 'AUTH APP DISABLE'

            tfaAuthOTPModalText.text('Enter the 6-digit code on your authenticator app')
            tfaAuthOTPModalIllustration.attr('src', '../../../assets/svg/TwoFactorAuth.svg')
            tfaAuthOTPModal.modal('show')
        })

        tfaAuthOTPModal.modal('hide')
        notify('success', 'Authentication app is enabled successfully.')
    }
    else if (AUTH_MODE == 'AUTH SMS')
    {
        AUTH_MODE = 'AUTH SMS VERIFY'

        let num = personalDetailsInputs.contactnum.attr('data-initial')
        
        tfaAuthOTPModal.modal('show')
        tfaAuthOTPModalIllustration.attr('src', '../../../assets/svg/MessageOTP.svg')
        tfaAuthOTPModalText.text(`Enter the 6-digit code that was sent to ${ num.substring(0, 2) }******${ num.substring(8, 11) }`)
    }
    else if (AUTH_MODE == 'AUTH SMS DISABLE')
    {
        tfaAuthModeSms.text('Enable')
        tfaAuthModeSms.prop('onclick', null).off('click')
        tfaAuthModeSms.on('click', () => tfaAuthModeSMSFunction())

        tfaAuthOTPModal.modal('hide')
        notify('success', 'Authentication SMS is disabled successfully.')
    }
    else if (AUTH_MODE == 'AUTH SMS VERIFY')
    {
        tfaAuthModeSms.text('Disable')
        tfaAuthModeSms.prop('onclick', null).off('click')
        tfaAuthModeSms.on('click', function () 
        {  
            AUTH_MODE = 'AUTH SMS DISABLE'
            
            let num = personalDetailsInputs.contactnum.attr('data-initial')
        
            tfaAuthOTPModal.modal('show')
            tfaAuthOTPModalIllustration.attr('src', '../../../assets/svg/MessageOTP.svg')
            tfaAuthOTPModalText.text(`Enter the 6-digit code that was sent to ${ num.substring(0, 2) }******${ num.substring(8, 11) }`)
        })
        
        tfaAuthOTPModal.modal('hide')
        notify('success', 'Authentication SMS is enabled successfully.')
    }
})

// #region SECURITY