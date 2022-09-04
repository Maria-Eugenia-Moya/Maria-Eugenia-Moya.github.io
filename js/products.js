const ORDER_ASC_BY_PRICE = "$->$$";
const ORDER_DESC_BY_PRICE = "$$->$";
const ORDER_BY_SOLD_COUNT = "Cant.";
let min = 0;
let max = 0;
let categoriesArray = [];
let categoriesProducts = [];
let currentSortCriteria = undefined;
let FiltroArray = [];

function comparacion(a,b){
    return a.name.localCompare(b.name)
}

function sortAndShowCategories(criterio,array){
    if (criterio === ORDER_ASC_BY_PRICE){
        FiltroArray = array.sort((a,b) => {return a.cost - b.cost} )
    }
    else if (criterio === ORDER_DESC_BY_PRICE){
        FiltroArray = array.sort((a,b) => {return b.cost - a.cost} )
    }
    else if (criterio === ORDER_BY_SOLD_COUNT){
        FiltroArray = array.sort((a, b) => {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    document.getElementById("info").innerHTML = ""
    showCategoriesList(FiltroArray);
};

function showCategoriesList(array){
    
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++){
        let category = array[i];
        if (((min == 0) || (parseInt(category.cost) >= min) ) &&
         ((max == 0) || (parseInt(category.cost) <= max))){
            htmlContentToAppend += `
            <div class= "list-group-item list-group-item-action">
            <div class="row">
                    <div class="col-3">
                        <img src=` + category.image + ` alt="product image" class="img-thumbnail">
                    </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4>`+ category.name +`</h4>
                            <p> `+ category.description +`</p>
                        </div>
                            <small class="text-muted">` + category.soldCount + ` artículos </small>
                        </div>
                    </div>
                </div>
            </div>`
        }
        
        document.getElementById("info").innerHTML = htmlContentToAppend;
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    fetch( PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE )
    .then(res => res.json())
    .then(data =>{

    categoriesArray = data;
    categoriesProducts = data.products;
    FiltroArray = data.products;
    document.getElementById('cat-name').innerHTML = categoriesArray.catName;
    showCategoriesList(categoriesProducts);
    });


document.getElementById("sortPriceAsc").addEventListener("click", function(){
    sortAndShowCategories(ORDER_ASC_BY_PRICE, FiltroArray);
});

document.getElementById("sortPriceDesc").addEventListener("click", function(){
    sortAndShowCategories(ORDER_DESC_BY_PRICE, FiltroArray);
});

document.getElementById("sortBySoldCount").addEventListener("click", function(){
    sortAndShowCategories(ORDER_BY_SOLD_COUNT, FiltroArray);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    min = 0;
    max = 0;
    showCategoriesList(FiltroArray);
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    min = document.getElementById("rangeFilterCountMin").value;
    max = document.getElementById("rangeFilterCountMax").value;
    document.getElementById('info').innerHTML = ""
    showCategoriesList(FiltroArray)
});

});

if(localStorage.getItem('userlog') != undefined){
    document.getElementById("usuario").innerHTML = localStorage.getItem('userlog');
    }