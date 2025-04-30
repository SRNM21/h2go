<?xml version='1.0'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>
	<xsl:output method="html" indent="yes"/>
	<xsl:variable name="side-bar-data" select="document('../../../../data/system/water_station/ws_sidebar_data.xml')"/>

    <xsl:template name='ws-side-bar'>
        <div class='side-bar p-4 border-end d-flex flex-column'>
            <div class='main-navs'>
                <xsl:for-each select="$side-bar-data/ws-sidebar/item[position() &lt; last()]">
                    <a href='../pages/ws_p_{link}' id='{@id}' class='d-flex flex-row p-2 rounded navs'>
                        <span class='me-2'><xsl:copy-of select="svg-icon/*"/></span>
                        <span class='nav-label'><xsl:value-of select="label"/></span>
                    </a>
                </xsl:for-each>
            </div>
            <xsl:variable name="side-bar-last" select="$side-bar-data/ws-sidebar/item[last()]"/>
            <button type='button' id='{$side-bar-last/@id}' class='d-flex flex-row p-2 btn rounded navs danger-nav' data-bs-toggle='modal' data-bs-target='#log-out-modal'>
                <span class='me-2'><xsl:copy-of select="$side-bar-last/svg-icon/*"/></span>
                <span class='nav-label'><xsl:value-of select="$side-bar-last/label"/></span>
            </button>
        </div>
        
    </xsl:template>

</xsl:stylesheet>