import '../main.js'

import {
    toPeso
} from '../../util/helper.js'

// #region LOAD ORDER DETAILS

const params = new URLSearchParams(window.location.search)
const waterStationID = params.get('water-station-id')  
const orderID = params.get('order-id')  

var xmlData

const orderDetailsStatusContainer = $('#status-container')

const orderDetailsTableBody = $('#order-detail-table-body')
const orderDetailsTotalAmount = $('#order-details-total-amount')

const orderDetailsCustomerName = $('#od-cs-name')
const orderDetailsCustomerGender = $('#od-cs-gender')
const orderDetailsCustomerGenderIcon = $('#od-cs-gender-icon')
const orderDetailsCustomerContactNum = $('#od-cs-contact-num')
const orderDetailsCustomerOrderMode = $('#od-cs-order-mode')
const orderDetailsCustomerAddress = $('#od-cs-address')
const orderDetailsUniqueItems = $('#od-cs-unique-items')
const orderDetailsTotalItems = $('#od-cs-total-items')
const orderDetailsOrderDate = $('#od-cs-order-date')
const orderDetailsMOD = $('#od-cs-mod')

const statusChangeModalTitle = $('#status-change-modal-label')
const statusChangeModalContent = $('#status-change-modal-content')
const statusChangeModalBtn = $('#confirm-status-change-btn')

