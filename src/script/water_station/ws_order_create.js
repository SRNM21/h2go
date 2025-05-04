import '../main.js'

// #region ADD TO ORDER

const noOrderFlag = $('#no-order-flag')

const products = $('.product-card')
const orderTable = $('#order-table')
const orderTableBody = orderTable.find('tbody')
const orders = new Map()

products.on('click', (e) => addToOrder(e))

var fixDecimal = (x) => (Math.round(x * 100) / 100).toFixed(2)

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
        let price = fixDecimal(details[1])
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

    $('#total-amount').text(fixDecimal(total)) 
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
const toastContainer = $('#toast-container')

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

function notify(type, content)
{
    let toast = $(`
        <div class="toast toast-${type} align-items-center show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${content}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
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
                <td>${fixDecimal(details[1])}</td>
            </tr>
        `
        orderSummaryTable.append(template)
    })

    orderSummaryTotalAmount.text(fixDecimal(totalAmount))
}

confirmPlaceOrderBtn.on('click', function () 
{  
    orders.clear()
    updateOrderTable()
    notify('success', 'Order is placed successfully.')
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