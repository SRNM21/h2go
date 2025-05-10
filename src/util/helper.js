export function toPeso(num)
{
    let formatNum = (Math.round(num * 100) / 100).toFixed(2)
    let formatted = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
    }).format(formatNum)

    return formatted.replace('₱', '₱ ')
}

export function notify(type, content)
{
    let toast = $(`
        <div class='toast toast-${type} align-items-center show' role='alert' aria-live='assertive' aria-atomic='true'>
            <div class='d-flex'>
                <div class='toast-body'>
                    ${content}
                </div>
                <button type='button' class='btn-close me-2 m-auto' data-bs-dismiss='toast' aria-label='Close'></button>
            </div>
        </div>    
    `)

    $('#toast-container').append(toast)

    setTimeout(function() {
        toast.fadeOut('slow', function() {
            $(this).remove()
        })
    }, 5000)
}