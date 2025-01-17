let nav_items_selector = ".header-nav .header-nav-ul li"

let nav_items_ids = {
    "/index.html": "home",
    "/about.html": "about",
    "/contact.html": "contact"
}

let active_nav_item_selector = "active"
let active_item = nav_items_ids[document.location.pathname.toString()]

window.addEventListener("load", (event) => {
    document.querySelectorAll(nav_items_selector).forEach((function (el) {
        el.classList.remove(active_nav_item_selector)
        if (el.dataset.id === active_item)
            el.classList.add(active_nav_item_selector)
    }))
})
