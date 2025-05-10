import '../main.js'

import {
    toPeso
} from '../../util/helper.js'


//* TABLES
const allTable = $('#datatable-orders')
const pendingTable = $('#datatable-orders-pending')
const inProgressTable = $('#datatable-orders-in-progress')
const outForDeliveryTable = $('#datatable-orders-out-for-delivery')
const completedTable = $('#datatable-orders-completed')
const declinedTable = $('#datatable-orders-declined')

const tableArr = [allTable, pendingTable, inProgressTable, outForDeliveryTable, completedTable, declinedTable]

// #region TABLE INITIALIZATION

tableArr.forEach(e => {

    new DataTable(`#${e.attr('id')}`, {
        columnDefs: [
            {
                render: (data) => new Date($(data).text().replace(' ', 'T')).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
                targets: 0
            },
            {
                render: (data) => toPeso($(data).text()),
                targets: 5
            },
            {
                render: (data) => `<h5><span class='badge order-status status-${$(data).text().replaceAll(' ', '-').toLowerCase()}'>${data}</span></h5>`,
                targets: 6
            },
        ]
    })
})

// #endregion TABLE INITIALIZATION

// #region FILTERS

const statusFilter = $('#status-filter')
const statusFilterItems = $('.status-filter-item')

statusFilterItems.on('click', function() 
{
    statusFilter.text($(this).text())
})

// #endregion FILTERS

