import '../main.js'

import {
    validateEmail,
    validateRequired
} from '../../util/validation.js'

import {
    notify
} from '../../util/helper.js'

var WSACC = []
preLoadAccounts()

const loadingModal = $('#loading-modal')

const bcrypt = dcodeIO.bcrypt
const signInForm = $('#sign-in-form')

const emailInput = $('#email')
const emailFeedback = $('#email-invalid-fb') 
const passwordInput = $('#password')
const passwordFeedback = $('#password-invalid-fb') 
const showPassword = $('#show-password')
var show = false

signInForm.on('submit', function(e) 
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
            loadingModal.modal('hide')
            notify('danger', `ERROR OCCURED (${status}): ${error}`)
        }
    })
}

function queryAccount(xml) { 
    const email = emailInput.val()
    const password = passwordInput.val()

    const account = WSACC.find(acc => acc.email === email)

    if (!account) 
    {
        notify('danger', 'Account does not exist!')
        loadingModal.modal('hide')
        return
    }
    
    bcrypt.compare(password, account.password, function (err, result) {

        loadingModal.modal('hide')

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

        notify('success', 'Password is correct!')
        login(account)
    })
}

function login(account)
{
    // $.ajax({
    //     url: '../../../../data/system/water_station/ws_data.xml',
    //     dataType: 'xml',
    //     success: function(xml) {
    //         const auth = $(xml).find('ws-auth')
    //         auth.html(account.xml)

    //         console.log(auth);

    //         window.location = '../pages/ws_p_dashboard.xml'
    //     },
    //     error: function(err) {
    //         console.error('Error loading XML:', err)
    //     }
    // })

    window.location = '../pages/ws_p_dashboard.xml'
}

showPassword.on('click', function () 
{  
    passwordInput.prop('type', show ? 'password' : 'text')
    showPassword.html(
        show 
        ? '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>' 
        : '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>'
    )

    show = !show
})