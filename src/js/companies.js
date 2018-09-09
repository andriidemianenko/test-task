let renderCompAndPartners = function () {
    "use strict"
     function renderCompaniesAmount(jsonObject) {
         $('#companiesAmount').text(jsonObject['list'].length)
     }
     function createElement(parent, tagName, className, value) {
         let element = document.createElement(tagName)
         element.className = className
         element.textContent = value
         parent.append(element)
     }
     function renderListOfComanies(jsonObject) {
         let allCompanies = jsonObject['list']
         let listOfAllCompanies = $('#allCompanies')
         let companiesClass = 'list-group-item list-group-item-action'
         allCompanies.forEach((element) => {
            createElement(listOfAllCompanies, 'a', companiesClass, element['name'])
         }) 
     }
     function renderPartners(jsonObject) {
         $('.list-group-item').each(function (data) {
             let allCompanies = jsonObject['list']
             $(this).on('click', function () {
                 $('.partners-container').show()
                 $('#partners').empty()
                 allCompanies.forEach((company) => {
                     let partners = company['partners']
                     if (this.innerHTML == company['name']) {// render partners
                         partners.forEach((partner) => {
                             let partnerElem = document.createElement('a')
                             partnerElem.className = 'list-group-item list-group-item-action'
                             partnerElem.textContent = partner['name']
                             let partnerPercClass =  'partner-percentage'
                             createElement(partnerElem, 'span', partnerPercClass, partner['value'])// show partner's percentage
                             $('#partners').append(partnerElem)
                         })
                     }
                 })
             })
         })
     }
     $.ajax({
         type: 'GET',
         url: 'http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList',
         dataType: 'json',
         success: function (data) {
             renderCompaniesAmount(data)
             renderListOfComanies(data)
             renderPartners(data)
         },
         beforeSend : function() {
             $('.list-group, .total-companies').hide()
             $('.loader').show()
         },
         complete : function() {
             $('.list-group, .total-companies').show()
             $('.loader').hide()
         }
     })
 }

 export default renderCompAndPartners