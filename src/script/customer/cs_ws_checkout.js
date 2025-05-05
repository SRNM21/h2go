import '../main.js'
import {
    validateRequired,
    validateName,
    validatePhoneNumber,
    validateGender
} from '../../util/validation.js'

// #region LOAD ORDER

var waterStationData
var checkedOutProduct

const params = new URLSearchParams(window.location.search)
const waterStationID = params.get('ws-id')  
const productID = params.get('product-id')  
const productQuantity = params.get('qty')  

const currentWaterStation = $('#current-water-station')

const shopName = $('#shop-name')
const productImage = $('#product-image-data img')
const productName = $('#product-name')
const productAmount = $('#product-amount')
const productQty = $('#product-qty')
const productTotalAmount = $('#product-total-amount')

$(window).on('load', function()
{   
    $.ajax({
        url: '../../../../data/client/h2go_clients.xml',
        dataType: 'xml',
        success: (xml) => {
            waterStationData = $(xml).find(`water-station[id='${waterStationID}']`)
            checkedOutProduct = waterStationData.find(`product[id='${productID}']`)
            loadDetails()
        },
        error: (xhr, status, error) => {
            let errorPage = $(`
                <div class="card error-page">
                    <div class="card-body">
                        <h5 class="card-title">Error Occured:</h5>
                        <p class="card-text">Invalid water station details (${error} | ${status}).</p>
                    </div>
                </div>
            `)

            $('main').append(errorPage)
        }
    })   
})

function loadDetails() 
{
    let waterStationName = waterStationData.find('water-station-details name').text()
    currentWaterStation.text(waterStationName)
    currentWaterStation.attr('href', `../../../views/customer/pages/cs_p_water_station_details.xml?ws-id=${waterStationID}&ws-name=${waterStationName}`)
    
    shopName.text(waterStationName)

    loadProduct()
}

function loadProduct()
{
    let productDataName = checkedOutProduct.find('name').text()
    let productDataImage = `../../../assets/images/products/${checkedOutProduct.find('image').text()}`
    let productDataPrice = checkedOutProduct.find('price').text()
    let productDataAmount = `PHP ${(Math.round(productDataPrice * 100) / 100).toFixed(2)}`
    let totalAmount = parseFloat(productDataPrice) * parseInt(productQuantity)
    let totalAmountFormat = `PHP ${(Math.round(totalAmount * 100) / 100).toFixed(2)}`

    productName.text(productDataName)
    productImage.attr('src', productDataImage)
    productAmount.text(productDataAmount)
    productQty.text(productQuantity)
    productTotalAmount.text(totalAmountFormat)
}

// #endregion LOAD ORDER

// #region MOD

const modImgIndicator = $('#mod-indicator')
const modTypeParent = $('#mod-type-parent')
const modType = $('.mod-type')

modType.on('click', function () 
{
    let mod = $(this).find('p').text()
    let imgLink = $(this).data('mod')

    modImgIndicator.attr('src', `../../../assets/images/mode_of_payment/${imgLink}`)
    modTypeParent.text(mod)
})

// #endregion MOD

// #region PLACE ORDER

const placeOrderBtn = $('#place-order-btn')

placeOrderBtn.on('click', () => {
    let waterStationName = waterStationData.find('water-station-details name').text()
    window.location.href = `../../../views/customer/pages/cs_p_water_station_details.xml?from-order=true&ws-id=${waterStationID}&ws-name=${waterStationName}`
})

// #region PLACE ORDER

// #region SELECT ADDRESS

const addressList = $('#address-modal-content')

const confirmSelectAddressBtn = $('#confirm-select-address-btn')

const shippingCustomerName = $('#shipping-customer-name')
const shippingCustomerContactNumber = $('#shipping-customer-contact-number')
const shippingCustomerAddress = $('#shipping-customer-address')

addressList.on('click', '.address-card', function()
{
    $('.address-card').each((_, e) => $(e).removeClass('selected-address'))

    $(this).addClass('selected-address')
})

confirmSelectAddressBtn.on('click', () => selectAddress())

function selectAddress()
{
    let selectedAddress = $('.selected-address')

    let shippingCustomerNameData = selectedAddress.find('.new-sp-cs-name-highlight').text()
    let shippingCustomerContactNumberData = selectedAddress.find('.new-sp-cs-contact-num').text()
    let shippingCustomerAddressData = selectedAddress.find('.new-sp-cs-address').text()

    shippingCustomerName.text(shippingCustomerNameData)
    shippingCustomerContactNumber.text(`(${shippingCustomerContactNumberData})`)
    shippingCustomerAddress.text(shippingCustomerAddressData)
    
    notify('success', 'Shipping Address is successfully changed.')
}

const toastContainer = $('#toast-container')

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

// #endregion SELECT ADDRESS

// #region ADD ADDRESS

var TYPE

const addAddressModal = $('#add-address-modal')
const addAddressModalLabel = $('#add-address-modal-label')

const addAddressBtn = $('#add-address-btn')
const addAddressForm = $('#add-address-form')
const confirmAddAddressBtn = $('#confirm-add-address-btn')

const newShippingFirstName = $('#new-shipping-fname')
const newShippingLastName = $('#new-shipping-lname')
const newShippingContactNumber = $('#new-shipping-contact-num')
const newShippingGender = $('#new-shipping-gender')
const newShippingAddress = $('#new-shipping-address')

const newShippingFirstNameFeedback = $('#new-shipping-fname-invalid-fb')
const newShippingLastNameFeedback = $('#new-shipping-lname-invalid-fb')
const newShippingContactNumberFeedback = $('#new-shipping-contact-num-invalid-fb')
const newShippingGenderFeedback = $('#new-shipping-gender-invalid-fb')
const newShippingAddressFeedback = $('#new-shipping-address-invalid-fb')

