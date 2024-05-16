let pageload_item_selector = "pageloadtime"
let pageload_server_item_selector = "pageloadtime_server"
let pageload_servertime_selector = "elapsed_time_server"

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

        document.querySelectorAll(span_selector).forEach((function (el) {
          if (el.dataset.id === pageload_server_item_selector) {
            let elapsed_time = 0;
            document.querySelectorAll("input").forEach((el) => {
              if (el.dataset.id === pageload_servertime_selector)
                elapsed_time = el.value;
            })
            el.innerHTML = elapsed_time.toString()
            console.log(elapsed_time)
          }
        }))

      }
    })
)