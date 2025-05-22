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

    <xsl:template match='/'>
		<html lang='en'>
			<head>
				<meta charset='UTF-8'/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
				<title>Orders | Water Station</title>
				<link rel='shortcut icon' href='../../../../public/favicon.ico' type='image/x-icon'/>
                <link rel='stylesheet' href='../../../styles/water_station/pages/ws_orders.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='ws-side-bar'/>
				 
				<div class='cont w-100'>

					<!--* HEADER -->
					<header class='d-flex mb-4'>
						<h4>Orders</h4>
						<div class='ms-auto d-flex'>
							<button id='add-product-btn' class='btn btn-light btn-sm d-flex align-items-center me-3 border border-dark-subtle' type='button'>
								<span class='me-2'>
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z"/></svg>
								</span>
								<p class=''>Export</p>
							</button>
							<a href='../pages/ws_p_order_create.xsl' id='add-order-btn' class='btn btn-primary btn-sm d-flex align-items-center' type='button'>
								<span class='me-2'>
									<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M11.25 12.75H5.5V11.25H11.25V5.5H12.75V11.25H18.5V12.75H12.75V18.5H11.25V12.75Z' fill='#FAFAFA'/></svg>
								</span>
								Create Order
							</a>
						</div>
					</header>

					<!--* FILTERS -->
					<nav class='px-4 nav nav-pills pb-3' role='tablist'>
						<li class="nav-item dropdown">
							<button id='status-filter' class="nav-link dropdown-toggle filter-dd" data-bs-toggle="dropdown" role="button" aria-expanded="false">All Orders</button>
							<ul class="dropdown-menu">
								<li><button class='dropdown-item status-filter-item active' id='all-orders-tab' data-bs-toggle='tab' data-bs-target='#all-orders-pane' type='button' role='tab' aria-controls='all-orders-tab' aria-selected='true'>All Orders</button></li>
								<li><button class='dropdown-item status-filter-item' id='pending-tab' data-bs-toggle='tab' data-bs-target='#pending-pane' type='button' role='tab' aria-controls='pending-tab' aria-selected='false'>Pending</button></li>
								<li><button class='dropdown-item status-filter-item' id='in-progress-tab' data-bs-toggle='tab' data-bs-target='#in-progress-pane' type='button' role='tab' aria-controls='in-progress-tab' aria-selected='false'>In Progress</button></li>
								<li><button class='dropdown-item status-filter-item' id='out-for-delivery-tab' data-bs-toggle='tab' data-bs-target='#out-for-delivery-pane' type='button' role='tab' aria-controls='out-for-delivery-tab' aria-selected='false'>Out for Delivery</button></li>
								<li><button class='dropdown-item status-filter-item' id='completed-tab' data-bs-toggle='tab' data-bs-target='#completed-pane' type='button' role='tab' aria-controls='completed-tab' aria-selected='false'>Completed</button></li>
								<li><button class='dropdown-item status-filter-item' id='declined-tab' data-bs-toggle='tab' data-bs-target='#declined-pane' type='button' role='tab' aria-controls='declined-tab' aria-selected='false'>Declined</button></li>
							</ul>
						</li>
					</nav>

					<main>
						<div class='tab-content'>
							<div id='all-orders-pane' class='tab-pane fade show active' role='tabpanel' aria-labelledby='all-orders-tab' tabindex='0'>
								
								<table id='datatable-orders' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Time Ordered</th>
											<th scope="col">Order ID</th>
											<th scope="col">Name</th>
											<th scope="col">Mode</th>
											<th scope="col">Total Items</th>
											<th scope="col">Order Total</th>
											<th scope="col">Status</th>
											<th scope="col">Action</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select='$water-station/orders/order'>
											<xsl:sort select='time-ordered'/>

											<xsl:variable name="customer-id" select="customer-id" />
											<xsl:variable name='customer' select='$water-station-data/h2go/customers/customer[@id = $customer-id]'></xsl:variable>
											<xsl:variable name="total-items" select="sum(ordered-products/ordered-product/quantity)" />
											
											<tr>
												<td><p><xsl:value-of select='time-ordered'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='$customer/personal-details/name'/></p></td>
												<td><p><xsl:value-of select='order-type'/></p></td>
												<td><p><xsl:value-of select='$total-items'/></p></td>
												<td><p><xsl:value-of select='order-total'/></p></td>
												<td><p><xsl:value-of select='status'/></p></td>
												<td>
													<a href='../../water_station/pages/ws_p_order_details.xml?water-station-id={$water-station-id}&amp;order-id={@id}' class="btn btn-primary">View</a>
												</td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>

							</div>
							<div id='pending-pane' class='tab-pane fade show' role='tabpanel' aria-labelledby='all-orders-tab' tabindex='0'>
								
								<table id='datatable-orders-pending' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Time Ordered</th>
											<th scope="col">Order ID</th>
											<th scope="col">Name</th>
											<th scope="col">Mode</th>
											<th scope="col">Total Items</th>
											<th scope="col">Order Total</th>
											<th scope="col">Status</th>
											<th scope="col">Action</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select="$water-station/orders/order[status = 'Pending']">
											<xsl:sort select='time-ordered'/>

											<xsl:variable name="customer-id" select="customer-id" />
											<xsl:variable name='customer' select='$water-station-data/h2go/customers/customer[@id = $customer-id]'></xsl:variable>
											<xsl:variable name="total-items" select="sum(ordered-products/ordered-product/quantity)" />
											
											<tr>
												<td><p><xsl:value-of select='time-ordered'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='$customer/personal-details/name'/></p></td>
												<td><p><xsl:value-of select='order-type'/></p></td>
												<td><p><xsl:value-of select='$total-items'/></p></td>
												<td><p><xsl:value-of select='order-total'/></p></td>
												<td><p><xsl:value-of select='status'/></p></td>
												<td>
													<a href='../../water_station/pages/ws_p_order_details.xml?water-station-id={$water-station-id}&amp;order-id={@id}' class="btn btn-primary">View</a>
												</td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>

							</div>
							<div id='in-progress-pane' class='tab-pane fade show' role='tabpanel' aria-labelledby='all-orders-tab' tabindex='0'>
								
								<table id='datatable-orders-in-progress' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Time Ordered</th>
											<th scope="col">Order ID</th>
											<th scope="col">Name</th>
											<th scope="col">Mode</th>
											<th scope="col">Total Items</th>
											<th scope="col">Order Total</th>
											<th scope="col">Status</th>
											<th scope="col">Action</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select="$water-station/orders/order[status = 'In Progress']">
											<xsl:sort select='time-ordered'/>

											<xsl:variable name="customer-id" select="customer-id" />
											<xsl:variable name='customer' select='$water-station-data/h2go/customers/customer[@id = $customer-id]'></xsl:variable>
											<xsl:variable name="total-items" select="sum(ordered-products/ordered-product/quantity)" />
											
											<tr>
												<td><p><xsl:value-of select='time-ordered'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='$customer/personal-details/name'/></p></td>
												<td><p><xsl:value-of select='order-type'/></p></td>
												<td><p><xsl:value-of select='$total-items'/></p></td>
												<td><p><xsl:value-of select='order-total'/></p></td>
												<td><p><xsl:value-of select='status'/></p></td>
												<td>
													<a href='../../water_station/pages/ws_p_order_details.xml?water-station-id={$water-station-id}&amp;order-id={@id}' class="btn btn-primary">View</a>
												</td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>

							</div>
							<div id='out-for-delivery-pane' class='tab-pane fade show' role='tabpanel' aria-labelledby='all-orders-tab' tabindex='0'>
								
								<table id='datatable-orders-out-for-delivery' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Time Ordered</th>
											<th scope="col">Order ID</th>
											<th scope="col">Name</th>
											<th scope="col">Mode</th>
											<th scope="col">Total Items</th>
											<th scope="col">Order Total</th>
											<th scope="col">Status</th>
											<th scope="col">Action</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select="$water-station/orders/order[status = 'Out for Delivery']">
											<xsl:sort select='time-ordered'/>

											<xsl:variable name="customer-id" select="customer-id" />
											<xsl:variable name='customer' select='$water-station-data/h2go/customers/customer[@id = $customer-id]'></xsl:variable>
											<xsl:variable name="total-items" select="sum(ordered-products/ordered-product/quantity)" />
											
											<tr>
												<td><p><xsl:value-of select='time-ordered'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='$customer/personal-details/name'/></p></td>
												<td><p><xsl:value-of select='order-type'/></p></td>
												<td><p><xsl:value-of select='$total-items'/></p></td>
												<td><p><xsl:value-of select='order-total'/></p></td>
												<td><p><xsl:value-of select='status'/></p></td>
												<td>
													<a href='../../water_station/pages/ws_p_order_details.xml?water-station-id={$water-station-id}&amp;order-id={@id}' class="btn btn-primary">View</a>
												</td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>

							</div>
							<div id='completed-pane' class='tab-pane fade show' role='tabpanel' aria-labelledby='all-orders-tab' tabindex='0'>
								
								<table id='datatable-orders-completed' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Time Ordered</th>
											<th scope="col">Order ID</th>
											<th scope="col">Name</th>
											<th scope="col">Mode</th>
											<th scope="col">Total Items</th>
											<th scope="col">Order Total</th>
											<th scope="col">Status</th>
											<th scope="col">Action</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select="$water-station/orders/order[status = 'Completed']">
											<xsl:sort select='time-ordered'/>

											<xsl:variable name="customer-id" select="customer-id" />
											<xsl:variable name='customer' select='$water-station-data/h2go/customers/customer[@id = $customer-id]'></xsl:variable>
											<xsl:variable name="total-items" select="sum(ordered-products/ordered-product/quantity)" />
											
											<tr>
												<td><p><xsl:value-of select='time-ordered'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='$customer/personal-details/name'/></p></td>
												<td><p><xsl:value-of select='order-type'/></p></td>
												<td><p><xsl:value-of select='$total-items'/></p></td>
												<td><p><xsl:value-of select='order-total'/></p></td>
												<td><p><xsl:value-of select='status'/></p></td>
												<td>
													<a href='../../water_station/pages/ws_p_order_details.xml?water-station-id={$water-station-id}&amp;order-id={@id}' class="btn btn-primary">View</a>
												</td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>

							</div>
							<div id='declined-pane' class='tab-pane fade show' role='tabpanel' aria-labelledby='all-orders-tab' tabindex='0'>
								
								<table id='datatable-orders-declined' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Time Ordered</th>
											<th scope="col">Order ID</th>
											<th scope="col">Name</th>
											<th scope="col">Mode</th>
											<th scope="col">Total Items</th>
											<th scope="col">Order Total</th>
											<th scope="col">Status</th>
											<th scope="col">Action</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select="$water-station/orders/order[status = 'Declined']">
											<xsl:sort select='time-ordered'/>

											<xsl:variable name="customer-id" select="customer-id" />
											<xsl:variable name='customer' select='$water-station-data/h2go/customers/customer[@id = $customer-id]'></xsl:variable>
											<xsl:variable name="total-items" select="sum(ordered-products/ordered-product/quantity)" />
											
											<tr>
												<td><p><xsl:value-of select='time-ordered'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='$customer/personal-details/name'/></p></td>
												<td><p><xsl:value-of select='order-type'/></p></td>
												<td><p><xsl:value-of select='$total-items'/></p></td>
												<td><p><xsl:value-of select='order-total'/></p></td>
												<td><p><xsl:value-of select='status'/></p></td>
												<td>
													<a href='../../water_station/pages/ws_p_order_details.xml?water-station-id={$water-station-id}&amp;order-id={@id}' class="btn btn-primary">View</a>
												</td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>
							</div>
						</div>
					</main>
				</div>

				<xsl:call-template name='log-out-modal'/>
				
				<script type='module' src='../../../script/water_station/ws_orders.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>