import '../main.js'

import {
    notify,
    toPeso
} from '../../util/helper.js'

import { 
    validateGender, 
    validateRequired 
} from '../../util/validation.js'

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

addProductForm.on('submit', function (e) 
{  
    e.preventDefault()

    const imageInput = $('#p-image')[0].files[0]
    const nameInput = $('#p-name')
    const typeInput = $('#p-type')
    const stockInput = $('#p-stock')
    const priceInput = $('#p-price')
    const descriptionInput = $('#p-description')

    const nameFB = $('#p-name-invalid-fb')
    const typeFB = $('#p-type-invalid-fb')
    const stockFB = $('#p-stock-invalid-fb')
    const priceFB = $('#p-price-invalid-fb')
    const descriptionFB = $('#p-description-invalid-fb')

    const isNameValid = validateRequired(nameInput, nameFB)
    const isTypeValid = validateGender(typeInput, typeFB)
    const isStockValid = validateRequired(stockInput, stockFB)
    const isPriceValid = validateRequired(priceInput, priceFB)
    const isDescriptionValid = validateRequired(descriptionInput, descriptionFB)
    const isFormValid = isNameValid && isTypeValid && isStockValid && isPriceValid && isDescriptionValid
        
    if (isFormValid)
    {
        const imageUrl = imageInput ? URL.createObjectURL(imageInput) : '../../../assets/images/products/product_placeholder.png'

        const productCardHTML = `
            <div data-bs-target='#view-product-modal' data-bs-toggle='modal' class='card product-card text-center d-flex flex-column align-items-center me-4 mb-4' 
                data-product='${nameInput.val()}'
                data-type='${typeInput.val()}'
                data-stock='${stockInput.val()}'
                data-price='${priceInput.val()}'
                data-description='${descriptionInput.val()}'
                data-review-stars='0'
                data-review-nums='0'
                data-image-link='${imageUrl}'
            >
                <img src='${imageUrl}' class='card-img-top' alt='${nameInput.val()}'/>
                <div class='card-body'>
                    <p class='card-text text-center'>${nameInput.val()}</p>
                </div>
            </div>
        `

        const $productCard = $(productCardHTML)
        $productCard.on('click', (e) => productView(e))
        productsWrapper.append($productCard)

        addProductForm[0].reset()
        addProductModal.modal('toggle')
        notify('success', 'New Product is Successfully Added!')
    }
})

addProductBtn.on('click', function() 
{
    $('#p-image')[0].files[0]
    addProductForm.trigger('submit')
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

var productHolder
var productImageLink
var productName
var productType
var productStock 
var productPrice
var productDescription

function storeTempData(product)
{
    console.log(product.attr('data-image-link'));
    
    productImageLink = `../../../assets/images/products/${product.attr('data-image-link')}`
    productName = product.data('product')
    productType = product.data('type')
    productStock = product.data('stock')
    productPrice = product.data('price')
    productDescription = product.data('description')
    productHolder = product
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
    viewProductPrice.html(toPeso(productPrice))
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
    recoverProductPrice.html(toPeso(productPrice))
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
const editProductForm = $('#edit-product-form')

const editProductSubmit = $('#edit-product-submit')
const editProductBtn = $('#edit-product-btn')

const editProductImageHolder = $('.temp-image-holder > img')

const editProductImageInput = $('#e-image')
const editProductNameInput = $('#e-name')
const editProductTypeInput = $('#e-type')
const editProductStockInput = $('#e-stock')
const editProductPriceInput = $('#e-price')
const editProductDescriptionInput = $('#e-description')

const editProductNameFB = $('#e-name-invalid-fb')
const editProductTypeFB = $('#e-type-invalid-fb')
const editProductStockFB = $('#e-stock-invalid-fb')
const editProductPriceFB = $('#e-price-invalid-fb')
const editProductDescriptionFB = $('#e-description-invalid-fb')

editProductImageInput.on('change', function (e) 
{
    const file = e.target.files[0]

    if (file) 
    {
        const reader = new FileReader()

        reader.onload = function (event)
        {
            editProductImageHolder.attr('src', event.target.result)
        }

        reader.readAsDataURL(file)
    }
})

editProductBtn.on('click', function(e) 
{
    console.log(productImageLink);
    
    editProductImageHolder.attr('src', productImageLink)
    editProductNameInput.val(productName)
    editProductTypeInput.val(productType)
    editProductStockInput.val(productStock)
    editProductPriceInput.val(productPrice)
    editProductDescriptionInput.val(productDescription)
})

editProductForm.on('submit', function (e) 
{  
    e.preventDefault()

    const isNameValid = validateRequired(editProductNameInput, editProductNameFB)
    const isTypeValid = validateGender(editProductTypeInput, editProductTypeFB)
    const isStockValid = validateRequired(editProductStockInput, editProductStockFB)
    const isPriceValid = validateRequired(editProductPriceInput, editProductPriceFB)
    const isDescriptionValid = validateRequired(editProductDescriptionInput, editProductDescriptionFB)
    const isFormValid = isNameValid && isTypeValid && isStockValid && isPriceValid && isDescriptionValid
        
    if (isFormValid)
    {
        editProductModal.modal('toggle')
        productHolder.data('product', editProductNameInput.val())
        productHolder.data('type', editProductTypeInput.val())
        productHolder.data('stock', editProductStockInput.val())
        productHolder.data('price', editProductPriceInput.val())
        productHolder.data('description', editProductDescriptionInput.val())
        productHolder.attr('data-image-link', editProductImageInput.val())
        productHolder.find('.card-img-top').attr('src', editProductImageHolder.attr('src'))
        productHolder.find('.card-text').text(editProductNameInput.val())
        notify('success', `'${productName}' is Successfully Edited!`)
    }
})

editProductSubmit.on('click', () => editProductForm.trigger('submit'))

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