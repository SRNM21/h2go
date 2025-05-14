<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method='html' indent='yes'/>

	<!--* DATA -->
	<xsl:variable name='water-station-id' select="document('../../../../../data/system/water_station/ws_data.xml')/water-station-id"/>
	<xsl:variable name='water-station-data' select="document('../../../../../data/client/h2go_clients.xml')"/>
	<xsl:variable name='water-station' select='$water-station-data/h2go/water-stations/water-station[@id = $water-station-id]'></xsl:variable>
	<xsl:variable name='customers' select='$water-station-data/h2go/customers'></xsl:variable>
	
	<!--* COMPONENTS -->
	<xsl:include href='../../../../components/ws_sidebar.xsl'/>
	<xsl:include href='../../../../components/ws_logout_modal.xsl'/>

    <xsl:template match='/'>
		<html lang='en'>
			<head>
				<meta charset='UTF-8'/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0'/>
				<title>Messages | Water Station</title>
				<link rel='shortcut icon' href='../../../../public/favicon.ico' type='image/x-icon'/>
                <link rel='stylesheet' href='../../../styles/water_station/pages/ws_messages.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='ws-side-bar'/>
				 
				<div class='cont w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
						<h4>Messages</h4>
					</header>

					<main>
						<div class='d-flex h-100'>
							<div class='section contacts-section d-flex flex-column'>

								<div class=''>	
									<div class='input-group mb-3'>
										<input type='text' id='search-inp' class='form-control' aria-describedby='search-btn' placeholder='Search Contact'/>
										<button class='btn btn-outline-secondary' type='button' id='search-clear'>
											<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#005691'><path d='M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z'/></svg>
										</button>
									</div>
								</div>

								<div id='contact-list' class='contact-list section d-flex flex-column border rounded overflow-auto'>	

									<xsl:for-each select='$water-station/messages/message'>
										<xsl:variable name='customer-id' select='./customer-id'/>
										<xsl:variable name='customer' select='$customers/customer[@id=$customer-id]'/>

										<div class='contact mb-3 p-3 d-flex w-100'
											data-message-id='{@id}'
											data-customer-name='{$customer/personal-details/name}'
										>
											<span class='me-3 position-relative placeholder-glow' aria-hidden="true">
												<img src='' alt='Contact Profile' class='placeholder-glow contact-profile' data-customer-name='{$customer/personal-details/name}'/>
												<span class="placeholder position-absolute rounded-circle top-0 start-0"></span>
											</span>
											<div class='d-flex flex-column'>
												<p class='contact-name'><xsl:value-of select='$customer/personal-details/name'/></p>
												<span class="d-inline-block text-truncate">
													<xsl:value-of select='./chats/chat[last()]/content'/>
												</span>
											</div>
										</div>

									</xsl:for-each>

								</div>
							</div>
							<div class='section message-section ms-4 d-flex flex-column border'>
								
								<xsl:variable name='message' select='$water-station/messages/message[position() = "1"]'/>
								<xsl:variable name='customer-id' select='$message/customer-id'/>
								<xsl:variable name='customer' select='$customers/customer[@id=$customer-id]'/>

								<div class='contact-in-message mb-3 p-3 d-flex w-100 border-bottom'>
									<span class='me-3 position-relative placeholder-glow' aria-hidden="true">
										<img id='current-message-img' src='' alt='Contact Profile' class='placeholder-glow contact-profile' data-customer-name='{$customer/personal-details/name}'/>
										<span class="placeholder position-absolute rounded-circle top-0 start-0"></span>
									</span>
									<div class='d-flex align-items-center'>
										<h5 id='current-message-name'><xsl:value-of select='$customer/personal-details/name'/></h5>
									</div>
								</div>

								<div id='messages-container' class='section overflow-auto p-3'>
									<xsl:for-each select='$water-station/messages/message[position() ="1"]/chats/chat'>
								
										<div class='mb-2 d-flex messgage-row' data-sender='{@sender}'>
											<span class='message-bubble rounded-3 p-3'>
												<xsl:value-of select='content'/>
												<span class="message-tooltip p-2 rounded text-center"><xsl:value-of select='date-and-time'/></span>
											</span>
										</div>

									</xsl:for-each>

								</div>

								<div class='p-3 d-flex border-top'>
									<div class='input-group'>
										<input type='text' id='message-inp' class='form-control' aria-describedby='message-send-btn' placeholder='Aa'/>
										<button class='btn btn-outline-secondary' type='button' id='message-send-btn'>
											<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z"/></svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>

				<xsl:call-template name='log-out-modal'/>
				
				<script type='module' src='../../../script/water_station/ws_messages.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>