
"use strict"
let fieldValidation = function (form) {
    let isValid = true
    function validationError(element, errorMessage) {
        element.addClass('error')
        let message = document.createElement('span')
        message.textContent = errorMessage
        message.className = 'error-message'
        element.parent().append(message)
    }

    function reset(element) {
        element.removeClass('error')
        let elementsParent = element.parent()
        if (elementsParent.children('.error-message')) {
            elementsParent.children('.error-message').remove()
        }
    }

    function validateField(element, regExp, message) {
        reset(element)
        if (!element.val()) {
            validationError(element, "The field is empty")
            isValid = false
        } else if (!regExp.test(element.val())) {
            validationError(element, message)
            isValid = false
        }
    }

    function validate(form) {
        let nameField = $("[name=name]"),
            secondNameField = $("[name=secondname]"),
            emailField = $("[name=email]"),
            passwordField = $("[name=password]")

        validateField(nameField, /^[A-Za-z]+$/, "Name is incorrect")
        validateField(secondNameField, /^[A-Za-z\s]+$/, "Secondame is incorrect")
        validateField(emailField, /[A-Za-z\d]+\@[a-z]+\.[a-z]+$/, "Your email is incorrect")
        validateField(passwordField, /[A-Za-z\d]{5,49}$/, "Password is incorrect, too short or too long (5-49 symbols)")
    }
    validate(this)
    // console.log(validate(this))
    return isValid
}

export default fieldValidation