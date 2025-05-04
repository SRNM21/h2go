import '../main.js'

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