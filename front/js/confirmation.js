var searchParamsP = new URLSearchParams(document.location.search);
// Id renvoyer lors de la commande
var orderId = searchParamsP.get("id"); 
// variable pour cibler l'element a remplacer dans la page HTML
let spanOrderId = document.getElementById("orderId")
//on remplace avec innerText ce qu'on a cible par notre orderId 
spanOrderId.innerText = orderId ;