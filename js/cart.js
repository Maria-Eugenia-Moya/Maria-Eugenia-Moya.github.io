const URL = CART_INFO_URL + "25801" + EXT_TYPE
let producto = {}
let precioUni = 0

document.addEventListener("DOMContentLoaded", () => {

    fetch(URL)
    .then(resp => resp.json())
    .then(data => {
        producto = data;
        console.log(producto);
        showArticulo(producto);
    })
});

function showArticulo(){

    precioUni = producto.articles[0].unitCost

    listaDesplegable = `
    <div class="row">
    <div class="col-md-2"> </div>
    <div class="col-md-2"><b>Nombre</b></div>
    <div class="col-md-2"><b>Costo</b></div>
    <div class="col-md-2"><b>Cantidad</b></div>
    <div class="col-md-2"><b>Subtotal</b></div>
    </div>
    <hr size="5">
    <div class="row">
    <div class="col-md-2"><img src="${producto.articles[0].image}" width="75px"></div>
    <div class="col-md-2"><p>${producto.articles[0].name}</p></div>
    <div class="col-md-2"><p>USD ${producto.articles[0].unitCost}</p></div>
    <div class="col-md-2"><input type="number" value=1 id="cantArticulo" onchange="subtotal()" style="width:60px"></div>
    <div class="col-md-2"><b id=subtotal> USD ${precioUni}</b></div>
    </div>
    <hr>
    <hr>
    <br>
    
    `
    document.getElementById("listaCompras").innerHTML = listaDesplegable;
}

function subtotal(){
    document.getElementById("subtotal").innerHTML = precioUni * document.getElementById("cantArticulo").value

}