import '../main.js'

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

const prices = $('.product-price')

prices.each((_, e) => $(e).text(toPeso($(e).text())))

// #region ADD TO ORDER

const noOrderFlag = $('#no-order-flag')

const products = $('.product-card')
const orderTable = $('#order-table')
const orderTableBody = orderTable.find('tbody')
const orders = new Map()

products.on('click', (e) => addToOrder(e))

function addToOrder(e) 
{
    noOrderFlag.remove()

    let prod = $(e.currentTarget)
    let productName = prod.data('product')
    let productPrice = parseFloat(prod.data('price'))
    let productStock = prod.data('stock')

    if (orders.has(productName))
    {
        let temp = orders.get(productName)

        if (temp[0] >= productStock) return

        orders.set(productName, [temp[0] + 1, temp[1] + productPrice, productPrice, productStock])
    }
    else 
    {
        orders.set(productName, [1, productPrice, productPrice, productStock])
    }

    updateOrderTable()
}

function updateOrderTable() {
    orderTableBody.empty()
    updateOrderTotal()

    if (orders.size <= 0)
    {
        placeOrderBtn.prop('disabled', true)
        removeAllOrdersBtn.prop('disabled', true)
        orderTable.after(noOrderFlag)
        return
    }

    placeOrderBtn.prop('disabled', false)
    removeAllOrdersBtn.prop('disabled', false)

    orders.forEach((details, name) => {
        let quantity = details[0]
        let price = toPeso(details[1])
        let row = `
            <tr>
                <td>${name}</td>
                <td>${quantity}</td>
                <td>${price}</td>
                <td>
                    <div class='w-100 d-flex justify-content-center'>
                        <div class='btn-group' role='group' aria-label='Basic example'>
                            <button data-product='${name}' type='button' class='btn btn-primary btn-sm decrement-btn'>
                                <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#FFFFFF'><path d='M200-440v-80h560v80H200Z'/></svg>
                            </button>
                            <button data-product='${name}' type='button' class='btn btn-primary btn-sm increment-btn'>
                                <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#FFFFFF'><path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/></svg>
                            </button>
                            <button data-product='${name}' type='button' class='btn btn-primary btn-sm remove-btn' data-bs-toggle='modal' data-bs-target='#remove-item-modal'>
                                <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#FFFFFF'><path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'/></svg>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        `
        orderTableBody.append(row)
    })
}

function updateOrderTotal() 
{
    let total = 0
    orders.forEach(details => total += details[1])

    $('#total-amount').text(toPeso(total)) 
}

// #endregion ADD TO ORDER

// #region SEARCH PRODUCT

const inventoryHolder = $('#inventory-holder')
const searchBar = $('#search-inp')
const clearBtn = $('#search-clear')

searchBar.on('input', search)
clearBtn.on('click', clear)

function reset()
{
    products.each(function () 
    {
        const $textEl = $(this).find('.name-prod')
        const fullText = $textEl.text()
        $textEl.html(fullText)
    })

    inventoryHolder.empty().append(products)
}

function clear()
{
    searchBar.val('')
    reset()
    products.prop('onclick', null).off('click')
    products.on('click', addToOrder)
}

function search()
{
    const query = searchBar.val().trim().toLowerCase()
    let foundAny = false

    inventoryHolder.empty()

    products.toArray().forEach(product => 
    {
        const $product = $(product)
        const $textEl = $product.find('.name-prod')
        const fullText = $textEl.text()

        $textEl.html(fullText)

        if (query && fullText.toLowerCase().includes(query)) 
        {
            const start = fullText.toLowerCase().indexOf(query)
            const end = start + query.length

            const before = fullText.slice(0, start)
            const match = fullText.slice(start, end)
            const after = fullText.slice(end)

            $textEl.html(`${before}<span class='highlight'>${match}</span>${after}`)

            inventoryHolder.append($product)
            foundAny = true
        } 
        else if (!query) 
        {
            inventoryHolder.append($product)
            foundAny = true
        }
    })

    if (!foundAny) 
    {
        inventoryHolder.append(`
            <div class='no-results text-center w-100 py-4 text-muted'>
                No products found
            </div>
        `)
    }
        
    products.on('click', addToOrder)
}

// #endregion SEARCH PRODUCT

// #region ORDER TABLE ACTIONS

var currentOrderItem

const removeAllOrdersBtn = $('#remove-all-orders-btn')
const confirmRemoveAllOrdersBtn = $('#confirm-remove-all-order-btn')

const confirmRemoveBtn = $('#confirm-remove-btn')

orderTableBody.on('click', '.decrement-btn', function() 
{
    let product = $(this).data('product')
    let order = orders.get(product)
    let originalPrice = order[2]
    let stocks = order[3]

    if (order[0] > 1) 
    {
        orders.set(product, [--order[0], order[1] - originalPrice, originalPrice, stocks])
    }

    updateOrderTable()
})

