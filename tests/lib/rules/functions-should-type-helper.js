/**
 * @fileoverview Typescript type enforcement
 * @author Anthony Heber
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/functions-should-type-helper"),
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
ruleTester.run("functions-should-type-helper", rule, {
  valid: [
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({
            doInit: function(
              helper: Helper.c.Test
            ) {
            }
        })`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function() {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(other) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(other: Type) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(helper: Helper.c.Test) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({
            doInit: function(
              helper:Helper.c.Test
            ) {
            },
            onBackClicked: function(
              helper:Helper.c.Test
            ) {
            }
        })`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({
            doInit: function(
              helper: Helper.c.Test
            ) {
            },
            onBackClicked: function(
              helper: Helper.c.Test
            ) {
            }
        })`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({
            doInit: function(
              helper: Helper.c.Test
            ) {
              var func = function(helper){};
            }
        })`
    },
    {
      filename:
        "c:\\folder1\\folder2\\force-app\\main\\default\\aura\\Test\\TestHelper.ts",
      code: `({
            doInit: function(
              helper: Helper.c.Test
            ) {
              var func = function(helper: Type){};
            }
        })`
    }
  ],

  invalid: [
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(helper) {}})`,
      errors: [
        {
          message: '"helper" should have type "Helper.c.Test"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(helper: Helper.c.Test) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(helper: Helper.c.NotTest) {}})`,
      errors: [
        {
          message: '"helper" should have type "Helper.c.Test"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(helper: Helper.c.Test) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(helper
  ) {}})`,
      errors: [
        {
          message: '"helper" should have type "Helper.c.Test"',
          type: "Identifier"
        }
      ],
      output: `({doInit: function(helper: Helper.c.Test
  ) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(
  helper
  ) {}})`,
      errors: [
        {
          message: '"helper" should have type "Helper.c.Test"',
          type: "Identifier"
        }
      ],
      output: `({doInit: function(
  helper: Helper.c.Test
  ) {}})`
    }
  ]
});
