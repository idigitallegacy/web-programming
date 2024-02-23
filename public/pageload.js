let pageload_item_selector = "pageloadtime"

let time = Date.now()
let span_selector = ".footer-nav .footer-nav-ul li span"

document.addEventListener(
    "readystatechange",
    (function () {
        if (document.readyState === "complete") {
            let final_time = Date.now()
            document.querySelectorAll(span_selector).forEach((function (el) {
                if (el.dataset.id === pageload_item_selector)
                    el.innerHTML = (final_time - time).toString()
            }))
        }
    })
)