orderTableBody.on('click', '.increment-btn', function() 
{
    let product = $(this).data('product')
    let order = orders.get(product)
    let originalPrice = order[2]
    let stocks = order[3]

    if (order[0] < stocks) 
    {
        orders.set(product, [++order[0], order[1] + originalPrice, originalPrice, stocks])
    }

    updateOrderTable()
})

orderTableBody.on('click', '.remove-btn', function() 
{
    currentOrderItem = $(this).data('product')
    $('#item-remove').text(currentOrderItem)
})

confirmRemoveBtn.on('click', function () 
{  
    if (orders.delete(currentOrderItem)) 
    {
        updateOrderTable()
        notify('success', `<strong>"${currentOrderItem}"</strong> is successfully removed from order.`)
    }
    else 
    {
        notify('danger', `<strong>"${currentOrderItem}"</strong> failed to remove from order.`)
    }

})

confirmRemoveAllOrdersBtn.on('click', function () 
{  
    orders.clear()
    updateOrderTable()
    notify('success', `All order is successfully removed.`)
})

// #endregion ORDER TABLE ACTIONS

// #region PLACE ORDER

const orderSummaryTable = $('#order-summary-table')

const placeOrderBtn = $('#place-order-btn')
const confirmPlaceOrderBtn = $('#confirm-place-order-btn')
const orderSummaryTotalAmount = $('#order-summary-total-amount')

const customerDetailsForm = $('#customer-details-form')

const customerDetailsFirstName = $('#customer-details-fname')
const customerDetailsLastName = $('#customer-details-lname')
const customerDetailsContactNumber = $('#customer-details-contact-num')
const customerDetailsGender = $('#customer-details-gender')
const customerDetailsAddress = $('#customer-details-address')

const customerDetailsFirstNameFeedback = $('#customer-details-fname-invalid-fb')
const customerDetailsLastNameFeedback = $('#customer-details-lname-invalid-fb')
const customerDetailsContactNumberFeedback = $('#customer-details-contact-num-invalid-fb')
const customerDetailsGenderFeedback = $('#customer-details-gender-invalid-fb')
const customerDetailsAddressFeedback = $('#customer-details-address-invalid-fb')

placeOrderBtn.prop('disabled', true)
removeAllOrdersBtn.prop('disabled', true)
placeOrderBtn.on('click', summaryOrder)

function summaryOrder()
{
    orderSummaryTable.empty()

    let index = 1
    let totalAmount = 0
    orders.forEach((details, productName) => {

        totalAmount += details[1]

        let template = `
            <tr>
                <td>${index++}</td>
                <td>${productName}</td>
                <td>${details[0]}</td>
                <td>${toPeso(details[1])}</td>
            </tr>
        `
        orderSummaryTable.append(template)
    })

    orderSummaryTotalAmount.text(toPeso(totalAmount))
}

placeOrderBtn.on('click', function () 
{  
    customerDetailsFirstName.val('')
    customerDetailsLastName.val('')
    customerDetailsContactNumber.val('')
    customerDetailsGender.val('')   
    customerDetailsAddress.val('')

    customerDetailsFirstNameFeedback.text('')
    customerDetailsLastNameFeedback.text('')
    customerDetailsContactNumberFeedback.text('')
    customerDetailsGenderFeedback.text('')
    customerDetailsAddressFeedback.text('')
})

customerDetailsContactNumber.on('input', function() 
{
    let value = $(this).val()
    const cleanedValue = value.replace(/[^0-9]/g, '')
    $(this).val(cleanedValue)
})

confirmPlaceOrderBtn.on('click', () => customerDetailsForm.trigger('submit'))

customerDetailsForm.on('submit', function(e) 
{
    // ? Validate each input first and add feedback before final checking of form validation
    const isFirstNameValid = validateName(customerDetailsFirstName, customerDetailsFirstNameFeedback)
    const isLastNameValid = validateName(customerDetailsLastName, customerDetailsLastNameFeedback)
    const isContactNumberValid = validatePhoneNumber(customerDetailsContactNumber, customerDetailsContactNumberFeedback)
    const isGenderValid = validateGender(customerDetailsGender, customerDetailsGenderFeedback)
    const isAddressValid = validateRequired(customerDetailsAddress, customerDetailsAddressFeedback)

    const areAllInputsValid = isFirstNameValid && isLastNameValid && isContactNumberValid && isGenderValid && isAddressValid

    if (areAllInputsValid)
    {
        orders.clear()
        updateOrderTable()
        notify('success', 'Order is placed successfully.')

        $('#customer-detail-modal').modal('hide')
    }

    e.preventDefault()
})

// #endregion PLACE ORDER

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