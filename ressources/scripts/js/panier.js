/*
<div class="info-cmd">
    <h2>Titre de l'article</h2>
    <p>prix : 120€</p>
    <div>
        <input type="number" id="quantite-produit" value="1">
        <i class="fas fa-trash-alt"></i>
    </div>
</div>
*/

/*
<div class="info-cmd">
    <h2></h2>
    <p>prix : </p>
    <div>
        <input type="number" id="quantite-produit" value="1" min="1" max="99">
        <i class="fas fa-trash-alt"></i>
    </div>
</div>
*/

window.listofarticles = [];

function loadPanier() {
    getCookie();
    readProducts();
}

function loadPurchase() {
    getCookie();
    if (window.listofarticles.length > 0) {
        document.querySelector("#panier").innerHTML = "Mon Panier (" + window.listofarticles.length + ") <i class='fas fa-shopping-basket'></i></a></li>";
        document.querySelector("#panier").style.color = "#b22222";
    }
}

function getCookie() {
    window.readCookie = document.cookie;
    if (document.cookie.split(';').some((item) => item.trim().startsWith('product-list=')) != "") {
        var cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('product-list'))
            .split('=')[1];
        console.log(cookieValue);
        window.listofarticles = JSON.parse(cookieValue);
    } else {
        setCookie(JSON.stringify(window.listofarticles));
    }
}

function setCookie(string) {
    document.cookie = "product-list=" + string;
}

function setProductInCookies(name, price, id) {
    alert("Ajouté au panier !");
    var noupdate = false;
    for (var element of window.listofarticles) {
        if (element.id == id) {
            element.quantity++;
            noupdate = true;
            break;
        }
    }

    if (!noupdate) {
        window.listofarticles.push({
            name: name,
            price: price,
            id: id,
            quantity: 1
        })
    }


    setCookie(JSON.stringify(window.listofarticles));
    if (window.listofarticles.length > 0) {
        document.querySelector("#panier").innerHTML = "Mon Panier (" + window.listofarticles.length + ") <i class='fas fa-shopping-basket'></i></a></li>";
        document.querySelector("#panier").style.color = "red";
    } else {
        document.querySelector("#panier").innerHTML = "Mon Panier <i class='fas fa-shopping-basket'></i></a></li>";
        document.querySelector("#panier").style.color = "white";
    }
}

function givePrice() {
    var price = 0;
    window.listofarticles.forEach(element => {
        var cp = element.price.replace(",", ".");
        price += Number(cp) * Number(element.quantity);
    });
    return price;
}

function updatePrice() {
    var price = givePrice().toFixed(2);
    document.querySelectorAll("#prix>p")[0].innerText = "Produits : " + String(price) + " €";
    document.querySelector("#prix>h2").innerText = "Total : " + String(price) + " €";
}

function readProducts() {
    count = 0;
    window.listofarticles.forEach(element => {
        var articles = document.querySelector("#articles");

        var infocmd = document.createElement("div");
        infocmd.setAttribute("class", "info-cmd");
        infocmd.setAttribute("num", count);

        var title = document.createElement("h2");
        title.innerText = element.name;

        var price = document.createElement("p");
        price.innerText = "prix : " + element.price + " €";

        var input_div = document.createElement("div");

        var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("id", "quantite-produit");
        input.setAttribute("value", Number(element.quantity));
        input.setAttribute("min", "1");
        input.setAttribute("max", "99");
        input.addEventListener("change", (e) => {
            window.listofarticles[e.target.parentElement.parentElement.getAttribute("num")].quantity = e.target.value;
            setCookie(JSON.stringify(window.listofarticles));
            updatePrice();
        });

        var icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-trash-alt");

        input_div.appendChild(input);
        input_div.appendChild(icon);

        infocmd.appendChild(title);
        infocmd.appendChild(price);
        infocmd.appendChild(input_div);

        icon.addEventListener("click", (e) => {
            window.listofarticles.splice(e.target.getAttribute("num"), 1);
            setCookie(JSON.stringify(window.listofarticles));
            updatePrice();
            if (window.listofarticles.length == 0) {
                var body = document.querySelector("body>h1");
                body.innerText = "Vous n'avez pas d'articles dans votre panier.";
                body.style.margin = "20% 0px";
                var footer = document.querySelector("footer");
                footer.style.position = "absolute";
                footer.style.bottom = 0;
                var panier = document.querySelector("#panier-cmd");
                panier.style.display = "none";
            }
            e.target.parentElement.parentElement.remove();
        })

        articles.appendChild(infocmd);

        count++;
    });
    updatePrice();
    if (window.listofarticles.length == 0) {
        var body = document.querySelector("body>h1");
        body.innerText = "Vous n'avez pas d'articles dans votre panier.";
        body.style.margin = "20% 0px";
        var footer = document.querySelector("footer");
        footer.style.position = "absolute";
        footer.style.bottom = 0;
        var panier = document.querySelector("#panier-cmd");
        panier.style.display = "none";
    }
}