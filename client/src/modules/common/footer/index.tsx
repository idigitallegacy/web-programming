import { Label, Link, Menu, ThemeProvider } from "@gravity-ui/uikit";
import {Check} from '@gravity-ui/icons';
import './index.css'

function Footer() {
  return (
    <>
      <ThemeProvider theme="dark">
        <div className="footer-wrapper">
          <div className="footer-item">
            <Menu size="xl">
              <Menu.Item><Link view="normal" href="https://vk.com/digitallegacy">VK</Link></Menu.Item>
              <Menu.Item><Link view="normal" href="https://t.me/digitallegacy">Telegram</Link></Menu.Item>
              <Menu.Item><Link view="normal" href="https://github.com/idigitallegacy">GitHub</Link></Menu.Item>
            </Menu>
          </div>
          <div className="footer-item">
            <Label theme="clear" size="m" icon={<Check />}>Proudly made by Michael Makarov.</Label>
          </div>
          <div className="footer-item">

          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default Footer