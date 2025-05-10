import '../main.js'

import {
    toPeso,
    notify
} from '../../util/helper.js'

import { 
    Session     
} from '../../util/session.js';

const orderID = $('#order-id')
const order = Session.get('cs-order')
const shopName = $('#shop-name')
const status = $('#status')

const orderList = $('#orders-list')

const orderUniqueItems = $('#order-unique-items')
const orderTotalItems = $('#order-total-items')
const orderTotalAmount = $('#total-amount')

const fullStar = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" fill="#005691"/></svg>'
const hollowStar = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="m263-161.54 57.31-246.77-191.46-165.92 252.61-21.92L480-828.84l98.54 232.69 252.61 21.92-191.46 165.92L697-161.54 480-292.46 263-161.54Z"/></svg>'
const remove = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M288.08-220v-60h287.07q62.62 0 107.77-41.35 45.16-41.34 45.16-102.11 0-60.77-45.16-101.93-45.15-41.15-107.77-41.15H294.31l111.3 111.31-42.15 42.15L180-596.54 363.46-780l42.15 42.15-111.3 111.31h280.84q87.77 0 150.35 58.58t62.58 144.5q0 85.92-62.58 144.69Q662.92-220 575.15-220H288.08Z"/></svg>'

const orderDetailsSection = $('#order-details-section')
const satisfactionReviewSection = $(`
    <div id='satisfaction-review-section' class='card p-3 d-flex flex-column'>
        <div class='d-flex'>
            <h6>Based on this order experience, how satisfied are you on this water station?</h6>
            <span id='close-satisfaction-review-btn' class='close-satisfaction-review-btn ms-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z"/></svg>
            </span>
        </div>
        <div class='satisfaction-review-holder d-flex align-items-center justify-content-center mt-3'>
            <span class='satisfaction-review-icons'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M480-272.31q62.61 0 114.46-35.04 51.85-35.04 76.46-92.65H289.08q24.61 57.61 76.46 92.65 51.85 35.04 114.46 35.04ZM312-528.46l44-42.77 42.77 42.77L432.31-562 356-639.54 278.46-562 312-528.46Zm249.23 0L604-571.23l44 42.77L681.54-562 604-639.54 527.69-562l33.54 33.54ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Z"/></svg>
            </span>
            <span class='satisfaction-review-icons ms-2'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M616.24-527.69q21.84 0 37.03-15.29 15.19-15.28 15.19-37.11t-15.28-37.02q-15.28-15.2-37.12-15.2-21.83 0-37.02 15.29-15.19 15.28-15.19 37.11t15.28 37.02q15.28 15.2 37.11 15.2Zm-272.3 0q21.83 0 37.02-15.29 15.19-15.28 15.19-37.11t-15.28-37.02q-15.28-15.2-37.11-15.2-21.84 0-37.03 15.29-15.19 15.28-15.19 37.11t15.28 37.02q15.28 15.2 37.12 15.2ZM480-272.31q62.61 0 114.46-35.04 51.85-35.04 76.46-92.65H618q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-52.92q24.61 57.61 76.46 92.65 51.85 35.04 114.46 35.04Zm.07 172.31q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Z"/></svg>
            </span>
            <span class='satisfaction-review-icons ms-2'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M616.24-527.69q21.84 0 37.03-15.29 15.19-15.28 15.19-37.11t-15.28-37.02q-15.28-15.2-37.12-15.2-21.83 0-37.02 15.29-15.19 15.28-15.19 37.11t15.28 37.02q15.28 15.2 37.11 15.2Zm-272.3 0q21.83 0 37.02-15.29 15.19-15.28 15.19-37.11t-15.28-37.02q-15.28-15.2-37.11-15.2-21.84 0-37.03 15.29-15.19 15.28-15.19 37.11t15.28 37.02q15.28 15.2 37.12 15.2Zm19.14 181.54h233.84v-47.7H363.08v47.7ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Z"/></svg>
            </span>
            <span class='satisfaction-review-icons ms-2'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M616.24-527.69q21.84 0 37.03-15.29 15.19-15.28 15.19-37.11t-15.28-37.02q-15.28-15.2-37.12-15.2-21.83 0-37.02 15.29-15.19 15.28-15.19 37.11t15.28 37.02q15.28 15.2 37.11 15.2Zm-272.3 0q21.83 0 37.02-15.29 15.19-15.28 15.19-37.11t-15.28-37.02q-15.28-15.2-37.11-15.2-21.84 0-37.03 15.29-15.19 15.28-15.19 37.11t15.28 37.02q15.28 15.2 37.12 15.2ZM480-420q-62.61 0-114.46 35.04-51.85 35.04-76.46 92.65h381.84q-24.61-57.61-76.46-92.65Q542.61-420 480-420Zm.07 320q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Z"/></svg>
            </span>
            <span class='satisfaction-review-icons ms-2'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm63.78-429 20.38-12q-.69 22.08 14.39 37.69 15.07 15.62 37.53 15.62 21.8 0 37.05-15.26 15.26-15.26 15.26-37.05 0-14.23-7.19-26.58-7.19-12.34-19.58-18.8l29.46-16.93-17.69-31.15-127.31 72.69 17.7 31.77Zm-127.7 0 17.7-31.77-127.31-72.69-17.69 31.15 29.46 16.93q-12.39 6.46-19.58 18.8-7.19 12.35-7.19 26.58 0 21.79 15.26 37.05 15.25 15.26 37.05 15.26 22.46 0 37.53-15.62 15.08-15.61 14.39-37.69l20.38 12Zm63.93 89q-66.08 0-116.43 42.04-50.34 42.04-71.57 105.65h375.84q-21.23-63.61-71.49-105.65Q546.17-440 480.08-440Z"/></svg>
            </span>
        </div>
        <div class='d-flex mt-3'>
            <h6 class='satisfaction-review-hint'>Very Satisfied</h6>
            <h6 class='satisfaction-review-hint ms-auto'>Very Unsatisfied</h6>
        </div>
    </div>
`)

