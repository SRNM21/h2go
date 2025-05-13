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
	<xsl:include href='../../../../components/verification_modal.xsl'/>
	<xsl:include href='../../../../components/toast_container.xsl'/>

    <xsl:template match='/'>
		<html>
			<head>
                <link rel='stylesheet' href='../../../styles/water_station/pages/ws_settings.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='ws-side-bar'/>
				 
				<div class='cont w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
						<h4>Settings</h4>
					</header>

					<main class='overflow-auto'>
						<div class='d-flex justify-content-center h-100'>
							<div class='wrapper rounded-3 border d-flex'>
								<div class='border-end p-3 w-25'>
									<nav class="nav flex-column" role='tablist'>
										<button class='text-start nav-link' id='nav-profile-tab' data-bs-toggle='tab' data-bs-target='#nav-profile' type='button' role='tab' aria-controls='nav-profile' aria-selected='true'>
											<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#005691'><path d='M240.92-268.31q51-37.84 111.12-59.77Q412.15-350 480-350t127.96 21.92q60.12 21.93 111.12 59.77 37.3-41 59.11-94.92Q800-417.15 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.85 21.81 116.77 21.81 53.92 59.11 94.92ZM480.01-450q-54.78 0-92.39-37.6Q350-525.21 350-579.99t37.6-92.39Q425.21-710 479.99-710t92.39 37.6Q610-634.79 610-580.01t-37.6 92.39Q534.79-450 480.01-450ZM480-100q-79.15 0-148.5-29.77t-120.65-81.08q-51.31-51.3-81.08-120.65Q100-400.85 100-480t29.77-148.5q29.77-69.35 81.08-120.65 51.3-51.31 120.65-81.08Q400.85-860 480-860t148.5 29.77q69.35 29.77 120.65 81.08 51.31 51.3 81.08 120.65Q860-559.15 860-480t-29.77 148.5q-29.77 69.35-81.08 120.65-51.3 51.31-120.65 81.08Q559.15-100 480-100Zm0-60q54.15 0 104.42-17.42 50.27-17.43 89.27-48.73-39-30.16-88.11-47Q536.46-290 480-290t-105.77 16.65q-49.31 16.66-87.92 47.2 39 31.3 89.27 48.73Q425.85-160 480-160Zm0-350q29.85 0 49.92-20.08Q550-550.15 550-580t-20.08-49.92Q509.85-650 480-650t-49.92 20.08Q410-609.85 410-580t20.08 49.92Q450.15-510 480-510Zm0-70Zm0 355Z'/></svg>
											Profile
										</button>
    									<button class='text-start nav-link' id='nav-account-tab' data-bs-toggle='tab' data-bs-target='#nav-account' type='button' role='tab' aria-controls='nav-account' aria-selected='false'>
											<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#005691'><path d='m387.69-100-15.23-121.85q-16.07-5.38-32.96-15.07-16.88-9.7-30.19-20.77L196.46-210l-92.3-160 97.61-73.77q-1.38-8.92-1.96-17.92-.58-9-.58-17.93 0-8.53.58-17.34t1.96-19.27L104.16-590l92.3-159.23 112.46 47.31q14.47-11.46 30.89-20.96t32.27-15.27L387.69-860h184.62l15.23 122.23q18 6.54 32.57 15.27 14.58 8.73 29.43 20.58l114-47.31L855.84-590l-99.15 74.92q2.15 9.69 2.35 18.12.19 8.42.19 16.96 0 8.15-.39 16.58-.38 8.42-2.76 19.27L854.46-370l-92.31 160-112.61-48.08q-14.85 11.85-30.31 20.96-15.46 9.12-31.69 14.89L572.31-100H387.69ZM440-160h78.62L533-267.15q30.62-8 55.96-22.73 25.35-14.74 48.89-37.89L737.23-286l39.39-68-86.77-65.38q5-15.54 6.8-30.47 1.81-14.92 1.81-30.15 0-15.62-1.81-30.15-1.8-14.54-6.8-29.7L777.38-606 738-674l-100.54 42.38q-20.08-21.46-48.11-37.92-28.04-16.46-56.73-23.31L520-800h-79.38l-13.24 106.77q-30.61 7.23-56.53 22.15-25.93 14.93-49.47 38.46L222-674l-39.38 68L269-541.62q-5 14.24-7 29.62t-2 32.38q0 15.62 2 30.62 2 15 6.62 29.62l-86 65.38L222-286l99-42q22.77 23.38 48.69 38.31 25.93 14.92 57.31 22.92L440-160Zm40.46-200q49.92 0 84.96-35.04 35.04-35.04 35.04-84.96 0-49.92-35.04-84.96Q530.38-600 480.46-600q-50.54 0-85.27 35.04T360.46-480q0 49.92 34.73 84.96Q429.92-360 480.46-360ZM480-480Z'/></svg>
											Account
										</button>
    									<button class='text-start nav-link active' id='nav-security-tab' data-bs-toggle='tab' data-bs-target='#nav-security' type='button' role='tab' aria-controls='nav-security' aria-selected='false'>
											<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='#005691'><path d='M252.31-100q-29.92 0-51.12-21.19Q180-142.39 180-172.31v-375.38q0-29.92 21.19-51.12Q222.39-620 252.31-620H300v-80q0-74.92 52.54-127.46Q405.08-880 480-880q74.92 0 127.46 52.54Q660-774.92 660-700v80h47.69q29.92 0 51.12 21.19Q780-577.61 780-547.69v375.38q0 29.92-21.19 51.12Q737.61-100 707.69-100H252.31Zm0-60h455.38q5.39 0 8.85-3.46t3.46-8.85v-375.38q0-5.39-3.46-8.85t-8.85-3.46H252.31q-5.39 0-8.85 3.46t-3.46 8.85v375.38q0 5.39 3.46 8.85t8.85 3.46ZM480-290q29.15 0 49.58-20.42Q550-330.85 550-360t-20.42-49.58Q509.15-430 480-430t-49.58 20.42Q410-389.15 410-360t20.42 49.58Q450.85-290 480-290ZM360-620h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z'/></svg>
											Security
										</button>
									</nav>
								</div>
								<div class='p-4 overflow-auto w-100 tab-content'>

									<div class='tab-pane fade show active' id='nav-profile' role='tabpanel' aria-labelledby='nav-details' tabindex='0'>
										<h5 class='fw-semibold mb-3'>Profile</h5>
										
                                        <form id='profile-form' class='needs-validation' novalidate='true'>
											<div class='mb-3 d-flex flex-column has-validation'>
												<img id='water-station-image' data-initial='../../../assets/images/products/product_placeholder.png' src='../../../assets/images/products/product_placeholder.png' alt='Water Station Image' class='water-station-image rounded-circle'/>
												<label for='ws-image' class='form-label'>Water Station Image</label>
												<input class='form-control' type='file' id='ws-image' data-fb='Water Station Image' disabled='true'/>
										        <div id='ws-image-fb' class='invalid-feedback'></div>
											</div>
											<div class='mb-3 has-validation'>
												<label for='ws-name' class='form-label'>Water Station Name</label>
												<input type='text' id='ws-name' class='form-control' data-fb='Water Station Name' disabled='true' data-initial='{$water-station/water-station-details/name}' value='{$water-station/water-station-details/name}' required='true'/>
										        <div id='ws-name-fb' class='invalid-feedback'></div>
											</div>
											<div class='mb-3 has-validation'>
												<label for='ws-contact-num' class='form-label'>Contact Number</label>
												<input type='text' id='ws-contact-num' class='form-control' data-fb='Contact Number' disabled='true' data-initial='{$water-station/water-station-details/contact-number}' value='{$water-station/water-station-details/contact-number}' required='true'/>
												<div id='ws-contact-num-fb' class='invalid-feedback'></div>
											</div>
											<div class='mb-3 has-validation'>
												<label for='ws-address' class='form-label'>Address</label>
												<textarea class='form-control' id='ws-address' rows='3' data-fb='Address' disabled='true' data-initial='{$water-station/water-station-details/address}' required='true'>
													<xsl:value-of select='$water-station/water-station-details/address'/>
												</textarea>
												<div id='ws-address-fb' class='invalid-feedback'></div>
											</div>
											<div class='d-flex justify-content-end'>
												<button id='cancel-edit-details-btn' type='button' class='btn btn-outline-primary me-3' data-bs-toggle='modal' data-bs-target='#notif-modal'>Cancel</button>
												<button id='edit-details-btn' type='button' class='btn btn-primary'>Edit Details</button>
											</div>
										</form>
									</div>

									<div class='tab-pane fade' id='nav-security' role='tabpanel' aria-labelledby='nav-security' tabindex='0'>
										<h5 class='fw-semibold mb-3'>Security</h5>
										<form action="">
											<div class='mb-3'>
												<label for='email' class='form-label'>Email</label>
												<input type='email' id='email' class='form-control' disabled='true' value='{$water-station/account-details/email}' data-initial='{$water-station/account-details/email}'/>
											</div>
											<div id='edit-email-btn-wrapper' class='mb-3'>
												<button id='edit-email-btn' type='button' class='btn btn-primary w-100'>Edit Email</button>
												<div id='edit-email-util-container' class='d-flex'>
													<button id='cancel-edit-email-btn' type='button' class='btn btn-outline-primary w-100 me-3' data-bs-toggle='modal' data-bs-target='#notif-modal'>Cancel</button>
													<button id='save-edit-email-btn' type='button' class='btn btn-primary w-100' data-bs-toggle='modal' data-bs-target='#verification-modal'>Save</button>
												</div>
											</div>
											<button id='change-pass-btn' type='button' class='btn btn-outline-primary w-100 ' data-bs-toggle='modal' data-bs-target='#verification-modal'>Change Password</button>
										</form>
									</div>

								</div>
							</div>
						</div>
					</main>
				</div>

				<!--* NOTIFY MODAL -->
				<div id='notif-modal' class='modal fade' tabindex='-1' aria-labelledby='notif-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
                    <div class='modal-dialog modal-dialog-centered'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h5 id='notif-modal-label' class='modal-title'>Discard Changes?</h5>
                                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div id='notif-modal-content' class='modal-body'>
                                <p>Discarded changes will not be saved.</p>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
                                <button id='confirm-discard-btn' type='button' class='btn btn-danger primary-modal-btn' data-bs-dismiss='modal'>Discard</button>
                            </div>
                        </div>
                    </div>
                </div>

				<!--* CHANGE PASSWORD MODAL -->
				<div id='change-pass-modal' class='modal fade' tabindex='-1' aria-labelledby='change-pass-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
					<div class='modal-dialog modal-dialog-centered'>
						<div class='modal-content'>
							<div class='modal-header'>
								<h5 id='change-pass-modal-label' class='modal-title'>Change Password</h5>
								<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
							</div>
							<div id='change-pass-modal-content' class='modal-body'>
								<div class='mb-3'>
									<label for='ws-password' class='form-label'>Password</label>
									<input type='password' id='ws-password' class='form-control'/>
								</div>
								<div class='mb-3'>
									<label for='ws-confirm-password' class='form-label'>Confirm Password</label>
									<input type='password' id='ws-confirm-password' class='form-control'/>
								</div>
								<div class='mb-3 d-flex justify-content-end'>
									<button id='show-pass-btn' type='button' class='btn btn-link btn-text'>SHOW</button>
								</div>
								<div>
									<button id='save-change-pass-btn' type='button' class='btn btn-primary w-100' data-bs-dismiss='modal'>Save</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<xsl:call-template name='verification-modal'/>
				<xsl:call-template name='log-out-modal'/>
				<xsl:call-template name='toast-container'/>

				<script type='module' src='../../../script/water_station/ws_settings.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>