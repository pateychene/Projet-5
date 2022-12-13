var searchParamsP = new URLSearchParams(document.location.search);
var orderId = searchParamsP.get("id"); // Id renvoyer lors de la commande
let spanOrderId = document.getElementById("orderId")
spanOrderId.innerText = orderId ;