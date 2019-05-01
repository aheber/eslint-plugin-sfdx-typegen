/**
 * @fileoverview Typescript type enforcement
 * @author Anthony Heber
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/functions-should-include-typed-this"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  parser: "@typescript-eslint/parser"
});
ruleTester.run("functions-should-include-typed-this", rule, {
  valid: [
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(this: void){}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(this: void) {},onBackClicked: function(this: void) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(this: Helper.c.Test) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(this: Helper.c.Test){var func = function(){};}})`
    },
    {
      filename:
        "c:\\folder1\\folder2\\force-app\\main\\default\\aura\\Test\\TestHelper.ts",
      code: `({doInit: function(this: Helper.c.Test) {var func = function(){};}})`
    }
  ],

  invalid: [
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function() {}})`,
      errors: [
        {
          message: 'Should have a first parameter of "this"',
          type: "FunctionExpression",
          line: 1,
          column: 11
        }
      ],
      output: "({doInit: function(this: void) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(
  ) {}})`,
      errors: [
        {
          message: 'Should have a first parameter of "this"',
          type: "FunctionExpression",
          line: 1,
          column: 11
        }
      ],
      output: `({doInit: function(this: Helper.c.Test
  ) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(this) {}})`,
      errors: [
        {
          message: '"this" should have type "void"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(this: void) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(this: wrong) {}})`,
      errors: [
        {
          message: '"this" should have type "void"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(this: void) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(this: wrong) {}})`,
      errors: [
        {
          message: '"this" should have type "Helper.c.Test"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(this: Helper.c.Test) {}})"
    }
  ]
});
