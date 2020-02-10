fetch("https://kea-alt-del.dk/t5/api/productlist")
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    showData(data)

  })

function showData(jsonData) {
  //console.log(jsonData)
  //[].forEach
  //{}.somethin
  //1 make a template

  //2 loop though jsonData
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


    //copy.querySelector(".region span").textContent = dish.region;

    //importing images from database
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + dish.image + "-sm.jpg";

    console.log(smallImg)

    copy.querySelector("img").setAttribute('src', smallImg)

  //append somewhere

  const whoIsYourDaddy = document.querySelector("#starters")
  whoIsYourDaddy.appendChild(copy)
}
