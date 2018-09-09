import './css/sign-up.css'
import './css/companies.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

import sendData from './js/signUp'
import renderCompanies from './js/companies'


$(function() {
    sendData()
    renderCompanies()
})


