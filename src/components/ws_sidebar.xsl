<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method="html" indent="yes"/>

	<xsl:variable name="side-bar-data" select="document('../../../../data/system/water_station/ws_sidebar_data.xml')"/>
    
	<xsl:variable name='sb-water-station-id' select="document('../../../../data/system/water_station/ws_data.xml')/water-station-id"/>
	<xsl:variable name='sb-water-station-data' select="document('../../../../data/client/h2go_clients.xml')"/>
	<xsl:variable name='sb-water-station' select='$water-station-data/h2go/water-stations/water-station[@id = $water-station-id]'/>

    <xsl:template name='ws-side-bar'>
        <div class='side-bar py-4 border-end d-flex flex-column'>
            <div class='main-navs pe-4'>
                <xsl:for-each select="$side-bar-data/ws-sidebar/item[position() &lt; last()]">
                    <a href='../pages/ws_p_{link}' id='{@id}' class='d-flex flex-row p-2 rounded navs'>
                        <span class='me-2 ps-4'><xsl:copy-of select="svg-icon/*"/></span>
                        <span class='nav-label'><xsl:value-of select="label"/></span>
                    </a>
                </xsl:for-each>
            </div>
            <hr/>
            <xsl:variable name="side-bar-last" select="$side-bar-data/ws-sidebar/item[last()]"/>
            <div class='d-flex flex-column pe-4 pt-4'>
                <div class='d-flex p-1 '>
                    <div class='acc-img-holder ps-4 me-2'>
                        <img id='acc-img-profile' class='acc-img-profile rounded-circle' src='../../../assets/images/landing_page_img.jpg' alt=''/>
                    </div>
                    <div class='d-flex flex-column nav-label sb-account-info-holder overflow-hidden'>
                        <h6 class='sb-account-email text-truncate'><xsl:value-of select="$sb-water-station/account-details/email"/></h6>
                        <p class='sb-account-name text-truncate'><xsl:value-of select="$sb-water-station/water-station-details/name"/></p>
                    </div>
                </div>
                <button type='button' id='{$side-bar-last/@id}' class='d-flex flex-row p-2 mt-3 btn rounded navs danger-nav' data-bs-toggle='modal' data-bs-target='#log-out-modal'>
                    <span class='me-2 ps-4'><xsl:copy-of select="$side-bar-last/svg-icon/*"/></span>
                    <span class='nav-label'><xsl:value-of select="$side-bar-last/label"/></span>
                </button>
            </div>
        </div>
        
    </xsl:template>

</xsl:stylesheet>