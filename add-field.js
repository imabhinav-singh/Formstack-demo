const fetch = require('node-fetch');

const url = 'https://www.formstack.com/api/v2/form/4442944/field.json';
const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer <access-token-here>'
  },
  body: JSON.stringify({
    hide_label: false,
    description_callout: true,
    required: true,
    readonly: false,
    hidden: false,
    uniq: false,
    colspan: 1,
    field_type: 'name',
    label: 'Name',
    description: 'Please enter your full name',
    default_value: 'Full Name'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));