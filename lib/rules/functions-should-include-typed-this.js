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
        'Ensure Controller and Helper have "this" parameter defined and correctly typed',
      category: "this",
      recommended: true
    },
    fixable: "code",
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    const common = new Common(context);
    const conf = common.buildConfig();
    const sourceCode = context.getSourceCode();

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function handleNoParams(node) {
      // mark the function string as the error location
      let loc = {
        line: node.loc.start.line,
        column: node.loc.start.column,
        endLine: node.loc.start.line,
        endColumn: node.loc.start.column + 8
      };
      // find the paren positions
      let text = sourceCode.getText(node);
      let openParenLoc = node.range[0] + text.indexOf("(");
      let openParenRange = [openParenLoc, openParenLoc + 1];
      context.report({
        node: node,
        loc: loc,
        message: 'Should have a first parameter of "this"',
        fix: function(fixer) {
          // add the "this" param after the opening paren
          return fixer.insertTextAfterRange(
            openParenRange,
            `this: ${conf.thisType}`
          );
        }
      });
    }

    function handleNeedsThis(node) {
      context.report({
        node: node.params[0],
        message: 'First parameter should be "this"',
        fix: function(fixer) {
          return fixer.insertTextBefore(
            node.params[0],
            `this: ${conf.thisType}, `
          );
        }
      });
    }

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

        // Ensure there is at least one parameter and that parameter is named "this"
        if (node.params.length == 0) {
          handleNoParams(node);
          return;
        }
        // Has at least one param but "this" is not the first param
        if (node.params[0].name !== "this") {
          handleNeedsThis(node);
        } else {
          // Ensure that "this" has the correct type applied
          common.ensureType(node.params[0], conf.thisType);
        }
      }
    };
  }
};
