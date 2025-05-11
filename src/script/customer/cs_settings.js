import '../main.js'

import {
    notify
} from '../../util/helper.js'

import {
    validateRequired,
    validateName,
    validatePhoneNumber,
    validateGender
} from '../../util/validation.js'

const hiddenDataName = $('#hidden-data-for-name')
const hiddenDataGender = $('#hidden-data-for-gender')

//* FORMS 

const formGroups = $('.has-validation')
var personalDetailsInputs = {}
var personalDetailsFeedbacks = {}

// #region RELOAD DATA

$(window).on('load', function ()
{  
    getInputAndFeedbacks()
    initializeInputs()
})

function initializeInputs()
{
    let name = hiddenDataName.val().split(' ')
    personalDetailsInputs.fname.val(name[0])
    personalDetailsInputs.lname.val(name[1])
    personalDetailsInputs.gender.prop('selectedIndex', hiddenDataGender.val() == 'M' ? 1 : 2)
}

function getInputAndFeedbacks()
{
    formGroups.each(function () 
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
}

// #endregion RELOAD DATA