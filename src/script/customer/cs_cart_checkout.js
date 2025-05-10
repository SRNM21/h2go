import '../main.js'

import {
    Session
} from '../../util/session.js'

import {
    validateRequired,
    validateName,
    validatePhoneNumber,
    validateGender
} from '../../util/validation.js'

import {
    toPeso,
    notify
} from '../../util/helper.js'

// #region LOAD CART

const cart = Session.get('cart')
const summaryTbody = $('#cart-checkout-summary-tbody')

const cartCheckoutTotalItems = $('#cart-checkout-total-items')
const cartCheckoutTotalAmount = $('#cart-checkout-total-amount')

var TOTAL_ITEMS = 0
var TOTAL_AMOUNT = 9

$(window).on('load', function()
{   
    populateSummaryTbody()

    cartCheckoutTotalItems.text(TOTAL_ITEMS)
    cartCheckoutTotalAmount.text(toPeso(TOTAL_AMOUNT))
})

function populateSummaryTbody()
{    
    TOTAL_ITEMS = 0
    TOTAL_AMOUNT = 0

    summaryTbody.empty() 

    Object.entries(cart).forEach(([storeName, products]) => {
        const storeRow = $(`
            <tr class='border-top'>
                <td colSpan='4'>
                    <div class='d-flex align-items-center ms-auto'>
                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z"
                                    fill="#005691"/>
                            </svg>
                        </span>
                        <h6 id='shop-name'>${storeName}</h6>
                    </div>
                </td>
            </tr>
        `)

        summaryTbody.append(storeRow)

        Object.values(products).forEach(product => {

            const total = (product.qty * product.amount)
            const totalText = toPeso(total)

            TOTAL_AMOUNT += total
            TOTAL_ITEMS += product.qty

            const productRow = $(`
                <tr>
                    <td id='product-image-data' class='product-image-data d-flex align-items-center align-middle'>
                        <img src='../../../assets/images/products/${product.image}' alt=''/>
                        <p id='product-name' class='ms-2'>${product.product} (${product.type})</p>
                    </td>
                    <td id='product-amount' class='align-middle text-center'>${toPeso(product.amount)}</td>
                    <td id='product-qty' class='align-middle text-center'>${product.qty}</td>
                    <td id='product-total-amount' class='align-middle text-center'>${totalText}</td>
                </tr>
            `)
            
            summaryTbody.append(productRow)
        })
    })
}

// #endregion LOAD CART 

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
    
    addAddressModalLabel.text('Edit Address')
    confirmAddAddressBtn.text('Save')

    let addressCard = $(this).parent().parent()
    let customerName = addressCard.attr('data-cs-name').split('|')
    CURRENT_EDIT = addressCard

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

    selectAddress()
}

// #endregion EDIT ADDRESS

// #region PLACE ORDER

const placeOrderBtn = $('#place-order-btn')

placeOrderBtn.on('click', () => {
    window.location.href = `../../../views/customer/pages/cs_p_cart.xml?from-order=true`
})

// #region PLACE ORDER