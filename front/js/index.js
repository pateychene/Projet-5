//1 - Faire appel au back en pour récupérer la liste des produits
//2 - Créer la structure html avec la liste récupérée


//Url de l'api 
var url = "http://localhost:3000/api/products"
fetch(url) //appeler l'url
        .then(function (response){ // si j'arrive à atteindre le serveur
            if(response.ok){
                return response.json()
            }
        })
        .then(function (data){ // j'ai une réponse 
            //data contient la liste de tous les produits sous format json. : FIN DE LA PREMIERE PARTIE

            getProductData(data)
        })



//Fonction pour la deuxième partie
function getProductData(data){
//Parcourir le tableau de produit et pour chaque produit, créer la fiche produit
    for (let produit of data){
        //Récupération de la section article ==> pour remplacer 
        let productElement = document.getElementById("items");
        //Rajouter chaque nouveau produit à la liste ==> +=
        productElement.innerHTML += `<a href="./product.html?id=${produit._id}">
            <article>
              <img src="${produit.imageUrl}" alt="${produit.altTxt}">
              <h3 class="productName">${produit.name}</h3>
              <p class="productDescription">${produit.description}</p>
            </article>
          </a> `
    } 
}