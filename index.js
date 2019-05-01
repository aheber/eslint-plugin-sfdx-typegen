"use strict";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = {
  "functions-should-include-typed-this": require("./lib/rules/functions-should-include-typed-this"),
  "functions-should-type-cmp": require("./lib/rules/functions-should-type-cmp"),
  "functions-should-type-event": require("./lib/rules/functions-should-type-event"),
  "functions-should-type-helper": require("./lib/rules/functions-should-type-helper")
};

module.exports.configs = {
  recommended: {
    rules: {
      "sfdx-typegen/functions-should-include-typed-this": "error",
      "sfdx-typegen/functions-should-type-cmp": "error",
      "sfdx-typegen/functions-should-type-event": "error",
      "sfdx-typegen/functions-should-type-helper": "error"
    }
  }
};