$(window).on('load', function () 
{  
    $('#order-id').text(orderID)

    $.ajax({
        url: '../../../../data/client/h2go_clients.xml',
        dataType: 'xml',
        success: function(xml)
        {
            xmlData = $(xml)
            loadOrders()
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
})

function loadOrders()
{
    const waterStation = xmlData.find(`water-station[id='${waterStationID}']`)
    const orderDetails = waterStation.find(`orders order[id='${orderID}']`)

    if (!orderDetails || orderDetails.length <= 0) 
    {
        orderDetailsTableBody.html('<tr><td colspan="3">No order details found for this ID.</td></tr>')
        return
    }

    const orderedProducts = orderDetails.find('ordered-products ordered-product')
    orderDetailsTotalAmount.text(toPeso(orderDetails.find('order-total').text()))

    let index = 1
    let totalItems = 0
    orderedProducts.each(function() 
    {
        const orderedProductId = $(this).find('ordered-product-id').text()
        const quantity = $(this).find('quantity').text()
        const price = $(this).find('price').text()
        const amount = price * quantity
        totalItems += Number(quantity)

        const product = waterStation.find(`inventory product[id="${orderedProductId}"]`)
        const productName = product.find('name').text()

        let html = `
            <tr>
                <td class="fw-semibold">${index++}</td>
                <td>${productName}</td>
                <td>${quantity}</td>
                <td>${toPeso(amount)}</td>
            </tr>
        `
        orderDetailsTableBody.append(html) 
    })

    //* Details

    const customerID = orderDetails.find('customer-id').text()
    const customer = xmlData.find(`customer[id='${customerID}']`)
    const customerDetails = customer.find('personal-details')

    const femaleIcon = $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M440-120v-80h-80v-80h80v-84q-79-14-129.5-75.5T260-582q0-91 64.5-154.5T480-800q91 0 155.5 63.5T700-582q0 81-50.5 142.5T520-364v84h80v80h-80v80h-80Zm40-320q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Z"/></svg>')
    const maleIcon = $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M800-800v240h-80v-103L561-505q19 28 29 59.5t10 65.5q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q33 0 65 9.5t59 29.5l159-159H560v-80h240ZM380-520q-58 0-99 41t-41 99q0 58 41 99t99 41q58 0 99-41t41-99q0-58-41-99t-99-41Z"/></svg>')

    const gender = customerDetails.find('gender').text()
    const date = new Date(orderDetails.find('time-ordered').text())
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }

    orderDetailsCustomerName.html(customerDetails.find('name'))
    orderDetailsCustomerGender.html(gender == 'M' ? 'Male' : 'Female')
    orderDetailsCustomerGenderIcon.html(gender == 'M' ? maleIcon : femaleIcon)
    orderDetailsCustomerContactNum.html(customerDetails.find('contact-number'))
    orderDetailsCustomerOrderMode.html(orderDetails.find('order-type'))
    orderDetailsCustomerAddress.html(customerDetails.find('address'))

    orderDetailsUniqueItems.html(`${--index} Unique Items`)
    orderDetailsTotalItems.html(`${totalItems} Total Items`)
    orderDetailsOrderDate.html(date.toLocaleDateString('en-US', options))
    orderDetailsMOD.html(orderDetails.find('mode-of-payment')) 

    //* STATUS
    const status = orderDetails.find('status').text()
    let currentStatus

    switch (status) {
        case 'Pending':
            currentStatus = pendingTemplate
            break
        case 'In Progress':
            currentStatus = inProgressDropdown
            break
        case 'Out for Delivery':
            currentStatus = outForDeliveryDropdown
            break
        case 'Completed':
            currentStatus = completedBadge
            break
        case 'Declined':
            currentStatus = declinedBadge
            break

        default:break
    }

    orderDetailsStatusContainer.html(currentStatus)
}

// #endregion LOAD ORDER DETAILS

// #region STATUS BUTTON ACTIONS

const pendingTemplate = $(`
    <button data-status-type='decline' type='button' class='btn btn-sm btn-danger status-change-btn' data-bs-toggle='modal' data-bs-target='#status-change-modal'>Decline</button>
    <button data-status-type='accept' type='button' class='btn btn-sm btn-success status-change-btn ms-2' data-bs-toggle='modal' data-bs-target='#status-change-modal'>Accept</button>
`)

const declinedBadge = $(`
    <h6><span class="badge status-declined p-2">Declined</span></h6>
`)

const inProgressDropdown = $(`
    <div class="dropdown ms-3">
        <button id='mod-type-parent' class="btn status-in-progress dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">In Progress</button>
        <ul class="dropdown-menu">
            <li>
                <button data-status-type='out for delivery' class="dropdown-item d-flex mod-type status-change-btn" type="button" data-bs-toggle='modal' data-bs-target='#status-change-modal'>
                    <p>Out for Delivery</p>
                </button>
            </li>
        </ul>
    </div>
`)

const outForDeliveryDropdown = $(`
    <div class="dropdown ms-3">
        <button id='mod-type-parent' class="btn status-out-for-delivery dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">Out for Delivery</button>
        <ul class="dropdown-menu">
            <li>
                <button data-status-type='completed' class="dropdown-item d-flex mod-type status-change-btn" type="button" data-bs-toggle='modal' data-bs-target='#status-change-modal'>
                    <p>Completed</p>
                </button>
            </li>
        </ul>
    </div>
`)

const completedBadge = $(`
    <h6><span class="badge status-completed p-2">Completed</span></h6>
`)

orderDetailsStatusContainer.on('click', '.status-change-btn', function() 
{
    const statusType = $(this).data('status-type')

    if (statusType == 'accept')
    {
        statusChangeModalTitle.text('Accept Order?')
        statusChangeModalContent.text('Do you want to accept this order?')
        statusChangeModalBtn.removeClass()
        statusChangeModalBtn.addClass('primary-modal-btn btn btn-success')
        statusChangeModalBtn.text('Accept')
        statusChangeModalBtn.on('click', function () 
        {  
            orderDetailsStatusContainer.empty()
            orderDetailsStatusContainer.append(inProgressDropdown)
        })
    } 
    else if (statusType == 'decline')
    {
        statusChangeModalTitle.text('Decline Order?')
        statusChangeModalContent.text('Are you sure you want to decline this order?')
        statusChangeModalBtn.removeClass()
        statusChangeModalBtn.addClass('primary-modal-btn btn btn-danger')
        statusChangeModalBtn.text('Decline')
        statusChangeModalBtn.on('click', function () 
        {  
            orderDetailsStatusContainer.empty()
            orderDetailsStatusContainer.append(declinedBadge)
        })
    }
    else if (statusType == 'out for delivery')
    {
        statusChangeModalTitle.text('Mark order as Out for Delivery?')
        statusChangeModalContent.html('Are you sure you want to mark this order as <strong>Out for Delivery</strong>?')
        statusChangeModalBtn.removeClass()
        statusChangeModalBtn.addClass('primary-modal-btn btn btn-primary')
        statusChangeModalBtn.text('Confirm')
        statusChangeModalBtn.on('click', function () 
        {  
            orderDetailsStatusContainer.empty()
            orderDetailsStatusContainer.append(outForDeliveryDropdown)
        })
    }
    else if (statusType == 'completed')
    {
        statusChangeModalTitle.text('Mark order as Completed?')
        statusChangeModalContent.html('Are you sure you want to mark this order as <strong>Completed</strong>?')
        statusChangeModalBtn.removeClass()
        statusChangeModalBtn.addClass('primary-modal-btn btn btn-primary')
        statusChangeModalBtn.text('Confirm')
        statusChangeModalBtn.on('click', function () 
        {  
            orderDetailsStatusContainer.empty()
            orderDetailsStatusContainer.append(completedBadge)
        })
    }
})

// #endregion STATUS BUTTON ACTIONS