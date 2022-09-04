const urlParams = new URLSearchParams(window.location.search);
const brandname = urlParams.get("brandname");
console.log(brandname);

const url = `https://kea-alt-del.dk/t7/api/products?limit=100&brandname=${brandname}`;

fetch(url)
.then(function(res){
    return res.json();
})

.then(function(data){
    handleProductList(data);
})

function handleProductList(data){
    // console.log(data);
    data.forEach(showProduct);
}
/* <article class="smallProduct">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp"
            alt="Sahara Team India Fanwear Round Neck Jersey"
          />
          <h3>Sahara Team India Fanwear Round Neck Jersey</h3>
          
          <p class="price"><span>Prev.</span> DKK 1595,-</p>
          <div class="discounted">
            <p>Now DKK 1560,-</p>
            <p>-34%</p>
          </div>
          <a href="product.html">Read More</a>
        </article> */
function showProduct(product){
    console.log(product);
    //soldOut on sale

    //grab the template

    const template = document.querySelector("#smallProductTemplate").content;
    //clone it
    const copy = template.cloneNode(true);
    //change content
    copy.querySelector(".subtle").textContent = `${product.brandname}`;
    copy.querySelector("h3").textContent = product.productdisplayname;
    
    copy.querySelector("img.productlistimage").src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`
    copy.querySelector("img.productlistimage").alt = product.productdisplayname;
   

    copy.querySelector("a").href = `product.html?id=${product.id}`

    if(product.soldout){
        copy.querySelector("article").classList.add("soldOut");
    }
    if(product.discount){
        copy.querySelector("article").classList.add("onSale");
    }

    copy.querySelector(".discounted p").textContent = product.price;
    //grab parent
    const parent = document.querySelector("main");
    //append
    parent.appendChild(copy);
}