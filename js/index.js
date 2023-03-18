// / <reference types="../@types/jquery" />

$(document).ready(() => {
    apiIntro("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})


function closebar() {
    let sideBarPosition = $('.sidenav').innerWidth()
    if ($("nav").css("left") == '0px') {
        $('nav').animate({ left: -sideBarPosition }, 500)
        $('#navBar').slideToggle(1000)
        $('footer').slideToggle(1000)
        $('#close').fadeToggle(200, () => {
            $('#open').fadeToggle(200)
        })
    }
} closebar()
/* ----------navbar--------*/
$('.toggle').click(function () {
    let sideBarPosition = $('.sidenav').innerWidth()
    // console.log($("nav").css("left"))
    // console.log($('.sidenav').innerWidth())
    if ($("nav").css("left") == '0px') {
        $('nav').animate({ left: -sideBarPosition }, 500)
        $('#navBar').slideToggle(1000)
        $('footer').slideToggle(1000)
        $('#close').fadeToggle(200, () => {
            $('#open').fadeToggle(200)
        })

    } else {
        $('nav').animate({ left: '0px' }, 500)
        $('#navBar').slideToggle(1000)
        $('footer').slideToggle(1000)
        $('#open').fadeToggle(200, () => {
            $('#close').fadeToggle(200)
        })

    }

})
function responsiveNav() {
    if ($("html,body").innerWidth() < 800) {
        $('nav').removeClass('w-25').addClass('w-50')

    } else {
        $('nav').removeClass('w-50')

    }
} responsiveNav()
/*-----------api intro -----------*/
async function apiIntro() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let finalRes = await res.json()
    // console.log(finalRes.meals)
    displayMeals(finalRes)
}
apiIntro()
/* -----------display intro------------- */
function displayMeals(x) {
    let intro = ``
    for (i = 0; i < 20; i++) {
        intro += `
        <div class="col" id='${x.meals[i].idMeal}'>

                    <div onclick="getDetails(${x.meals[i].idMeal})" class="img rounded position-relative">
                        <img src="${x.meals[i].strMealThumb}" class="w-100 rounded" alt="">
                        <div class="bg-layer rounded w-100  align-items-center position-absolute">
                            <h3 class="ps-3">${x.meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
        $('#main .row').html(intro)
    }
}
/* ------------details-------- */
async function getDetails(idMeal) {
    $(".loading-screen").fadeIn(300)
    $('main , #searchResult,#search ,#category,#area,.ingredients').fadeOut(500, () => {
        $(".mealDetails").fadeIn(200)
    })
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    let finalRes = await res.json()
    displayDetails(finalRes)
    $(".loading-screen").fadeOut(300)
    console.log('ninihi');
}

function displayDetails(x) {
    let details = ``

    details += `
    <div class="col-md-4">
    <div class="mealImg rounded">
        <img src="${x.meals[0].strMealThumb}" class="w-100 rounded" alt="">
    </div>
    <h2 class="mealTitle">${x.meals[0].strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${x.meals[0].strInstructions}</p>
    <h3>Area: <span>${x.meals[0].strArea}</span></h3>
    <h3>Category: <span>${x.meals[0].strCategory}</span></h3>
    <h3>Recipes:</h3>
    <div class="recipes  p-0">
        <ul class="d-flex p-0   flex-wrap">
        
            <li class="btn btn-info "><span>${x.meals[0].strMeasure1}</span> ${x.meals[0].strIngredient1}</li>
            <li class="btn btn-info "><span>${x.meals[0].strMeasure2}</span> ${x.meals[0].strIngredient2}</li>
            <li class="btn btn-info "><span>${x.meals[0].strMeasure3}</span> ${x.meals[0].strIngredient3}</li>
            <li class="btn btn-info "><span>${x.meals[0].strMeasure4}</span> ${x.meals[0].strIngredient4}</li>
            <li class="btn btn-info "><span>${x.meals[0].strMeasure5}</span> ${x.meals[0].strIngredient5}</li>
            <li class="btn btn-info "><span>${x.meals[0].strMeasure6}</span> ${x.meals[0].strIngredient6}</li>
            
            
            
        </ul>
    </div>
    <h3>Tags:</h3>
    <div class="tags">
        <ul class="d-flex p-0 w-auto  flex-wrap">
            <li class="btn btn-light ">${x.meals[0].strTags}</li>
        </ul>
    </div>
    <div class="links">
        <a class="btn btn-success me-2" href="${x.meals[0].strSource}">Source</a><a class="btn btn-danger" href="${x.meals[0].strYoutube}">Youtube</a>
    </div>
</div>
`
    $("#mealDetails .row").html(details)
}
/* ------------search show-----------*/
$('#searchbtn').click(() => {
    closebar()
    $(".loading-screen").fadeIn(300)
    $('main ,#contactUs, #category,.ingredients,#area,.mealDetails').fadeOut(500, () => {
        $('#search').fadeIn(500)
    })
    $(".loading-screen").fadeOut(300)

})
/* ---------search by name function------------ */
$("#searchName").keyup(async () => {

    $(".loading-screen").fadeIn(300, () => {
        $("#searchResult").fadeIn(300)
    })
    let searchNVal = $("#searchName").val()
    await searchByName(searchNVal)
    $(".loading-screen").fadeOut(300)

    console.log(searchNVal)
})
async function searchByName(searchNVal) {

    let searchRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchNVal}`)
    let finalSRes = await searchRes.json()
    // console.log(finalSRes);
    searchNameRes(finalSRes)

}
searchByName()
function searchNameRes(arr) {
    let nRes = ``
    for (i = 0; i < arr.meals.length; i++) {
        nRes += `
        <div class="col" id='${arr.meals[i].idMeal}>
                    <div onclick="getDetails(${arr.meals[i].idMeal})" class="img rounded position-relative">
                        <img src="${arr.meals[i].strMealThumb}" class="w-100 rounded" alt="">
                        <div class="bg-layer rounded w-100  align-items-center position-absolute">
                            <h3 class="ps-3">${arr.meals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
        $('#searchResult').html(nRes)
    }
}
/*-----------------search by First Letter---------- */
$("#searchFLetter").keyup(async () => {
    $(".loading-screen").fadeIn(300, () => {
        $("#searchResult").fadeIn(300)
    })
    let searchFVal = $("#searchFLetter").val()
    $(".loading-screen").fadeOut(300)
    await firstLetterS(searchFVal)
    // console.log(searchFVal)
})
async function firstLetterS(searchFVal) {
    // $(".loading-screen").fadeIn(300)
    let searchFRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchFVal}`)
    let finalSFRes = await searchFRes.json()
    // $(".loading-screen").fadeOut(300)
    searchNameRes(finalSFRes)

}
/* -----------------categories-------------- */
$('#cat').click(() => {
    closebar()
    $('#search , #main').fadeOut(500, () => {
        $('#category').fadeIn(500)
    })
    catApi()
})
// cat api
async function catApi() {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let final = await response.json()
    // console.log(response)
    displayCategories(final.categories)
    $(".loading-screen").fadeOut(300)

}
function displayCategories(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal img position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                    <div class="bg-layer rounded w-100  p-2  text-center d-flex flex-column align-items-center justify-content-center position-absolute">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    $("#catResult").html(cartoona)
}
async function getCategoryMeals(category) {
    $(".loading-screen").fadeIn(300)

    $('#search , #category,#area,.ingredients').fadeOut(500, () => {
        $('main').fadeIn(500)
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    console.log(response.meals)
    $(".loading-screen").fadeOut(300)
    displayMeals(response)


}
/* -----------------area filter---------------- */
$('#areaBtn').click(() => {
    closebar()
    $('#search , #main').fadeOut(500, () => {
        $('#area').fadeIn(500)
    })
    getArea()
})
async function getArea() {
    $(".loading-screen").fadeIn(300)

    $('#search , #category,#main,.ingredients,.mealDetails').fadeOut(500, () => {
        $('#area').fadeIn(500)
    })
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    finalRes = await res.json()
    $(".loading-screen").fadeOut(300)
    displayArea(finalRes)

}
function displayArea(arr) {
    let cartoona = ``
    for (i = 0; i < arr.meals.length; i++) {
        cartoona += `
        <div onclick="setArea('${arr.meals[i].strArea}')" class="col  text-center ">
             <i class="fa-solid text-white  fa-house-laptop fa-4x"></i>
             <h3>${arr.meals[i].strArea}</h3>
        </div>
    `
        $("#area .row").html(cartoona)
    }
}
async function setArea(area) {
    $(".loading-screen").fadeIn(300)

    $('#search ,#category,#area,.ingredients,.mealDetails').fadeOut(500, () => {
        $('#main').fadeIn(500)
    })
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    Fres = await res.json()
    // console.log(Fres.meals);
    $(".loading-screen").fadeOut(300)
    displayMeals(Fres)


}
/* --------------Ingredients--------------- */
$('#ingred').click(() => {
    closebar()
    $('#search ,#category,#area,#main').fadeOut(500, () => {
        $('.ingredients').fadeIn(500)
    })
    getIngredient()
})
async function getIngredient() {
    $(".loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let res = await response.json()
    console.log(res.meals);
    $(".loading-screen").fadeOut(300)
    displayIngredient(res)

}

function displayIngredient(arr) {
    let cartoona = ``
    for (i = 0; i < arr.meals.length; i++) {
        cartoona += `
        <div onclick="getIngredientsMeals('${arr.meals[i].strIngredient}')" class="col  text-center ">
                    <i class="fa-solid text-white fa-drumstick-bite fa-4x"></i>
                    <h3>${arr.meals[i].strIngredient}</h3>
                    <p>${arr.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        `
        $("#ingredients .row").html(cartoona)
    }
}
async function getIngredientsMeals(ingredients) {
    $(".loading-screen").fadeIn(300)

    $('#search ,#category,#area,.ingredients,.mealDetails').fadeOut(500, () => {
        $('#main').fadeIn(500)
    })
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    $(".loading-screen").fadeOut(300)
    displayMeals(response)



}
$("#contactBtn").click(() => {
    closebar()
    $('#search ,#category,#area,#main,.ingredients,.mealDetails').fadeOut(500, () => {
        $('#contactUs').fadeIn(500)
    })
    getIngredient()
})





// -------------------------- validation -----------------------------------------

submitBtn = document.getElementById("submitBtn")
document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}