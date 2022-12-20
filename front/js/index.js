
// l'Url de l'api 
var url = "http://localhost:3000/api/products"
//appel URL avec fetch
fetch(url) 
.then(function (response){ 
    if(response.ok){
        return response.json()
    }
})
.then(function (data){ 
    getProductData(data)
})

//Fonction pour afficher chaque produit sur la page d'acceuil
function getProductData(data){
    //on parcourt le tableau de produit et pour chaque produit, on cree la fiche produit
    for (let produit of data){
        let productElement = document.getElementById("items");
        //puis on remplace dans notre HTML        
        productElement.innerHTML += `<a href="./product.html?id=${produit._id}">
        <article>
        <img src="${produit.imageUrl}" alt="${produit.altTxt}">
        <h3 class="productName">${produit.name}</h3>
        <p class="productDescription">${produit.description}</p>
        </article>
        </a> `
    } 
}