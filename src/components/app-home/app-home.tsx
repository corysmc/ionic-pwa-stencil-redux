import { Component, h, State, Prop } from "@stencil/core";
import { Unsubscribe, Store } from "@stencil/redux";
import { setUserName } from "../../store/actions/user";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  storeUnsubscribe: Unsubscribe;
  setUserName: typeof setUserName;

  @State()
  name: MyAppState["user"]["name"];

  @Prop({ context: "store" })
  store: Store;

  componentWillLoad() {
    this.store.mapDispatchToProps(this, { setUserName });
    this.storeUnsubscribe = this.store.mapStateToProps(
      this,
      (state: MyAppState) => {
        const {
          user: { name }
        } = state;
        return {
          name
        };
      }
    );
  }

  componentDidUnload() {
    this.storeUnsubscribe();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          Welcome to the PWA Toolkit. You can use this starter to build entire
          apps with web components using Stencil and ionic/core! Check out the
          README for everything that comes in this starter out of the box and
          check out our docs on{" "}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input
            class="ion-text-right"
            value={this.name}
            onIonChange={e => this.setUserName(e.detail.value)}
          />
        </ion-item>
        <ion-button href="/profile" expand="block">
          Profile page
        </ion-button>
      </ion-content>
    ];
  }
}
