import '../main.js'

// #region LOAD CONTACTS PROFILE

const contactsProfile = $('.contact-profile')

contactsProfile.each((_, profile) => {
    
    let temp = $(profile)
    let name = temp.data('water-station-name').split(' ')
    temp.attr('src', `https://avatar.iran.liara.run/username?username=${name[0]}+${name[1]}`)
})

// #endregion LOAD CONTACTS PROFILE

// #region REFORMAT DATE TOOLTIP

const messagesTooltips = $('.message-tooltip')

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
}

messagesTooltips.each((_, tooltip) => {
    
    let temp = $(tooltip)
    const originalDateTime = temp.text()
    const date = new Date(originalDateTime)
    temp.text(date.toLocaleDateString('en-US', options))
})

// #endregion REFORMAT DATE TOOLTIP

// #region SEARCH CONTACTS

const searchBar = $('#search-inp')
const clearBtn = $('#search-clear')
const contactList = $('#contact-list')
const contacts = $('.contact')

searchBar.on('input', search)
clearBtn.on('click', clear)

function reset()
{
    contacts.each(function () 
    {
        const $textEl = $(this).find('.contact-name')
        const fullText = $textEl.text()
        $textEl.html(fullText)
    })

    contactList.empty().append(contacts)
}

function clear()
{
    searchBar.val('')
    reset()
    contacts.prop('onclick', null).off('click')
    contacts.on('click', (e) => contactClick(e))
}

function search()
{
    const query = searchBar.val().trim().toLowerCase()
    let foundAny = false

    contactList.empty()

    contacts.toArray().forEach(contact => 
    {
        const $contact = $(contact)
        const $textEl = $contact.find('.contact-name')
        const fullText = $textEl.text()

        $textEl.html(fullText)

        if (query && fullText.toLowerCase().includes(query)) 
        {
            const start = fullText.toLowerCase().indexOf(query)
            const end = start + query.length

            const before = fullText.slice(0, start)
            const match = fullText.slice(start, end)
            const after = fullText.slice(end)

            $textEl.html(`${before}<span class='highlight'>${match}</span>${after}`)

            contactList.append($contact)
            foundAny = true
        } 
        else if (!query) 
        {
            contactList.append($contact)
            foundAny = true
        }
    })

    if (!foundAny) 
    {
        contactList.append(`
            <div class='no-results text-center w-100 py-4 text-muted'>
                No contacts found.
            </div>
        `)
    }
        
    contacts.on('click', (e) => contactClick(e))
}

// #endregion SEARCH CONTACTS


// #region CONTACTS ACTIONS

var xmlData

const currentMessageName = $('#current-message-name')
const currentMessageImg = $('#current-message-img')
const messageContainer = $('#messages-container')

contacts.on('click', (e) => contactClick(e))

function contactClick(e)
{
    let curr = $(e.currentTarget)
    
    let messageID = curr.data('message-id')
    let waterStationName = curr.data('water-station-name')
    let img = curr.find('.contact-profile').attr('src')

    $.ajax({
        url: '../../../../data/client/h2go_clients.xml',
        dataType: 'xml',
        success: function(xml)
        {
            xmlData = $(xml)
            loadContactMessages(messageID, waterStationName, img)
        },
        error: function(xhr, status, error) 
        {
            let errorPage = $(`
                <div class="card error-page">
                    <div class="card-body">
                        <h5 class="card-title">Error Occured:</h5>
                        <p class="card-text">Invalid order details (${error} | ${status}).</p>
                    </div>
                </div>
            `)

            $('main').append(errorPage)
        }
    })
}

function loadContactMessages(messageID, waterStationName, img)
{    
    currentMessageName.text(waterStationName)
    currentMessageImg.attr('src', img)
    messageContainer.empty()

    const message = xmlData.find(`customers messages message[id = ${messageID}] chats chat`)

    message.each(function() 
    {
        let sender = $(this).attr('sender')
        let content = $(this).find('content').text()
        let dateTime = $(this).find('date-and-time').text()
        let date = new Date(dateTime)
        dateTime = date.toLocaleDateString('en-US', options)

        let template = $(`<div class="mb-2 d-flex messgage-row" data-sender="${sender}"></div>`)
        let messageBubble = $('<span class="message-bubble rounded-3 p-3"></span>')
        let tooltip = $(`<span class="message-tooltip p-2 rounded text-center">${dateTime}</span>`)
    
        messageBubble.text(content)
        messageBubble.append(tooltip)
        template.append(messageBubble)

        messageContainer.append(template)
    })

    scrollToBottom()
}

// #endregion CONTACTS ACTIONS

// #region SEND MESSAGE 

const messageInput = $('#message-inp')
const messageSendBtn = $('#message-send-btn')

messageSendBtn.on('click', sendMessage)
messageInput.on('keydown', (e) => { if (e.key === 'Enter') sendMessage() })

function sendMessage()
{
    let content = messageInput.val().trim()

    if (!content) return
    
    let date = new Date()
    let dateTime = date.toLocaleDateString('en-US', options)
    
    let template = $('<div class="mb-2 d-flex messgage-row" data-sender="cs"></div>')
    let messageBubble = $('<span class="message-bubble rounded-3 p-3"></span>')
    let tooltip = $(`<span class="message-tooltip p-2 rounded text-center">${dateTime}</span>`)

    messageBubble.text(content)
    messageBubble.append(tooltip)
    template.append(messageBubble)

    messageContainer.append(template)
    messageInput.val('')
    scrollToBottom()
}

scrollToBottom()

function scrollToBottom() 
{
    messageContainer.animate({ scrollTop: messageContainer[0].scrollHeight }, 'fast')  
}

// #endregion SEND MESSAGE