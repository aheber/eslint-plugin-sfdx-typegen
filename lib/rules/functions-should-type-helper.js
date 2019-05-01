/**
 * @fileoverview Aura Typescript type enforcement
 * @author Anthony Heber
 */
"use strict";
let Common = require("../common");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Typescript type enforcement to be used with the sfdx-typegen plugin",
      category: "Fill me in",
      recommended: false
    },
    fixable: "code", // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },
  create: function(context) {
    const common = new Common(context);
    const conf = common.buildConfig();

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      FunctionExpression: function(node) {
        // This plugin only applies to top-level functions
        // exit without error for nested functions
        if (common.isNested()) {
          return;
        }

        node.params.forEach(param => {
          if (param.name == "helper") {
            common.ensureType(param, conf.helperType);
          }
        });
      }
    };
  }
};
