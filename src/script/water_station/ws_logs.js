import '../main.js'

//* TABLES
const allTable = $('#datatable-logs')
const addTable = $('#datatable-add-logs')
const editTable = $('#datatable-edit-logs')
const deleteTable = $('#datatable-delete-logs')

const tableArr = [allTable, addTable, editTable, deleteTable]

// #region TABLE INITIALIZATION

tableArr.forEach(e => {

    new DataTable(`#${e.attr('id')}`, {
        columnDefs: [
            {
                render: (data) =>  new Date($(data).text().replace(' ', 'T')).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
                targets: 0
            },
            {
                render: (data) =>  `<h5><span class='badge log-type log-${$(data).text().toLowerCase()}'>${data}</span></h5>`,
                targets: 1
            },
        ]
    })
})

// #region FILTERS

const logFilter = $('#log-filter')
const logFilterItems = $('.log-filter-item')

logFilterItems.on('click', function() 
{
    logFilter.text($(this).text())
})

// #endregion FILTERS