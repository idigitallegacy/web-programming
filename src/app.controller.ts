import { Controller, Get, Param, Render, UseInterceptors } from "@nestjs/common";
import { AppService } from './app.service';
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./LoggingInterceptor";
import { PostsController } from "./posts/posts.controller";

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index') // <= Название вашего представления
  async getIndexPage() {
    return {
      styles: this.appService.getSharedStyles(),
      shared_scripts: this.appService.getSharedScripts(),
      heading: "<h2 class=\"main-pagename\">Главная</h2>",
      description: "Hi, I'm Michael, an ITMO student studying at Information technologies and programming faculty.\n" +
        "I work at Lada (technician), play football and write cool code. Also, I've felt in love with cars.",
      header: this.appService.getHeader(),
      nav_panel: this.appService.getNavPanel(),
      content: await this.appService.getIndexPageContent(),
      direct: this.appService.getDirect(),
      footer: this.appService.getFooter()
    }
  }

  @Get('/post/:id')
  @Render('post') // <= Название вашего представления
  async getPostPage(@Param('id') id: number) {
    return {
      styles: this.appService.getSharedStyles(),
      shared_scripts: this.appService.getSharedScripts(),
      heading: "<h2 class=\"main-pagename\">Главная</h2>",
      description: "Hi, I'm Michael, an ITMO student studying at Information technologies and programming faculty.\n" +
        "I work at Lada (technician), play football and write cool code. Also, I've felt in love with cars.",
      header: this.appService.getHeader(),
      nav_panel: this.appService.getNavPanel(),
      content: await this.appService.getPostPageContent(id),
      direct: this.appService.getDirect(),
      footer: this.appService.getFooter()
    }
  }

  @Get('/about')
  @Render('about')
  getAboutPage() {
    return {
      styles: this.appService.getSharedStyles(),
      shared_scripts: this.appService.getSharedScripts(),
      heading: "<h2 class=\"main-pagename\">О нас</h2>",
      description: "Hi, I'm Michael, an ITMO student studying at Information technologies and programming faculty.\n" +
        "I work at Lada (technician), play football and write cool code. Also, I've felt in love with cars.",
      header: this.appService.getHeader(),
      nav_panel: this.appService.getNavPanel(),
      content: this.appService.getAboutPageContent(),
      direct: this.appService.getDirect(),
      footer: this.appService.getFooter()
    }
  }

  @Get('/contact')
  @Render('contact')
  getContactPage() {
    return {
      styles: this.appService.getSharedStyles(),
      shared_scripts: this.appService.getSharedScripts(),
      heading: "<h2 class=\"main-pagename\">Контакты</h2>",
      description: "Hi, I'm Michael, an ITMO student studying at Information technologies and programming faculty.\n" +
        "I work at Lada (technician), play football and write cool code. Also, I've felt in love with cars.",
      header: this.appService.getHeader(),
      nav_panel: this.appService.getNavPanel(),
      content: this.appService.getContactPageContent(),
      direct: this.appService.getDirect(),
      footer: this.appService.getFooter()
    }
  }

  @Get('/constructor')
  @Render('constructor')
  getConstructorPage() {
    return {
      styles: this.appService.getSharedStyles(),
      shared_scripts: this.appService.getSharedScripts(),
      heading: "<h2 class=\"main-pagename\">Конструктор</h2>",
      description: "Hi, I'm Michael, an ITMO student studying at Information technologies and programming faculty.\n" +
        "I work at Lada (technician), play football and write cool code. Also, I've felt in love with cars.",
      header: this.appService.getHeader(),
      nav_panel: this.appService.getNavPanel(),
      content: this.appService.getConstructorPageContent(),
      direct: this.appService.getDirect(),
      footer: this.appService.getFooter()
    }
  }
}
