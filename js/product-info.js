const URL1 = PRODUCT_INFO_URL + localStorage.getItem("ProdID") + EXT_TYPE;
const URLCOMMENT = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("ProdID") + EXT_TYPE;

let producto = {};



document.addEventListener("DOMContentLoaded", () => {

    fetch(URL1)
    .then(resp => resp.json())
    .then(data =>{
        producto = data;
        relproducto = data.relatedProducts;
        showRelatedProducts(relproducto);
        document.getElementById("productName").innerHTML = producto.name;
        document.getElementById("productPrice").innerHTML = producto.cost + " " + producto.currency;
        document.getElementById("productDescription").innerHTML = producto.description;
        document.getElementById("productCategory").innerHTML = producto.category;
        document.getElementById("productSoldCount").innerHTML = producto.soldCount;
        document.getElementById("img1").src = producto.images[0];
        document.getElementById("img2").src = producto.images[1];
        document.getElementById("img3").src = producto.images[2];
        document.getElementById("img4").src = producto.images[3];
        //document.getElementById("imgRProd1").src = relproducto.image[0];
        //document.getElementById("imgRProd2").src = relproducto.image[1];
        //document.getElementById("relatedProd1").innerHTML = relproducto.name[0];
        //document.getElementById("relatedProd1").innerHTML = relproducto.name[1];

        fetch(URLCOMMENT)
        .then(resp => resp.json())
        .then(dato =>{ 

        comments = dato;
        showComments(comments);
    })

 });

 /*document.getElementById("rProd1").addEventListener("click", function() {
    localStorage.setItem("id");
    window.location = "product-info.html"
});
document.getElementById("rProd2").addEventListener("click", function() {
    localStorage.setItem("id");
    window.location = "product-info.html"
});*/

});


function showComments(array){
    
    let htmlShow = "";

    for (let i =0; i<array.length; i++){
        let comment = array[i];
        htmlShow += `<div class= "list-group-item list-group-item-action">
        <div class="row">
        <div class="col">
        <p> <strong>${comment.user}</strong> - ${comment.dateTime} - ${starScore(comment.score)} </p>
        <p>${comment.description}</p>
        </div>
        </div>
        </div>`
        
        }
        document.getElementById("comentarios").innerHTML = htmlShow;
        }

    function starScore(stars){
        let htmlStars = ""

        for (let i = 0; i < stars; i++){
            htmlStars += `<span class="fa fa-star checked"></span>`
        };
        for (i = stars; i<5; i++){
            htmlStars += `<span class="fa fa-star"></span>`
        }
        return htmlStars;
    };

    function setProduct(id){
        localStorage.setItem("ProdID", id);
        window.location.href = "product-info.html";
    }
    
    function showRelatedProducts(array){
        
        let htmlContentToAppend = "";
        for (let i = 0; i < array.length; i++){
            let rprod = array[i];
                htmlContentToAppend += `
                <div class="col-3" onclick="setProduct(${rprod.id})">
                <div class="card mb-4 shadow-sm custom-card cursor-active">
                            <img src=` + rprod.image + ` alt="product image"><br>
                            <div class="card-body">
                                <p> `+ rprod.name +`</p>
                            </div> 
                </div>
                </div>`
            }
            
            document.getElementById("related-products").innerHTML = htmlContentToAppend;
        }

document.getElementById("regBtn").addEventListener("click", function(){

        window.location = "product-info.html";
     
     });


if(localStorage.getItem('userlog') != undefined){
    document.getElementById("usuario").innerHTML = localStorage.getItem('userlog');
    }


