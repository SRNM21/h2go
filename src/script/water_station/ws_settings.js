import '../main.js'

var editStatus

// #region ACCOUNT DETAILS

const editEmailBtn = $('#edit-email-btn')
const editEmailUtilContainer = $('#edit-email-util-container')
const editEmailBtnWrapper = $('#edit-email-btn-wrapper')
const changePassBtn = $('#change-pass-btn')

const emailInput = $('#email')

const saveEmailEditBtn = $('#save-edit-email-btn')
const discardEmailChangesBtn = $('#confirm-discard-email-btn')

editEmailBtnWrapper.empty()
editEmailBtnWrapper.append(editEmailBtn)

editEmailBtnWrapper.on('click', '#edit-email-btn', function () 
{  
    editEmailBtnWrapper.empty()
    editEmailBtnWrapper.append(editEmailUtilContainer)

    emailInput.prop('disabled', false)
})

discardEmailChangesBtn.on('click', () => resetEmailUtilBtns(emailInput.data('initial')))

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
const toastContainer = $('#toast-container')
const emailData = $('#verify-email-data')

const changePassModal = $('#change-pass-modal')

verifyBtn.on('click', function () 
{  
    console.log(editStatus)
    
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
    }
})

function notify(type, content)
{
    let toast = $(`
        <div class='toast toast-${type} align-items-center show' role='alert' aria-live='assertive' aria-atomic='true'>
            <div class='d-flex'>
                <div class='toast-body'>
                    ${content}
                </div>
                <button type='button' class='btn-close me-2 m-auto' data-bs-dismiss='toast' aria-label='Close'></button>
            </div>
        </div>    
    `)

    toastContainer.append(toast)

    setTimeout(function() {
        toast.fadeOut('slow', function() {
            $(this).remove()
        })
    }, 5000)
}

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

const editDetailsBtn = $('#edit-details-btn')

const verificationModal = $('#verification-modal')

editDetailsBtn.on('click', function () 
{  
    disableWaterStationDetails(false)

    editDetailsBtn.text('Save')
    editDetailsBtn.on('click', () => {
        editStatus = 'WATER STATION DETAILS'
        verificationModal.modal('toggle')
    })
})

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