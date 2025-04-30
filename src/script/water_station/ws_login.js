import '../main.js'
import {
    validateEmail,
    validateRequired
} from '../../util/util.js'

const bcrypt = dcodeIO.bcrypt;
const signInForm = $('#sign-in-form')

const emailInput = $('#email')
const emailFeedback = $('#email-invalid-fb') 
const passwordInput = $('#password')
const passwordFeedback = $('#password-invalid-fb') 

const hashedPassword = '$2b$12$34HTmGupF7PNHHnhFzK15u08Hm86a.hXUONyyhyQVDjVjAVpyhcci';
const plainPassword = "password";

bcrypt.compare(plainPassword, hashedPassword, function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    if (result) {
        console.log("Password is correct!");
    } else {
        console.log("Password is incorrect!");
    }
});

signInForm.on("submit", function() 
{
    // ? Validate each input first and add feedback before final checking of form validation
    const isPasswordValid = validateRequired(passwordInput, passwordFeedback);
    const isEmailValid = validateEmail(emailInput, emailFeedback);

    const areAllInputsValid = isPasswordValid && isEmailValid

    if (areAllInputsValid)
    {
        console.log('LOGIN');
        

    }

})

function attemptLogin()
{
    let curr = $(e.currentTarget)
    
    let messageID = curr.data('message-id')
    let customerName = curr.data('customer-name')
    let img = curr.find('.contact-profile').attr('src')

    $.ajax({
        url: '../../../../data/client/h2go_clients.xml',
        dataType: 'xml',
        success: function(xml)
        {
            xmlData = $(xml)
            loadContactMessages(messageID, customerName, img)
        },
        error: function(xhr, status, error) 
        {
            let errorPage = $(`
                <div class="card error-page">
                    <div class="card-body">
                        <h5 class="card-title">Error Occured:</h5>
                        <p class="card-text">Invalid order details (${error} | ${status}).</p>
                    </div>
                </div>
            `)

            $('main').append(errorPage)
        }
    })
}