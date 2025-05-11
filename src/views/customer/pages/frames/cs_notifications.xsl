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
                <link rel='stylesheet' href='../../../styles/customer/pages/cs_notifications.css'/>
			</head>
			<body class='d-flex w-100 h-100'>
				<xsl:call-template name='cs-side-bar'/>
				
                <div class='cont d-flex flex-column h-100 w-100'>

					<!--* HEADER -->
					<header class='d-flex'>
						<h4>Notifications</h4>

                        <div class='dropdown filter-dd ms-auto'>
                            <button class='btn btn-sm btn-outline-primary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>All</button>
                            <ul class='dropdown-menu'>
                                <li>
                                    <button type='button' class='dropdown-item filter-all d-flex align-items-center gap-1'>All</button>
                                </li>
                                <li>
                                    <button type='button' class='dropdown-item filter-read d-flex align-items-center gap-1'>Read</button>
                                </li>
                                <li>
                                    <button type='button' class='dropdown-item filter-unread d-flex align-items-center gap-1'>Unread</button>
                                </li>
                            </ul>
                        </div>
                    </header>

					<main class='overflow-auto'>
                        <div class='d-flex h-100 justify-content-center'>
                            <div class='notifications-wrapper w-100'>
                                
                                <xsl:for-each select='$customer/notifications/notification'>
                                    <xsl:sort select='date-and-time' order='descending'/> 
                                    
                                    <xsl:variable name='icon-type' select='icon-type'/>
                                    <xsl:variable name='read' select='read'/>

                                    <div class='card d-flex mb-3 notification hide' data-read='{read}' data-link='{$icon-type}'>
                                        <div class='card-body d-flex flex-row'>
                                            <div class='icon-wrapper p-2 me-3 rounded-3'>
                                                <span class='icon-holder'>

                                                <xsl:choose>
                                                    <xsl:when test='$icon-type = "order"'>

                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M291.02-98.31q-26.74 0-45.22-18.81-18.49-18.82-18.49-45.71T246-208.32q18.7-18.6 45.43-18.6 26.72 0 45.42 18.81 18.69 18.81 18.69 45.71 0 26.89-18.81 45.49-18.82 18.6-45.71 18.6Zm387.69 0q-26.73 0-45.22-18.81Q615-135.94 615-162.83t18.7-45.49q18.69-18.6 45.42-18.6t45.42 18.81q18.69 18.81 18.69 45.71 0 26.89-18.81 45.49-18.82 18.6-45.71 18.6Zm-469.09-692.3h554.81q24.51 0 37.08 21.19 12.56 21.19.56 42.96L679.14-503.74q-9.99 16.59-25.62 26.55-15.64 9.96-33.75 9.96H324l-55.23 102.07q-2.69 4.62 0 10.01 2.69 5.38 8.46 5.38h466v45.38H283.92q-37.77 0-54.53-26.07-16.77-26.08.3-57.62l64.39-117.23-151.23-319.31H67.92V-870h104.31l37.39 79.39Z"/></svg>
                                                    
                                                    </xsl:when>
                                                    <xsl:when test='$icon-type = "message"'>

                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M100-118.46v-669.23Q100-818 121-839q21-21 51.31-21h615.38Q818-860 839-839q21 21 21 51.31v455.38Q860-302 839-281q-21 21-51.31 21H241.54L100-118.46ZM250-410h300v-60H250v60Zm0-120h460v-60H250v60Zm0-120h460v-60H250v60Z"/></svg>

                                                    </xsl:when>
                                                    <xsl:when test='$icon-type = "account"'>

                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m387.69-100-15.23-121.85q-16.07-5.38-32.96-15.07-16.88-9.7-30.19-20.77L196.46-210l-92.3-160 97.61-73.77q-1.38-8.92-1.96-17.92-.58-9-.58-17.93 0-8.53.58-17.34t1.96-19.27L104.16-590l92.3-159.23 112.46 47.31q14.47-11.46 30.89-20.96t32.27-15.27L387.69-860h184.62l15.23 122.23q18 6.54 32.57 15.27 14.58 8.73 29.43 20.58l114-47.31L855.84-590l-99.15 74.92q2.15 9.69 2.35 18.12.19 8.42.19 16.96 0 8.15-.39 16.58-.38 8.42-2.76 19.27L854.46-370l-92.31 160-112.61-48.08q-14.85 11.85-30.31 20.96-15.46 9.12-31.69 14.89L572.31-100H387.69Zm92.77-260q49.92 0 84.96-35.04 35.04-35.04 35.04-84.96 0-49.92-35.04-84.96Q530.38-600 480.46-600q-50.54 0-85.27 35.04T360.46-480q0 49.92 34.73 84.96Q429.92-360 480.46-360Z"/></svg>

                                                    </xsl:when>
                                                </xsl:choose>

                                                </span>
                                            </div>
                                            <div class='d-flex flex-fill flex-column'>
                                                <h6 class='notif-title'><xsl:value-of select='title'/></h6>
                                                <p class='notif-description'><xsl:value-of select='description'/></p>
                                                <p class='notif-date-time' data-date-time='{date-and-time}'></p>
                                            </div>
                                            <div class='more-options'>
                                                <div class='dropdown'>
                                                    <button class='btn dropdown-toggle more-option-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M480-189.23q-24.75 0-42.37-17.63Q420-224.48 420-249.23q0-24.75 17.63-42.38 17.62-17.62 42.37-17.62 24.75 0 42.37 17.62Q540-273.98 540-249.23q0 24.75-17.63 42.37-17.62 17.63-42.37 17.63ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm0-230.77q-24.75 0-42.37-17.62Q420-686.02 420-710.77q0-24.75 17.63-42.37 17.62-17.63 42.37-17.63 24.75 0 42.37 17.63Q540-735.52 540-710.77q0 24.75-17.63 42.38-17.62 17.62-42.37 17.62Z"/></svg>
                                                    </button>
                                                    <ul class='dropdown-menu'>
                                                        <li>
                                                            <button type='button' class='dropdown-item d-flex align-items-center gap-1 mark-read-action'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M382-253.85 168.62-467.23 211.38-510 382-339.38 748.62-706l42.76 42.77L382-253.85Z"/></svg>
                                                                
                                                                <xsl:choose>
                                                                    <xsl:when test='$read = "True"'>
                                                                        <p>Mark as unread</p>
                                                                    </xsl:when>
                                                                    <xsl:otherwise>
                                                                        <p>Mark as read</p>
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type='button' class='dropdown-item d-flex align-items-center gap-1 delete-notif-action'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="m376-333.85 104-104 104 104L626.15-376l-104-104 104-104L584-626.15l-104 104-104-104L333.85-584l104 104-104 104L376-333.85ZM172.31-180Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h615.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Zm0-60h615.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM160-240v-480 480Z"/></svg>
                                                                <p>Delete this notification</p>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </xsl:for-each>

                                <button id='load-more-notifications' class='btn btn-primary p-2 w-100 mb-3'>See Previous Notifications</button>

                            </div>
                        </div>
					</main>
				</div>
                
				<xsl:call-template name='log-out-modal'/>
				<xsl:call-template name='toast-container'/>

				<script type='module' src='../../../script/customer/cs_notifications.js'></script>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>