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
		<html>
			<head>
                <link rel='stylesheet' href='../../../styles/customer/pages/cs_orders.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='cs-side-bar'/>
				
                <div class='cont d-flex flex-column h-100 w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
						<h4>Orders</h4>

                        <!--* FILTERS -->
                        <nav class='ms-auto nav nav-pills' role='tablist'>
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
					</header>

					<main class='overflow-auto'>
						<div class='d-flex h-100 justify-content-center'>
                            <div class='tab-content section orders-section'>
                                
                                <!--* ALL ORDERS -->
                                <div class='tab-pane fade show active' id='all-orders-pane' role='tabpanel' aria-labelledby='all-orders-tab' tabindex='0'>
                                    <xsl:for-each select='$customer/orders/order'>
                                        <xsl:sort select='time-ordered'/>
                                        
                                        <xsl:variable name='water-station-id' select='water-station-id'/>
                                        <xsl:variable name='water-station' select='$customer-data/h2go/water-stations/water-station[@id = $water-station-id]'/>

                                        <div class='card mb-4 store-card'
                                            data-water-station='{$water-station/water-station-details/name}'
                                            data-order-id='{@id}'
                                        >
                                            <div class='card-header d-flex align-items-center p-3'>
                                                <div class='d-flex'>
                                                    <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z" fill="#005691"/></svg>
                                                    </span>
                                                    <label class='form-check-label fw-semibold water-station-name ms-2'>
                                                        <xsl:value-of select='$water-station/water-station-details/name'/>
                                                    </label>
                                                </div>
                                                <h6 class='ms-auto status p-2 rounded' data-status='{status}'>
                                                    <xsl:value-of select='status'/>
                                                </h6>
                                            </div>
                                            <div class='card-body order-product-holder vstack gap-3'>

                                                <xsl:for-each select='ordered-products/ordered-product'>
                                                
                                                    <xsl:variable name='quantity' select='quantity'/>
                                                    <xsl:variable name='product-id' select='ordered-product-id'/>
                                                    <xsl:variable name='product' select='$water-station/inventory/product[@id = $product-id]'/>
                                                
                                                    <div class='d-flex align-items-center order-item'
                                                        data-origin='{$water-station-id}'
                                                        data-product='{$product/name}'
                                                        data-type='{$product/type}'
                                                        data-initial-qty='{$quantity}'
                                                        data-initial-amount='{$product/price}'
                                                        data-image='{$product/image}'
                                                        data-water-station-name='{$water-station/water-station-details/name}'
                                                    >   
                                                        <div class='product-image-holder rounded border d-flex'>
                                                            <img src='../../../assets/images/products/{$product/image}' alt=''/>
                                                        </div>
                                                        <div class='d-flex ms-3 flex-fill'>
                                                            <div class='d-flex flex-column flex-fill mb-2 justify-content-center'>
                                                                <p class='order-product-name fw-medium'><xsl:value-of select='$product/name'/></p>
                                                                <p class='order-product-type'><xsl:value-of select='$product/type'/></p>
                                                                <h6 class='fw-semibold text-start order-item-amount mt-3'>x<xsl:value-of select='quantity'/></h6>
                                                            </div>
                                                            <div class='d-flex flex-column flex-fill align-items-end justify-content-center'>
                                                                <p class='order-product-price fw-semibold'><xsl:value-of select='$product/price'/></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </xsl:for-each>
                                            </div>
                                            <div class='card-footer bg-white p-3 d-flex align-items-center total-details'>
                                                <h6>Total (<span class='total-order-items'></span>)</h6>
                                                <h5 class='total-order-amount ms-auto fw-semibold'></h5>
                                            </div>
                                        </div>

                                    </xsl:for-each>
                                </div>

                                <!--* PENDING -->
                                <div class='tab-pane fade' id='pending-pane' role='tabpanel' aria-labelledby='pending-tab' tabindex='0'>
                                    <xsl:for-each select='$customer/orders/order[status = "Pending"]'>
                                        <xsl:sort select='time-ordered'/>
                                        
                                        <xsl:variable name='water-station-id' select='water-station-id'/>
                                        <xsl:variable name='water-station' select='$customer-data/h2go/water-stations/water-station[@id = $water-station-id]'/>

                                        <div class='card mb-4 store-card'
                                            data-water-station='{$water-station/water-station-details/name}'
                                            data-order-id='{@id}'
                                        >
                                            <div class='card-header d-flex align-items-center'>
                                                <div class='d-flex'>
                                                    <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z" fill="#005691"/></svg>
                                                    </span>
                                                    <label class='form-check-label fw-semibold water-station-name ms-2'>
                                                        <xsl:value-of select='$water-station/water-station-details/name'/>
                                                    </label>
                                                </div>
                                                <h6 class='ms-auto status p-2 rounded' data-status='{status}'>
                                                    <xsl:value-of select='status'/>
                                                </h6>
                                            </div>
                                            <div class='card-body order-product-holder vstack gap-3'>

                                                <xsl:for-each select='ordered-products/ordered-product'>
                                                
                                                    <xsl:variable name='quantity' select='quantity'/>
                                                    <xsl:variable name='product-id' select='ordered-product-id'/>
                                                    <xsl:variable name='product' select='$water-station/inventory/product[@id = $product-id]'/>
                                                
                                                    <div class='d-flex align-items-center order-item'
                                                        data-origin='{$water-station-id}'
                                                        data-product='{$product/name}'
                                                        data-type='{$product/type}'
                                                        data-initial-qty='{$quantity}'
                                                        data-initial-amount='{$product/price}'
                                                        data-image='{$product/image}'
                                                        data-water-station-name='{$water-station/water-station-details/name}'
                                                    >   
                                                        <div class='product-image-holder rounded border d-flex'>
                                                            <img src='../../../assets/images/products/{$product/image}' alt=''/>
                                                        </div>
                                                        <div class='d-flex ms-3 flex-fill'>
                                                            <div class='d-flex flex-column flex-fill mb-2 justify-content-center'>
                                                                <p class='order-product-name fw-medium'><xsl:value-of select='$product/name'/></p>
                                                                <p class='order-product-type'><xsl:value-of select='$product/type'/></p>
                                                                <h6 class='fw-semibold text-start order-item-amount mt-3'>x<xsl:value-of select='quantity'/></h6>
                                                            </div>
                                                            <div class='d-flex flex-column flex-fill align-items-end justify-content-center'>
                                                                <p class='order-product-price fw-semibold'><xsl:value-of select='$product/price'/></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </xsl:for-each>
                                            </div>
                                            <div class='card-footer bg-white p-3 d-flex align-items-center total-details'>
                                                <h6>Total (<span class='total-order-items'></span>)</h6>
                                                <h5 class='total-order-amount ms-auto fw-semibold'></h5>
                                            </div>
                                        </div>

                                    </xsl:for-each>
                                </div>
                                          
                                <!--* IN PROGRESS -->
                                <div class='tab-pane fade' id='in-progress-pane' role='tabpanel' aria-labelledby='in-progress-tab' tabindex='0'>
                                    <xsl:for-each select='$customer/orders/order[status = "In Progress"]'>
                                        <xsl:sort select='time-ordered'/>
                                        
                                        <xsl:variable name='water-station-id' select='water-station-id'/>
                                        <xsl:variable name='water-station' select='$customer-data/h2go/water-stations/water-station[@id = $water-station-id]'/>

                                        <div class='card mb-4 store-card'
                                            data-water-station='{$water-station/water-station-details/name}'
                                            data-order-id='{@id}'
                                        >
                                            <div class='card-header d-flex align-items-center'>
                                                <div class='d-flex'>
                                                    <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z" fill="#005691"/></svg>
                                                    </span>
                                                    <label class='form-check-label fw-semibold water-station-name ms-2'>
                                                        <xsl:value-of select='$water-station/water-station-details/name'/>
                                                    </label>
                                                </div>
                                                <h6 class='ms-auto status p-2 rounded' data-status='{status}'>
                                                    <xsl:value-of select='status'/>
                                                </h6>
                                            </div>
                                            <div class='card-body order-product-holder vstack gap-3'>

                                                <xsl:for-each select='ordered-products/ordered-product'>
                                                
                                                    <xsl:variable name='quantity' select='quantity'/>
                                                    <xsl:variable name='product-id' select='ordered-product-id'/>
                                                    <xsl:variable name='product' select='$water-station/inventory/product[@id = $product-id]'/>
                                                
                                                    <div class='d-flex align-items-center order-item'
                                                        data-origin='{$water-station-id}'
                                                        data-product='{$product/name}'
                                                        data-type='{$product/type}'
                                                        data-initial-qty='{$quantity}'
                                                        data-initial-amount='{$product/price}'
                                                        data-image='{$product/image}'
                                                        data-water-station-name='{$water-station/water-station-details/name}'
                                                    >   
                                                        <div class='product-image-holder rounded border d-flex'>
                                                            <img src='../../../assets/images/products/{$product/image}' alt=''/>
                                                        </div>
                                                        <div class='d-flex ms-3 flex-fill'>
                                                            <div class='d-flex flex-column flex-fill mb-2 justify-content-center'>
                                                                <p class='order-product-name fw-medium'><xsl:value-of select='$product/name'/></p>
                                                                <p class='order-product-type'><xsl:value-of select='$product/type'/></p>
                                                                <h6 class='fw-semibold text-start order-item-amount mt-3'>x<xsl:value-of select='quantity'/></h6>
                                                            </div>
                                                            <div class='d-flex flex-column flex-fill align-items-end justify-content-center'>
                                                                <p class='order-product-price fw-semibold'><xsl:value-of select='$product/price'/></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </xsl:for-each>
                                            </div>
                                            <div class='card-footer bg-white p-3 d-flex align-items-center total-details'>
                                                <h6>Total (<span class='total-order-items'></span>)</h6>
                                                <h5 class='total-order-amount ms-auto fw-semibold'></h5>
                                            </div>
                                        </div>

                                    </xsl:for-each>
                                </div>

                                <!--* OUT FOR DELIVERY -->
                                <div class='tab-pane fade' id='out-for-delivery-pane' role='tabpanel' aria-labelledby='out-for-delivery-tab' tabindex='0'>
                                    <xsl:for-each select='$customer/orders/order[status = "Out for Delivery"]'>
                                        <xsl:sort select='time-ordered'/>
                                        
                                        <xsl:variable name='water-station-id' select='water-station-id'/>
                                        <xsl:variable name='water-station' select='$customer-data/h2go/water-stations/water-station[@id = $water-station-id]'/>

                                        <div class='card mb-4 store-card'
                                            data-water-station='{$water-station/water-station-details/name}'
                                            data-order-id='{@id}'
                                        >
                                            <div class='card-header d-flex align-items-center'>
                                                <div class='d-flex'>
                                                    <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z" fill="#005691"/></svg>
                                                    </span>
                                                    <label class='form-check-label fw-semibold water-station-name ms-2'>
                                                        <xsl:value-of select='$water-station/water-station-details/name'/>
                                                    </label>
                                                </div>
                                                <h6 class='ms-auto status p-2 rounded' data-status='{status}'>
                                                    <xsl:value-of select='status'/>
                                                </h6>
                                            </div>
                                            <div class='card-body order-product-holder vstack gap-3'>

                                                <xsl:for-each select='ordered-products/ordered-product'>
                                                
                                                    <xsl:variable name='quantity' select='quantity'/>
                                                    <xsl:variable name='product-id' select='ordered-product-id'/>
                                                    <xsl:variable name='product' select='$water-station/inventory/product[@id = $product-id]'/>
                                                
                                                    <div class='d-flex align-items-center order-item'
                                                        data-origin='{$water-station-id}'
                                                        data-product='{$product/name}'
                                                        data-type='{$product/type}'
                                                        data-initial-qty='{$quantity}'
                                                        data-initial-amount='{$product/price}'
                                                        data-image='{$product/image}'
                                                        data-water-station-name='{$water-station/water-station-details/name}'
                                                    >   
                                                        <div class='product-image-holder rounded border d-flex'>
                                                            <img src='../../../assets/images/products/{$product/image}' alt=''/>
                                                        </div>
                                                        <div class='d-flex ms-3 flex-fill'>
                                                            <div class='d-flex flex-column flex-fill mb-2 justify-content-center'>
                                                                <p class='order-product-name fw-medium'><xsl:value-of select='$product/name'/></p>
                                                                <p class='order-product-type'><xsl:value-of select='$product/type'/></p>
                                                                <h6 class='fw-semibold text-start order-item-amount mt-3'>x<xsl:value-of select='quantity'/></h6>
                                                            </div>
                                                            <div class='d-flex flex-column flex-fill align-items-end justify-content-center'>
                                                                <p class='order-product-price fw-semibold'><xsl:value-of select='$product/price'/></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </xsl:for-each>
                                            </div>
                                            <div class='card-footer bg-white p-3 d-flex align-items-center total-details'>
                                                <h6>Total (<span class='total-order-items'></span>)</h6>
                                                <h5 class='total-order-amount ms-auto fw-semibold'></h5>
                                            </div>
                                        </div>

                                    </xsl:for-each>
                                </div>

                                <!--* COMPLETED -->
                                <div class='tab-pane fade' id='completed-pane' role='tabpanel' aria-labelledby='completed-tab' tabindex='0'>
                                    <xsl:for-each select='$customer/orders/order[status = "Completed"]'>
                                        <xsl:sort select='time-ordered'/>
                                        
                                        <xsl:variable name='water-station-id' select='water-station-id'/>
                                        <xsl:variable name='water-station' select='$customer-data/h2go/water-stations/water-station[@id = $water-station-id]'/>

                                        <div class='card mb-4 store-card'
                                            data-water-station='{$water-station/water-station-details/name}'
                                            data-order-id='{@id}'
                                        >
                                            <div class='card-header d-flex align-items-center'>
                                                <div class='d-flex'>
                                                    <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z" fill="#005691"/></svg>
                                                    </span>
                                                    <label class='form-check-label fw-semibold water-station-name ms-2'>
                                                        <xsl:value-of select='$water-station/water-station-details/name'/>
                                                    </label>
                                                </div>
                                                <h6 class='ms-auto status p-2 rounded' data-status='{status}'>
                                                    <xsl:value-of select='status'/>
                                                </h6>
                                            </div>
                                            <div class='card-body order-product-holder vstack gap-3'>

                                                <xsl:for-each select='ordered-products/ordered-product'>
                                                
                                                    <xsl:variable name='quantity' select='quantity'/>
                                                    <xsl:variable name='product-id' select='ordered-product-id'/>
                                                    <xsl:variable name='product' select='$water-station/inventory/product[@id = $product-id]'/>
                                                
                                                    <div class='d-flex align-items-center order-item'
                                                        data-origin='{$water-station-id}'
                                                        data-product='{$product/name}'
                                                        data-type='{$product/type}'
                                                        data-initial-qty='{$quantity}'
                                                        data-initial-amount='{$product/price}'
                                                        data-image='{$product/image}'
                                                        data-water-station-name='{$water-station/water-station-details/name}'
                                                    >   
                                                        <div class='product-image-holder rounded border d-flex'>
                                                            <img src='../../../assets/images/products/{$product/image}' alt=''/>
                                                        </div>
                                                        <div class='d-flex ms-3 flex-fill'>
                                                            <div class='d-flex flex-column flex-fill mb-2 justify-content-center'>
                                                                <p class='order-product-name fw-medium'><xsl:value-of select='$product/name'/></p>
                                                                <p class='order-product-type'><xsl:value-of select='$product/type'/></p>
                                                                <h6 class='fw-semibold text-start order-item-amount mt-3'>x<xsl:value-of select='quantity'/></h6>
                                                            </div>
                                                            <div class='d-flex flex-column flex-fill align-items-end justify-content-center'>
                                                                <p class='order-product-price fw-semibold'><xsl:value-of select='$product/price'/></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </xsl:for-each>
                                            </div>
                                            <div class='card-footer bg-white p-3 d-flex align-items-center total-details'>
                                                <h6>Total (<span class='total-order-items'></span>)</h6>
                                                <h5 class='total-order-amount ms-auto fw-semibold'></h5>
                                            </div>
                                        </div>

                                    </xsl:for-each>
                                </div>

                                <!--* DECLINED -->
                                <div class='tab-pane fade' id='declined-pane' role='tabpanel' aria-labelledby='declined-tab' tabindex='0'>
                                    <xsl:for-each select='$customer/orders/order[status = "Declined"]'>
                                        <xsl:sort select='time-ordered'/>
                                        
                                        <xsl:variable name='water-station-id' select='water-station-id'/>
                                        <xsl:variable name='water-station' select='$customer-data/h2go/water-stations/water-station[@id = $water-station-id]'/>

                                        <div class='card mb-4 store-card'
                                            data-water-station='{$water-station/water-station-details/name}'
                                            data-order-id='{@id}'
                                        >
                                            <div class='card-header d-flex align-items-center'>
                                                <div class='d-flex'>
                                                    <span>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18ZM5.05 12H18.95L18.35 9H5.65L5.05 12Z" fill="#005691"/></svg>
                                                    </span>
                                                    <label class='form-check-label fw-semibold water-station-name ms-2'>
                                                        <xsl:value-of select='$water-station/water-station-details/name'/>
                                                    </label>
                                                </div>
                                                <h6 class='ms-auto status p-2 rounded' data-status='{status}'>
                                                    <xsl:value-of select='status'/>
                                                </h6>
                                            </div>
                                            <div class='card-body order-product-holder vstack gap-3'>

                                                <xsl:for-each select='ordered-products/ordered-product'>
                                                
                                                    <xsl:variable name='quantity' select='quantity'/>
                                                    <xsl:variable name='product-id' select='ordered-product-id'/>
                                                    <xsl:variable name='product' select='$water-station/inventory/product[@id = $product-id]'/>
                                                
                                                    <div class='d-flex align-items-center order-item'
                                                        data-origin='{$water-station-id}'
                                                        data-product='{$product/name}'
                                                        data-type='{$product/type}'
                                                        data-initial-qty='{$quantity}'
                                                        data-initial-amount='{$product/price}'
                                                        data-image='{$product/image}'
                                                        data-water-station-name='{$water-station/water-station-details/name}'
                                                    >   
                                                        <div class='product-image-holder rounded border d-flex'>
                                                            <img src='../../../assets/images/products/{$product/image}' alt=''/>
                                                        </div>
                                                        <div class='d-flex ms-3 flex-fill'>
                                                            <div class='d-flex flex-column flex-fill mb-2 justify-content-center'>
                                                                <p class='order-product-name fw-medium'><xsl:value-of select='$product/name'/></p>
                                                                <p class='order-product-type'><xsl:value-of select='$product/type'/></p>
                                                                <h6 class='fw-semibold text-start order-item-amount mt-3'>x<xsl:value-of select='quantity'/></h6>
                                                            </div>
                                                            <div class='d-flex flex-column flex-fill align-items-end justify-content-center'>
                                                                <p class='order-product-price fw-semibold'><xsl:value-of select='$product/price'/></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </xsl:for-each>
                                            </div>
                                            <div class='card-footer bg-white p-3 d-flex align-items-center total-details'>
                                                <h6>Total (<span class='total-order-items'></span>)</h6>
                                                <h5 class='total-order-amount ms-auto fw-semibold'></h5>
                                            </div>
                                        </div>

                                    </xsl:for-each>
                                </div>
                            
                            </div>
						</div>
					</main>
				</div>
                
				<xsl:call-template name='log-out-modal'/>
				<xsl:call-template name='toast-container'/>

				<script type='module' src='../../../script/customer/cs_orders.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>