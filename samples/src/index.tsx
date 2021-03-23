import React from "react";
import PubNub from "pubnub";
import ReactDOM from "react-dom";
import { PubNubProvider } from "pubnub-react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";

import SimpleChat from "./simple-chat/simple-chat";
import "./index.css";

import pubnubKeys from "../pubnub-keys.json";
import users from "../../data/users.json";

const pubnub = new PubNub({
  ...pubnubKeys,
  uuid: users[Math.floor(Math.random() * users.length)].id,
});

ReactDOM.render(
  <React.StrictMode>
    {pubnubKeys.publishKey.length && pubnubKeys.subscribeKey.length ? (
      <PubNubProvider client={pubnub}>
        <HashRouter>
          <Switch>
            <Route path="/simple-chat">
              <SimpleChat />
            </Route>
            <Route path="/">
              <div className="welcome">
                <h1>Pubnub Chat Components</h1>
                <h3>Here are some example applications built using PubNub and Chat Components:</h3>
                <ul>
                  <li>
                    <Link to="/simple-chat">Simple Chat</Link>
                  </li>
                </ul>
              </div>
            </Route>
          </Switch>
        </HashRouter>
      </PubNubProvider>
    ) : (
      <div className="pubnub-error">
        <h1>Warning! Missing PubNub keys</h1>
        Sign in or create an account to create an app on the
        <a href="https://dashboard.pubnub.com/">PubNub Admin Portal</a> and copy over the
        Publish/Subscribe keys into:
        <pre>samples/pubnub-keys.json</pre>
        in order to use the app properly.
      </div>
    )}
  </React.StrictMode>,
  document.getElementById("root")
);
