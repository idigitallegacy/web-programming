import { Injectable } from '@nestjs/common';
import { PostsController } from "./posts/posts.controller";
import { UsersController } from "./users/users.controller";

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

  async getIndexPageContent() {
    let content_open_tag = "  <section class=\"main-content\">\n";
    let content_close_tag = "   </section>";

    let content = content_open_tag + '\n';

    const postsPerPage = 10
    const postsController = new PostsController()
    const postsAmount = await postsController.getAmount()
    const pagesAmount = Math.ceil(postsAmount / postsPerPage);

    // TODO: add a pagination
    for (let offset = 0; offset < Math.min(postsAmount, postsPerPage); ++offset) {
      content += "<div class=\"card\">\n" +
        "<div class=\"content\">" +
        "      <h3 class=\"main-content-item-header\">Lorem ipsum</h3>\n" +
        "      <p class=\"copy\">Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p>\n" +
        "<button class=\"btn\">View Trips</button>" +
        "    </div>" +
        "</div>\n"
    }
    //
    // content += content_close_tag;
    // console.log(content)
    return content;
  }

  async getPostPageContent(id: number) {
    const postsController = new PostsController()
    const usersController = new UsersController()

    const post = await postsController.findById(id)
    const postTitle = post.title
    const postDate = post.date
    const postAuthor = await usersController.findById(post.author_id)
    const postPictureLink = post.picture_link
    const postBody = post.body

    console.log(postBody)

    return "  <div class=\"container\">\n" +
      "    <div class=\"post\">\n" +
      "      <div class=\"post-image\">\n" +
      "        <img src=\"" + postPictureLink + "\">\n" +
      "      </div>\n" +
      "      <div class=\"post-content\">\n" +
      "        <div class=\"post-header\">\n" +
      "          <h1>" + postTitle + "</h1>\n" +
      "          <div class=\"post-meta\">\n" +
      "            <time datetime=\"" + postDate + "\">" + postDate + "</time>\n" +
      "            <span class=\"author\">" + postAuthor.username + "</span>\n" +
      "          </div>\n" +
      "        </div>\n" +
      "        <p> " + postBody + "" +
      "        </p>\n" +
      "      </div>\n" +
      "    </div>\n" +
      "  </div>"
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
