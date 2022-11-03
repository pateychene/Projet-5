console.log("Boneunjour bienvue sur index.html") ;

var longueur = 100 ;
//Récupérer l'élément p


console.log(longueur);

function toto(){
    longueur += 1 ;
    console.log(longueur) ;
}
//101

function titi(x){
    longueur = longueur + x ; //longeur += x 
    console.log(longueur);
}

toto();

titi(20);

//longueur == 121
titi(30);

titi(49);

/**
 * bonjour 
 * 100
 * 101
 * 121
 * 151  
 * 200
 */

 
document.getElementById("injectText").innerHTML= "voilà le nouveau texte" ;

