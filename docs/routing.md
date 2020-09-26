# Static Routing



```
<RoutingRules>
  <RoutingRule>
    <Condition>
      <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
    </Condition>
    <Redirect>
      <HostName>eleosfrontend.s3-website.eu-north-1.amazonaws.com</HostName>
      <ReplaceKeyPrefixWith>#!/</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
  <RoutingRule>
    <Condition>
      <HttpErrorCodeReturnedEquals>403</HttpErrorCodeReturnedEquals>
    </Condition>
    <Redirect>
      <HostName>eleosfrontend.s3-website.eu-north-1.amazonaws.com</HostName>
      <ReplaceKeyPrefixWith>#!/</ReplaceKeyPrefixWith>
    </Redirect>
  </RoutingRule>
</RoutingRules>
```

This is used in conjunction with the code in eleos-static/index.js which performs the URL rewrite, removing /#!/

```
import { render } from "react-dom";
// Browser History API
import { createBrowserHistory } from "history";
// added <Router>, might be superflous. 
// URL Rewriting
const history = createBrowserHistory();
const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
    if (path) {
      history.replace(path);
    }
```