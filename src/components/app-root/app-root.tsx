import { Component, Prop, h } from "@stencil/core";
import { Store, Unsubscribe } from "@stencil/redux";
import { configureStore } from "../../store";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css"
})
export class AppRoot {
  unsubscribe: Unsubscribe;

  @Prop({ context: "store" })
  store: Store;

  componentWillLoad() {
    this.store.setStore(configureStore({}));
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/profile" component="app-profile" />
        </ion-router>
        <ion-split-pane contentId="main-content">
          <ion-menu contentId="main-content">
            <ion-list>
              <ion-item href="/profile">
                <ion-label>Profile</ion-label>
              </ion-item>
            </ion-list>
          </ion-menu>
          <ion-nav id="main-content" />
        </ion-split-pane>
      </ion-app>
    );
  }
}
