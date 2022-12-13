
async function getProductById(productId){
  var productUrl = "http://localhost:3000/api/products/"+productId;
  try {
    const response = await fetch(productUrl, {
      method : "GET",
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
    });
    const responseData = await response.json()
    return responseData
  }catch (error) {
      return console.warn(error)
  }
}
var totalQuantite = 0;
var totalPrice  =0
var panierClient = JSON.parse(localStorage.getItem("panierClient"));
/* 1- Recuperer les donnees du/des produits stockees dans le localStorage */
function displayBasket (){
    
    if (panierClient == null){
        alert("Vous n'avez aucun produit dans le panier")
    }else{
       console.log(panierClient);

       cartItems = document.getElementById("cart__items");

       for( let currentProduct in panierClient){
        
        let idP = panierClient[currentProduct].idProduit ;
        getProductById(idP).then(function(productDetail){
          cartItems.innerHTML +=  `<article class="cart__item" data-id="${productDetail._id}" data-color="${productDetail.colors}">
    
                <div class="cart__item__img">
                  <img src="${productDetail.imageUrl}" alt="${productDetail.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productDetail.name}</h2>
                    <p>${panierClient[currentProduct].couleur}</p>
                    <p>${productDetail.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${panierClient[currentProduct].quantite}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panierClient[currentProduct].quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> 
             `
        })
      }      
    }
}    
displayBasket()


async function getT() {
  totalQuantite = 0;
  totalPrice = 0 ;
  for(let currentProduct in panierClient){
      const produit = await getProductById(panierClient[currentProduct].idProduit);
      totalQuantite += panierClient[currentProduct].quantite ;
      totalPrice += parseInt(panierClient[currentProduct].quantite)  * parseInt(produit.price) ;      
    }
    let qte = document.getElementById("totalQuantity");
    qte.innerHTML = totalQuantite
    const tPrice = document.getElementById("totalPrice")
    tPrice.innerHTML = totalPrice ;
}

getT()
//Fonction changement quantite 
function changeQuantity(){
  let updateQuantite = document.getElementsByClassName("itemQuantity");

  for(let i=0; i<updateQuantite.length ; i++){

    updateQuantite[i].addEventListener("change", (event) => {

    let productId = panierClient[i].idProduit;
    let couleur = panierClient[i].couleur;
    let productToUpdate = panierClient.find(element => element.idProduit == productId && element.couleur == couleur) ;
      
        if(productToUpdate){ // S'il y a quelque chose dans productToUpdate
          productToUpdate.quantite = updateQuantite[i].valueAsNumber ;
          localStorage.setItem("panierClient", JSON.stringify(panierClient));
          let textQuantite = updateQuantite[i].parentNode.childNodes[1];
  ;
      textQuantite.innerHTML = "Qté : "+updateQuantite[i].valueAsNumber ;
 //Faire la modification du total
          getT()
        }
      }
    );     
    } 
  }
  
 

// Fonction pour supprimer un produit 
function deleteItem(){
  let deleteButtons = document.getElementsByClassName("deleteItem");
  for(let i=0; i<deleteButtons.length ; i++){
    deleteButtons[i].addEventListener("click", (event) => {
    
    let productToDelete = panierClient.indexOf(panierClient[i])
    panierClient.splice(productToDelete,1) //L'ancinen panier - l'élément supprimé

    let productArticle = deleteButtons[i].closest("article");
    productArticle.remove()

    //Faire la mise à jour du localstorage
    localStorage.setItem("panierClient", JSON.stringify(panierClient));
    location.reload();
    })
  }
}

setTimeout(() =>{
    deleteItem();
},"1000");



setTimeout(() => {
  changeQuantity();
}, "1000")



/* Verification champ de saisie utilisateur avec regex */ 

const order = document.getElementById("order");
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexAddress = /^([0-9 ]*)?([a-zA-Z ]*)$/;


/*Objet contact des infos utilisateurs */
function createBodyRequest(firstNameV, lastNameV , cityV , addressV , emailV) {
  let idProducts = [];
  for (let i = 0; i < panierClient.length; i++) {
    idProducts.push(panierClient[i].idProduit);
  }
  //ici idProducts est un tableau contenant tous les ids des produits dans le localStorage
  const bodyContent = {
    contact: {
      firstName: firstNameV,
      lastName: lastNameV,
      address: addressV,
      city: cityV,
      email: emailV,
    },
    products: idProducts,
  };
  return bodyContent;
}

addEventListener("submit", function(event){
  event.preventDefault();


let firstName = event.target.firstName.value ;
let lastName = event.target.lastName.value ;
let email = event.target.email.value ;
let city = event.target.city.value ;
let address = event.target.address.value ;
  

let firstName2 = document.getElementById("firstName").value

//Test du nom  et prénom 

let regNomOuPrenom = new RegExp("([0-9]*)?([a-zA-Z]*)");
let regEmail= new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}");
let regCity= new RegExp("(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}");
let regAddress= new RegExp("(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}");


let resultCheckFistName = checkRegexAndSetError(regNomOuPrenom,firstName, "firstNameErrorMsg")
let resultCheckLastName = checkRegexAndSetError(regNomOuPrenom,lastName, "lastNameErrorMsg")
let resultCheckEmail = checkRegexAndSetError(regEmail,email, "emailErrorMsg")
let resultCheckCity = checkRegexAndSetError(regCity,city, "cityErrorMsg")
let resultCheckAddress = checkRegexAndSetError(regAddress,address, "addressErrorMsg")



if(resultCheckFistName && resultCheckLastName &&  resultCheckEmail && resultCheckCity && resultCheckAddress){
  event.preventDefault()
  envoiRequeteVersApi(createBodyRequest(firstName, lastName , city , address , email));
}
}
)

//Envoie de la commande

function envoiRequeteVersApi (body) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers : {
      "Content-type": "application/json;charset=utf-8",
    },
    body : JSON.stringify(body),
  })
  .then ((response) => {
    if (response.status == 201) {
      return response.json();
    }
    else {
      console.error("Une erreur est survenue lors de la commande");
    }
  })
  .then ((order) => {
    localStorage.clear();
    id = order.orderId;
    window.location.href = `confirmation.html?id=${id}`;
  });
}


function checkRegexAndSetError(regexExpression, valueToTest, idChamErreur){
  if(regexExpression.test(valueToTest)){
    return true
  }else{
    let errorMessage = document.getElementById(idChamErreur)
    idChamErreur.innerHTML = "Veuillez vérifier ce champ"
    return false;
  }
}
