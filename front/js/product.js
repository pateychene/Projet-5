// 1. appeler l'api pour recuperer les donnees de chaque produit 
// 2. afficher le produit avec ses elements dans la page produit

//appel api
var url = "http://localhost:3000/api/products"
fetch(url+)
.then(function (response){ // si j'arrive à atteindre le serveur
    if(response.ok){
         console.log(response);
        return response.json()
    }
})
.then(function (data){ // j'ai une réponse 
    //console.log(data);
    //data contient la liste de tous les produits sous format json. : FIN DE LA PREMIERE PARTIE

    getProductData(data)
})

