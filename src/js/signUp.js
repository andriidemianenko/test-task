let sendingData = function () {
    "use strict"
    let registrationForm = $('#registrationForm')
    function toJSONstring(form) {
        let resultObj = {}
        let data = $('input, select')
        for (let i = 0; i < data.length; i++) {
            let element = data[i],
            name = element.name,
            value = element.value
            if (name) {
                resultObj[name] = value
            }
        }
        return JSON.stringify(resultObj)
    }
    function validError(error) {
        let message = error.message,
        field = error.field,
        status = error.status
        alert('Erorr message: ' + message + '\nField: ' + field + '\nStatus: ' + status)
    }
    function serverError(error) {
        let message = error.message,
        status = error.status
        alert('Error message: ' + message + '\nStatus: ' + status)
    }

    registrationForm.on('submit', function (e) { //sending data to server
        e.preventDefault()
        let json = toJSONstring(this)
        $.ajax({
            type: registrationForm.attr('method'),
            url: registrationForm.attr('action'),
            data: json,
            success: function (data) {
                validError(data)
                $(location).attr('href', './companies.html')
            },
            error: function (jqXHR, textStatus) {
                let jsonErrorObj = JSON.parse(jqXHR.responseText)
                serverError(jsonErrorObj)
            }

        })

    })
}

export default sendingData