// #region LOAD DETAILS 

$(window).on('load', function () 
{  
    let totalItems = 0
    let totalAmount = 0
    let orderStatus = order['status']

    if (orderStatus == 'Completed')
    {   
        orderDetailsSection.append(satisfactionReviewSection)

        orderDetailsSection.on('click', '#close-satisfaction-review-btn', function () 
        {  
            satisfactionReviewSection.fadeOut('fast', function () {
                $(this).remove()
            })
        })
    }

    Object.values(order['orders']).forEach(product => {

        let qty = parseInt(product.qty)
        let amount = parseFloat(product.amount)
        let total = (amount * qty)

        totalItems += qty
        totalAmount += total

        const productRow = $(`
            
            <div class='card d-flex flex-column order-item mb-3'>   
                <div class='d-flex align-items-center p-3'>
                    <div class='product-image-holder rounded border d-flex'>
                        <img src='../../../assets/images/products/${product.image}' alt=''/>
                    </div>
                    <div class='d-flex ms-3 flex-fill'>
                        <div class='d-flex flex-column flex-fill mb-2 justify-content-center'>
                            <p class='order-product-name fw-medium'>${product.name}</p>
                            <p class='order-product-type'>${product.type}</p>
                            <h6 class='fw-semibold text-start order-item-amount mt-3'>x${product.qty}</h6>
                        </div>
                        <div class='d-flex flex-column flex-fill align-items-end'>
                            <p class='order-product-price fw-semibold'>${toPeso(product.amount)}</p>
                            <h5 class='order-product-price-total fw-semibold mt-auto'><span class='fw-normal'>Total:</span> ${toPeso(total)}</h5>
                        </div>
                    </div>
                </div>
                <div class='card-footer bg-white d-flex align-items-center'>
                    <p class='review-text'>Review</p>
                    
                    <div class='ms-auto d-flex align-items-center'>
                        <div class='remove-review'>
                            ${remove}
                        </div>
                        <div class='review-stars p-2 ms-2'>
                        </div>
                    </div>
                </div>
            </div>

        `)
        
        orderList.append(productRow)
        createReviewStars(productRow)
        
        orderID.text(order['order-id'])
        shopName.text(order['store-name'])
        status.attr('data-status', orderStatus)
        status.text(orderStatus)
        orderUniqueItems.text(Object.keys(order['orders']).length)
        orderTotalItems.text(totalItems)
        orderTotalAmount.text(toPeso(totalAmount))
    })
})

function createReviewStars(container) 
{
    const starsContainer = container.find('.review-stars')
    const removeReviewBtn = container.find('.remove-review')

    for (let i = 0; i < 5; i++) 
    {
        const star = $(`<span class="star" data-index="${i}">${hollowStar}</span>`)
        starsContainer.append(star)
    }

    starsContainer.on('click', '.star', function () 
    {
        const clickedRating = parseInt($(this).attr('data-index')) + 1
        updateStars(starsContainer, clickedRating)
        notify('success', 'Review sent successfully.')
        
        removeReviewBtn.show()
    })

    removeReviewBtn.on('click', function()
    {
        updateStars(starsContainer, 0)
        removeReviewBtn.hide()
        notify('success', 'Review unsent successfully.')
    })

    removeReviewBtn.hide()
}

function updateStars(container, rating)
{
    container.children('.star').each(function (i) 
    {
        $(this).html(i < rating ? fullStar : hollowStar)
    })
}

// #endregion LOAD DETAILS 

