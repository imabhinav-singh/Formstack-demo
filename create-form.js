const fetch = require('node-fetch');

const url = 'https://www.formstack.com/api/v2/form.json';
const options = {
  method: 'POST',
  headers: {
      Accept: 'application/json', 
      'Content-Type': 'application/json',
      Authorization: 'Bearer 6043cd1a041a3fd07d662f6dfc8ed460'
    },
  body: JSON.stringify({
    db: true,
    label_position: 'top',
    submit_button_title: 'Submit Form',
    use_ssl: false,
    timezone: 'US/Eastern',
    language: 'en',
    active: true,
    name: 'demo-form',
    disabled_message: 'Form is inactive'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));