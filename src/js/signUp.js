
import fieldValidation from './validation';
"use strict"
let sendData = function () {
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
    function handleValidationError(error) {
        let message = error.message,
            field = error.field,
            status = error.status
        alert('Erorr message: ' + message + '\nField: ' + field + '\nStatus: ' + status)
    }
    function handleServerError(error) {
        let message = error.message,
            status = error.status
        alert('Error message: ' + message + '\nStatus: ' + status)
    }

    registrationForm.on('submit', function (e) { //sending data to server
        e.preventDefault()
        let user = toJSONstring(this),
        errorData = JSON.stringify({error : "validation error"})
        $.ajax({
            type: registrationForm.attr('method'),
            url: registrationForm.attr('action'),
            data: fieldValidation(this) === true ? user : errorData,
            success: function (data) {
                if (fieldValidation(this)) {
                    handleValidationError(data)
                    $(location).attr('href', './companies.html')
                } else {
                    alert('Input data is incorrect!')
                }
            },
            error: function (jqXHR, textStatus) {
                let jsonErrorObj = JSON.parse(jqXHR.responseText)
                handleServerError(jsonErrorObj)
            }

        })

    })
}

export default sendData