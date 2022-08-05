// JSON 
let values =  {
    1: {
        carrier: "CCH",
        service: "DEX",
    },
    2: {
        carrier: "CCH",
        service: "express",
    },
    3: {
        carrier: "CCH",
        service: "priority",
    },
    15: {
        carrier: "CHP",
        service: "nextday",
    },
    16: {
        carrier: "CHP",
        service: "sameday",
    },
    17: {
        carrier: "CHP",
        service: "express",
    }
}
// JSON
let json = { 
            data: {
                BUIN: [
                    {
                        limit: 1,
                        over_carrier_service_id: 17,
                        under_carrier_service_id: 17
                    },
                    {
                        limit: 2,
                        over_carrier_service_id: 15,
                        under_carrier_service_id: 15
                    }
                ],
                LAJA: [
                    {
                        limit: 2,
                        over_carrier_service_id: 1,
                        under_carrier_service_id: 1
                    },{
                        limit: 5,
                        over_carrier_service_id: 2,
                        under_carrier_service_id: 2
                    },{
                        limit: 1,
                        over_carrier_service_id: 17,
                        under_carrier_service_id: 17
                    }
                ],

                LEBU: [
                    {
                        limit: 2,
                        over_carrier_service_id: 1,
                        under_carrier_service_id: 1
                    },{
                        limit: 6,
                        over_carrier_service_id: 3,
                        under_carrier_service_id: 3
                    },{
                        limit: 5,
                        over_carrier_service_id: 2,
                        under_carrier_service_id: 2
                    },{
                        limit: 4,
                        over_carrier_service_id: 16,
                        under_carrier_service_id: 16
                    }
                ],

                LOTA: [
                    {
                        limit: 2,
                        over_carrier_service_id: 15,
                        under_carrier_service_id: 15
                    },{
                        limit: 4,
                        over_carrier_service_id: 16,
                        under_carrier_service_id: 16
                    },{
                        limit: 1,
                        over_carrier_service_id: 17,
                        under_carrier_service_id: 17
                    }
                ] 
            }
        }

let result = {...json.data};
Object.keys(result).forEach(element => {
    result[element].sort((a, b) => {
        return b.limit - a.limit ;
    });

    result[element] = result[element].filter((service, index) => {
        return index === 0;
    })[0];

    result[element]['over'] = values[result[element]['over_carrier_service_id']];
    result[element]['under'] = values[result[element]['under_carrier_service_id']];
    console.log(result[element]['over'])
    console.log(result[element]['under'])
    console.log(Object.keys(values).find(val => val == result[element]['over_carrier_service_id']));

    console.log(result[element]);
});
console.log(result);


document.getElementById("result").innerHTML = JSON.stringify(result, null, 4);