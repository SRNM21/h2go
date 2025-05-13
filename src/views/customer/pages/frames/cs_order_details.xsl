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
	<xsl:include href='../../../../components/verification_modal.xsl'/>
	<xsl:include href='../../../../components/toast_container.xsl'/>

    <xsl:template match='/'>
		<html>
			<head>
                <link rel='stylesheet' href='../../../styles/customer/pages/cs_order_details.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='cs-side-bar'/>
				
                <div class='cont d-flex flex-column h-100 w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
                        <nav aria-label='breadcrumb'>
                            <ol class='breadcrumb'>
                                <a href='../pages/cs_p_orders.xml' class='breadcrumb-item fw-semibold me-2'><h4>Orders</h4></a>
						        <h4 class='breadcrumb-item active' aria-current='page'>Order #<span id='order-id'> </span></h4>
                            </ol>
                        </nav>
                        
                        <h6 id='status' class='ms-auto status px-2 py-1 rounded'></h6>
					</header>

					<main>
                        <div class='d-flex h-100'>
                            <div class='section orders-section d-flex flex-column'>

                                <div class='card mb-3 p-3 store-card'>
                                    <div class='d-flex align-items-center'>
                                        <span class='me-2'>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z"
                                                    fill="#005691"/>
                                            </svg>
                                        </span>
                                        <a id='store-link' href=''><h6 id='shop-name'></h6></a>
                                    </div>
                                </div>

								<div id='orders-list' class='section d-flex flex-column overflow-auto'>	

                                    <!--? AUTO POPULATED ON SESSION FETCH -->

								</div>
                            </div>

                            <div id='order-details-section' class='section order-details-section ms-3'>
                                <div class='card mb-4'>
                                    <div class='card-header'>Details</div>
                                    <div class='card-body'>
                                        <div class='d-flex flex-column'>
                                            <div class='d-flex mb-3'>
                                                <span class='me-3'>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1875 21.5625 14.3125 20.6875C13.4375 19.8125 13 18.75 13 17.5C13 16.25 13.4375 15.1875 14.3125 14.3125C15.1875 13.4375 16.25 13 17.5 13C18.75 13 19.8125 13.4375 20.6875 14.3125C21.5625 15.1875 22 16.25 22 17.5C22 18.75 21.5625 19.8125 20.6875 20.6875C19.8125 21.5625 18.75 22 17.5 22ZM3 21.5V13.5H11V21.5H3Z" fill="#005691"/></svg>                                                        
                                                </span>
                                                <p class="card-text"><span id='order-unique-items'>0</span> Unique Items</p>
                                            </div>
                                            <div class='d-flex'>
                                                <span class='me-3'>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V6.525C3 6.29167 3.0375 6.06667 3.1125 5.85C3.1875 5.63333 3.3 5.43333 3.45 5.25L4.7 3.725C4.88333 3.49167 5.1125 3.3125 5.3875 3.1875C5.6625 3.0625 5.95 3 6.25 3H17.75C18.05 3 18.3375 3.0625 18.6125 3.1875C18.8875 3.3125 19.1167 3.49167 19.3 3.725L20.55 5.25C20.7 5.43333 20.8125 5.63333 20.8875 5.85C20.9625 6.06667 21 6.29167 21 6.525V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5.4 6H18.6L17.75 5H6.25L5.4 6ZM16 8H8V16L12 14L16 16V8Z" fill="#005691"/></svg>
                                                </span>
                                                <p class="card-text"><span id='order-total-items'>0</span> Total Items</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class='card mb-4'>
                                    <div class='card-header'>Shipping Address</div>
                                    <div class='card-body'>
                                        <div class='d-flex flex-column'>
                                            <div class='d-flex'>
                                                <span class='me-3'>
                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 19C10.15 17.2667 8.39583 15.5833 7.2375 13.95C6.07917 12.3167 5.5 10.7167 5.5 9.15C5.5 7.06667 6.15 5.35417 7.45 4.0125C8.75 2.67083 10.4333 2 12.5 2C14.5667 2 16.25 2.67083 17.55 4.0125C18.85 5.35417 19.5 7.06667 19.5 9.15C19.5 10.7167 18.9208 12.3167 17.7625 13.95C16.6042 15.5833 14.85 17.2667 12.5 19ZM12.5 11C13.05 11 13.5208 10.8042 13.9125 10.4125C14.3042 10.0208 14.5 9.55 14.5 9C14.5 8.45 14.3042 7.97917 13.9125 7.5875C13.5208 7.19583 13.05 7 12.5 7C11.95 7 11.4792 7.19583 11.0875 7.5875C10.6958 7.97917 10.5 8.45 10.5 9C10.5 9.55 10.6958 10.0208 11.0875 10.4125C11.4792 10.8042 11.95 11 12.5 11ZM5.5 22V20H19.5V22H5.5Z" fill="#005691"/></svg>
                                                </span>
                                                <p id='od-cs-address' class="card-text"><xsl:value-of select='$customer/personal-details/address'/></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>	

                                <div class='card p-3 mb-4'>
									<div class='d-flex justify-content-center align-items-center'>
                                        <div>
                                            <h5 class='fw-semibold'>Total</h5>
                                        </div>
                                        <div class='ms-auto'>
                                            <h4 id='total-amount'>₱ 0.00</h4>
                                        </div>
                                    </div>
								</div>
                                
                            </div>
						</div>
					</main>
				</div>
                
				<xsl:call-template name='log-out-modal'/>
				<xsl:call-template name='toast-container'/>

				<script type='module' src='../../../script/customer/cs_order_details.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>