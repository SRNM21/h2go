<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>

    <xsl:template name='otp-modal'>
       
        <div id='otp-modal' class='modal fade' tabindex='-1' aria-labelledby='otp-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
            <div class='modal-dialog modal-dialog-centered'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 id='otp-modal-label' class='modal-title'>2FA OTP</h5>
                        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div id='otp-modal-content' class='modal-body'>
                        <div class='ws-sign-in-form-wrapper d-flex justify-content-center align-items-center flex-column '>
                            <div class='otp-illustration-holder mb-4'>
                                <img src='' alt=''/>
                            </div>
                            <div class='d-flex flex-column align-items-center mb-3 text-center'>
                                <p id='otp-text'></p>
                            </div>
                            <div class='form-content w-100'>
                                <form action=''>
                                    <div class='pin-input mb-3 d-flex w-100 d-flex justify-content-center'>
                                        <input type='text' maxlength='1' min='0' max='9' class='form-control v-pin me-2'/>
                                        <input type='text' maxlength='1' min='0' max='9' class='form-control v-pin me-2'/>
                                        <input type='text' maxlength='1' min='0' max='9' class='form-control v-pin me-2'/>
                                        <input type='text' maxlength='1' min='0' max='9' class='form-control v-pin me-2'/>
                                        <input type='text' maxlength='1' min='0' max='9' class='form-control v-pin'/>
                                    </div>
                                    <div>
                                        <button id='otp-submit-btn' type='button' class='btn btn-primary w-100'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    

    </xsl:template>

</xsl:stylesheet>