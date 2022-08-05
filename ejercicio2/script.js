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



//Crear copia del objeto json.data sin alterar el original        
let result = {...json.data};

//Iterar por cada llave del objeto result
Object.keys(result).forEach(element => {

    //Ordenar cada llave por el campo limit de mayor a menor
    result[element].sort((a, b) => {
        return b.limit - a.limit ;
    });

    //Filtrar y obtener solo el registro mayor
    result[element] = result[element].filter((service, index) => {
        return index === 0;
    })[0];

    //Añadir los campos over y under con los id correspondientes
    result[element]['over'] = values[result[element]['over_carrier_service_id']];
    result[element]['under'] = values[result[element]['under_carrier_service_id']];

    //Eliminar las llaves over_carrier_service_id y under_carrier_service_id
    delete result[element]['over_carrier_service_id'];
    delete result[element]['under_carrier_service_id'];
});

console.log(result);

//Mostrar el jsons en el html 
document.getElementById("result").innerHTML = JSON.stringify(result, null, 4);
document.getElementById("json").innerHTML = JSON.stringify(json, null, 4);
document.getElementById("values").innerHTML = JSON.stringify(values, null, 4);