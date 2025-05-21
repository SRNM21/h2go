<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>

    <xsl:template name='terms-modal'>

        <div id='terms-modal' class='modal fade' tabindex='-1' aria-labelledby='terms-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
            <div class='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h6 id='terms-modal-label' class='modal-title'>Terms and Conditions &amp; Privacy Policy for H2GO</h6>
                        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div id='terms-modal-content' class='modal-body'>
                        
                        <div class='row'>
                            <div class='col-12'>
                                <div class='card mb-4 shadow-sm'>
                                    <div class='card-body'>
                                        <h5>Terms and Conditions</h5>
                                        
                                        <h6>1. Account Registration</h6>
                                        <p class='lead'>By creating an account with our H2GO, you agree to provide accurate, current, and complete information during the registration process. This information includes but is not limited to your name, gender, residential address, and contact number.</p>
                                        
                                        <h6>2. Use of Personal Information</h6>
                                        <p>The personal information you provide will be primarily used to:</p>
                                        <ul class='list-group list-group-flush mb-3'>
                                            <li class='list-group-item'>Process and fulfill your water delivery orders</li>
                                            <li class='list-group-item'>Ensure accurate shipping to your specified address</li>
                                            <li class='list-group-item'>Contact you regarding your orders and deliveries</li>
                                            <li class='list-group-item'>Maintain your account and order history</li>
                                        </ul>
                                        
                                        <h6>3. User Responsibilities</h6>
                                        <p>You are responsible for:</p>
                                        <ul class='list-group list-group-flush mb-3'>
                                            <li class='list-group-item'>Maintaining the confidentiality of your account information</li>
                                            <li class='list-group-item'>Providing accurate shipping details</li>
                                            <li class='list-group-item'>Updating your information if it changes</li>
                                            <li class='list-group-item'>Ensuring someone is available to receive deliveries at the specified address</li>
                                        </ul>
                                        
                                        <h6>4. Service Limitations</h6>
                                        <p>Our delivery service is subject to:</p>
                                        <ul class='list-group list-group-flush mb-3'>
                                            <li class='list-group-item'>Geographic service area restrictions</li>
                                            <li class='list-group-item'>Delivery schedule availability</li>
                                            <li class='list-group-item'>Inventory availability</li>
                                            <li class='list-group-item'>Weather and other conditions beyond our control</li>
                                        </ul>
                                        
                                        <h6>5. Modifications</h6>
                                        <p>We reserve the right to modify these terms at any time. Continued use of our service following any changes constitutes acceptance of the modified terms.</p>
                                    </div>
                                </div>
                                
                                <div class='card mb-4 shadow-sm'>
                                    <div class='card-body'>
                                        <h2>Privacy Policy</h2>
                                        
                                        <h6>1. Information Collection</h6>
                                        <p>We collect the following personal information:</p>
                                        <ul class='list-group list-group-flush mb-3'>
                                            <li class='list-group-item'>Full name</li>
                                            <li class='list-group-item'>Gender</li>
                                            <li class='list-group-item'>Complete residential address</li>
                                            <li class='list-group-item'>Contact number</li>
                                        </ul>
                                        
                                        <h6>2. Purpose of Collection</h6>
                                        <p>Your personal information is collected strictly for:</p>
                                        <ul class='list-group list-group-flush mb-3'>
                                            <li class='list-group-item'>Order processing and fulfillment</li>
                                            <li class='list-group-item'>Delivery coordination</li>
                                            <li class='list-group-item'>Account management</li>
                                            <li class='list-group-item'>Communication regarding your orders and service</li>
                                        </ul>
                                        
                                        <h6>3. Information Storage and Security</h6>
                                        <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. Your data is stored on secure servers with restricted access.</p>
                                        
                                        <h6>4. Information Sharing</h6>
                                        <p>We do not sell your personal information to third parties. We may share your information with:</p>
                                        <ul class='list-group list-group-flush mb-3'>
                                            <li class='list-group-item'>Delivery personnel (limited to name, address, and contact number)</li>
                                            <li class='list-group-item'>Payment processors (for transaction purposes only)</li>
                                            <li class='list-group-item'>Service providers who assist in our operations</li>
                                        </ul>
                                        
                                        <h6>5. Data Retention</h6>
                                        <p>We retain your personal information for as long as your account remains active or as needed to provide services. You may request deletion of your account and personal information at any time.</p>
                                        
                                        <h6>6. Your Rights</h6>
                                        <p>You have the right to:</p>
                                        <ul class='list-group list-group-flush mb-3'>
                                            <li class='list-group-item'>Access your personal information</li>
                                            <li class='list-group-item'>Correct inaccurate information</li>
                                            <li class='list-group-item'>Request deletion of your data</li>
                                            <li class='list-group-item'>Opt out of marketing communications</li>
                                        </ul>
                                        
                                        <h6>7. Contact Us</h6>
                                        <p>For questions or concerns about this privacy policy or your personal information, please contact our customer service department through the provided channels on our website or application.</p>
                                    </div>
                                </div>
                                
                                <div class='footer text-center'>
                                    <div class='alert alert-secondary'>
                                        <p class='mb-0'>By creating an account and using our H2GO, you acknowledge that you have read, understood, and agree to these Terms and Conditions and Privacy Policy.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
                        <a href='../auth/ws_sign_in.html' class='btn btn-danger primary-modal-btn' >Log Out</a>
                    </div>
                </div>
            </div>
        </div>
        
    </xsl:template>

</xsl:stylesheet>