import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSharedStyles() {
    return "<link rel=\"stylesheet\" href=\"https://necolas.github.io/normalize.css/8.0.1/normalize.css\">\n" +
      "<link rel=\"stylesheet\" href=\"outlines.css\"/>"
  }

  getSharedScripts() {
    return "<script src=\"js/nav.js\"></script>\n" +
      "<script src=\"js/pageload.js\"></script>"
  }

  getHeader() {
    return "<header>\n" +
      "  <div class=\"header-logo\">\n" +
      "    <div class=\"header-logo-img\"></div>\n" +
      "  </div>\n" +
      "\n" +
      "  <div class=\"header-text\">\n" +
      "    <h1 class=\"header-text-heading\">Michael Makarov</h1>\n" +
      "    <p class=\"header-text-description\">Personal blog</p>\n" +
      "  </div>\n" +
      "\n" +
      "  <nav class=\"header-nav\">\n" +
      "    <ul class=\"header-nav-ul\">\n" +
      "      <li data-id=\"home\"><a href=\"./\">Главная</a></li>\n" +
      "      <li data-id=\"about\"><a href=\"about\">Обо мне</a></li>\n" +
      "      <li data-id=\"contact\"><a href=\"contact\">Контакты</a></li>\n" +
      "      <li data-id=\"constructor\"><a href=\"constructor\">Конструктор todo</a></li>\n" +
      "    </ul>\n" +
      "  </nav>\n" +
      "</header>"
  }

  getNavPanel() {
    return "  <nav class=\"main-nav\">\n" +
      "    <ul class=\"main-nav-ul\">\n" +
      "      <li class=\"main-nav-li-active\"><a href=\"#\">C</a></li>\n" +
      "      <li><a href=\"#\">C++</a></li>\n" +
      "      <li><a href=\"#\">C#</a></li>\n" +
      "      <li><a href=\"#\">Java</a></li>\n" +
      "      <li><a href=\"#\">Web</a></li>\n" +
      "    </ul>\n" +
      "  </nav>"
  }

  getIndexPageContent() {
    let content_open_tag = "  <section class=\"main-content\">\n";
    let content_close_tag = "   </section>";

    let content = content_open_tag + '\n';
    content += "    <article class=\"main-content-item\">\n" +
      "      <h3 class=\"main-content-item-header\">Lorem ipsum</h3>\n" +
      "      <p class=\"main-content-item-des\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n" +
      "      <code>asd.add(el);</code>\n" +
      "    </article>\n" +
      "    <article class=\"main-content-item\">\n" +
      "      <h3 class=\"main-content-item-header\">Lorem ipsum</h3>\n" +
      "      <p class=\"main-content-item-des\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n" +
      "      <code>asd.add(el);</code>\n" +
      "    </article>\n" +
      "    <article class=\"main-content-item\">\n" +
      "      <h3 class=\"main-content-item-header\">Lorem ipsum</h3>\n" +
      "      <p class=\"main-content-item-des\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n" +
      "      <code>asd.add(el);</code>\n" +
      "    </article>\n" +
      "    <article class=\"main-content-item\">\n" +
      "      <h3 class=\"main-content-item-header\">Lorem ipsum</h3>\n" +
      "      <p class=\"main-content-item-des\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n" +
      "      <code>asd.add(el);</code>\n" +
      "    </article>\n" +
      "    <article class=\"main-content-item\">\n" +
      "      <h3 class=\"main-content-item-header\">Lorem ipsum</h3>\n" +
      "      <p class=\"main-content-item-des\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n" +
      "      <code>asd.add(el);</code>\n" +
      "    </article>\n" +
      "    <article class=\"main-content-item\">\n" +
      "      <h3 class=\"main-content-item-header\">Lorem ipsum</h3>\n" +
      "      <p class=\"main-content-item-des\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>\n" +
      "      <code>asd.add(el);</code>\n" +
      "    </article>\n" +
      "  <div class=\"table-wrap\">\n" +
      "    <table>\n" +
      "      <thead>\n" +
      "      <tr>\n" +
      "        <th>Услуга</th>\n" +
      "        <th>Описание</th>\n" +
      "        <th>Цена</th>\n" +
      "        <th>Скидка</th>\n" +
      "      </tr>\n" +
      "      </thead>\n" +
      "      <tbody>\n" +
      "      <tr>\n" +
      "        <td>Мобильная верстка</td>\n" +
      "        <td>Верстка под телефоны</td>\n" +
      "        <td>$3000</td>\n" +
      "        <td>50%</td>\n" +
      "      </tr>\n" +
      "      <tr>\n" +
      "        <td>Посадка на CMS WordPress</td>\n" +
      "        <td>Создание сайта с админ. панелью</td>\n" +
      "        <td>$3000</td>\n" +
      "        <td>30%</td>\n" +
      "      </tr>\n" +
      "      <tr>\n" +
      "        <td>Мобильная верстка</td>\n" +
      "        <td>Верстка под телефоны</td>\n" +
      "        <td>$3000</td>\n" +
      "        <td>50%</td>\n" +
      "      </tr>\n" +
      "      <tr>\n" +
      "        <td>Посадка на CMS WordPress</td>\n" +
      "        <td>Создание сайта с админ. панелью</td>\n" +
      "        <td>$3000</td>\n" +
      "        <td>30%</td>\n" +
      "      </tr>\n" +
      "      <tr>\n" +
      "        <td>Мобильная верстка</td>\n" +
      "        <td>Верстка под телефоны</td>\n" +
      "        <td>$3000</td>\n" +
      "        <td>50%</td>\n" +
      "      </tr>\n" +
      "      <tr>\n" +
      "        <td>Посадка на CMS WordPress</td>\n" +
      "        <td>Создание сайта с админ. панелью</td>\n" +
      "        <td>$3000</td>\n" +
      "        <td>30%</td>\n" +
      "      </tr>\n" +
      "      <tr>\n" +
      "        <td>Мобильная верстка</td>\n" +
      "        <td>Верстка под телефоны</td>\n" +
      "        <td>$3000</td>\n" +
      "        <td>50%</td>\n" +
      "      </tr>\n" +
      "      <tr>\n" +
      "        <td>Посадка на CMS WordPress</td>\n" +
      "        <td>Создание сайта с админ. панелью</td>\n" +
      "        <td>$3000</td>\n" +
      "        <td>30%</td>\n" +
      "      </tr>\n" +
      "      </tbody>\n" +
      "    </table>\n" +
      "  </div>";
    content += content_close_tag;
    return content;
  }

  getAboutPageContent() {
    return this.getIndexPageContent();
  }

  getContactPageContent() {
    return this.getIndexPageContent();
  }

  getConstructorPageContent() {
    return "<section class=\"main-content\">\n" +
      "    <form id=\"#todo-form\">\n" +
      "      <input id=\"todo-thing\" name=\"todo-thing\" type=\"text\" required>\n" +
      "      <label for=\"todo-thing\">What should be done?</label>\n" +
      "\n" +
      "      <input type=\"submit\">\n" +
      "    </form>\n" +
      "    <div id=\"generated-todos\">\n" +
      "\n" +
      "    </div>\n" +
      "\n" +
      "  </section>"
  }

  getDirect() {
    return "<aside class=\"direct\">" +
      "<pre>\n" +
      "            ┊┊┊┊┊╭┳━┳╮┊┊┊╭━╮\n" +
      "            ╭━━━╮┃╭┻━╯╭┳━╯┈┃\n" +
      "            ┃▆┣╮╰╯╰━━━╯╭┻━┻╯\n" +
      "            ┃┊▆┃┊▕▍▕▍▕▍┃┊┊┊┊\n" +
      "            ┃▆┣╯╭╮╭━━━╮╰┳━┳╮\n" +
      "            ╰━━━╯┃╰━┳╮╰┻━╮┈┃\n" +
      "            ┊┊┊┊┊╰━┻━╯┊┊┊╰━╯\n" +
      "        </pre>" +
      "</aside>"
  }

  getFooter() {
    return "<footer>\n" +
      "  <nav class=\"footer-nav\">\n" +
      "    <ul class=\"footer-nav-ul\">\n" +
      "      <li><a href=\"https://vk.com/digitallegacy\">VK</a></li>\n" +
      "      <li><a href=\"https://t.me/digitallegacy\">TG</a></li>\n" +
      "      <li><a href=\"https://github.com/idigitallegacy\">C#</a></li>\n" +
      "      <li>Page load time is <span data-id=\"pageloadtime_server\"></span> ms (server) + <span data-id=\"pageloadtime\"></span> (client) ms.</li>\n" +
      "    </ul>\n" +
      "  </nav>\n" +
      "</footer>"
  }
}
