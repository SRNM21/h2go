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
		<html lang='en'>
			<head>
				<meta charset='UTF-8'/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
				<title>Logs | Water Station</title>
				<link rel='shortcut icon' href='../../../../public/favicon.ico' type='image/x-icon'/>
                <link rel='stylesheet' href='../../../styles/water_station/pages/ws_logs.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='ws-side-bar'/>
				 
				<div class='cont w-100'>

					<!--* HEADER -->
					<header class='d-flex mb-4'>
						<h4>Logs</h4>
						<div class='ms-auto d-flex'>
							<button id='add-product-btn' class='btn btn-light btn-sm d-flex align-items-center me-3 border border-dark-subtle' type='button'>
								<span class='me-2'>
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z"/></svg>
								</span>
								<p class=''>Export</p>
							</button>
						</div>
					</header>

					<!--* FILTERS -->
					<nav class='px-4 nav nav-pills pb-3' role='tablist'>
						<li class="nav-item dropdown">
							<button id='log-filter' class="nav-link dropdown-toggle filter-dd" data-bs-toggle="dropdown" role="button" aria-expanded="false">All Logs</button>
							<ul class="dropdown-menu">
								<li><button class='dropdown-item log-filter-item active' id='all-logs-tab' data-bs-toggle='tab' data-bs-target='#all-logs-pane' type='button' role='tab' aria-controls='all-logs-tab' aria-selected='true'>All Logs</button></li>
								<li><button class='dropdown-item log-filter-item' id='add-logs-tab' data-bs-toggle='tab' data-bs-target='#add-logs-pane' type='button' role='tab' aria-controls='add-logs-tab' aria-selected='false'>Add</button></li>
								<li><button class='dropdown-item log-filter-item' id='edit-logs-tab' data-bs-toggle='tab' data-bs-target='#edit-logs-pane' type='button' role='tab' aria-controls='edit-logs-tab' aria-selected='false'>Edit</button></li>
								<li><button class='dropdown-item log-filter-item' id='delete-logs-tab' data-bs-toggle='tab' data-bs-target='#delete-logs-pane' type='button' role='tab' aria-controls='delete-logs-tab' aria-selected='false'>Delete</button></li>
							</ul>
						</li>
					</nav>

					<main>
						<div class='tab-content'>
							<div id='all-logs-pane' class='tab-pane fade show active' role='tabpanel' aria-labelledby='all-logs-tab' tabindex='0'>
								
								<table id='datatable-logs' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Date and Time</th>
											<th scope="col">Type</th>
											<th scope="col">Log ID</th>
											<th scope="col">Origin</th>
											<th scope="col">Description</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select='$water-station/logs/log'>
											<xsl:sort select='date-and-time'/>

											<tr>
												<td><p><xsl:value-of select='date-and-time'/></p></td>
												<td><p><xsl:value-of select='@type'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='origin'/></p></td>
												<td><p><xsl:value-of select='description'/></p></td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>

							</div>
							<div id='add-logs-pane' class='tab-pane fade show' role='tabpanel' aria-labelledby='add-logs-tab' tabindex='0'>
								
								<table id='datatable-add-logs' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Date and Time</th>
											<th scope="col">Type</th>
											<th scope="col">Log ID</th>
											<th scope="col">Origin</th>
											<th scope="col">Description</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select='$water-station/logs/log[@type = "Add"]'>
											<xsl:sort select='date-and-time'/>

											<tr>
												<td><p><xsl:value-of select='date-and-time'/></p></td>
												<td><p><xsl:value-of select='@type'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='origin'/></p></td>
												<td><p><xsl:value-of select='description'/></p></td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>

							</div>
							<div id='edit-logs-pane' class='tab-pane fade show' role='tabpanel' aria-labelledby='edit-logs-tab' tabindex='0'>
								
								<table id='datatable-edit-logs' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Date and Time</th>
											<th scope="col">Type</th>
											<th scope="col">Log ID</th>
											<th scope="col">Origin</th>
											<th scope="col">Description</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select='$water-station/logs/log[@type = "Edit"]'>
											<xsl:sort select='date-and-time'/>

											<tr>
												<td><p><xsl:value-of select='date-and-time'/></p></td>
												<td><p><xsl:value-of select='@type'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='origin'/></p></td>
												<td><p><xsl:value-of select='description'/></p></td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>

							</div>
							<div id='delete-logs-pane' class='tab-pane fade show' role='tabpanel' aria-labelledby='delete-logs-tab' tabindex='0'>
								
								<table id='datatable-delete-logs' class="table table-hover table-bordered">
									<thead>
										<tr>	
											<th scope="col">Date and Time</th>
											<th scope="col">Type</th>
											<th scope="col">Log ID</th>
											<th scope="col">Origin</th>
											<th scope="col">Description</th>
										</tr>
									  </thead>
									  <tbody>
										
										<xsl:for-each select='$water-station/logs/log[@type = "Delete"]'>
											<xsl:sort select='date-and-time'/>

											<tr>
												<td><p><xsl:value-of select='date-and-time'/></p></td>
												<td><p><xsl:value-of select='@type'/></p></td>
												<td><p><xsl:value-of select='@id'/></p></td>
												<td><p><xsl:value-of select='origin'/></p></td>
												<td><p><xsl:value-of select='description'/></p></td>
											</tr>
			
										</xsl:for-each>

									  </tbody>
								</table>

							</div>
						</div>
					</main>
				</div>

				<xsl:call-template name='log-out-modal'/>
				
				<script type='module' src='../../../script/water_station/ws_logs.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>