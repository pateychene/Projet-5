  // Fonction asynchrone pour appeler le bon URL du produit sur lequel on a clique 
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
      cartItems = document.getElementById("cart__items");
      
      for( let currentProduct in panierClient){
        
        let idP = panierClient[currentProduct].idProduit ;
        getProductById(idP).then(function(productDetail){
          
          // Implementation dans le DOM en copiant le code HTML
          
          /* cartItems.innerHTML +=  `<article class="cart__item" data-id="${productDetail._id}" data-color="${productDetail.colors}">
          
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
          `*/
          
          ///////
          
          //Implementation avec creation des elements HTML directement dans le JS
          let itemArticle = document.createElement("article");
          document.querySelector("#cart__items").appendChild(itemArticle);
          itemArticle.className = "cart__item";
          itemArticle.setAttribute('data-id', productDetail._id);
          itemArticle.setAttribute('data-color', productDetail.colors);
          
          let itemDivImg = document.createElement("div");
          itemArticle.appendChild(itemDivImg);
          itemDivImg.className = "cart__item__img";
          
          let itemImg = document.createElement("img");
          itemDivImg.appendChild(itemImg);
          itemImg.src = productDetail.imageUrl;
          itemImg.alt = productDetail.altTxt;
          
          let itemContent = document.createElement("div");
          itemArticle.appendChild(itemContent);
          itemContent.className = "cart__item__content";
          
          let itemContentDescription = document.createElement("div");
          itemContent.appendChild(itemContentDescription);
          itemContentDescription.className = "cart__item__content__description";
          
          let itemTitle = document.createElement("h2");
          itemContentDescription.appendChild(itemTitle);
          itemTitle.innerHTML = productDetail.name;
          
          let itemColor = document.createElement("p");
          itemContentDescription.appendChild(itemColor);
          itemColor.innerHTML = panierClient[currentProduct].couleur;
          
          let itemPrice = document.createElement("p");
          itemContentDescription.appendChild(itemPrice);
          itemPrice.innerHTML = productDetail.price;
          
          let itemSettings = document.createElement("div");
          itemContent.appendChild(itemSettings);
          itemSettings.className = "cart__item__content__settings";
          
          let itemSettingsQty = document.createElement("div");
          itemSettings.appendChild(itemSettingsQty);
          itemSettingsQty.className = "cart__item__content__settings__quantity";
          
          let itemQtyP = document.createElement("p");
          itemSettingsQty.appendChild(itemQtyP);
          itemQtyP.innerHTML = "Qté : ";
          
          let itemQtyInput = document.createElement("input");
          itemSettingsQty.appendChild(itemQtyInput);
          itemQtyInput.type = "number";
          itemQtyInput.className = "itemQuantity";
          itemQtyInput.name = "itemQuantity";
          itemQtyInput.min = "1";
          itemQtyInput.max = "100";
          itemQtyInput.value = panierClient[currentProduct].quantite;
          
          let itemSettingsDelete = document.createElement("div");
          itemSettings.appendChild(itemSettingsDelete);
          itemSettingsDelete.className = "cart__item__content__settings__delete";
          
          let itemDeleteP = document.createElement("p");
          itemSettingsDelete.appendChild(itemDeleteP);
          itemDeleteP.className = "deleteItem";
          itemDeleteP.innerHTML = "Supprimer";
          
          //////
        })
      }      
    }
  }    
  displayBasket()
  
  //Fonction pour calculer le total et le prix 
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
        // S'il y a quelque chose dans productToUpdate
        if(productToUpdate){ 
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
  
  //Expressions regulieres 
  
  let regNomOuPrenom = new RegExp("^[a-zA-Z].*[\s\.]*$");
  let regEmail= new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}");
  let regCity= new RegExp("(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}");
  let regAddress= new RegExp("(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}");
  
  addEventListener("submit", function(event){
    event.preventDefault();
    
    let firstName = document.getElementById("firstName").value
    let lastName = document.getElementById("lastName").value
    let email = document.getElementById("email").value
    let city = document.getElementById("city").value
    let address = document.getElementById("address").value
    
    //Variables qui verifient si les saisies sont correctes grace a notre fonction 
    let resultCheckFistName = checkRegexAndSetError(regNomOuPrenom,firstName, "firstNameErrorMsg")
    let resultCheckLastName = checkRegexAndSetError(regNomOuPrenom,lastName, "lastNameErrorMsg")
    let resultCheckEmail = checkRegexAndSetError(regEmail,email, "emailErrorMsg")
    let resultCheckCity = checkRegexAndSetError(regCity,city, "cityErrorMsg")
    let resultCheckAddress = checkRegexAndSetError(regAddress,address, "addressErrorMsg")
    
    //Création de l'objet à envoyer au serveur pour la commande 
    
    //1 - Création du tableau des ids produit
    let listIdProduits = [];
    for (let i = 0; i < panierClient.length; i++) {
      listIdProduits.push(panierClient[i].idProduit);
    }
    //2 - Création de l'objet contact
    
    let contactClient =  {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    }
    
    //création de l'objet commande
    let commande = {
      contact : contactClient,
      products : listIdProduits
    }
    
    if(resultCheckFistName && resultCheckLastName &&  resultCheckEmail && resultCheckCity && resultCheckAddress){
      event.preventDefault()
      envoiRequeteVersApi(commande);
    }
  }
  )
  //Fonction pour verfier avec regex , la valeur a tetster , et renvoyer un message d'erreur si aucun match dans la regex
  function checkRegexAndSetError(regexExpression, valueToTest, idChamErreur){
    let errorMessage = document.getElementById(idChamErreur)
    if(regexExpression.test(valueToTest)){
      errorMessage.innerHTML = ""
      return true
    }else{
      errorMessage.innerHTML = "Veuillez vérifier ce champ"
      return false;
    }
  }
  
  
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
