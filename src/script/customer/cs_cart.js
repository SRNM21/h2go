import '../main.js'

import {
    toPeso,
    notify
} from '../../util/helper.js'

import {
    Session
} from '../../util/session.js'

const params = new URLSearchParams(window.location.search)
const fromOrder = params.get('from-order')  

const selectAllChecker = $('#select-all-checkbox')

const cartProductsHolder = $('.cart-product-holder')
const cartStores = $('.store-card')
var cartProducts = $('.cart-item')

const removeBtns = $('.remove-btn')

const cartUniqueItems = $('#cart-unique-items')
const cartTotalItems = $('#cart-total-items')
const cartTotalStores = $('#cart-total-stores')

const cartTotalAmount = $('#total-amount')

// region LOAD DETAILS

$(window).on('load', function()
{
    loadCartDetails()
    loadQtyOptions()

    cartProductsHolder.on('change', '.cart-checker', function () 
    {  
        const checkbox = $(this)
        const parent = checkbox.parent()

        if (checkbox.is(':checked')) 
        {
            parent.addClass('in-cart')
        } 
        else 
        {
            parent.removeClass('in-cart')
        }

        updateCartDetails()
    })

    if (fromOrder == 'true') 
    {
        removeOrderedCartItems()
        notify('success', 'Order is placed successfully.')
    }
})

function removeOrderedCartItems()
{
    const ordered = Session.get('cart')

    Object.values(ordered).forEach(products => {
        Object.values(products).forEach(product => {
            cartProducts
                .filter((_, e) => {
                    const el = $(e)
                    return (
                        el.data('origin') === product.waterStationID &&
                        el.data('product') === product.productID
                    )
                })
                .remove()
        })
    })

    cartProducts = $('.cart-item')
    updateCartDetails()
    updateCartStoreDisplay()
}

function loadCartDetails()
{
    cartProducts.each(function(_, e) 
    {
        let productCard = $(e)

        let productAmount = parseFloat(productCard.data('initial-amount'))
        productCard.find('.cart-item-amount').text(toPeso(productAmount))
    })
}

// endregion LOAD DETAILS

// region QUANTITY CONTROLLER

function loadQtyOptions()
{
    cartProducts.each(function(_, e) 
    {
        let productCard = $(e)

        let productStock = parseInt(productCard.data('stock'))

        let decrementBtn = productCard.find('.product-decrement-btn')
        let incrementBtn = productCard.find('.product-increment-btn')
        let qtyInput = productCard.find('.product-qty-inp')
        
        decrementBtn.on('click', function () 
        {  
            let val = parseInt(qtyInput.val())
            if (val > 1) qtyInput.val(--val)

            updateCartDetails()
        })

        incrementBtn.on('click', function () 
        {  
            let val = parseInt(qtyInput.val())
            if (val < productStock) qtyInput.val(++val)

            updateCartDetails()
        })

        qtyInput.on('input', function() 
        {
            let value = $(this).val()
            let cleanedValue = value.replace(/[^0-9]/g, '')
            $(this).val(cleanedValue)

            let stock = parseInt(cleanedValue)

            if (cleanedValue === '') 
            {
                $(this).val(1) 
            } 
            else if (stock < 1) 
            {
                $(this).val(1)
            } 
            else if (stock > productStock) 
            {
                $(this).val(productStock)
            }

            updateCartDetails()
        })
    })
}

// endregion QUANTITY CONTROLLER

// region STORE CONTROLLER 

cartStores.on('change', '.store-checker', function () 
{  
    let checkbox = $(this)
    let store = checkbox.closest('.store-card')
    let products = store.find('.cart-checker')

    let isChecked = checkbox.is(':checked')

    products.prop('checked', isChecked).trigger('change')
})

// endregion STORE CONTROLLER 

// region SELECT ALL 

selectAllChecker.on('change', function () 
{  
    let checkbox = $(this)
    let container = checkbox.closest('.cart-section')
    let stores = container.find('.store-checker')

    let isChecked = checkbox.is(':checked')

    stores.prop('checked', isChecked).trigger('change')
})

