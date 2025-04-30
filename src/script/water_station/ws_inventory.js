import '../main.js'

// #region TOAST

const toastContainer = $('#toast-container')

function notify(content)
{
    let toast = $(`
        <div class="toast toast-success align-items-center show" role="alert" aria-live="assertive" aria-atomic="true">
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

// #endregion TOAST

// #region SORT PRODUCTS

const productsObj = $('.product-card')

const productsWrapper = $('.items-wrapper')
const trashsWrapper = $('.trash-wrapper')

const sortAscBtn = $('#sort-asc')
const sortDscBtn = $('#sort-dsc')
const sortDropdown = $('#sort-parent')

const trashSortAscBtn = $('#trash-sort-asc')
const trashSortDscBtn = $('#trash-sort-dsc')
const trashSortDropdown = $('#trash-sort-parent')

productsObj.on('click', (e) => productView(e))

sortAscBtn.on('click', () => sortProduct(true, true))
sortDscBtn.on('click', () => sortProduct(true, false))

trashSortAscBtn.on('click', () => sortProduct(false, true))
trashSortDscBtn.on('click', () => sortProduct(false, false))

function sortProduct(available, ascending) 
{  
    let sortable 
    let wrapper
    let parentSort

    if (available)
    {
        sortable = productsObj.filter(function() {
            return !$(this).hasClass('trash-product')
        })

        wrapper = productsWrapper
        parentSort = sortDropdown
    }
    else 
    {
        sortable = productsObj.filter(function() {
            return $(this).hasClass('trash-product')
        })

        wrapper = trashsWrapper
        parentSort = trashSortDropdown
    }

    const sortedProducts = sortable.sort(function(a, b) 
    {
        const nameA = $(a).data('product').toLowerCase()
        const nameB = $(b).data('product').toLowerCase()

        if (nameA < nameB) return ascending ? -1 : 1
        if (nameA > nameB) return ascending ? 1 : -1
        return 0
    })

    parentSort.text(ascending ? 'Sort by Name Ascending' : 'Sort by Name Descending')
    wrapper.empty().append(sortedProducts)
    productsObj.on('click', (e) => productView(e))
}

// #endregion SORT PRODUCTS

// #region SEARCH PRODUCTS

const searchBar = $('#search-inp')
const searchClear = $('#search-clear')

const trashSearchBar = $('#trash-search-inp')
const trashSearchClear = $('#trash-search-clear')

searchBar.on('input', () => search(true))
searchClear.on('click', () => clear(true))

trashSearchBar.on('input', () => search(false))
trashSearchClear.on('click', () => clear(false))

function reset(available)
{
    let wrapper = available ? productsWrapper : trashWrapper
    let prods = productsObj.filter(function() {
        return available ? !$(this).hasClass('trash-product') : $(this).hasClass('trash-product')
    })

    prods.each(function () 
    {
        const $textEl = $(this).find('.card-text')
        const fullText = $textEl.text()
        $textEl.html(fullText)
    })

    wrapper.empty().append(prods)
}

function clear(available)
{
    let sBar = available ? searchBar : trashSearchBar
    sBar.val('')
    reset(available)
    productsObj.prop('onclick', null).off('click')
    productsObj.on('click', (e) => productView(e))
}

function search(available)
{
    let sBar = available ? searchBar : trashSearchBar
    let wrapper = available ? productsWrapper : trashWrapper    
    let prods = productsObj.filter(function() {
        return available ? !$(this).hasClass('trash-product') : $(this).hasClass('trash-product')
    })

    const query = sBar.val().trim().toLowerCase()
    let foundAny = false

    wrapper.empty()

    prods.toArray().forEach(product => 
    {
        const $product = $(product)
        const $textEl = $product.find('.card-text')
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

            wrapper.append($product)
            foundAny = true
        } 
        else if (!query) 
        {
            wrapper.append($product)
            foundAny = true
        }
    })

    if (!foundAny) 
    {
        wrapper.append(`
            <div class='no-results text-center w-100 py-4 text-muted'>
                No products found
            </div>
        `)
    }
        
    productsObj.on('click', (e) => productView(e))
}

// #endregion SEARCH PRODUCTS

// #region ADD PRODUCTS

const addProductModal = $('#add-product-modal')
const addProductForm = $('#add-product-form')

const addProductBtn = $('#add-product-submit')
const imageFile = $('#p-image')
const productImage = $('.temp-image-holder img')

productImage.attr('src', '../../../assets/images/products/product_placeholder.png')

imageFile.on('change', function (e) 
{
    const file = e.target.files[0]

    if (file) 
    {
        const reader = new FileReader()

        reader.onload = function (event)
        {
            productImage.attr('src', event.target.result)
        }

        reader.readAsDataURL(file)
    }
})

addProductBtn.on('click', function() 
{
    const imageInput = $('#p-image')[0].files[0]
    const nameInput = $('#p-name').val()
    const typeInput = $('#p-type').val()
    const stockInput = $('#p-stock').val()
    const priceInput = $('#p-price').val()
    const descriptionInput = $('#p-description').val()

    if (!nameInput || !typeInput || !stockInput || !priceInput || !descriptionInput) 
    {
        alert('Please fill in all the required fields.')
        return
    }

    const imageUrl = imageInput ? URL.createObjectURL(imageInput) : '../../../assets/images/products/product_placeholder.png'

    const productCardHTML = `
        <div class='card product-card text-center d-flex flex-column align-items-center me-4 mb-4' data-product='${nameInput}'>
            <img src='${imageUrl}' class='card-img-top' alt='${nameInput}'/>
            <div class='card-body'>
                <p class='card-text text-center'>${nameInput}</p>
            </div>
        </div>
    `

    productsWrapper.append(productCardHTML)

    addProductForm[0].reset()
    addProductModal.modal('toggle')

    notify('New Product is Successfully Added!')
})

// #endregion ADD PRODUCTS

// #region VIEW PRODUCTS

const fullStar = $('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" fill="#005691"/></svg>')
const hollowStar = $('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.85 16.825L12 14.925L15.15 16.85L14.325 13.25L17.1 10.85L13.45 10.525L12 7.125L10.55 10.5L6.9 10.825L9.675 13.25L8.85 16.825ZM5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" fill="#005691"/></svg>')

const viewProductImage = $('#view-product-image')

const viewProductName = $('#view-product-name')
const viewProductType = $('#view-product-type')
const viewProductStock = $('#view-product-stocks')
const viewProductPrice = $('#view-product-price')
const viewProductDescription = $('#view-product-description')

const viewProductReviewStars = $('#view-product-review-stars')
const viewProductReviewStarsIcon = $('#view-product-review-stars-icon')
const viewProductReviewNums = $('#view-product-review-nums')

const recoverProductImage = $('#recover-product-image')

const recoverProductName = $('#recover-product-name')
const recoverProductType = $('#recover-product-type')
const recoverProductStock = $('#recover-product-stocks')
const recoverProductPrice = $('#recover-product-price')
const recoverProductDescription = $('#recover-product-description')

const recoverProductReviewStars = $('#recover-product-review-stars')
const recoverProductReviewStarsIcon = $('#recover-product-review-stars-icon')
const recoverProductReviewNums = $('#recover-product-review-nums')

var productImageLink
var productName
var productType
var productStock 
var productPrice
var productDescription

function storeTempData(product)
{
    productImageLink = `../../../assets/images/products/${product.data('image-link')}`
    productName = product.data('product')
    productType = product.data('type')
    productStock = product.data('stock')
    productPrice = product.data('price')
    productDescription = product.data('description')
}

function productView(e)
{
    let product = $(e.currentTarget)

    if (product.hasClass('trash-product')) 
    {
        recoverProductView(product)
        return
    }

    storeTempData(product)

    viewProductImage.attr('src', productImageLink)
    viewProductName.html(productName)
    viewProductType.html(`(${productType})`)
    viewProductStock.html(productStock)
    viewProductPrice.html((Math.round(productPrice * 100) / 100).toFixed(2))
    viewProductDescription.html(productDescription)
    viewProductReviewStars.html(product.data('review-stars'))
    viewProductReviewNums.html(`(${product.data('review-nums')})`)
    generateStars(viewProductReviewStarsIcon, product.data('review-stars'))
}

function recoverProductView(product)
{
    storeTempData(product)

    recoverProductImage.attr('src', productImageLink)
    recoverProductName.html(productName)
    recoverProductType.html(`(${productType})`)
    recoverProductStock.html(productStock)
    recoverProductPrice.html((Math.round(productPrice * 100) / 100).toFixed(2))
    recoverProductDescription.html(productDescription)
    recoverProductReviewStars.html(product.data('review-stars'))
    recoverProductReviewNums.html(`(${product.data('review-nums')})`)
    generateStars(recoverProductReviewStarsIcon, product.data('review-stars'))
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

// #endregion VIEW PRODUCTS

// #region EDIT PRODUCTS

const editProductModal = $('#edit-product-modal')

const editProductSubmit = $('#edit-product-submit')
const editProductBtn = $('#edit-product-btn')

const editProductImage = $('.temp-image-holder > img')
const editProductName = $('#e-name')
const editProductType = $('#e-type')
const editProductStock = $('#e-stock')
const editProductPrice = $('#e-price')
const editProductDescription = $('#e-description')

editProductBtn.on('click', function() 
{
    editProductImage.attr('src', productImageLink)
    editProductName.val(productName)
    editProductType.val(productType)
    editProductStock.val(productStock)
    editProductPrice.val(productPrice)
    editProductDescription.val(productDescription)
})

editProductSubmit.on('click', function ()
{
    editProductModal.modal('toggle')
    notify(`'${productName}' is Successfully Edited!`)
})

// #endregion EDIT PRODUCTS

// #region TRASH PRODUCTS

const deleteBtn = $('#delete-product-btn')
const productToBeDeleted = $('#delete-product-name')
const confirmDeleteBtn = $('#confirm-delete-btn')
const trashWrapper = $('.trash-wrapper')

deleteBtn.on('click', function()
{
    productToBeDeleted.text(productName)
})

confirmDeleteBtn.on('click', function()
{
    productsObj.each(function () 
    {
        const $product = $(this)
        const productData = $product.data('product')

        if (productData === productName) 
        {
            trashWrapper.append($product.addClass('trash-product'))
            $product.attr('data-bs-target', '#recover-product-modal')
            notify(`'${productName}' is Successfully moved to trash!`)
        }
    })
})

// #endregion TRASH PRODUCTS

// #region RESTORE PRODUCTS

const recoverBtn = $('#recover-product-btn')
const confirmRestoreBtn = $('#confirm-restore-btn')

recoverBtn.on('click', function()
{
    $('#restore-product-name').text(productName )
})

confirmRestoreBtn.on('click', function()
{
    productsObj.each(function () 
    {
        const $product = $(this)
        const productData = $product.data('product')

        if (productData === productName) 
        {
            productsWrapper.append($product.removeClass('trash-product'))
            $product.attr('data-bs-target', '#view-product-modal')
            notify(`'${productName}' is Successfully restored!`)
        }
    })
})

// #endregion RESTORE PRODUCTS