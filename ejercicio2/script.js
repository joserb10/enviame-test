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
let result = JSON.parse(JSON.stringify(json.data));

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

//Mostrar los jsons en el html 
document.getElementById("result").innerHTML = JSON.stringify(result, null, 4);
document.getElementById("json").innerHTML = JSON.stringify(json, null, 4);
document.getElementById("values").innerHTML = JSON.stringify(values, null, 4);

//Crear copia del objeto json.data sin alterar el original    
let mostServicesLocality = JSON.parse(JSON.stringify(json.data));

//Ordenar cada llave por la cantidad de servicios y filtrar el primer elemento que es el de mayor servicios
mostServicesLocality = Object.keys(mostServicesLocality).sort((a, b) => {
    return mostServicesLocality[b].length - mostServicesLocality[a].length ;
}).filter((locality, index) => {
    return index === 0;
})[0];

console.log(mostServicesLocality);

//Mostrar la localidad con más servicios en el html 
document.getElementById("mostServicesLocality").innerHTML = mostServicesLocality;

//Crear copia del objeto json.data sin alterar el original    
let mostUsedServiceArray = JSON.parse(JSON.stringify(json.data));
let servicesIdArray = [];

//Añadir todos los ids de servicios de mostUsedServiceArray al array servicesIdArray
Object.keys(mostUsedServiceArray).forEach( locality => {
    mostUsedServiceArray[locality].forEach(service => {
        servicesIdArray.push(service.over_carrier_service_id);
    });
});

console.log(servicesIdArray);
let mostUsedService = [];

//Añadir a mostUsedService los objetos de cada servicio con la cantidad de localidas en la que se usa
servicesIdArray.forEach(service => {
    let obj = {};
    obj["serviceId"] = service;
    obj["quantity"] = servicesIdArray.filter(ser=> {
        return ser === service;
    }).length;
    mostUsedService.push(obj);
});

//Ordenar los servicios por la cantidad de localidades en la que se usa
mostUsedService.sort((a, b) => {
    return b.quantity - a.quantity;
});

/*Obtener el primer registro de mostUsedService que es el de mayor cobertura
y añadirle el campo donde se muestre nombre y carrier*/
mostUsedService[0]['serviceNameCarrier'] = values[mostUsedService[0]['serviceId']];
console.log(mostUsedService[0]);

//Mostrar el servicio de mayor cobertura en el html
document.getElementById('mostUsedService').innerHTML = JSON.stringify(mostUsedService[0],null,4)

