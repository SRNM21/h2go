<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method="html" indent="yes"/>

	<!--* DATA -->
	<xsl:variable name='customer-id' select="document('../../../../../data/system/customer/cs_data.xml')/customer-id"/>
	<xsl:variable name='customer-data' select="document('../../../../../data/client/h2go_clients.xml')"/>
	<xsl:variable name='customer' select='$customer-data/h2go/customers/customer[@id = $customer-id]'/>

	<!--* COMPONENTS -->
	<xsl:include href='../../../../components/cs_sidebar.xsl'/>
	<xsl:include href='../../../../components/cs_logout_modal.xsl'/>

    <xsl:template match='/'>
		<html>
			<head>
                <link rel='stylesheet' href='../../../styles/customer/pages/cs_water_station_details.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='cs-side-bar'/>
				
                <div class='cont d-flex flex-column h-100 w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
                        <nav aria-label='breadcrumb'>
                            <ol class='breadcrumb'>
                                <a href='../pages/cs_p_water_stations.xml' class='breadcrumb-item fw-semibold me-2'><h4>Water Station</h4></a>
                                
						        <h4 class='breadcrumb-item active' aria-current='page'><span id='ws-name-header'></span></h4>
                            </ol>
                        </nav>
					</header>

					<main>
						<div class='d-flex h-100'>
							<div class='section water-stations-section d-flex flex-column border rounded overflow-hidden'>
								<div class='ws-image-holder'>
									<img src='../../../assets/images/landing_page_img.jpg' id='ws-image' class='ws-image w-100'/>
								</div>
								<div class='ws-basic-details-holder p-3'>
									<h5 id='ws-name-body' class='mb-2 ws-name fw-semibold'></h5>
									<div class='review-section d-flex align-items-center text-center'>
										<p id='ws-review-stars' class='review-stars'></p>
										<span id='ws-review-stars-container' class='review-stars-icon px-1'></span>
										<p id='ws-review-nums' class='review-nums'></p>
									</div>
									<p id='ws-status' class='ws-status fw-semibold mt-2'></p>
								</div>
								<hr/>
								<div class='ws-more-details p-3'>
									<div class='d-flex align-items-start mb-3'>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z" fill="#005691"/></svg>
										<p id='ws-address' class='ws-address ms-3'></p>
									</div>
									<div class='d-flex align-items-center mb-3'>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z" fill="#005691"/></svg>
										<p id='ws-contact-num' class='ws-contact-num ms-3'></p>
									</div>
									<div class='d-flex align-items-center mb-3'>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V6.525C3 6.29167 3.0375 6.06667 3.1125 5.85C3.1875 5.63333 3.3 5.43333 3.45 5.25L4.7 3.725C4.88333 3.49167 5.1125 3.3125 5.3875 3.1875C5.6625 3.0625 5.95 3 6.25 3H17.75C18.05 3 18.3375 3.0625 18.6125 3.1875C18.8875 3.3125 19.1167 3.49167 19.3 3.725L20.55 5.25C20.7 5.43333 20.8125 5.63333 20.8875 5.85C20.9625 6.06667 21 6.29167 21 6.525V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5.4 6H18.6L17.75 5H6.25L5.4 6ZM16 8H8V16L12 14L16 16V8Z" fill="#005691"/></svg>
										<p id='ws-num-of-products' class='ws-contact-num ms-3'></p>
									</div>
								</div>
							</div>
							<div class='section products-section ms-4 d-flex flex-column'>
								<div class='d-flex mb-3 justify-content-center align-items-center'>
									<h5>Products</h5>
									<div class='row g-3 align-items-center ms-auto'>
										<div class='col-auto'>
											<label for='search-inp' class='col-form-label'>Search:</label>
										</div>
										<div class='col-auto'>
											<div class='input-group input-group-sm'>
												<input type='text' id='search-inp' class='form-control' aria-describedby='search-btn'/>
												<button class='btn btn-outline-secondary' type='button' id='search-clear'>
													<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#005691'><path d='M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z'/></svg>
												</button>
											</div>
										</div>
									</div>
								</div>
								<div id='products-holder' class='holder d-flex overflow-auto flex-wrap'>
		
									<!--? AUTO POPULATED ON DETAILS LOAD -->

								</div>
							</div>
						</div>
					</main>
				</div>

				<!--* VIEW PRODUCT MODAL -->
				<div class='modal fade' id='view-product-modal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='view-product-modal-label'>
					<div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
						<div class='modal-content'>
							<div class='modal-header'>
								<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
							</div>
							<div class='modal-body d-flex flex-column'>
								<div class='d-flex'>
									<div class='d-flex flex-column'>
										<div class='view-product-image-holder d-flex justify-content-center mb-3'>
											<img id='view-product-image' src='../../../assets/images/products/product_placeholder.png' class='view-product-image border'/>
										</div>
										<div class='d-flex justify-content-center align-items-center text-center'>
											<span id='view-product-review-stars-icon' class='px-1'>
												<svg class="stars" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" fill="#005691"/></svg>
											</span>
											<p id='view-product-review-stars'>-.-</p>
											<p id='view-product-review-nums' class='ms-2'>(--)</p>
										</div>
									</div>
									<div class='ms-3 section'>
										<div class='view-product-name-holder mb-3'>
											<h5 id='view-product-name' class='fw-semibold'>-----</h5>
										</div>
										<div class='view-product-description-holder mb-3'>
											<p id='view-product-description'>-----</p>
										</div>
										<div class='view-product-details d-flex flex-column mb-3'>
											<span class='d-flex fw-semibold '>PHP <p id='view-product-price' class='ms-1'> ---,---.--</p></span>
										</div>
									</div>
								</div>
								<div class='mt-3'>
									<div class='view-product-stocks-container d-flex align-items-end flex-column mb-2'>
										<span class='d-flex'><p id='view-product-stocks' class='me-1 view-product-stocks'>--</p> Stocks</span>
									</div>
									<div class='d-flex align-items-center'>
										<p>Quantity:</p>
										<div class="input-group qty-group input-group-sm ms-auto">
											<button id='decrement-btn' class="btn btn-outline-secondary" type="button">
												<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M200-440v-80h560v80H200Z"/></svg>
											</button>
											<input id='qty-input' type="text" class="form-control text-center border" value='1' maxLength='3'/>
											<button id='increment-btn' class="btn btn-outline-secondary" type="button">
												<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
											</button>
										</div>
									</div>
								</div>
								
							</div>
							<div class='modal-footer'>
								<button type='button' class='btn btn-outline-primary view-product-modal-btns' data-bs-dismiss='modal'>Close</button>
								<button type='button' id='add-to-cart-btn' class='btn btn-primary view-product-modal-btns'>Add to Cart</button>
								<button type='button' id='buy-now-btn' class='btn btn-primary view-product-modal-btns'>Buy Now</button>
							</div>
						</div>
					</div>
				</div>

				<!-- TODO ADD MESSAGE WATER STATION -->

				<xsl:call-template name='log-out-modal'/>

				<!--* TOAST -->
				<div id='toast-container' class='toast-container position-fixed bottom-0 end-0 p-3'></div>
				
				<script type='module' src='../../../script/customer/cs_water_station_details.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>