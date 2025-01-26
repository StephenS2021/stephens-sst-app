import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "stephens-sst-app",
      region: "us-east-1",
    };
  },
  stacks(app) { // app variable is passed by SST when it initializes the project and runs configuration
    app.stack(function Site({ stack }) { // stack represents a CloudFormation stack created by SST
      const site = new NextjsSite(stack, "site");

      stack.addOutputs({
        SiteUrl: site.url, // outputs url of the deployed app
      });
    });
  },
} satisfies SSTConfig;
