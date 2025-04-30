import '../main.js'
import {
    validateEmail,
    validateRequired
} from '../../util/util.js'

var WSACC = []
preLoadAccounts()

const toastContainer = $('#toast-container')
const loadingModal = $('#loading-modal')

const bcrypt = dcodeIO.bcrypt
const signInForm = $('#sign-in-form')

const emailInput = $('#email')
const emailFeedback = $('#email-invalid-fb') 
const passwordInput = $('#password')
const passwordFeedback = $('#password-invalid-fb') 

signInForm.on("submit", function(e) 
{
    // ? Validate each input first and add feedback before final checking of form validation
    const isPasswordValid = validateRequired(passwordInput, passwordFeedback)
    const isEmailValid = validateEmail(emailInput, emailFeedback)

    const areAllInputsValid = isPasswordValid && isEmailValid

    if (areAllInputsValid)
    {
        loadingModal.modal('show')
        loadingModal.one('shown.bs.modal', queryAccount)
    }
    
    e.preventDefault()
})

function preLoadAccounts()
{
    console.log('loading')
    $.ajax({
        url: '../../../../data/client/h2go_clients.xml',
        dataType: 'xml',
        success: (xml) => {

            $(xml).find('water-stations water-station').each(function () {
                const $station = $(this)

                WSACC.push({
                    xml: $station,
                    email: $station.find('account-details email').text(),
                    password: $station.find('account-details password').text(),
                })
            })
            
        },
        error: (xhr, status, error) => {
            console.log(error)
            loadingModal.modal('hide')

            // TODO ADD ERROR PAGE
        }
    })
}

function queryAccount(xml) { 
    const email = emailInput.val()
    const password = passwordInput.val()

    const account = WSACC.find(acc => acc.email === email)

    console.log(account);

    if (!account) 
    {
        notify('danger', 'Account does not exist!')
        loadingModal.modal('hide')
        return
    }
    

    bcrypt.compare(password, account.password, function (err, result) {
        if (err) 
            {
            notify('danger', err)
            return
        }

        if (result) 
        {
            console.log("Password is correct!")
            notify('success', 'Password is correct!')
        } 
        else 
        {
            console.log("Password is incorrect!")
            notify('danger', 'Password is incorrect!')
        }


        loadingModal.modal('hide')
    })

}

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