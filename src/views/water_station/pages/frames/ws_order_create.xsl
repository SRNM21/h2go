<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method='html' indent='yes'/>

	<!--* DATA -->
	<xsl:variable name='water-station-id' select="document('../../../../../data/system/water_station/ws_data.xml')/water-station-id"/>
	<xsl:variable name='water-station-data' select="document('../../../../../data/client/h2go_clients.xml')"/>
	<xsl:variable name='water-station' select='$water-station-data/h2go/water-stations/water-station[@id = $water-station-id]'></xsl:variable>
	
	<!--* COMPONENTS -->
	<xsl:include href='../../../../components/ws_sidebar.xsl'/>
	<xsl:include href='../../../../components/ws_logout_modal.xsl'/>
	<xsl:include href='../../../../components/toast_container.xsl'/>

    <xsl:template match='/'>
		<html>
			<head>
                <link rel='stylesheet' href='../../../styles/water_station/pages/ws_order_create.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='ws-side-bar'/>

                <div class='cont w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
                        <nav aria-label='breadcrumb'>
                            <ol class='breadcrumb'>
                                <a href='../pages/ws_p_orders.xml' class='breadcrumb-item fw-semibold me-2'><h4>Orders</h4></a>
						        <h4 class='breadcrumb-item active' aria-current='page'>Create Order</h4>
                            </ol>
                        </nav>
					</header>

					<main>
                        <div class='d-flex h-100'>
                            <div id='inventory-section' class='section inventory-section me-4'>
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
                                <div id='inventory-holder' class='holder rounded border'>
                                    <xsl:for-each select='$water-station/inventory/product'>
										<xsl:sort select='name'/>
		
										<div class='card product-card text-center d-flex flex-row align-items-center mb-4' 
											data-product='{name}'
											data-stock='{stock}'
											data-price='{price}'
										>
											<img src='../../../assets/images/products/{image}' class='card-img-top' alt='{name}'/>
											<div class='card-body d-flex'>
												<div class='d-flex flex-column product-details text-start'>
                                                    <p class='card-text name-prod'><xsl:value-of select='name'/></p>
                                                    <p class='card-text'><xsl:value-of select='type'/></p>
                                                </div>
												<div class='d-flex flex-column product-details text-end'>
                                                    <p class='card-text product-price'><xsl:value-of select='price'/></p>
                                                    <p class='card-text'>Stock: <xsl:value-of select='stock'/></p>
                                                </div>
											</div>
										</div>
		
									</xsl:for-each>
                                </div>
                            </div>
                            <div id='order-section' class='section'>
                                <div class='d-flex mb-3 justify-content-center align-items-center'>
                                    <h5>Orders</h5>
                                    <div class='row g-3 align-items-center ms-auto'>
                                        <button id='remove-all-orders-btn' type='button' class='btn btn-outline-danger' data-bs-toggle='modal' data-bs-target='#remove-all-order-modal'>Remove All</button>
                                    </div>
                                </div>
                                <div class='holder rounded border mb-3'>
                                    <table id='order-table' class='table table-sm table-bordered table-striped table-hover order-table'>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Product</th>
                                                <th scope='col'>Quantity</th>
                                                <th scope='col'>Amount</th>
                                                <th scope='col'>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <!--? AUTO POPULATE WHEN CLICKED ON PRODUCT -->
                                            </tbody>
                                    </table>
                                    <div id='no-order-flag' class='no-results text-center w-100 py-4 text-muted'>
                                        No orders yet.
                                    </div>
                                </div>
                                <div class='d-flex justify-content-center align-items-center'>
                                    <div>
                                        <h6>Total Amount:</h6>
                                        <h3 id='total-amount'></h3>
                                    </div>
                                    <button id='place-order-btn' class='btn btn-primary btn-lg ms-auto' data-bs-toggle='modal' data-bs-target='#place-order-modal'>Place Order</button>
                                </div>
                            </div>
                        </div>
					</main>
				</div>

                <!--* REMOVE ORDER MODAL -->
                <div id='remove-item-modal' class='modal fade' tabindex='-1' aria-labelledby='remove-item-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
                    <div class='modal-dialog modal-dialog-centered'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 id='remove-item-modal-label' class='modal-title'>Remove Item?</h5>
                                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div class='modal-body'>
                                <p>Do you want to remove "<span id='item-remove' class='fw-semibold'></span>" from order items.</p>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
                                <button id='confirm-remove-btn' type='button' class='btn btn-danger' data-bs-dismiss='modal'>Remove Item</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--* REMOVE ALL ORDER MODAL -->
                <div id='remove-all-order-modal' class='modal fade' tabindex='-1' aria-labelledby='remove-item-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
                    <div class='modal-dialog modal-dialog-centered'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 id='remove-item-modal-label' class='modal-title'>Empty Orders?</h5>
                                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div class='modal-body'>
                                <p>Do you want to remove all items from your order? This action cannot be undone.</p>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
                                <button id='confirm-remove-all-order-btn' type='button' class='btn btn-danger' data-bs-dismiss='modal'>Remove All Item</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--* PLACE ORDER MODAL -->
                <div id='place-order-modal' class='modal fade' tabindex='-1' aria-labelledby='remove-item-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
                    <div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 id='remove-item-modal-label' class='modal-title'>Order Summary</h5>
                                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div class='modal-body'>
                                
                                <div class='mb-4'>
                                    <table class='table table-hover table-sm'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>
                                                <th>Qty</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody id='order-summary-table' class='table-group-divider'>
                                            <!--? AUTO POPULATE WHEN ORDER IS PLACED -->
                                        </tbody>
                                    </table>  
                                </div>
                                <div class='d-flex fw-semibold justify-content-center align-items-center mb-4'>
                                    <p>Total Amount:</p>
                                    <h4 class='ms-auto'>PHP <span id='order-summary-total-amount'></span></h4>
                                </div>
                                <div class='d-flex fw-semibold justify-content-center align-items-center'>
                                    <p>Mode of Payment:</p>
                                    <div id='order-summary-mod' class='ms-auto d-flex justify-content-center align-items-center'>
                                        <img id='mod-indicator' class='mod-img' src='../../../assets/images/mode_of_payment/cash.png'/>
                                        <div class="dropdown ms-3">
                                            <button id='mod-type-parent' class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Cash On Delivery</button>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <button class="dropdown-item d-flex mod-type" type="button" data-mod='cash.png'>
                                                        <img class='mod-img' src='../../../assets/images/mode_of_payment/cash.png' />
                                                        <p class='ms-3'>Cash On Delivery</p>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="dropdown-item d-flex mod-type" type="button" data-mod='gcash.jpeg'>
                                                        <img class='mod-img' src='../../../assets/images/mode_of_payment/gcash.jpeg' />
                                                        <p class='ms-3'>Gcash</p>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="dropdown-item d-flex mod-type" type="button" data-mod='maya.jpeg'>
                                                        <img class='mod-img' src='../../../assets/images/mode_of_payment/maya.jpeg' />
                                                        <p class='ms-3'>Paymaya</p>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
                                <button id='place-order-confirm-btn' type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#customer-detail-modal'>Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--* CUSTOMER DETAILS MODAL -->
                <div id='customer-detail-modal' class='modal fade' tabindex='-1' aria-labelledby='customer-detail-modal=label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
                    <div class='modal-dialog modal-dialog-centered'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 id='customer-detail-modal-label' class='modal-title'>Customer Detail</h5>
                                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div class='modal-body'>
                                <form id='customer-details-form' class='needs-validation' novalidate='true'>
                                    <div class='mb-3 has-validation'>
                                        <label for='cs-name' class='form-label'>First name</label>
                                        <input id='customer-details-fname' type='text' aria-label='First name' class='form-control' data-fb='First Name' required='true' pattern='[A-Za-z\s]+'/>
										<div id='customer-details-fname-invalid-fb' class="invalid-feedback"></div>
                                    </div>
									<div class='mb-3 has-validation'>
                                        <label for='cs-name' class='form-label'>Last name</label>
										<input id='customer-details-lname' type='text' aria-label='Last name' class='form-control' data-fb='Last Name' required='true' pattern='[A-Za-z\s]+'/>
										<div id='customer-details-lname-invalid-fb' class="invalid-feedback"></div>
                                    </div>
                                    <div class='mb-3 has-validation'>
                                        <label for='cs-contact-number' class='form-label'>Contact Number</label>
										<input id='customer-details-contact-num' type='tel' aria-label='Contact Number' class='form-control' maxLength='11' data-fb='Contact Number' required='true'/>
										<div id='customer-details-contact-num-invalid-fb' class="invalid-feedback"></div>
                                    </div>
                                    <div class='mb-3 has-validation'>
                                        <label for='cs-gender' class='form-label'>Gender</label>
                                        <select id='customer-details-gender' class='form-select' aria-label='Select Gender' data-fb='Gender' required='true'>
                                            <option value='' selected='true' disabled='true'>Select Gender</option>
                                            <option value='M'>Male</option>
                                            <option value='F'>Female</option>
                                        </select>
										<div id='customer-details-gender-invalid-fb' class="invalid-feedback"></div>
                                    </div>
                                    <div class='mb-3 has-validation'>
                                        <label for='ws-address' class='form-label'>Address</label>
                                        <textarea id='customer-details-address' class='form-control' rows='3' data-fb='Address' required='true'></textarea>
										<div id='customer-details-address-invalid-fb' class="invalid-feedback"></div>
                                    </div>
                                </form>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#place-order-modal'>Back</button>
                                <button id='confirm-place-order-btn' type='button' class='btn btn-primary'>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>

				<xsl:call-template name='log-out-modal'/>
                <xsl:call-template name='toast-container'/>

				<script type='module' src='../../../script/water_station/ws_order_create.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>