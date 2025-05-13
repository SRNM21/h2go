import '../main.js'

import {
    notify
} from '../../util/helper.js'

import {
    validateRequired,
    validateName,
    validatePhoneNumber,
    validateEmail,
    validatePassword
} from '../../util/validation.js'

var CURRENT_EDIT

//* FORMS

const bcrypt = dcodeIO.bcrypt

const verificationModal = $('#verification-modal')
const verifyEmailData = $('#verify-email-data')
const verifyBtn = $('#verify-btn')

//* PROFILE

const waterStationDetailsForm = $('#profile-form')
var waterStationDetailsInputs = {}
var waterStationDetailsFeedbacks = {}

const cancelEditwaterStationDetailsBtn = $('#cancel-edit-details-btn')
const editwaterStationDetailsBtn = $('#edit-details-btn')

const confirmDiscardBtn = $('#confirm-discard-btn')

//* ACCOUNT

const accountForm = $('#account-form')
var accountInputs = {}
var accountFeedbacks = {}

const cancelEditEmailBtn = $("#cancel-edit-email-btn")
const editEmailBtn = $('#edit-email-btn')

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
    console.log('water station details in:', waterStationDetailsInputs)
    console.log('water station details fb:', waterStationDetailsFeedbacks)
    console.log('account in:', accountInputs)
    console.log('account fb:', accountFeedbacks)
    console.log('delete account in:', deleteAccountInputs)
    console.log('delete account fb:', deleteAccountFeedbacks)
    console.log('change password in:', changePasswordInputs)
    console.log('change password fb:', changePasswordFeedbacks)
})

function initializeInputs()
{
    waterStationDetailsInputs.contactnum.on('input', function() 
    {
        let value = $(this).val()
        const cleanedValue = value.replace(/[^0-9]/g, '')
        $(this).val(cleanedValue)
    })

    waterStationDetailsInputs.image.on('change', function (e)
    {
        const file = e.target.files[0]

        if (file) 
        {
            const reader = new FileReader()

            reader.onload = function (event) 
            {
                wsImage.attr('src', event.target.result)
            }

            reader.readAsDataURL(file)
        }
    })

    // initializeDeleteAccountInputs()
}

function getInputAndFeedbacks()
{
    waterStationDetailsForm.find('.has-validation').each(function () 
    {
        const input = $(this).find('input, select, textarea').first()
        const feedback = $(this).find('.invalid-feedback').first()

        if (input.length) 
        {
            const key = input.attr('id').replace('ws-', '').replace(/-/g, '') || 'unknown'

            waterStationDetailsInputs[key] = input
            waterStationDetailsFeedbacks[key] = feedback
        }
    })

    accountForm.find('.has-validation').each(function () 
    {
        const input = $(this).find('input, select, textarea').first()
        const feedback = $(this).find('.invalid-feedback').first()

        if (input.length) 
        {
            const key = input.attr('id').replace('ws-', '').replace(/-/g, '') || 'unknown'

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
            const key = input.attr('id').replace('ws-', '').replace(/-/g, '') || 'unknown'

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
        saveWaterStationDetails()
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

        let num = waterStationDetailsInputs.contactnum.attr('data-initial')
        
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

    console.log(CURRENT_EDIT);
    
    if (CURRENT_EDIT == 'PROFILE')
    {
        enableAllWaterStationDetails(false)
        editwaterStationDetailsBtn.text('Edit Details')
        editwaterStationDetailsBtn.prop('onclick', null).off('click')
        editwaterStationDetailsBtn.on('click', () => editBtnFunction())
        Object.values(waterStationDetailsInputs).forEach(input => input.val(input.attr('data-initial')))
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

// #region WATER STATION DETAILS

const cancelEditDetailsBtn = $('#cancel-edit-details-btn')
const editDetailsBtn = $('#edit-details-btn')

editDetailsBtn.on('click', () => editBtnFunction())

waterStationDetailsForm.on('submit', function(e) 
{
    // ? Validate each input first and add feedback before final checking of form validation
    e.preventDefault()

    const validations = {
        name: validateName,
        contactnum: validatePhoneNumber,
        address: validateRequired
    }

    let allValid = true

    for (const key in waterStationDetailsInputs) 
    {
        const input = waterStationDetailsInputs[key]
        const feedback = waterStationDetailsFeedbacks[key]
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

function enableWaterStationDetails(enable = true) 
{  
    waterStationDetailsForm
        .find('input, select, textarea')
        .prop('disabled', !enable)
}

function enableCancelEditWaterStationDetailsBtn(enable = true)
{
    cancelEditwaterStationDetailsBtn.prop('disabled', !enable)

    if (enable) cancelEditwaterStationDetailsBtn.show() 
    else cancelEditwaterStationDetailsBtn.hide()
}

function enableAllWaterStationDetails(enable)
{
    enableCancelEditWaterStationDetailsBtn(enable)
    enableWaterStationDetails(enable)
}

function saveWaterStationDetails()
{
    Object.values(waterStationDetailsInputs).forEach(input => {
        input.attr('data-initial', input.val())
    })

    enableAllWaterStationDetails(false)
    editwaterStationDetailsBtn.text('Edit Details')
    editwaterStationDetailsBtn.prop('onclick', null).off('click')
    editwaterStationDetailsBtn.on('click', () => editBtnFunction())
}

editwaterStationDetailsBtn.on('click', () => editBtnFunction())

function editBtnFunction()
{
    enableAllWaterStationDetails(true)

    CURRENT_EDIT = 'PROFILE'

    editwaterStationDetailsBtn.text('Save')
    editwaterStationDetailsBtn.prop('onclick', null).off('click')
    editwaterStationDetailsBtn.on('click', () => waterStationDetailsForm.trigger('submit'))
}

// #endregion WATER STATION DETAILS

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