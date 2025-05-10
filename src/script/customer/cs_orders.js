import '../main.js'

import {
    toPeso,
} from '../../util/helper.js'

import { 
    Session 
} from '../../util/session.js'

// #region LOAD ORDER DETAILS

const storeCards = $('.store-card')
const orderCards = $('.order-item')

$(window).on('load', function () 
{  
    refinePrice()
    summarizeTotal()
})

function refinePrice()
{
    orderCards.each((_, e) => {
        let order = $(e)
        let orderAmount = order.find('.order-product-price')
        let orderTotal = order.find('.order-product-total')

        let amount = order.data('initial-amount')
        let qty = order.data('initial-qty')
        let total = parseFloat(amount) * parseInt(qty)

        orderAmount.text(toPeso(amount))
        orderTotal.text(`Total: ${toPeso(total)}`)
    })
}

function summarizeTotal()
{
    storeCards.each((_, e) => {
        let store = $(e)
        let totalDetails = store.find('.total-details')
        let products = store.find('.order-item')
        let totalItems = 0
        let totalAmount = 0

        products.each((_, e) => {
            let product = $(e)

            let amount = product.data('initial-amount')
            let qty = product.data('initial-qty')
            let total = parseFloat(amount) * parseInt(qty)

            totalItems += qty
            totalAmount += total
        })

        totalDetails.find('.total-order-items').text(`${totalItems} ${totalItems > 1 ? 'items' : 'item'}`)
        totalDetails.find('.total-order-amount').text(toPeso(totalAmount))
    })
}

// #region LOAD ORDER DETAILS

// #region FILTERS

const statusFilter = $('#status-filter')
const statusFilterItems = $('.status-filter-item')

statusFilterItems.on('click', function() 
{
    statusFilter.text($(this).text())
})

// #endregion FILTERS

// #region ORDER DETAILS ACTION

storeCards.on('click', function () 
{  
    let store = $(this)
    let storeName = store.data('water-station')
    let status = store.find('.status').text()
    let orderID = store.data('order-id')
    let products = store.find('.order-item')
    
    let packedOrder = {}
    let packedOrderItems = {}

    packedOrder['order-id'] = orderID
    packedOrder['store-name'] = storeName
    packedOrder['status'] = status

    products.each((_, e) => {
        
        let currItem = $(e)

        packedOrderItems[_] = {
            waterStationID: currItem.data('origin'),
            name: currItem.data('product'),
            type: currItem.data('type'),
            image: currItem.data('image'),
            qty: parseInt(currItem.data('initial-qty')),
            amount: parseFloat(currItem.data('initial-amount')),
        }
    })
    
    packedOrder['orders'] = packedOrderItems

    Session.set('cs-order', packedOrder)    
    window.location.href = `../../../views/customer/pages/cs_p_order_details.xml`
})

// #endregion ORDER DETAILS ACTIOND

