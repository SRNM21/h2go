import '../main.js'

// #region LOAD WATER STATION DETAILS

var waterStationData
var waterStationProducts

const params = new URLSearchParams(window.location.search)
const waterStationID = params.get('ws-id')  
const waterStationName = params.get('ws-name')  
const fromOrder = params.get('from-order')  

const waterStationNameHeader = $('#ws-name-header')
const waterStationNameBody = $('#ws-name-body')
const waterStationStars = $('#ws-review-stars')
const waterStationStarsContainer = $('#ws-review-stars-container')
const waterStationReviews = $('#ws-review-nums')
const waterStationStatus = $('#ws-status')
const waterStationAddress = $('#ws-address')
const waterStationContactNumber = $('#ws-contact-num')
const waterStationNumOfProducts = $('#ws-num-of-products')

const fullStar = $('<svg class="stars" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" fill="#005691"/></svg>')
const hollowStar = $('<svg class="stars" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.85 16.825L12 14.925L15.15 16.85L14.325 13.25L17.1 10.85L13.45 10.525L12 7.125L10.55 10.5L6.9 10.825L9.675 13.25L8.85 16.825ZM5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" fill="#005691"/></svg>')

const productsHolder = $('#products-holder')
var products

$(window).on('load', function () 
{  
    if (fromOrder == 'true') notify('success', 'Order is placed successfully.')

    waterStationNameHeader.text(waterStationName)

    $.ajax({
        url: '../../../../data/client/h2go_clients.xml',
        dataType: 'xml',
        success: (xml) => {
            waterStationData = $(xml).find(`water-station[id='${waterStationID}']`)
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
    const details = waterStationData.find('water-station-details')
    const name = details.find('name').text()
    const stars = details.find('reviews stars').text()
    const numOfReviews = details.find('reviews num-of-review').text()
    const status = details.find('status').text()
    const address = details.find('address').text()
    const contactNumber = details.find('contact-number').text()
    waterStationProducts = waterStationData.find('inventory product')

    waterStationNameBody.text(name)
    waterStationStars.text(stars)
    generateStars(waterStationStarsContainer, stars)
    waterStationReviews.text(`(${numOfReviews})`)
    waterStationStatus.text(status)
    waterStationStatus.attr('data-status', status)
    waterStationAddress.text(address)
    waterStationContactNumber.text(contactNumber)
    waterStationNumOfProducts.text(`${waterStationProducts.length} Products`)

    loadProducts()
}

function generateStars(container, stars)
{
    let numStars = Math.ceil(stars)
    let i = 0

    container.empty()
    
    while (i < numStars) 
    {
        container.append(fullStar.clone())
        i++
    }

    while (i < 5) 
    {
        container.append(hollowStar.clone())
        i++
    }
}

function loadProducts()
{
    let template = ''

    waterStationProducts.each((_, e) => {
        let product = $(e)

        template += `
            <div class='card product-card text-center d-flex flex-column align-items-center me-4 mb-4' 
                data-bs-target='#view-product-modal' 
                data-bs-toggle='modal'
                data-product-id='${product.attr('id')}'
                data-product='${product.find('name').text()}'
                data-type='${product.find('type').text()}'
                data-stock='${product.find('stock').text()}'
                data-price='${product.find('price').text()}'
                data-description='${product.find('description').text()}'
                data-review-stars='${product.find('reviews stars').text()}'
                data-review-nums='${product.find('reviews number_of_reviews').text()}'
                data-image-link='${product.find('image').text()}'
            >
                <img src='../../../assets/images/products/${product.find('image').text()}' class='card-img-top' alt='${product.find('name').text()} Image'/>
                <div class='card-body'>
                    <p class='card-text text-center product-name'>${product.find('name').text()}</p>
                </div iv>
            </div>
        `
    })

    productsHolder.append(template)
    products = $('.product-card')
}

// #endregion LOAD WATER STATION DETAILS

// #region PRODUCT ACTION 

const viewProductTitle = $('#view-product-name')
const viewProductImage = $('#view-product-image')
const viewProductStars = $('#view-product-review-stars')
const viewProductReviews = $('#view-product-review-nums')
const viewProductDescription = $('#view-product-description')
const viewProductPrice = $('#view-product-price')
const viewProductStock = $('#view-product-stocks')

productsHolder.on('click', '.product-card', function (e) 
{  
    let product = $(e.currentTarget)
    
    viewProductTitle.text(product.data('product'))
    viewProductImage.attr('src', product.find('.card-img-top').attr('src'))
    viewProductStars.text(product.data('review-stars'))
    viewProductReviews.text(`(${product.data('review-nums')})`)
    viewProductDescription.text(product.data('description'))
    viewProductPrice.text((Math.round(product.data('price') * 100) / 100).toFixed(2))
    viewProductStock.text(product.data('stock'))

    qtyInput.attr('data-max-stock', product.data('stock'))

    console.log(product.data('product-id'));
    
    buyNowBtn.attr('data-product-id', product.data('product-id'))
})

// #endregion PRODUCT ACTION

// #region SEARCH WATER STATION

const searchBar = $('#search-inp')
const clearBtn = $('#search-clear')

searchBar.on('input', search)
clearBtn.on('click', clear)

function reset()
{
    products.each(function () 
    {
        const $textEl = $(this).find('.product-name')
        const fullText = $textEl.text()
        $textEl.html(fullText)
    })    

    productsHolder.empty().append(products)
}

function clear()
{
    searchBar.val('')
    reset()
}

function search()
{
    const query = searchBar.val().trim().toLowerCase()
    let foundAny = false

    productsHolder.empty()

    products.toArray().forEach(product => 
    {
        const $product = $(product)
        const $textEl = $product.find('.product-name')
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

            productsHolder.append($product)
            foundAny = true
        } 
        else if (!query) 
        {
            productsHolder.append($product)
            foundAny = true
        }
    })

    if (!foundAny) 
    {
        productsHolder.append(`
            <div class='no-results text-center w-100 py-4 text-muted'>
                No Product found.
            </div>
        `)
    }
}

// #endregion SEARCH WATER STATION

// #region QUANTITY CONTROL

const decrementBtn = $('#decrement-btn')
const incrementBtn = $('#increment-btn')
const qtyInput = $('#qty-input')

decrementBtn.on('click', function () 
{  
    let val = parseInt(qtyInput.val())
    if (val > 1) qtyInput.val(--val)
})

incrementBtn.on('click', function () 
{  
    let val = parseInt(qtyInput.val())
    let maxStock = parseInt(qtyInput.data('max-stock'))
    if (val < maxStock) qtyInput.val(++val)
})

qtyInput.on('input', function() 
{
    let value = $(this).val()
    const cleanedValue = value.replace(/[^0-9]/g, '')
    $(this).val(cleanedValue)

    let maxStock = $(this).data('max-stock')

    const stock = parseInt(cleanedValue)

    if (cleanedValue === '') 
    {
        $(this).val(1) 
    } 
    else if (stock < 1) 
    {
        $(this).val(1)
    } 
    else if (stock > maxStock) 
    {
        $(this).val(maxStock)
    }
})

// #endregion QUANTITY CONTROL

// #region BUY NOW ACTION

const buyNowBtn = $('#buy-now-btn')

buyNowBtn.on('click', function () 
{  
    window.location.href = `../../customer/pages/cs_p_ws_checkout.xml?ws-id=${waterStationID}&product-id=${buyNowBtn.attr('data-product-id')}&qty=${qtyInput.val()}`
})

// #endregion BUY NOW ACTION

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