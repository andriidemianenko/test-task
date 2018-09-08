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
         for (let i = 0; i < allCompanies.length; i++) {
             createElement(listOfAllCompanies, 'a', companiesClass, allCompanies[i]['name'])
         }
     }
     function renderPartners(jsonObject) {
         $('.list-group-item').each(function (data) {
             let allCompanies = jsonObject['list']
             $(this).on('click', function () {
                 $('.partners-container').show()
                 $('#partners').empty()
                 for (let i = 0; i < allCompanies.length; i++) {
                     let partners = allCompanies[i]['partners']
                     if (this.innerHTML == allCompanies[i]['name']) {// render partners
                         for (let k = 0; k < partners.length; k++) {
                             let partner = document.createElement('a')
                             partner.className = 'list-group-item list-group-item-action'
                             partner.textContent = partners[k]['name']
                             let partnerPercClass =  'partner-percentage'
                             createElement(partner, 'span', partnerPercClass, partners[k]['value'])// show partner's percentage
                             $('#partners').append(partner)
                         }
                     }
                 }
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