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
        <ion-nav />
      </ion-app>
    );
  }
}
