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

    <xsl:template match='/'>
		<html>
			<head>
                <link rel='stylesheet' href='../../../styles/water_station/pages/ws_inventory.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='ws-side-bar'/>

                <div class='cont w-100'>

					<!--* HEADER -->
					<header class='d-flex mb-4'>
						<h4>Inventory</h4>
						<div class='ms-auto'>
							<button id='add-product-btn' class='btn btn-primary btn-sm d-flex align-items-center' type='button' data-bs-toggle='modal' data-bs-target='#add-product-modal'>
								<span>
									<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path d='M11.25 12.75H5.5V11.25H11.25V5.5H12.75V11.25H18.5V12.75H12.75V18.5H11.25V12.75Z' fill='#FAFAFA'/>
									</svg>
								</span>
								<p class='text-white'>Add</p>
							</button>
						</div>
					</header>

					<!--* NAVIGATION -->
					<nav class='mb-4 px-4 nav nav-underline border-bottom' role='tablist'>
						<button class='nav-link active' id='all-items-tab' data-bs-toggle='tab' data-bs-target='#all-items-pane' type='button' role='tab' aria-controls='all-items-tab' aria-selected='true'>All Items</button>
						<button class='nav-link' id='trash-tab' data-bs-toggle='tab' data-bs-target='#trash-pane' type='button' role='tab' aria-controls='trash-tab' aria-selected='false'>Trash</button>
					</nav>

					<!--* TABS CONTENT -->
					<main>
						<div class='tab-content'>
							<div id='all-items-pane' class='tab-pane fade show active' role='tabpanel' aria-labelledby='all-items-tab' tabindex='0'>
								
								<div class='d-flex mb-4'>
									<div class='btn-group'>
										<button id='sort-parent' class='btn btn-outline-primary btn-sm dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
											Sort by Name Ascending
										</button>
										<ul class='dropdown-menu'>
											<li><button id='sort-asc' class='dropdown-item'>Sort by Name Ascending</button></li>
											<li><button id='sort-dsc' class='dropdown-item'>Sort by Name Descending</button></li>
										</ul>
									</div>
		
									<div class='row g-3 align-items-center ms-auto'>
										<div class='col-auto'>
											<label for='search-inp' class='col-form-label'>Search Item:</label>
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

								<div class='items-wrapper d-flex flex-wrap'>
									<xsl:for-each select='$water-station/inventory/product'>
										<xsl:sort select='name'/>
		
										<div data-bs-target='#view-product-modal' data-bs-toggle='modal' class='card product-card text-center d-flex flex-column align-items-center me-4 mb-4' 
											data-product='{name}'
											data-type='{type}'
											data-stock='{stock}'
											data-price='{price}'
											data-description='{description}'
											data-review-stars='{reviews/stars}'
											data-review-nums='{reviews/number_of_reviews}'
											data-image-link='{image}'
										>
											<img src='../../../assets/images/products/{image}' class='card-img-top' alt='{name}'/>
											<div class='card-body'>
												<p class='card-text text-center'><xsl:value-of select='name'/></p>
											</div>
										</div>
		
									</xsl:for-each>
								</div>
							</div>
							<div id='trash-pane' class='tab-pane fade' role='tabpanel' aria-labelledby='trash-tab' tabindex='0'>
								<div class='d-flex mb-4'>
									<div class='btn-group'>
										<button id='trash-sort-parent' class='btn btn-outline-primary btn-sm dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
											Sort by Name Ascending
										</button>
										<ul class='dropdown-menu'>
											<li><button id='trash-sort-asc' class='dropdown-item'>Sort by Name Ascending</button></li>
											<li><button id='trash-sort-dsc' class='dropdown-item'>Sort by Name Descending</button></li>
										</ul>
									</div>
		
									<div class='row g-3 align-items-center ms-auto'>
										<div class='col-auto'>
											<label for='trash-search-inp' class='col-form-label'>Search Item:</label>
										</div>
										<div class='col-auto'>
											<div class='input-group input-group-sm'>
												<input type='text' id='trash-search-inp' class='form-control' aria-describedby='trash-search-btn'/>
												<button class='btn btn-outline-secondary' type='button' id='trash-search-clear'>
													<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#005691'><path d='M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z'/></svg>
												</button>
											</div>
										</div>
									</div>
								</div>

								<div class='trash-wrapper d-flex flex-wrap'></div>
							</div>
						</div>
					</main>
				</div>

				<!--* MODALS -->

				<!--* ADD PRODUCT MODAL -->
				<div class='modal fade' id='add-product-modal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='add-product-moda-label'>
					<div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
						<div class='modal-content'>
							<div class='modal-header'>
								<h1 class='modal-title fs-5' id='add-product-modal-label'>Add new product</h1>
								<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
							</div>
							<div class='modal-body'>
								<div class='temp-image-holder d-flex justify-content-center'>
									<img src='../../../assets/images/products/product_placeholder.png' alt='Product Image' class='border'/>
								</div>
								<div class='form-wrapper'>
									<form id='add-product-form'>
										<div class='mb-3'>
											<label for='p-image' class='form-label'>Product Image</label>
											<input class='form-control' type='file' id='p-image'/>
										</div>
										<div class='mb-3'>
											<label for='p-name' class='form-label'>Name</label>
											<input type='text' id='p-name' class='form-control'/>
										</div>
										<div class='mb-3'>
											<label for='p-type' class='form-label'>Type</label>
											<select id='p-type' class='form-select' aria-label='Select Gender'>
												<option selected='true' disabled='true'>Select Type</option>
												<option value='Purified'>Purified</option>
												<option value='Alkaline'>Alkaline</option>
											</select>
										</div>
										<div class='mb-3'>
											<label for='p-stock' class='form-label'>Stock</label>
											<input type='number' id='p-stock' class='form-control'/>
										</div>
										<div class='mb-3'>
											<label for='p-price' class='form-label'>Price</label>
											<input type='number' id='p-price' class='form-control'/>
										</div>
										<div class='mb-3'>
											<label for='p-description' class='form-label'>Description</label>
											<textarea class='form-control' id='p-description' rows='3'></textarea>
										</div>
									</form>
								</div>
							</div>
							<div class='modal-footer'>
								<button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
								<button type='button' id='add-product-submit' class='btn btn-primary'>Add</button>
							</div>
						</div>
					</div>
				</div>
				
				<!--* EDIT PRODUCT MODAL -->
				<div class='modal fade' id='edit-product-modal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='edit-product-moda-label'>
					<div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
						<div class='modal-content'>
							<div class='modal-header'>
								<h1 class='modal-title fs-5' id='edit-product-modal-label'>Edit product</h1>
								<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
							</div>
							<div class='modal-body'>
								<div class='temp-image-holder d-flex justify-content-center'>
									<img src='../../../assets/images/products/product_placeholder.png' alt='Product Image' class='border'/>
								</div>
								<div class='form-wrapper'>
									<form id='add-product-form'>
										<div class='mb-3'>
											<label for='e-image' class='form-label'>Product Image</label>
											<input class='form-control' type='file' id='e-image'/>
										</div>
										<div class='mb-3'>
											<label for='e-name' class='form-label'>Name</label>
											<input type='text' id='e-name' class='form-control'/>
										</div>
										<div class='mb-3'>
											<label for='e-type' class='form-label'>Type</label>
											<select id='e-type' class='form-select' aria-label='Select Gender'>
												<option selected='true' disabled='true'>Select Type</option>
												<option value='Purified'>Purified</option>
												<option value='Alkaline'>Alkaline</option>
											</select>
										</div>
										<div class='mb-3'>
											<label for='e-stock' class='form-label'>Stock</label>
											<input type='number' id='e-stock' class='form-control'/>
										</div>
										<div class='mb-3'>
											<label for='e-price' class='form-label'>Price</label>
											<input type='number' id='e-price' class='form-control'/>
										</div>
										<div class='mb-3'>
											<label for='e-description' class='form-label'>Description</label>
											<textarea class='form-control' id='e-description' rows='3'></textarea>
										</div>
									</form>
								</div>
							</div>
							<div class='modal-footer'>
								<button type='button' class='btn btn-outline-primary' data-bs-target='#view-product-modal' data-bs-toggle='modal'>Back</button>
								<button type='button' id='edit-product-submit' class='btn btn-primary'>Save</button>
							</div>
						</div>
					</div>
				</div>

				<!--* VIEW PRODUCT MODAL -->
				<div class='modal fade' id='view-product-modal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='view-product-modal-label'>
					<div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
						<div class='modal-content'>
							<div class='modal-header'>
								<button id='delete-product-btn' class='btn' type='button' data-bs-toggle='modal' data-bs-target='#delete-product-modal'>
									<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#dc3545'><path d='M292.31-140q-29.92 0-51.12-21.19Q220-182.39 220-212.31V-720h-40v-60h180v-35.38h240V-780h180v60h-40v507.69Q740-182 719-161q-21 21-51.31 21H292.31ZM680-720H280v507.69q0 5.39 3.46 8.85t8.85 3.46h375.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-720ZM376.16-280h59.99v-360h-59.99v360Zm147.69 0h59.99v-360h-59.99v360ZM280-720v520-520Z'/></svg>
								</button>
								<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
							</div>
							<div class='modal-body'>
								<div class='view-product-image-holder d-flex justify-content-center mb-3'>
									<img id='view-product-image' src='../../../assets/images/products/product_placeholder.png' class='border'/>
								</div>
								<div class='view-product-details d-flex flex-column text-center mb-3'>
									<span class='d-flex fw-semibold justify-content-center'><h4 id='view-product-name'>------</h4><h4 id='view-product-type'>-----</h4></span>
									<span class='d-flex fw-semibold justify-content-center'>PHP <p id='view-product-price' class='ms-1'> ---,---.--</p></span>
								</div>
								<div class='view-product-reviews d-flex flex-column align-items-center mb-3'>
									<div class='d-flex justify-content-center align-items-center text-center'>
										<p id='view-product-review-stars'>-.-</p>
										<span id='view-product-review-stars-icon' class='px-1'></span>
										<p id='view-product-review-nums'>(--)</p>
									</div>
									<span class='d-flex'><p id='view-product-stocks' class='me-1'>--</p> Stocks</span>
								</div>
								<div class='view-product-description-holder text-center'>
									<p id='view-product-description'>-----</p>
								</div>
							</div>
							<div class='modal-footer'>
								<button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Close</button>
								<button type='button' id='edit-product-btn' class='btn btn-primary' data-bs-target='#edit-product-modal' data-bs-toggle='modal'>Edit</button>
							</div>
						</div>
					</div>
				</div>

				<!--* DELETE MODAL -->
				<div class="modal fade" id="delete-product-modal" data-bs-backdrop='static' data-bs-keyboard='false' tabindex="-1" aria-labelledby="delete-product-modal-label" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h1 class="modal-title fs-5" id="delete-product-modal-label">Move to Trash?</h1>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<p>Are you sure to delete <strong id='delete-product-name'></strong>? Items moved to trash will be permanently deleted after 30 days.</p>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
								<button id='confirm-delete-btn' type="button" class="btn btn-danger text-white" data-bs-dismiss="modal">Move to Trash</button>
							</div>
						</div>
					</div>
				</div>

				<!--* RECOVER MODAL -->
				<div class='modal fade' id='recover-product-modal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='recover-product-modal-label'>
					<div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
						<div class='modal-content'>
							<div class='modal-header'>
								<h5 class="modal-title">30d</h5>
								<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
							</div>
							<div class='modal-body'>
								<div class='recover-product-image-holder d-flex justify-content-center mb-3'>
									<img id='recover-product-image' src='../../../assets/images/products/product_placeholder.png' class='border'/>
								</div>
								<div class='recover-product-details d-flex flex-column text-center mb-3'>
									<span class='d-flex fw-semibold justify-content-center'><h4 id='recover-product-name'>------</h4><h4 id='recover-product-type'>-----</h4></span>
									<span class='d-flex fw-semibold justify-content-center'>PHP <p id='recover-product-price' class='ms-1'> ---,---.--</p></span>
								</div>
								<div class='recover-product-reviews d-flex flex-column align-items-center mb-3'>
									<div class='d-flex justify-content-center align-items-center text-center'>
										<p id='recover-product-review-stars'>-.-</p>
										<span id='recover-product-review-stars-icon' class='px-1'></span>
										<p id='recover-product-review-nums'>(--)</p>
									</div>
									<span class='d-flex'><p id='recover-product-stocks' class='me-1'>--</p> Stocks</span>
								</div>
								<div class='recover-product-description-holder text-center'>
									<p id='recover-product-description'>-----</p>
								</div>
							</div>
							<div class='modal-footer'>
								<button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Close</button>
								<button type='button' id='recover-product-btn' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#restore-product-modal'>Recover</button>
							</div>
						</div>
					</div>
				</div>

				<!--* RESTORE MODAL -->
				<div class="modal fade" id="restore-product-modal" data-bs-backdrop='static' data-bs-keyboard='false' tabindex="-1" aria-labelledby="delete-product-modal-label" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h1 class="modal-title fs-5" id="restore-product-modal-label">Restore Product?</h1>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<p>Restore <strong id='restore-product-name'></strong>? Product will be moved to available products.</p>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
								<button id='confirm-restore-btn' type="button" class="btn btn-primary" data-bs-dismiss="modal">Restore Product</button>
							</div>
						</div>
					</div>
				</div>

				<xsl:call-template name='log-out-modal'/>
				
				<!--* TOAST -->
				<div id='toast-container' class='toast-container position-fixed bottom-0 end-0 p-3'></div>

				<script type='module' src='../../../script/water_station/ws_inventory.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>