addAddressBtn.on('click', function () 
{  
    TYPE = 'ADD'

    console.log(TYPE);

    addAddressModalLabel.text('New Address')
    confirmAddAddressBtn.text('Add')

    newShippingFirstName.val('')
    newShippingLastName.val('')
    newShippingContactNumber.val('')
    newShippingGender.val('')   
    newShippingAddress.val('')

    newShippingFirstNameFeedback.text('')
    newShippingLastNameFeedback.text('')
    newShippingContactNumberFeedback.text('')
    newShippingGenderFeedback.text('')
    newShippingAddressFeedback.text('')
})

newShippingContactNumber.on('input', function() 
{
    let value = $(this).val()
    const cleanedValue = value.replace(/[^0-9]/g, '')
    $(this).val(cleanedValue)
})

confirmAddAddressBtn.on('click', () => addAddressForm.trigger('submit'))

addAddressForm.on('submit', function(e) 
{
    // ? Validate each input first and add feedback before final checking of form validation
    const isFirstNameValid = validateName(newShippingFirstName, newShippingFirstNameFeedback)
    const isLastNameValid = validateName(newShippingLastName, newShippingLastNameFeedback)
    const isContactNumberValid = validatePhoneNumber(newShippingContactNumber, newShippingContactNumberFeedback)
    const isGenderValid = validateGender(newShippingGender, newShippingGenderFeedback)
    const isAddressValid = validateRequired(newShippingAddress, newShippingAddressFeedback)

    const areAllInputsValid = isFirstNameValid && isLastNameValid && isContactNumberValid && isGenderValid && isAddressValid

    if (areAllInputsValid)
    {
        if (TYPE == 'ADD')
        {
            pushAddress()
            notify('success', 'New Address is successfully added.')
        }
        else if (TYPE == 'EDIT')
        {
            saveEditChanges()
            notify('success', 'Address is successfully edited.')
        }

        addAddressModal.modal('hide')
    }

    e.preventDefault()
})

function pushAddress()
{
    let customerName = `${newShippingFirstName.val()} ${newShippingLastName.val()}`
    let customerNameData = `${newShippingFirstName.val()}|${newShippingLastName.val()}`
    let gender = newShippingGender.val()
    let contactNumber = newShippingContactNumber.val()
    let address = newShippingAddress.val()

    let template = `
        <div class='d-flex flex-column p-3 mb-3 border rounded user-select-none address-card'
            data-cs-name='${customerNameData}'
            data-gender='${gender}'
            data-contact-num='${contactNumber}'
            data-address='${address}'
        >
            <div class='d-flex align-items-center'>
                <strong class='fw-medium mb-2 new-sp-cs-name-highlight'>
                    ${customerName}
                </strong>
                <button type='button' class='btn btn-sm ms-auto edit-address-btn' data-bs-toggle='modal' data-bs-target='#add-address-modal'>Edit</button>
            </div>
            <p class='new-sp-cs-contact-num'>${contactNumber}</p>
            <p class='new-sp-cs-address'>${address}</p>
        </div> 
    `

    addressList.append(template)
}

// #endregion ADD ADDRESS

// #region EDIT ADDRESS

var CURRENT_EDIT

addressList.on('click', '.address-card .edit-address-btn', function()
{
    TYPE = 'EDIT'

    console.log(TYPE);
    
    
    addAddressModalLabel.text('Edit Address')
    confirmAddAddressBtn.text('Save')

    let addressCard = $(this).parent().parent()
    let customerName = addressCard.attr('data-cs-name').split('|')
    CURRENT_EDIT = addressCard

    console.log('edit click', {
        csName: addressCard.attr('data-cs-name'),
        gender: addressCard.attr('data-gender'),
        contactNum: addressCard.attr('data-contact-num'),
        address: addressCard.attr('data-address')
    });

    newShippingFirstName.val(customerName[0])
    newShippingLastName.val(customerName[1])
    newShippingContactNumber.val(addressCard.attr('data-contact-num'))
    newShippingGender.prop('selectedIndex', addressCard.attr('data-gender') == 'M' ? 1 : 2)
    newShippingAddress.val(addressCard.attr('data-address'))

    newShippingFirstNameFeedback.text('')
    newShippingLastNameFeedback.text('')
    newShippingContactNumberFeedback.text('')
    newShippingGenderFeedback.text('')
    newShippingAddressFeedback.text('')
})

function saveEditChanges()
{
    let addressCard = CURRENT_EDIT
    let cardName = addressCard.find('.new-sp-cs-name-highlight')
    let cardContactNum = addressCard.find('.new-sp-cs-contact-num')
    let cardAddress = addressCard.find('.new-sp-cs-address')

    let newName = `${newShippingFirstName.val()} ${newShippingLastName.val()}`

    cardName.text(newName)
    cardContactNum.text(newShippingContactNumber.val())
    cardAddress.text(newShippingAddress.val())
    
    addressCard.attr('data-cs-name', `${newShippingFirstName.val()}|${newShippingLastName.val()}`)
    addressCard.attr('data-gender', `${newShippingGender.val()}`)
    addressCard.attr('data-contact-num', `${newShippingContactNumber.val()}`)
    addressCard.attr('data-address', `${newShippingAddress.val()}`)

    console.log('after edit', {
        csName: addressCard.attr('data-cs-name'),
        gender: addressCard.attr('data-gender'),
        contactNum: addressCard.attr('data-contact-num'),
        address: addressCard.attr('data-address')
    })

    selectAddress()
}

// #endregion EDIT ADDRESS