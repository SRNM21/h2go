import '../main.js'

import {
    notify
} from '../../util/helper.js'

var editStatus

// #region ACCOUNT DETAILS

const editEmailBtn = $('#edit-email-btn')
const editEmailUtilContainer = $('#edit-email-util-container')
const editEmailBtnWrapper = $('#edit-email-btn-wrapper')
const changePassBtn = $('#change-pass-btn')

const emailInput = $('#email')

const saveEmailEditBtn = $('#save-edit-email-btn')
const discardChangesBtn = $('#confirm-discard-btn')

editEmailBtnWrapper.empty()
editEmailBtnWrapper.append(editEmailBtn)

editEmailBtnWrapper.on('click', '#edit-email-btn', function () 
{  
    editEmailBtnWrapper.empty()
    editEmailBtnWrapper.append(editEmailUtilContainer)

    emailInput.prop('disabled', false)
})

discardChangesBtn.on('click', function() 
{
    if (editStatus == 'EMAIL')
    {
        resetEmailUtilBtns(emailInput.data('initial'))
    }
    else if (editStatus = 'EDIT WATER STATION DETAILS')
    {
        wsImage.attr('src', wsImage.data('initial'))
        wsName.val(wsName.data('initial'))
        wsContactNum.val(wsContactNum.data('initial'))
        wsAddress.val(wsAddress.data('initial'))
    
        editDetailsBtn.text('Edit Details')
        editDetailsBtn.prop('onclick', null).off('click')
        editDetailsBtn.on('click', () => editDetailsFunc())
        cancelEditDetailsBtn.hide()
        disableWaterStationDetails(true)
    }
})

saveEmailEditBtn.on('click', () => {editStatus = 'EMAIL'})
changePassBtn.on('click', () => {editStatus = 'PASSWORD'})

function resetEmailUtilBtns(data) 
{  
    editEmailBtnWrapper.empty()
    editEmailBtnWrapper.append(editEmailBtn)

    emailInput.val(data)
    emailInput.prop('disabled', true)
}

// #endregion ACCOUNT DETAILS

// #region VERIFY ACCOUNT 

const verifyBtn = $('#verify-btn')
const emailData = $('#verify-email-data')

const changePassModal = $('#change-pass-modal')

verifyBtn.on('click', function () 
{  
    if (editStatus == 'EMAIL')
    {
        notify('success', 'Email changed successfully.')
        resetEmailUtilBtns(emailInput.val())
        emailData.text(emailInput.val())
    }
    else if (editStatus == 'PASSWORD')
    {
        changePassModal.modal('toggle')
    }
    else if (editStatus == 'WATER STATION DETAILS')
    {
        notify('success', 'Water station details has changed successfully.')
        disableWaterStationDetails(true)
        editDetailsBtn.text('Edit Details')
        cancelEditDetailsBtn.hide()
    }
})

// #endregion VERIFY ACCOUNT

// #region CHANGE PASSWORD 

const passwordInp = $('#ws-password')
const confirmPasswordInp = $('#ws-confirm-password')
const showPasswordBtn = $('#show-pass-btn')
const saveChangedPasswordBtn = $('#save-change-pass-btn')
var show = false

saveChangedPasswordBtn.on('click', function() 
{
    notify('success', 'Password is successfully changed.')
    passwordInp.val('')
    confirmPasswordInp.val('')
})

showPasswordBtn.on('click', function () 
{  
    passwordInp.prop('type', show ? 'password' : 'text')
    confirmPasswordInp.prop('type', show ? 'password' : 'text')
    showPasswordBtn.text(show ? 'SHOW' : 'HIDE')

    show = !show
})

// #endregion CHANGE PASSWORD 

// #region WATER STATION DETAILS

const wsImage = $('#water-station-image')
const wsImageInp = $('#ws-image')
const wsName = $('#ws-name')
const wsContactNum = $('#ws-contact-num')
const wsAddress = $('#ws-address')

const cancelEditDetailsBtn = $('#cancel-edit-details-btn')
const editDetailsBtn = $('#edit-details-btn')

const verificationModal = $('#verification-modal')

cancelEditDetailsBtn.hide()

editDetailsBtn.on('click', () => editDetailsFunc())

function editDetailsFunc()
{
    disableWaterStationDetails(false)

    editStatus = 'EDIT WATER STATION DETAILS'
    
    cancelEditDetailsBtn.show()
    editDetailsBtn.text('Save')
    editDetailsBtn.prop('onclick', null).off('click')
    editDetailsBtn.on('click', () => {
        editStatus = 'WATER STATION DETAILS'
        verificationModal.modal('toggle')
    })
}

function disableWaterStationDetails(enable) 
{  
    wsImageInp.prop('disabled', enable)
    wsName.prop('disabled', enable)
    wsContactNum.prop('disabled', enable)
    wsAddress.prop('disabled', enable)
}

wsImageInp.on('change', function (e) 
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

// #endregion WATER STATION DETAILS