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
		<html lang='en'>
			<head>
				<meta charset='UTF-8'/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
				<title>Water Stations | Customer</title>
				<link rel='shortcut icon' href='../../../../public/favicon.ico' type='image/x-icon'/>
                <link rel='stylesheet' href='../../../styles/customer/pages/cs_water_stations.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='cs-side-bar'/>
				
                <div class='cont d-flex flex-column h-100 w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
						<h4>Water Stations</h4>
					</header>

					<main>
						<div class='d-flex h-100'>
							<div class='section water-stations-section d-flex flex-column'>
								<div class='me-4'>	
									<div class='input-group mb-3'>
										<input type='text' id='search-inp' class='form-control' aria-describedby='search-btn' placeholder='Search Water Station'/>
										<button class='btn btn-outline-secondary' type='button' id='search-clear'>
											<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#005691'><path d='M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z'/></svg>
										</button>
									</div>
								</div>
								<div id='water-station-list' class='water-station-list section d-flex flex-column overflow-auto border rounded me-4'>	

									<xsl:for-each select='$customer-data/h2go/water-stations/water-station'>
									
										<div class='d-flex water-station-row d-flex p-3' 
											data-ws-name='water-station-details/name'
										>
											<div class='d-flex flex-column'>
												<h6 class='mb-2 ws-name'><xsl:value-of select='water-station-details/name'/></h6>
												<div class='review-section d-flex align-items-center text-center'>
													<p class='review-stars'><xsl:value-of select='water-station-details/reviews/stars'/></p>
													<span class='review-stars-icon px-1' data-stars='{water-station-details/reviews/stars}'></span>
													<p class='review-nums'>(<xsl:value-of select='water-station-details/reviews/num-of-review'/>)</p>
												</div>
												<p class='ws-address'><xsl:value-of select='water-station-details/address'/></p>
												<p class='ws-status fw-semibold mt-2' data-status='{water-station-details/status}'><xsl:value-of select='water-station-details/status'/></p>
											</div>
											<div class='ms-auto ps-3 d-flex align-items-start'>
												<a href='../pages/cs_p_water_station_details.xml?ws-id={@id}&amp;ws-name={water-station-details/name}'> <!-- TODO-->
													<svg class='go-to-ws' width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M24 31.8L31.3 24.5L24 17.2L21.9 19.3L25.6 23H16.5V26H25.6L21.9 29.7L24 31.8ZM24 44.5C21.2667 44.5 18.6833 43.975 16.25 42.925C13.8167 41.875 11.6917 40.4417 9.875 38.625C8.05833 36.8083 6.625 34.6833 5.575 32.25C4.525 29.8167 4 27.2333 4 24.5C4 21.7333 4.525 19.1333 5.575 16.7C6.625 14.2667 8.05833 12.15 9.875 10.35C11.6917 8.55 13.8167 7.125 16.25 6.075C18.6833 5.025 21.2667 4.5 24 4.5C26.7667 4.5 29.3667 5.025 31.8 6.075C34.2333 7.125 36.35 8.55 38.15 10.35C39.95 12.15 41.375 14.2667 42.425 16.7C43.475 19.1333 44 21.7333 44 24.5C44 27.2333 43.475 29.8167 42.425 32.25C41.375 34.6833 39.95 36.8083 38.15 38.625C36.35 40.4417 34.2333 41.875 31.8 42.925C29.3667 43.975 26.7667 44.5 24 44.5Z" fill="#005691"/>
													</svg>
												</a>
											</div>
										</div>
										<hr/>

									</xsl:for-each>

								</div>
							</div>
							<div class='section map-section d-flex flex-column position-relative overflow-hidden'>
								<iframe id='map' class='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d701.8502511330269!2d121.07487913377683!3d14.562166000612182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c87941df8e2b%3A0xc7cd5073d3d73742!2sPamantasan%20ng%20Lungsod%20ng%20Pasig!5e1!3m2!1sen!2sph!4v1746078475324!5m2!1sen!2sph"  
									allowfullscreen="" 
									loading="lazy" 
									referrerpolicy="no-referrer-when-downgrade">
								</iframe>
								<button id='collapse-btn' class='collapse-btn position-absolute'>
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M560-280 360-480l200-200v400Z"/></svg>
								</button>
							</div>
						</div>
					</main>
				</div>
				
				<xsl:call-template name='log-out-modal'/>
				
				<script type='module' src='../../../script/customer/cs_water_stations.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>