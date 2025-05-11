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
                <link rel='stylesheet' href='../../../styles/customer/pages/cs_settings.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='cs-side-bar'/>
				
                <div class='cont d-flex flex-column h-100 w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
						<h4>Settings</h4>
                    </header>

					<main class='overflow-auto'>
                       <div class='d-flex justify-content-center h-100'>
							<div class='wrapper rounded-3 border d-flex'>
								<div class='border-end p-3 w-25'>
									<nav class="nav flex-column" role='tablist'>
										<button class='text-start nav-link active' id='nav-profile-tab' data-bs-toggle='tab' data-bs-target='#nav-profile' type='button' role='tab' aria-controls='nav-profile' aria-selected='true'>
											Profile
										</button>
    									<button class='text-start nav-link' id='nav-security-tab' data-bs-toggle='tab' data-bs-target='#nav-security' type='button' role='tab' aria-controls='nav-security' aria-selected='false'>
											Security
										</button>
									</nav>
								</div>
								<div class='p-4 overflow-auto w-100 tab-content'>

									<div class='tab-pane fade show active' id='nav-profile' role='tabpanel' aria-labelledby='nav-details' tabindex='0'>
										<h5 class='fw-semibold mb-3'>Profile</h5>
										
                                        <form id='profile-form' class='needs-validation' novalidate='true'>

                                            <!--? SOME VALUE WILL SET DYNAMICALLY -->
                                            <input id='hidden-data-for-name' type='hidden' value='{$customer/personal-details/name}'/>
                                            <input id='hidden-data-for-gender' type='hidden' value='{$customer/personal-details/gender}'/>

											<div class='mb-3 has-validation'>
												<label for='cs-fname' class='form-label'>First name</label>
                                                <input id='cs-fname' type='text' aria-label='First name' class='form-control' data-fb='First Name' required='true' pattern='[A-Za-z\s]+' disabled='true'/>    
										        <div id='cs-fname-invalid-fb' class="invalid-feedback"></div>
                                            </div>
											<div class='mb-3 has-validation'>
												<label for='cs-lname' class='form-label'>Last name</label>
                                                <input id='cs-lname' type='text' aria-label='Last name' class='form-control' data-fb='Last Name' required='true' pattern='[A-Za-z\s]+' disabled='true'/>
                                                <div id='cs-lname-invalid-fb' class="invalid-feedback"></div>
											</div>
                                            <div class='mb-3 has-validation'>
                                                <label for='cs-gender' class='form-label'>Gender</label>
                                                <select id='cs-gender' class='form-select' aria-label='Select Gender' data-fb='Gender' required='true' disabled='true'>
                                                    <option value='' selected='true' disabled='true'>Select Gender</option>
                                                    <option value='M'>Male</option>
                                                    <option value='F'>Female</option>
                                                </select>
										        <div id='cs-gender-invalid-fb' class="invalid-feedback"></div>
                                            </div>
											<div class='mb-3 has-validation'>
												<label for='cs-contact-num' class='form-label'>Contact Number</label>
                                                <input id='cs-contact-num' type='tel' aria-label='Contact Number' class='form-control' maxLength='11' data-fb='Contact Number' data-initial='{$customer/personal-details/contact-number}' value='{$customer/personal-details/contact-number}' required='true' disabled='true'/>
                                                <div id='cs-contact-num-invalid-fb' class="invalid-feedback"></div>
											</div>
											<div class='mb-3 has-validation'>
												<label for='cs-address' class='form-label'>Address</label>
                                                <textarea id='cs-address' class='form-control' rows='3' data-fb='Address' data-initial='{$customer/personal-details/address}' required='true' disabled='true'>
													<xsl:value-of select='$customer/personal-details/address'/>
												</textarea>
                                                <div id='cs-address-invalid-fb' class="invalid-feedback"></div>
											</div>
											<div class='d-flex justify-content-end'>
												<button id='cancel-edit-details-btn' type='button' class='btn btn-outline-primary me-3' data-bs-toggle='modal' data-bs-target='#notif-modal'>Cancel</button>
												<button id='edit-details-btn' type='button' class='btn btn-primary'>Edit Details</button>
											</div>
										</form>
									</div>

									<div class='tab-pane fade' id='nav-security' role='tabpanel' aria-labelledby='nav-security' tabindex='0'>
										<h5 class='fw-semibold mb-3'>Security</h5>

                                        <!-- TODO:  -->

										<!-- <form action="">
											<div class='mb-3'>
												<label for='email' class='form-label'>Email</label>
												<input type='email' id='email' class='form-control' disabled='true' value='{$customer/account-details/email}' data-initial='{$customer/account-details/email}'/>
											</div>
											<div id='edit-email-btn-wrapper' class='mb-3'>
												<button id='edit-email-btn' type='button' class='btn btn-primary w-100'>Edit Email</button>
												<div id='edit-email-util-container' class='d-flex'>
													<button id='cancel-edit-email-btn' type='button' class='btn btn-outline-primary w-100 me-3' data-bs-toggle='modal' data-bs-target='#notif-modal'>Cancel</button>
													<button id='save-edit-email-btn' type='button' class='btn btn-primary w-100' data-bs-toggle='modal' data-bs-target='#verification-modal'>Save</button>
												</div>
											</div>
											<button id='change-pass-btn' type='button' class='btn btn-outline-primary w-100 ' data-bs-toggle='modal' data-bs-target='#verification-modal'>Change Password</button>
										</form> -->
									</div>

								</div>
							</div>
						</div>
					</main>
				</div>
                
				<xsl:call-template name='log-out-modal'/>
				<xsl:call-template name='toast-container'/>

				<script type='module' src='../../../script/customer/cs_settings.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>