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
	<xsl:include href='../../../../components/toast_container.xsl'/>

    <xsl:template match='/'>
		<html>
			<head>
                <link rel='stylesheet' href='../../../styles/customer/pages/cs_ws_checkout.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='cs-side-bar'/>
				
                <div class='cont d-flex flex-column h-100 w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
                        <nav aria-label='breadcrumb'>
                            <ol class='breadcrumb'>
                                <a href='../pages/cs_p_water_stations.xml' class='breadcrumb-item fw-semibold me-2'><h4>Water Station</h4></a>
                                <h4 class='breadcrumb-item '><a id='current-water-station' href='' class='fw-semibold me-2'></a></h4>
						        <h4 class='breadcrumb-item active' aria-current='page'>Check Out</h4>
                            </ol>
                        </nav>
					</header>

					<main>
						<div class='d-flex justify-content-center h-100'>
							<div class='wrapper'>
								<div class='customer-address-wrapper d-flex flex-column rounded-3 border p-4 user-select-none'>
									<div class='d-flex'>
										<div class='d-flex justify-content-center align-items-center me-auto'>
											<span>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z" fill="#005691"/></svg>
											</span>
											<h5 class='fw-semibold ms-3'>Shipping Address</h5>
										</div>
										<button type='button' class='btn btn-sm' data-bs-toggle='modal' data-bs-target='#address-modal'>Change</button>
									</div>

									<div class='ms-4 me-4 mt-2 '>
										<span class='ms-3 me-3 d-flex align-items-center'>
											<p>
												<strong id='shipping-customer-name' class='fw-medium me-1'>
													<xsl:value-of select='$customer/personal-details/name'/>
												</strong>
												<strong id='shipping-customer-contact-number' class='fw-medium me-1'>
													(<xsl:value-of select='$customer/personal-details/contact-number'/>)
												</strong>
												<p id='shipping-customer-address'><xsl:value-of select='$customer/personal-details/address'/></p>
											</p>
										</span>
									</div>
								</div>

								<div class='rounded-3 border mt-4'>
									<div class='d-flex align-items-center p-4 '>
										<h5>Order Summary</h5>
									</div>
									<hr/>
									<div class='p-4'>
										<table class='table table-borderless w-100 user-select-none'>
											<thead>
												<tr>
													<th class='header'>Product</th>
													<th class='header text-center'>Amount</th>
													<th class='header text-center'>Qty</th>
													<th class='header text-center'>Total Amount</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td colSpan='4'>
														<div class='d-flex align-items-center ms-auto'>
															<span>
																<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z" fill="#005691"/></svg>
															</span>
															<h6 id='shop-name'>------</h6>
														</div>
													</td>
												</tr>
												<tr>
													<td id='product-image-data' class='product-image-data d-flex align-items-center align-middle'>
														<img src='../../../assets/images/products/product_placeholder.png' alt=''/>
														<p id='product-name'>-----</p>
													</td>
													<td id='product-amount' class='align-middle text-center'>₱ --.--</td>
													<td id='product-qty' class='align-middle text-center'>--</td>
													<td id='product-total-amount' class='align-middle text-center'>₱ --.--</td>
												</tr>
											</tbody>
										</table>
									</div>
									<hr/>
									<div class='p-4'>
										<div class='d-flex justify-content-center align-items-center'>
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
								</div>

								<div class='rounded-3 border mt-4 d-flex align-items-center p-4'>
									<div class='d-flex flex-column me-auto'>
										<p class='mb-1'>Total (<span id='total-items'></span>):</p>
										<h4 id='total-amount' class='fw-semibold'></h4>
									</div>	
									<button id='place-order-btn' class='btn btn-lg btn-primary'>Place Order</button>
								</div>

							</div>
						</div>
					</main>
				</div>

				<!--* SHIPPING ADDRESSES MODAL -->
				<div id='address-modal' class='modal fade' tabindex='-1' aria-labelledby='address-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
					<div class='modal-dialog modal-dialog-centered'>
						<div class='modal-content'>
							<div class='modal-header'>
								<h5 id='address-modal-label' class='modal-title'>Your Addresses</h5>
								<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
							</div>
							<div id='address-modal-content' class='modal-body'>
								<div class='rounded border mb-3'>
									<button id='add-address-btn' type='button' class='btn w-100 d-flex align-items-center' data-bs-toggle='modal' data-bs-target='#add-address-modal'>
										<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
										<p>Add Address</p>
									</button>
								</div>

								<xsl:variable name='customerPD' select='$customer/personal-details'/>

								<div class='d-flex flex-column p-3 mb-3 border rounded user-select-none address-card selected-address'
									data-cs-name='{$customerPD/name}'
									data-gender='{$customerPD/gender}'
									data-contact-num='{$customerPD/contact-number}'
									data-address='{$customerPD/address}'
								>
									<div class='d-flex align-items-center'>
										<strong class='fw-medium mb-2 new-sp-cs-name-highlight'>
											<xsl:value-of select='$customerPD/name'/>
										</strong>
										<button type='button' class='btn btn-sm ms-auto edit-address-btn' data-bs-toggle='modal' data-bs-target='#add-address-modal'>Edit</button>
									</div>
									<p class='new-sp-cs-contact-num'><xsl:value-of select='$customerPD/contact-number'/></p>
									<p class='new-sp-cs-address'><xsl:value-of select='$customerPD/address'/></p>
								</div>
							
							</div>
							<div class='modal-footer'>
								<button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Close</button>
								<button id='confirm-select-address-btn' type='button' class='btn btn-primary primary-modal-btn' data-bs-dismiss='modal'>Select</button>
							</div>
						</div>
					</div>
				</div>

				<!--* ADD ADDRESS MODAL -->
                <div id='add-address-modal' class='modal fade' tabindex='-1' aria-labelledby='add-address-modal=label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
                    <div class='modal-dialog modal-dialog-centered'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 id='add-address-modal-label' class='modal-title'>New Address</h5>
                                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div class='modal-body'>
                                <form id='add-address-form' class='needs-validation' novalidate='true'>
                                    <div class='mb-3 has-validation'>
                                        <label for='cs-name' class='form-label required'>First name</label>
                                        <input id='new-shipping-fname' type='text' aria-label='First name' class='form-control' data-fb='First Name' required='true' pattern='[A-Za-z\s]+'/>
										<div id='new-shipping-fname-invalid-fb' class="invalid-feedback"></div>
                                    </div>
									<div class='mb-3 has-validation'>
                                        <label for='cs-name' class='form-label required'>Last name</label>
										<input id='new-shipping-lname' type='text' aria-label='Last name' class='form-control' data-fb='Last Name' required='true' pattern='[A-Za-z\s]+'/>
										<div id='new-shipping-lname-invalid-fb' class="invalid-feedback"></div>
                                    </div>
                                    <div class='mb-3 has-validation'>
                                        <label for='cs-contact-number' class='form-label required'>Contact Number</label>
										<input id='new-shipping-contact-num' type='tel' aria-label='Contact Number' class='form-control' maxLength='11' data-fb='Contact Number' required='true'/>
										<div id='new-shipping-contact-num-invalid-fb' class="invalid-feedback"></div>
                                    </div>
                                    <div class='mb-3 has-validation'>
                                        <label for='cs-gender' class='form-label required'>Gender</label>
                                        <select id='new-shipping-gender' class='form-select' aria-label='Select Gender' data-fb='Gender' required='true'>
                                            <option value='' selected='true' disabled='true'>Select Gender</option>
                                            <option value='M'>Male</option>
                                            <option value='F'>Female</option>
                                        </select>
										<div id='new-shipping-gender-invalid-fb' class="invalid-feedback"></div>
                                    </div>
                                    <div class='mb-3 has-validation'>
                                        <label for='ws-address' class='form-label required'>Address</label>
                                        <textarea id='new-shipping-address' class='form-control' rows='3' data-fb='Address' required='true'></textarea>
										<div id='new-shipping-address-invalid-fb' class="invalid-feedback"></div>
                                    </div>
                                </form>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
                                <button id='confirm-add-address-btn' type='button' class='btn btn-primary'>Add</button>
                            </div>
                        </div>
                    </div>
                </div>

				<xsl:call-template name='log-out-modal'/>
				<xsl:call-template name='toast-container'/>

				<script type='module' src='../../../script/customer/cs_ws_checkout.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>