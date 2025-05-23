<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method='html' indent='yes'/>

	<!--* DATA -->
	<xsl:variable name='water-station-id' select="document('../../../../../data/system/water_station/ws_data.xml')/water-station-id"/>
	<xsl:variable name='water-station-data' select="document('../../../../../data/client/h2go_clients.xml')"/>
	<xsl:variable name='water-station' select='$water-station-data/h2go/water-stations/water-station[@id = $water-station-id]'/>
	
	<!--* COMPONENTS -->
	<xsl:include href='../../../../components/ws_sidebar.xsl'/>
	<xsl:include href='../../../../components/ws_logout_modal.xsl'/>
	<xsl:include href='../../../../components/toast_container.xsl'/>

    <xsl:template match='/'>
		<html lang='en'>
			<head>
				<meta charset='UTF-8'/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
				<title>Order Details | Water Station</title>
				<link rel='shortcut icon' href='../../../../public/favicon.ico' type='image/x-icon'/>
                <link rel='stylesheet' href='../../../styles/water_station/pages/ws_order_details.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='ws-side-bar'/>

                <div class='cont w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
                        <nav aria-label='breadcrumb'>
                            <ol class='breadcrumb'>
                                <a href='../pages/ws_p_orders.xml' class='breadcrumb-item fw-semibold me-2'><h4>Orders</h4></a>
                                
						        <h4 class='breadcrumb-item active' aria-current='page'>Order #<span id='order-id'> </span></h4>
                            </ol>
                        </nav>
						<div id='status-container' class='ms-auto'>
							<!--? GENERATED BY STATUS -->
						</div>
					</header>

					<main>
						<div class='d-flex h-100'>
							<div class='section odered-items-section d-flex flex-column'>
								<div class='ordered-items-holder border mb-3'>
									<table class='table table-hover table-striped'>
										<thead>
											<tr>
												<th class='fw-semibold'>#</th>
												<th class='fw-semibold'>Product</th>
												<th class='fw-semibold'>Qty</th>
												<th class='fw-semibold'>Amount</th>
											</tr>
										</thead>
										<tbody id='order-detail-table-body'>
											<!--? AUTO POPULATE WHEN ORDER DETAIL IS LOADED -->
										</tbody>
									</table>  
								</div>
								<div class='total-amount-section'>
									<div class='d-flex'>
										<h4 class='fw-semibold'>TOTAL AMOUNT</h4>
										<h4 id='order-details-total-amount' class='fw-semibold ms-auto'></h4>
									</div>
								</div>
							</div>
							<div class='section order-details-section ms-4'>
								<div class='d-flex'>
									<div class='card'>
										<div class='card-header'>Customer</div>
										<div class='card-body'>
											<div class='d-flex flex-column'>
												<div class='d-flex mb-3'>
													<span class='me-3'>
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V20H4Z" fill="#005691"/></svg>
													</span>
													<p id='od-cs-name' class="card-text"></p>
												</div>
												<div class='d-flex mb-3'>
													<span id='od-cs-gender-icon' class='me-3'>
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4V10H18V7.425L14.025 11.375C14.3417 11.8417 14.5833 12.3375 14.75 12.8625C14.9167 13.3875 15 13.9333 15 14.5C15 16.0333 14.4667 17.3333 13.4 18.4C12.3333 19.4667 11.0333 20 9.5 20C7.96667 20 6.66667 19.4667 5.6 18.4C4.53333 17.3333 4 16.0333 4 14.5C4 12.9667 4.53333 11.6667 5.6 10.6C6.66667 9.53333 7.96667 9 9.5 9C10.05 9 10.5917 9.07917 11.125 9.2375C11.6583 9.39583 12.15 9.64167 12.6 9.975L16.575 6H14V4H20ZM9.5 11C8.53333 11 7.70833 11.3417 7.025 12.025C6.34167 12.7083 6 13.5333 6 14.5C6 15.4667 6.34167 16.2917 7.025 16.975C7.70833 17.6583 8.53333 18 9.5 18C10.4667 18 11.2917 17.6583 11.975 16.975C12.6583 16.2917 13 15.4667 13 14.5C13 13.5333 12.6583 12.7083 11.975 12.025C11.2917 11.3417 10.4667 11 9.5 11Z" fill="#005691"/></svg>
													</span>
													<p id='od-cs-gender' class="card-text"></p>
												</div>
												<div class='d-flex'>
													<span class='me-3'>
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z" fill="#005691"/></svg>
													</span>
													<p id='od-cs-contact-num' class="card-text"></p>
												</div>
											</div>
										</div>
									</div>	
									<div class='card ms-4'>
										<div class='card-header'>Shipping Address</div>
										<div class='card-body'>
											<div class='d-flex flex-column'>
												<div class='d-flex'>
													<span class='me-3'>
														<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 19C10.15 17.2667 8.39583 15.5833 7.2375 13.95C6.07917 12.3167 5.5 10.7167 5.5 9.15C5.5 7.06667 6.15 5.35417 7.45 4.0125C8.75 2.67083 10.4333 2 12.5 2C14.5667 2 16.25 2.67083 17.55 4.0125C18.85 5.35417 19.5 7.06667 19.5 9.15C19.5 10.7167 18.9208 12.3167 17.7625 13.95C16.6042 15.5833 14.85 17.2667 12.5 19ZM12.5 11C13.05 11 13.5208 10.8042 13.9125 10.4125C14.3042 10.0208 14.5 9.55 14.5 9C14.5 8.45 14.3042 7.97917 13.9125 7.5875C13.5208 7.19583 13.05 7 12.5 7C11.95 7 11.4792 7.19583 11.0875 7.5875C10.6958 7.97917 10.5 8.45 10.5 9C10.5 9.55 10.6958 10.0208 11.0875 10.4125C11.4792 10.8042 11.95 11 12.5 11ZM5.5 22V20H19.5V22H5.5Z" fill="#005691"/></svg>
													</span>
													<p id='od-cs-address' class="card-text"></p>
												</div>
											</div>
										</div>
									</div>	
								</div>
								<div class='d-flex mt-4'>
									<div class='card'>
										<div class='card-header'>Order Details</div>
										<div class='card-body'>
											<div class='d-flex flex-column'>
												<div class='d-flex mb-3'>
													<span class='me-3'>
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1875 21.5625 14.3125 20.6875C13.4375 19.8125 13 18.75 13 17.5C13 16.25 13.4375 15.1875 14.3125 14.3125C15.1875 13.4375 16.25 13 17.5 13C18.75 13 19.8125 13.4375 20.6875 14.3125C21.5625 15.1875 22 16.25 22 17.5C22 18.75 21.5625 19.8125 20.6875 20.6875C19.8125 21.5625 18.75 22 17.5 22ZM3 21.5V13.5H11V21.5H3Z" fill="#005691"/></svg>
													</span>
													<p id='od-cs-unique-items' class="card-text"></p>
												</div>
												<div class='d-flex mb-3'>
													<span class='me-3'>
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V6.525C3 6.29167 3.0375 6.06667 3.1125 5.85C3.1875 5.63333 3.3 5.43333 3.45 5.25L4.7 3.725C4.88333 3.49167 5.1125 3.3125 5.3875 3.1875C5.6625 3.0625 5.95 3 6.25 3H17.75C18.05 3 18.3375 3.0625 18.6125 3.1875C18.8875 3.3125 19.1167 3.49167 19.3 3.725L20.55 5.25C20.7 5.43333 20.8125 5.63333 20.8875 5.85C20.9625 6.06667 21 6.29167 21 6.525V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5.4 6H18.6L17.75 5H6.25L5.4 6ZM16 8H8V16L12 14L16 16V8Z" fill="#005691"/></svg>
													</span>
													<p id='od-cs-total-items' class="card-text"></p>
												</div>
												<div class='d-flex mb-3'>
													<span class='me-3'>
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.3 16.7L16.7 15.3L13 11.6V7H11V12.4L15.3 16.7ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z" fill="#005691"/></svg>
													</span>
													<p id='od-cs-order-date' class="card-text"></p>
												</div>
												<div class='d-flex'>
													<span class='me-3'>
														<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M286.15-97.69q-29.15 0-49.57-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.57-20.42 29.16 0 49.58 20.42 20.42 20.42 20.42 49.58 0 29.15-20.42 49.57-20.42 20.43-49.58 20.43Zm387.7 0q-29.16 0-49.58-20.43-20.42-20.42-20.42-49.57 0-29.16 20.42-49.58 20.42-20.42 49.58-20.42 29.15 0 49.57 20.42t20.42 49.58q0 29.15-20.42 49.57Q703-97.69 673.85-97.69ZM211.85-790h555.38q24.54 0 37.11 20.89 12.58 20.88 1.2 42.65L677.38-494.31q-9.84 17.31-26.03 26.96-16.2 9.66-35.5 9.66H324l-46.31 84.61q-3.08 4.62-.19 10 2.88 5.39 8.65 5.39h457.69v60H286.15q-40 0-60.11-34.5-20.12-34.5-1.42-68.89l57.07-102.61L136.16-810H60v-60h113.85l38 80Z"/></svg>
													</span>
													<p id='od-cs-order-mode' class="card-text"></p>
												</div>
											</div>
										</div>
									</div>	
									<div class='card ms-4'>
										<div class='card-header'>Payment</div>
										<div class='card-body'>
											<div class='d-flex flex-column'>
												<div class='d-flex mb-3'>
													<span class='me-3'>
														<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 20C2.95 20 2.47917 19.8042 2.0875 19.4125C1.69583 19.0208 1.5 18.55 1.5 18V7H3.5V18H20.5V20H3.5ZM7.5 16C6.95 16 6.47917 15.8042 6.0875 15.4125C5.69583 15.0208 5.5 14.55 5.5 14V6C5.5 5.45 5.69583 4.97917 6.0875 4.5875C6.47917 4.19583 6.95 4 7.5 4H21.5C22.05 4 22.5208 4.19583 22.9125 4.5875C23.3042 4.97917 23.5 5.45 23.5 6V14C23.5 14.55 23.3042 15.0208 22.9125 15.4125C22.5208 15.8042 22.05 16 21.5 16H7.5ZM9.5 14C9.5 13.45 9.30417 12.9792 8.9125 12.5875C8.52083 12.1958 8.05 12 7.5 12V14H9.5ZM19.5 14H21.5V12C20.95 12 20.4792 12.1958 20.0875 12.5875C19.6958 12.9792 19.5 13.45 19.5 14ZM14.5 13C15.3333 13 16.0417 12.7083 16.625 12.125C17.2083 11.5417 17.5 10.8333 17.5 10C17.5 9.16667 17.2083 8.45833 16.625 7.875C16.0417 7.29167 15.3333 7 14.5 7C13.6667 7 12.9583 7.29167 12.375 7.875C11.7917 8.45833 11.5 9.16667 11.5 10C11.5 10.8333 11.7917 11.5417 12.375 12.125C12.9583 12.7083 13.6667 13 14.5 13ZM7.5 8C8.05 8 8.52083 7.80417 8.9125 7.4125C9.30417 7.02083 9.5 6.55 9.5 6H7.5V8ZM21.5 8V6H19.5C19.5 6.55 19.6958 7.02083 20.0875 7.4125C20.4792 7.80417 20.95 8 21.5 8Z" fill="#005691"/></svg>
													</span>
													<p id='od-cs-mod' class="card-text"></p>
												</div>
											</div>
										</div>
									</div>	
								</div>
							</div>
						</div>
					</main>
				</div>

				<!--* STATUS CHANGE MODAL -->
				<div id='status-change-modal' class='modal fade' tabindex='-1' aria-labelledby='status-change-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
                    <div class='modal-dialog modal-dialog-centered'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 id='status-change-modal-label' class='modal-title'>Empty Orders?</h5>
                                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div id='status-change-modal-content' class='modal-body'>
                                <p>Do you want to remove all items from your order? This action cannot be undone.</p>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
                                <button id='confirm-status-change-btn' type='button' class='btn primary-modal-btn' data-bs-dismiss='modal'></button>
                            </div>
                        </div>
                    </div>
                </div>

				<xsl:call-template name='log-out-modal'/>	
				<xsl:call-template name='toast-container'/>

				<script type='module' src='../../../script/water_station/ws_order_details.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>