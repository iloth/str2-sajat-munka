/* eslint-disable */
const states = new Map([
  ['US', [
    { code: 'AL', name: 'Alabama'},
    { code: 'AK', name: 'Alaska'},
    { code: 'AS', name: 'American Samoa'},
    { code: 'AZ', name: 'Arizona'},
    { code: 'AR', name: 'Arkansas'},
    { code: 'CA', name: 'California'},
    { code: 'CO', name: 'Colorado'},
    { code: 'CT', name: 'Connecticut'},
    { code: 'DE', name: 'Delaware'},
    { code: 'DC', name: 'District Of Columbia'},
    { code: 'FM', name: 'Federated States Of Micronesia'},
    { code: 'FL', name: 'Florida'},
    { code: 'GA', name: 'Georgia'},
    { code: 'GU', name: 'Guam'},
    { code: 'HI', name: 'Hawaii'},
    { code: 'ID', name: 'Idaho'},
    { code: 'IL', name: 'Illinois'},
    { code: 'IN', name: 'Indiana'},
    { code: 'IA', name: 'Iowa'},
    { code: 'KS', name: 'Kansas'},
    { code: 'KY', name: 'Kentucky'},
    { code: 'LA', name: 'Louisiana'},
    { code: 'ME', name: 'Maine'},
    { code: 'MH', name: 'Marshall Islands'},
    { code: 'MD', name: 'Maryland'},
    { code: 'MA', name: 'Massachusetts'},
    { code: 'MI', name: 'Michigan'},
    { code: 'MN', name: 'Minnesota'},
    { code: 'MS', name: 'Mississippi'},
    { code: 'MO', name: 'Missouri'},
    { code: 'MT', name: 'Montana'},
    { code: 'NE', name: 'Nebraska'},
    { code: 'NV', name: 'Nevada'},
    { code: 'NH', name: 'New Hampshire'},
    { code: 'NJ', name: 'New Jersey'},
    { code: 'NM', name: 'New Mexico'},
    { code: 'NY', name: 'New York'},
    { code: 'NC', name: 'North Carolina'},
    { code: 'ND', name: 'North Dakota'},
    { code: 'MP', name: 'Northern Mariana Islands'},
    { code: 'OH', name: 'Ohio'},
    { code: 'OK', name: 'Oklahoma'},
    { code: 'OR', name: 'Oregon'},
    { code: 'PW', name: 'Palau'},
    { code: 'PA', name: 'Pennsylvania'},
    { code: 'PR', name: 'Puerto Rico'},
    { code: 'RI', name: 'Rhode Island'},
    { code: 'SC', name: 'South Carolina'},
    { code: 'SD', name: 'South Dakota'},
    { code: 'TN', name: 'Tennessee'},
    { code: 'TX', name: 'Texas'},
    { code: 'UT', name: 'Utah'},
    { code: 'VT', name: 'Vermont'},
    { code: 'VI', name: 'Virgin Islands'},
    { code: 'VA', name: 'Virginia'},
    { code: 'WA', name: 'Washington'},
    { code: 'WV', name: 'West Virginia'},
    { code: 'WI', name: 'Wisconsin'},
    { code: 'WY', name: 'Wyoming'}
  ]],
  ['HU', [
    { code: 'BK', name:'B??cs-Kiskun megye' },
    { code: 'BA', name:'Baranya megye' },
    { code: 'BE', name:'B??k??s megye' },
    { code: 'BZ', name:'Borsod-Aba??j-Zempl??n megye' },
    { code: 'CS', name:'Csongr??d-Csan??d megye' },
    { code: 'FE', name:'Fej??r megye' },
    { code: 'GS', name:'Gy??r-Moson-Sopron megye' },
    { code: 'HB', name:'Hajd??-Bihar megye' },
    { code: 'HE', name:'Heves megye' },
    { code: 'JN', name:'J??sz-Nagykun-Szolnok megye' },
    { code: 'KE', name:'Kom??rom-Esztergom megye' },
    { code: 'NO', name:'N??gr??d megye' },
    { code: 'PE', name:'Pest megye' },
    { code: 'SO', name:'Somogy megye' },
    { code: 'SZ', name:'Szabolcs-Szatm??r-Bereg megye' },
    { code: 'TO', name:'Tolna megye' },
    { code: 'VA', name:'Vas megye' },
    { code: 'VE', name:'Veszpr??m megye' },
    { code: 'ZA', name:'Zala megye' }
  ]],
]);

$(document).ready(function () {
  
  $("input[name='paymentType']").click(function () {
    const target = $("input[name='paymentType']:checked").data('target');
    $(target).collapse('show');
  });

  $("#billingCountry").change(function () {
    $("#billingState")
      .empty()
      .append('<option selected="selected">Choose ...</option>')
    
    $.each(states.get(this.value), function (i, item) {
      $('#billingState')
        .append(`<option value="${item.code}">${item.name}</option>`);
    });
  });

});