import React from "react";
import PubNub from "pubnub";
import ReactDOM from "react-dom";
import { PubNubProvider } from "pubnub-react";

import SimpleChat from "./simple-chat/simple-chat";
import "./index.css";

import pubnubKeys from "./pubnub-keys.json";
import { rawUsers } from "@pubnub/sample-data";

/**
 * Prepare a PubNub instance and inject it into PubNubProvider
 * You should generate your own keyset on pubnub.com and paste it into pubnub-keys.json
 */
const pubnub = new PubNub({
  ...pubnubKeys,
  uuid: rawUsers[Math.floor(Math.random() * rawUsers.length)].id,
});

ReactDOM.render(
  <React.StrictMode>
    {pubnubKeys.publishKey.length && pubnubKeys.subscribeKey.length ? (
      <PubNubProvider client={pubnub}>
        <SimpleChat />
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
