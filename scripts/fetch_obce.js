let axios = require('axios');
const util = require('util')

const getObce = async () => {
  axios
  .get('https://data.gov.sk/api/action/datastore_search_sql?sql=SELECT%20*%20from%20%2215262453-4a0f-4cce-a9e4-7709e135e4b8%22')
  .then(response => {
    // console.log(response.data.result.records.length);

    let cities = [];
    const data = response.data.result.records;

    data.map( city => {
      cities.push(city.municipalityName);
    })

    console.log(cities.length);
    console.log(removeDuplicateUsingSet(cities));

  })
  .catch(error => console.log(error));
}

function removeDuplicateUsingSet(arr){
  let unique_array = Array.from(new Set(arr))
  return unique_array.length;
}

const main = async () => {
  await getObce();
}

main();