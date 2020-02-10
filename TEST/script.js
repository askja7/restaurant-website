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

  //2 make copy
  const copy = template.cloneNode(true);
  // change some conetnt
  copy.querySelector("h3").textContent = dish.name;
    copy.querySelector(".description span").textContent = dish.shortDescription;
    copy.querySelector(".price span").textContent = dish.price;
    copy.querySelector(".region span").textContent = dish.region;
  //append somewhere

  const whoIsYourDaddy = document.querySelector("#starters")
  whoIsYourDaddy.appendChild(copy)
}
