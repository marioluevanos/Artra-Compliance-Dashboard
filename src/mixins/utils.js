export function debounce (func, wait, immediate) {
    var timeout
    return function () {
        var context = this, args = arguments
        var later = function () {
            timeout = null
            if(!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if(callNow) func.apply(context, args)
    }
}

export function randomId (name = '') {
    return Math.trunc(Date.now() / Math.random()) + name.toLowerCase().replace(/[\W]/g, '')
}


export function formatDate (date) {
    return new Date(date).toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).split(', ')
}