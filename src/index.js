import './css/sign-in.css'
import './css/companies.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import sendingData from './js/signIn'
import renderCompanies from './js/companies'


$(function() {
    sendingData()
    renderCompanies()
})


