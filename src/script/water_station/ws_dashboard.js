import '../main.js'

new Chart('earnings-chart',  {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Earnings this year',
            data: [8365, 5239, 8036, 4781, 5635, 5525, 4036, 3456, 6363, 3472, 8483, 2795],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
})

new Chart('item-sold-chart', {
    type: 'pie',
    data: {
        labels: [
            'Round 5 Gallons',
            'Slim 5 Gallons',
            'PET 6 Liters',
            'PET 4 Liters',
            'PET 1500ml',
            'PET 1000ml',
            'PET 500ml',
            'PET 350ml',
            'PET 330ml',
        ],

        datasets: [{
            data: [3, 1, 9, 2, 6, 2, 5, 9, 3],
        }]
    }
})
