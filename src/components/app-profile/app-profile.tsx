import { Component, Prop, State, h } from "@stencil/core";
import { sayHello } from "../../helpers/utils";
import { Unsubscribe, Store } from "@stencil/redux";
import { setUserName } from "../../store/actions/user";

@Component({
  tag: "app-profile",
  styleUrl: "app-profile.css"
})
export class AppProfile {
  storeUnsubscribe: Unsubscribe;
  setUserName: typeof setUserName;

  @State()
  state: boolean = false;
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
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Profile: {this.name}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          {sayHello()}! My name is {this.name}. My name was passed in through
          stencil redux!!
        </p>

        <ion-item>
          <ion-label>Setting ({this.state.toString()})</ion-label>
          <ion-toggle
            checked={this.state}
            onIonChange={ev => (this.state = ev.detail.checked)}
          />
        </ion-item>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input
            class="ion-text-right"
            value={this.name}
            onIonChange={e => this.setUserName(e.detail.value)}
          />
        </ion-item>
      </ion-content>
    ];
  }
}
