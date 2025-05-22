<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method='html' indent='yes'/>

	<!--* DATA -->
	<xsl:variable name='customer-id' select="document('../../../../../data/system/customer/cs_data.xml')/customer-id"/>
	<xsl:variable name='customer-data' select="document('../../../../../data/client/h2go_clients.xml')"/>
	<xsl:variable name='customer' select='$customer-data/h2go/customers/customer[@id = $customer-id]'/>

	<!--* COMPONENTS -->
	<xsl:include href='../../../../components/cs_sidebar.xsl'/>
	<xsl:include href='../../../../components/cs_logout_modal.xsl'/>
	<xsl:include href='../../../../components/toast_container.xsl'/>

    <xsl:template match='/'>
		<html lang='en'>
			<head>
				<meta charset='UTF-8'/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
				<title>Cart | Customer</title>
				<link rel='shortcut icon' href='../../../../public/favicon.ico' type='image/x-icon'/>
                <link rel='stylesheet' href='../../../styles/customer/pages/cs_cart.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='cs-side-bar'/>
				
                <div class='cont d-flex flex-column h-100 w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
						<h4>Cart</h4>
					</header>

					<main>
						<div class='d-flex h-100'>
                            <div class='section cart-section overflow-auto'>
                                <div class='form-check mb-3'>
                                    <input class='form-check-input' type='checkbox' value='' id='select-all-checkbox'/>
                                    <label class='form-check-label' for='select-all-checkbox'>Select All</label>
                                </div>

                                <div class='d-flex flex-column'>
                                    <xsl:for-each select='$customer/cart/added-to-cart'>

                                    <xsl:variable name='water-station-id' select='water-station-id'/>
                                    <xsl:variable name='water-station' select='$customer-data/h2go/water-stations/water-station[@id = $water-station-id]'/>

                                        <div class='card mb-4 store-card'
                                            data-water-station-id='{$water-station-id}'
                                        >
                                            <div class='card-header'>
                                                <div class='form-check'>
                                                    <input class='form-check-input store-checker' type='checkbox' value=''/>
                                                    <label class='form-check-label fw-semibold water-station-name'>
                                                        <xsl:value-of select='$water-station/water-station-details/name'/>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class='card-body cart-product-holder vstack gap-3'>

                                                <xsl:for-each select='products/product'>
                                                
                                                    <xsl:variable name='quantity' select='quantity'/>
                                                    <xsl:variable name='product-id' select='product-id'/>
                                                    <xsl:variable name='product' select='$water-station/inventory/product[@id = $product-id]'/>
                                                
                                                    <div class='form-check d-flex align-items-center cart-item'
                                                        data-origin='{$water-station-id}'
                                                        data-product='{$product-id}'
                                                        data-type='{$product/type}'
                                                        data-stock='{$product/stock}'
                                                        data-initial-qty='{$quantity}'
                                                        data-initial-amount='{$product/price}'
                                                        
                                                        data-product-name='{$product/name}'
                                                        data-product-image='{$product/image}'
                                                        data-water-station-name='{$water-station/water-station-details/name}'
                                                    >   
                                                        <input class='form-check-input cart-checker' type='checkbox' value=''/>
                                                        <div class='d-flex ms-3 w-100'>
                                                            <div class='product-image-holder rounded border d-flex'>
                                                                <img src='../../../assets/images/products/{$product/image}' alt=''/>
                                                            </div>
                                                            <div class='d-flex ms-3 flex-fill'>
                                                                <div class='d-flex flex-column flex-fill mb-2 justify-content-center'>
                                                                    <p class='cart-product-name fw-medium'><xsl:value-of select='$product/name'/></p>
                                                                    <p class='cart-product-type'><xsl:value-of select='$product/type'/></p>
                                                                    <h6 class='fw-semibold text-start cart-item-amount mt-3'><xsl:value-of select='$product/price'/></h6>
                                                                </div>
                                                                <div class='d-flex flex-column flex-fill align-items-center justify-content-center'>
                                                                    <button type='button' class='btn ms-auto mb-3 remove-btn' data-bs-toggle='modal' data-bs-target='#delete-modal'>
                                                                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z' fill='#005691'/></svg>
                                                                    </button>
                                                                    <div class='input-group qty-group input-group-sm ms-auto'>
                                                                        <button class='btn btn-outline-secondary product-decrement-btn' type='button'>
                                                                            <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#005691'><path d='M200-440v-80h560v80H200Z'/></svg>
                                                                        </button>
                                                                        <input type='text' class='form-control text-center product-qty-inp' value='{$quantity}' maxLength='3'/>
                                                                        <button class='btn btn-outline-secondary product-increment-btn' type='button'>
                                                                            <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#005691'><path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/></svg>
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </xsl:for-each>
                                            </div>
                                        </div>
                                    </xsl:for-each>
                                </div>
                            </div>

                            <div class='section cart-details-section ms-3'>
                                <div class='card mb-4'>
                                    <div class='card-header'>Details</div>
                                    <div class='card-body'>
                                        <div class='d-flex flex-column'>
                                            <div class='d-flex mb-3'>
                                                <span class='me-3'>
                                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1875 21.5625 14.3125 20.6875C13.4375 19.8125 13 18.75 13 17.5C13 16.25 13.4375 15.1875 14.3125 14.3125C15.1875 13.4375 16.25 13 17.5 13C18.75 13 19.8125 13.4375 20.6875 14.3125C21.5625 15.1875 22 16.25 22 17.5C22 18.75 21.5625 19.8125 20.6875 20.6875C19.8125 21.5625 18.75 22 17.5 22ZM3 21.5V13.5H11V21.5H3Z' fill='#005691'/></svg>                                                        
                                                </span>
                                                <p class='card-text'><span id='cart-unique-items'>0</span> Unique Items</p>
                                            </div>
                                            <div class='d-flex mb-3'>
                                                <span class='me-3'>
                                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V6.525C3 6.29167 3.0375 6.06667 3.1125 5.85C3.1875 5.63333 3.3 5.43333 3.45 5.25L4.7 3.725C4.88333 3.49167 5.1125 3.3125 5.3875 3.1875C5.6625 3.0625 5.95 3 6.25 3H17.75C18.05 3 18.3375 3.0625 18.6125 3.1875C18.8875 3.3125 19.1167 3.49167 19.3 3.725L20.55 5.25C20.7 5.43333 20.8125 5.63333 20.8875 5.85C20.9625 6.06667 21 6.29167 21 6.525V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5.4 6H18.6L17.75 5H6.25L5.4 6ZM16 8H8V16L12 14L16 16V8Z' fill='#005691'/></svg>
                                                </span>
                                                <p class='card-text'><span id='cart-total-items'>0</span> Total Items</p>
                                            </div>
                                            <div class='d-flex'>
                                                <span class='me-3'>
                                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18Z' fill='#005691'/></svg>
                                                </span>
                                                <p class='card-text'><span id='cart-total-stores'>0</span> Stores</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class='card p-3'>
									<div class='mb-3 d-flex justify-content-center align-items-center'>
                                        <div>
                                            <h5 class='fw-semibold'>Total</h5>
                                        </div>
                                        <div class='ms-auto'>
                                            <h4 id='total-amount'>₱ 0.00</h4>
                                        </div>
                                    </div>
                                    <button id='cart-checkout-btn' type='button' class='btn btn-primary' disabled='true'>Check Out</button>
								</div>

                            </div>
						</div>
					</main>
				</div>

                <!--* DELETE CART ITEM MODAL -->
				<div id='delete-modal' class='modal fade' tabindex='-1' aria-labelledby='delete-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
                    <div class='modal-dialog modal-dialog-centered'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 id='delete-modal-label' class='modal-title'>Remove Item?</h5>
                                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div id='delete-modal-content' class='modal-body'>
                                <p>Are you sure you want to remove <strong id='item-to-delete'></strong> from the cart?</p>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
                                <button id='confirm-remove-btn' type='button' class='btn btn-danger primary-modal-btn' data-bs-dismiss='modal'>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>

				<xsl:call-template name='log-out-modal'/>
				<xsl:call-template name='toast-container'/>

				<script type='module' src='../../../script/customer/cs_cart.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>