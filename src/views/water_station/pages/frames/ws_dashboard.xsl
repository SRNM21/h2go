<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method="html" indent="yes"/>
	
	<!--* DATA -->
	<xsl:variable name="water-station-data" select="document('../../../../data/client/h2go_clients.xml')"/>

	<!--* COMPONENTS -->
	<xsl:include href='../../../../components/ws_sidebar.xsl'/>
	<xsl:include href='../../../../components/ws_logout_modal.xsl'/>

    <xsl:template match='/'>
		<html lang='en'>
			<head>
				<meta charset='UTF-8'/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
				<title>Dashboard | Water Station</title>
				<link rel='shortcut icon' href='../../../../public/favicon.ico' type='image/x-icon'/>
                <link rel='stylesheet' href='../../../styles/water_station/pages/ws_dashboard.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='ws-side-bar'/>
				
                <div class='cont d-flex flex-column h-100 w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
						<h4>Dashboard</h4>
						<div class='ms-auto'>
							<div class='btn-group'>
								<button class='btn btn-outline-primary btn-sm dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
									January
								</button>
								<ul class='dropdown-menu'>
									<li><a class='dropdown-item' href='#'>January</a></li>
									<li><a class='dropdown-item' href='#'>February</a></li>
									<li><a class='dropdown-item' href='#'>March</a></li>
									<li><a class='dropdown-item' href='#'>April</a></li>
									<li><a class='dropdown-item' href='#'>May</a></li>
									<li><a class='dropdown-item' href='#'>June</a></li>
									<li><a class='dropdown-item' href='#'>July</a></li>
									<li><a class='dropdown-item' href='#'>Auguts</a></li>
									<li><a class='dropdown-item' href='#'>September</a></li>
									<li><a class='dropdown-item' href='#'>October</a></li>
									<li><a class='dropdown-item' href='#'>November</a></li>
									<li><a class='dropdown-item' href='#'>December</a></li>
								</ul>
							</div>
							<div class='btn-group ms-2'>
								<button class='btn btn-outline-primary btn-sm dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
									2025
								</button>
								<ul class='dropdown-menu'>
									<li><a class='dropdown-item' href='#'>2025</a></li>
									<li><a class='dropdown-item' href='#'>2024</a></li>
									<li><a class='dropdown-item' href='#'>2023</a></li>
									<li><a class='dropdown-item' href='#'>2022</a></li>
									<li><a class='dropdown-item' href='#'>2021</a></li>
									<li><a class='dropdown-item' href='#'>2020</a></li>
								</ul>
							</div>
						</div>
					</header>

					<main>
						<div class='d-flex flex-column flex-fill h-100'>
							<div class='d-flex mb-4'>
								<div class='card'>
									<div class='card-header'>
										Total Earnings this Month
									</div>
									<div class='card-body'>
										<div class='d-flex'>
											<h5 class='card-title me-auto'>₱ 100,000,000.00</h5>
											<span class='badge text-bg-success p-1 align-middle d-flex align-items-center'>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M3.55375 17.5479L2.5 16.4941L9.352 9.5921L13.352 13.5921L18.9655 8.04785H16V6.54785H21.5V12.0479H20V9.10185L13.352 15.7499L9.352 11.7499L3.55375 17.5479Z" fill="#31D000"/>
												</svg>
												<p class='ms-2'>+8%</p>
											</span>
										</div>
									</div>
								</div>	
								<div class='card ms-4'>
									<div class='card-header'>
										Total Earnings this Year
									</div>
									<div class='card-body'>
										<div class='d-flex'>
											<h5 class='card-title me-auto'>₱ 100,000,000.00</h5>
											<span class='badge text-bg-success p-1 align-middle d-flex align-items-center'>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M3.55375 17.5479L2.5 16.4941L9.352 9.5921L13.352 13.5921L18.9655 8.04785H16V6.54785H21.5V12.0479H20V9.10185L13.352 15.7499L9.352 11.7499L3.55375 17.5479Z" fill="#31D000"/>
												</svg>
												<p class='ms-2'>+12%</p>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class='d-flex mb-4'>
								<div class='card'>
									<div class='card-header'>
										Customers
									</div>
									<div class='card-body'>
										<div class='d-flex'>
											<h5 class='card-title me-auto'>19</h5>
											<span class='badge text-bg-success p-1 align-middle d-flex align-items-center'>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M3.55375 17.5479L2.5 16.4941L9.352 9.5921L13.352 13.5921L18.9655 8.04785H16V6.54785H21.5V12.0479H20V9.10185L13.352 15.7499L9.352 11.7499L3.55375 17.5479Z" fill="#31D000"/>
												</svg>
												<p class='ms-2'>+8</p>
											</span>
										</div>
									</div>
								</div>	
								<div class='card ms-4'>
									<div class='card-header'>
										Orders
									</div>
									<div class='card-body'>
										<div class='d-flex'>
											<h5 class='card-title me-auto'>56</h5>
											<span class='badge text-bg-success p-1 align-middle d-flex align-items-center'>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M3.55375 17.5479L2.5 16.4941L9.352 9.5921L13.352 13.5921L18.9655 8.04785H16V6.54785H21.5V12.0479H20V9.10185L13.352 15.7499L9.352 11.7499L3.55375 17.5479Z" fill="#31D000"/>
												</svg>
												<p class='ms-2'>+8</p>
											</span>
										</div>
									</div>
								</div>
								<div class='card ms-4'>
									<div class='card-header'>
										Items
									</div>
									<div class='card-body'>
										<div class='d-flex'>
											<h5 class='card-title me-auto'>8</h5>
											<span class='badge text-bg-danger p-1 align-middle d-flex align-items-center'>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M16 18V16H18.6L13.4 10.85L9.4 14.85L2 7.4L3.4 6L9.4 12L13.4 8L20 14.6V12H22V18H16Z" fill="#EA3323"/>
												</svg>
												<p class='ms-2'>-3</p>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class='d-flex charts'>
								<div class='chart-holder earnings-chart-wrapper'>
									<canvas class='charts' id='earnings-chart'></canvas>
								</div>
								<div class='chart-holder item-sold-chart-wrapper'>
									<canvas class='charts' id='item-sold-chart'></canvas>
								</div>
							</div>
						</div>
					</main>
				</div>

				<xsl:call-template name='log-out-modal'/>
				
				<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
				<script type='module' src='../../../script/water_station/ws_dashboard.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>