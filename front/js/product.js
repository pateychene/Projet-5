var searchParamsP = new URLSearchParams(document.location.search);
var newId = searchParamsP.get("id"); // Id de l'article sur lequel on a clické

//modification de l'adresse d'appel à l'API
var articleUrl = "http://localhost:3000/api/products/"+newId;


fetch(articleUrl) //appel du nouvel url 
    .then (function(response){ // attends une reponse
        if(response.ok){ // si la reponse est la 
            return response.json() // retourne une reponse en JSON 
        }
    })
    .then (function(produit){ // fonction pour recuperer la reponse 
        getOneProduct(produit)
    })


 //  Fonction permettant d'afficher les détails du produit sélectionné 
 
function getOneProduct(produit){

    document.getElementById("title").innerHTML = produit.name ;
    document.getElementById("price").innerHTML = produit.price ;
    document.getElementById("description").innerHTML = produit.description ;

   // document.querySelector(".item__img").innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
   // document.getElementByClassName(".item__img").innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
   //itemImgElements = collection de toutes les classes item__img
   var  itemImgElements = document.getElementsByClassName("item__img") ;
   if(itemImgElements!=null && itemImgElements.length >= 1){
        document.getElementsByClassName("item__img")[0].innerHTML += `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
   }
    //Affichage des couleur
    // couleursProduit est une collection de couleur
    var couleursProduit = produit.colors ; 
    let optionsCouleurs = `option value="">--SVP, choisissez une couleur --</option>`;
    //pour chaque couleur de la collection couleursProduit
    for(let couleurActuelle of couleursProduit){
        console.log(couleurActuelle);
       // optionsCouleurs += `<option value="${couleurActuelle}">${couleurActuelle}</option>`
       document.getElementById("colors").innerHTML += `<option value="${couleurActuelle}">${couleurActuelle}</option>` ;
    }
    console.log(optionsCouleurs); 

    //document.getElementById("colors").innerHTML = optionsCouleurs;


    for(let i=0 ; i <= couleursProduit.length; i++){
     
       console.log( "i = "+i+"couleur = "+couleursProduit[i] );

    }
    
  
}

/*Choisir la quantite de produit possible */

var quantiteProduit = 1 ;
if (quantiteProduit <= 100){
    console.log("on peut commander");
}



//Récupération 
function recuperationDonnee(){

    /* Vérifier les données saisies (1 < qte < 100)*/
     
     let couleurChoisie = document.getElementById("colors").value ;
     let quantiteChoisie = document.getElementById("quantity").value ;


     //Tester la quantité et la couleur avant de continuer

     if(quantiteChoisie <1 || quantiteChoisie>100 ){
         alert("Veuillez saisir une quantité comprise entre 1 et 100");
     }else if( couleurChoisie == "" || couleurChoisie == null ){
        alert("Veuillez choisir une couleur");
     }else {
        // 1 - Récupérer et formater le produit sélectionné.
        let selectedProduct = {
            idProduit : newId,
            quantite : parseInt(quantiteChoisie),
            couleur : couleurChoisie
        }
        console.log(selectedProduct);
        //1-1 - Récupérer les tableau de  produits dejà stockés (s'ils existent )
        let panierClient = JSON.parse(localStorage.getItem("panierClient"));
        //1-2 - Vérifier s'il existe un produit dans le tableau récupérer
        if(panierClient == null ){
            panierClient = [] ;
        }
        //1-3 - Vérifier si un produit  avec la  même couleur exisite déjà dans le panier.
        // si OUI, incrémente la quantité 
        // si NON, rajoute le nouveau produit dans le panier
        console.log(panierClient);
        let produitExisteDejaDansLePanier = panierClient.find((elementCourantDuPanier) =>  elementCourantDuPanier.idProduit == newId 
        &&  elementCourantDuPanier.couleur == couleurChoisie ) ;

    
            if(produitExisteDejaDansLePanier){
                let quntiteIncremente = parseInt(selectedProduct.quantite) + parseInt(produitExisteDejaDansLePanier.quantite) ;

                
                console.log("nouvelle quantité : "+quntiteIncremente)
                produitExisteDejaDansLePanier.quantite = quntiteIncremente ;

                localStorage.setItem("panierClient",JSON.stringify(panierClient))
                 alert("Ce produit existe déjà dans le panier, sa quantité a été incrémenté de la nouvelle quantité") ;
                 window.location.href = `cart.html`
            }else{
                panierClient.push(selectedProduct);
                localStorage.setItem("panierClient",JSON.stringify(panierClient));  
                alert("Votre nouveau produit a été rajouté au panier ") ;
                window.location.href = `cart.html`
                //Redirrigé vers la page panier.
        }
    }
}

let buttonValider = document.getElementById("addToCart");
buttonValider.addEventListener("click",recuperationDonnee);