// endregion SELECT ALL 

// region REMOVE ITEM

const itemToRemove = $('#item-to-delete')
const confirmRemoveBtn = $('#confirm-remove-btn')
var pendingRemove

removeBtns.on('click', function () 
{  
    let product = $(this).closest('.cart-item')
    pendingRemove = product

    let productName = product.data('product-name')
    let productQty = product.find('.product-qty-inp').val()

    itemToRemove.text(`${productName} (x${productQty})`)
})

confirmRemoveBtn.on('click', function () 
{  
    pendingRemove.fadeOut('fast', function () 
    {
        $(this).remove()

        cartProducts = $('.cart-item')
        updateCartDetails() 
        updateCartStoreDisplay()
    })
   
    notify('success', 'Item removed successfully.')
})

// endregion REMOVE ITEM

// region OBSERVER 

var UNIQUE_ITEMS = 0
var TOTAL_ITEMS = 0
var TOTAL_STORES = new Map()
var TOTAL_AMOUNT = 0
var HAS_IN_CART = false

function updateCartDetails()
{
    UNIQUE_ITEMS = 0
    TOTAL_ITEMS = 0
    TOTAL_STORES = new Map()
    TOTAL_AMOUNT = 0
    HAS_IN_CART = false

    cartProducts.each(function(_, product) 
    {
        if ($(product).hasClass('in-cart'))
        {
            updateCartTotalItems(product)
            updateCartUniqueItems()
            updateCartTotalStores(product)
            updateTotalAmount(product)

            HAS_IN_CART = true
        }
    })

    cartUniqueItems.text(UNIQUE_ITEMS)
    cartTotalItems.text(TOTAL_ITEMS)
    cartTotalStores.text(TOTAL_STORES.size)
    cartTotalAmount.text(toPeso(TOTAL_AMOUNT))

    checkOutBtn.prop('disabled', !HAS_IN_CART)
}

function updateCartTotalItems(product)
{
    let qtyInput = $(product).find('.product-qty-inp')
    let qty = parseInt(qtyInput.val())
    
    TOTAL_ITEMS += qty
}

function updateCartUniqueItems()
{
    UNIQUE_ITEMS += 1
}

function updateCartTotalStores(product)
{
    let store = $(product).data('origin')
    TOTAL_STORES.set(store, 1)
}

function updateTotalAmount(product)
{
    let cartProduct = $(product)

    let amount = parseFloat(cartProduct.data('initial-amount'))
    let qtyInput = cartProduct.find('.product-qty-inp')
    let qty = parseInt(qtyInput.val())

    TOTAL_AMOUNT += (amount * qty)
}

function updateCartStoreDisplay()
{
    cartStores.each(function (_, store) 
    {  
        let storeCard = $(store)
        let content = storeCard.find('.card-body')

        if (content.children().length <= 0) storeCard.remove()
    })
}

// endregion OBSERVER 

// region CHECKOUT

const checkOutBtn = $('#cart-checkout-btn')

checkOutBtn.on('click', function () 
{  
    let packedStores = {}

    cartStores.each(function(_,e) 
    {
        let store = $(e)
        let products = store.find('.cart-item').filter('.in-cart')
        let packedProducts = {}

        if (products.length > 0)
        {
            products.each(function(_, e)
            {
                let currItem = $(e)

                packedProducts[_] = {
                    waterStationID: currItem.data('origin'),
                    waterStation: currItem.data('water-station-name'),
                    productID: currItem.data('product'),
                    product: currItem.data('product-name'),
                    type: currItem.data('type'),
                    image: currItem.data('product-image'),
                    qty: parseInt(currItem.find('.product-qty-inp').val()),
                    amount: parseFloat(currItem.data('initial-amount')),
                }
            })

            packedStores[store.find('.water-station-name').text()] = packedProducts
        }
    })
    
    Session.set('cart', packedStores)

    window.location.href = '../../customer/pages/cs_p_cart_checkout.xml'
})

// endregion CHECKOUT

