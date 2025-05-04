<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>

    <xsl:template name='log-out-modal'>

        <div id='log-out-modal' class='modal fade' tabindex='-1' aria-labelledby='log-out-modal-label' aria-hidden='true' data-bs-backdrop='static' data-bs-keyboard='false'>
            <div class='modal-dialog modal-dialog-centered'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 id='log-out-modal-label' class='modal-title'>Log Out</h5>
                        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div id='log-out-modal-content' class='modal-body'>
                        <p>Do you really want to log out?</p>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-outline-primary' data-bs-dismiss='modal'>Cancel</button>
                        <a href='../auth/cs_sign_in.html' class='btn btn-danger primary-modal-btn' >Log Out</a>
                    </div>
                </div>
            </div>
        </div>
        
    </xsl:template>

</xsl:stylesheet>