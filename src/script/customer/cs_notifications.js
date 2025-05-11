import '../main.js'

var notifications = $('.notification')
const loadMoreButton = $('#load-more-notifications')
const filterDropdown = $('.filter-dd')
const filterButtons = $('.filter-dd .dropdown-menu button')

// #region LOAD NOTIFICATIONS 
$(window).on('load', function () 
{
    reloadNotifications()
    initializeFilters() // Initialize the filter functionality
    showInitialNotifications() // Show the initial set of notifications
})

function showInitialNotifications() 
{
    let notificationIndex = 0
    const notificationsPerPage = 5

    const visibleNotifications = getVisibleNotifications() // Get currently visible
    visibleNotifications.slice(0, notificationsPerPage).removeClass('hide')
    notificationIndex = notificationsPerPage

    loadMoreButton.off('click').on('click', function () { //prevent multiple click
        const nextNotifications = getVisibleNotifications().slice(notificationIndex, notificationIndex + notificationsPerPage)
        nextNotifications.animate({ opacity: '1' }, 200)
        nextNotifications.animate({ display: 'flex' }, 200)
        nextNotifications.removeClass('hide')

        scrollToBottom()

        notificationIndex += notificationsPerPage

        if (notificationIndex >= getVisibleNotifications().length) {
            loadMoreButton.hide()
        }
    })
    if (getVisibleNotifications().length <= notificationsPerPage) {
        loadMoreButton.hide()
    } else {
        loadMoreButton.show()
    }
}

// #endregion LOAD NOTIFICATIONS 

// #region RELOAD NOTIFICATION DATE

function reloadNotifications() 
{  
    notifications.each((_, e) => {

        let notif = $(e)
        let dateTime = notif.find('.notif-date-time')

        let timestamp = dateTime.data('date-time')
        
        let date = new Date(timestamp.replace(' ', 'T'))

        let now = new Date()
        let diffMs = now - date 
        let diffSeconds = Math.floor(diffMs / 1000)
        let diffMinutes = Math.floor(diffSeconds / 60)
        let diffHours = Math.floor(diffMinutes / 60)
        let diffDays = Math.floor(diffHours / 24)
        let diffWeeks = Math.floor(diffDays / 7)

        let timeAgo = ''

        if (diffMinutes < 1) 
        {
            timeAgo = 'Just now'
        } 
        else if (diffMinutes < 60)
        {
            timeAgo = `${diffMinutes}m`
        } 
        else if (diffHours < 24)
        {
            timeAgo = `${diffHours}h`
        } 
        else if (diffDays < 7) 
        {
            timeAgo = `${diffDays}d`
        } 
        else 
        {
            timeAgo = `${diffWeeks}w`
        }

        dateTime.text(timeAgo)
    })
}

// #endregion RELOAD NOTIFICATION DATE

// #region MORE ACTIONS 

const markReadActions = $('.mark-read-action')
const deleteNotificationActions = $('.delete-notif-action')

markReadActions.on('click', function() 
{
    let notification = $(this).closest('.notification')
    let read = notification.attr('data-read')

    $(this).find('p').text(read == 'True' ? 'Mark as read' : 'Mark as unread')
    notification.attr('data-read', read == 'True' ? 'False' : 'True')
})

deleteNotificationActions.on('click', function() 
{
    let notification = $(this).closest('.notification')
    
    notification.animate(
        {
            opacity: 0,
            height: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0
        },
        300,
        function () 
        {
            $(this).remove()
            notifications = $('.notification')
        }
    )
})

// #region MORE ACTIONS 

// #region NOTIFICATION ACTION

notifications.on('click', function (e) 
{ 
    if ($(e.target).closest('.dropdown').length > 0) return

    let link = $(this).data('link')

    if (link == 'order')
    {
        window.location.href = '../../customer/pages/cs_p_orders.xml'
    }
    else if (link == 'message')
    {
        window.location.href = '../../customer/pages/cs_p_messages.xml'
    }
    else if (link == 'account')
    {
        window.location.href = '../../customer/pages/cs_p_settings.xml'
    }
})

// #endregion NOTIFICATION ACTION

// #region UTILS

scrollToBottom()

function scrollToBottom() 
{
    $('main').animate({ scrollTop: $('main')[0].scrollHeight }, 'fast')  
}

// #endregion UTILS

// #region FILTER FUNCTIONS

let currentFilter = 'All'

function initializeFilters()
{
    filterButtons.on('click', function () 
    {
        currentFilter = $(this).text()
        filterDropdown.find('.dropdown-toggle').text(currentFilter)
        reapplyFiltersAndShow()
    })
}

function getVisibleNotifications() 
{
    let filteredNotifications

    if (currentFilter === 'All')
    {
        filteredNotifications = notifications
    } 
    else if (currentFilter === 'Read') 
    {
        filteredNotifications = notifications.filter('[data-read="True"]')
    } 
    else if (currentFilter === 'Unread') 
    {
        filteredNotifications = notifications.filter('[data-read="False"]')
    }

    return filteredNotifications
}

function reapplyFiltersAndShow() 
{
    notifications.addClass('hide')

    let notificationIndex = 0
    const notificationsPerPage = 5

    const visibleNotifications = getVisibleNotifications()
    visibleNotifications.slice(0, notificationsPerPage).removeClass('hide')

    notificationIndex = notificationsPerPage

    loadMoreButton.off('click').on('click', function () 
    {
        const nextNotifications = getVisibleNotifications().slice(notificationIndex, notificationIndex + notificationsPerPage)
        nextNotifications.animate({ opacity: '1' }, 200)
        nextNotifications.animate({ display: 'flex' }, 200)
        nextNotifications.removeClass('hide')
        scrollToBottom()
        notificationIndex += notificationsPerPage

        if (notificationIndex >= getVisibleNotifications().length) 
        {
            loadMoreButton.hide()
        }
    })

    if (getVisibleNotifications().length <= notificationsPerPage) 
    {
        loadMoreButton.hide()
    } 
    else 
    {
        loadMoreButton.show()
    }
}

// #endregion FILTER FUNCTIONS