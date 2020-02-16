/*window.onscroll = function() {stickyNav()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
*/



//modal FIRST
//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});
//modal FIRST end




/*
1.fetch categories
2. create sections

<section id="starters">
        <button type="button" class="collapsible">STARTERS</button>
<section>
3. assign id
4. assign products to categories

*/
fetch("https://kea-alt-del.dk/t5/api/categories")
.then(res=>res.json())
.then(createCategories)

function createCategories(data) {
    console.log(data)
    data.forEach(function(showCategory){
        
        const section = document.createElement("section");
        section.id=showCategory;
        const button = document.createElement("button");
        button.classList.add('collapsible')
        button.textContent=showCategory;
        console.log(button)
        section.appendChild(button);
        
        document.querySelector("main.menu-page").appendChild(section);
    })
    getProducts();
}

function getProducts() {
fetch("https://kea-alt-del.dk/t5/api/productlist")
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    showData(data)

  })
}
function showData(jsonData) {
  //console.log(jsonData)
  //[].forEach
  //{}.somethin
  //1 make a template

  //2 loop though jsonData
    console.log(jsonData)
  jsonData.forEach(showSingleDish)
}

function showSingleDish(dish) {
  console.log(dish)
  //1 grab the template
  const template = document.querySelector("#dishTemplate").content;

  //2 make copy and tell the browser to replace the respective values
  const copy = template.cloneNode(true);
  // change some conetnt
  copy.querySelector("h3.dish-name").textContent = dish.name;
    copy.querySelector(".description span").textContent = dish.shortdescription;
    copy.querySelector(".price span").textContent = dish.price;
    copy.querySelector(".alcohol span").textContent = dish.alcohol;
    //calculating price
    if (dish.discount) { //on sale
    copy.querySelector(".price-discount span").textContent = dish.price;
    const newPrice = Math.round(dish.price - dish.price * dish.discount / 100);

    copy.querySelector(".price-full span").textContent = newPrice;
    //calculate new price
    //49-49*10/100
    //dish.price-dish.price*price.discount/100
  } else { // not on discount
    copy.querySelector(".price-discount").remove()
    copy.querySelector(".price-full span").textContent = dish.price
  }

    //alcohol
   if (dish.alcohol) {
    copy.querySelector(".alcohol span").textContent = dish.alcohol;
    const containsAlcohol = Math.round(dish.alcohol - dish.alcohol/ 100);

    copy.querySelector(".alcohol span").textContent = containsAlcohol;
    //calculate alcohol
    //49-49/100
    //dish.alcohol-dish.alcohol*/100
  } else { // not on discount
    copy.querySelector(".alcohol").remove()
  }

//dish sold out picture


   // const soldout = "images/four-categories/outerglow/SVG/sold-out.svg";

    if(!dish.soldout) {
        copy.querySelector("img[alt=soldout]").remove()
    }

    if(!dish.vegetarian) {
        copy.querySelector("img[alt=vegetarian]").remove()
    }

   // if(!dish.alcohol) {
    //    copy.querySelector("img[alt=alcohol]").remove()
   // }

    if(!dish.discount) {
        copy.querySelector("img[alt=discount]").remove()
    }


    //....


    //copy.querySelector(".region span").textContent = dish.region;

    //importing images from database
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + dish.image + "-sm.jpg";

    console.log(smallImg)

    copy.querySelector("img").setAttribute('src', smallImg)

//modal SECOND
    copy.querySelector("button").addEventListener("click", () => {
        console.log("click", dish)
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
      .then(res => res.json())
      .then(showDetails);
  });
//modal SECOND end


    console.log(`#${dish.category}`)
    document.querySelector(`#${dish.category}`).appendChild(copy);
    //append somewhere
  /*const whoIsYourDaddy = document.querySelector("#starters")
  whoIsYourDaddy.appendChild(copy) */
}


//modal THIRD
function showDetails(data) {
    console.log(data)
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  modal.querySelector(".modal-region").textContent = data.region;
    //images modal
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + data.image + "-sm.jpg";
    console.log(smallImg)
    modal.querySelector(".modal-image").setAttribute('src', smallImg)

   // if(!data.vegetarian) {
   //     copy.querySelector("img[alt=modal-vegetarian]").remove()
  //  }

    //price modal
    modal.querySelector(".modal-price span").textContent = data.price;
 if (data.discount) { //on sale
    modal.querySelector(".price-discount span").textContent = data.price;
    const newPrice = Math.round(data.price - data.price * data.discount / 100);

    modal.querySelector(".price-full span").textContent = newPrice;
    //calculate new price
    //49-49*10/100
    //dish.price-dish.price*price.discount/100
  } else { // not on discount
   //modal.querySelector(".price-discount").remove()
    modal.querySelector(".price-full span").textContent = data.price;
  }


  //...
  modal.classList.remove("hide");
}
//modal THIRD end

//categories



