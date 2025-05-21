import '../main.js'

import { 
    notify 
} from '../../util/helper.js'

const params = new URLSearchParams(window.location.search)
const signedIn = params.get('signed-in')  

$(window).on('load', function() 
{
    if (signedIn == 'true') notify('success', 'Signed in successfully.')
})

// #region GENERATE WATER STATIONS STAR REVIEW

const fullStar = $('<svg class="stars" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" fill="#005691"/></svg>')
const hollowStar = $('<svg class="stars" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.85 16.825L12 14.925L15.15 16.85L14.325 13.25L17.1 10.85L13.45 10.525L12 7.125L10.55 10.5L6.9 10.825L9.675 13.25L8.85 16.825ZM5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" fill="#005691"/></svg>')

const reviewStarsIcon = $('.review-stars-icon')

reviewStarsIcon.each((_, e) => {
    generateStars($(e), $(e).data('stars'))
})

function generateStars(container, stars)
{
    let numStars = Math.ceil(stars)
    let i = 0

    container.empty()
    
    while (i < numStars) 
    {
        container.append(fullStar.clone())
        i++
    }

    while (i < 5) 
    {
        container.append(hollowStar.clone())
        i++
    }
}

// #endregion GENERATE WATER STATIONS STAR REVIEW

// #region SEARCH WATER STATION

const searchBar = $('#search-inp')
const clearBtn = $('#search-clear')
const waterStationList = $('#water-station-list')
const waterStationRow = $('.water-station-row')

searchBar.on('input', search)
clearBtn.on('click', clear)

function reset()
{
    waterStationRow.each(function () 
    {
        const $textEl = $(this).find('.ws-name')
        const fullText = $textEl.text()
        $textEl.html(fullText)
    })

    waterStationList.empty().append(waterStationRow)
}

function clear()
{
    searchBar.val('')
    reset()
    waterStationRow.prop('onclick', null).off('click')
}

function search()
{
    const query = searchBar.val().trim().toLowerCase()
    let foundAny = false

    waterStationList.empty()

    waterStationRow.toArray().forEach(contact => 
    {
        const $contact = $(contact)
        const $textEl = $contact.find('.ws-name')
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

            waterStationList.append($contact)
            foundAny = true
        } 
        else if (!query) 
        {
            waterStationList.append($contact)
            foundAny = true
        }
    })

    if (!foundAny) 
    {
        waterStationList.append(`
            <div class='no-results text-center w-100 py-4 text-muted'>
                No Water Station found.
            </div>
        `)
    }
}

// #endregion SEARCH WATER STATION

// #region COLLAPSE SIDEBAR MAP

const waterStationSection = $('.water-stations-section')
const collapseBtn = $('#collapse-btn')
const arrowRight = $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M400-280v-400l200 200-200 200Z"/></svg>')
const arrowLeft = $('<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#005691"><path d="M560-280 360-480l200-200v400Z"/></svg>')

collapseBtn.on('click', function() 
{
    const isCollapsed = waterStationSection.hasClass('ws-collapse')
    collapseBtn.html(isCollapsed ? arrowLeft : arrowRight)

    if (isCollapsed) 
    {
        waterStationSection.animate({ maxWidth: '400px' }, 150)
        waterStationSection.animate({ opacity: '1' }, 150)
    } 
    else 
    {
        waterStationSection.animate({ opacity: '0' }, 150)
        waterStationSection.animate({ maxWidth: '0px' }, 150)
    }

    waterStationSection.toggleClass('ws-collapse')
})

// #endregion COLLAPSE SIDEBAR MAP

