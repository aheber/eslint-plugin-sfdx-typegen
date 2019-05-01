/**
 * @fileoverview Typescript type enforcement
 * @author Anthony Heber
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/functions-should-type-event"),
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
ruleTester.run("functions-should-type-event", rule, {
  valid: [
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({
            doInit: function(
              event: Aura.Event
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
      code: `({doInit: function(event: Aura.Event) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({
            doInit: function(
              event:Aura.Event
            ) {
            },
            onBackClicked: function(
              event:Aura.Event
            ) {
            }
        })`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({
            doInit: function(
              event: Aura.Event
            ) {
            },
            onBackClicked: function(
              event: Aura.Event
            ) {
            }
        })`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({
            doInit: function(
              event: Aura.Event
            ) {
              var func = function(event){};
            }
        })`
    },
    {
      filename:
        "c:\\folder1\\folder2\\force-app\\main\\default\\aura\\Test\\TestHelper.ts",
      code: `({
            doInit: function(
              event: Aura.Event
            ) {
              var func = function(event: Type){};
            }
        })`
    }
  ],

  invalid: [
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(event) {}})`,
      errors: [
        {
          message: '"event" should have type "Aura.Event"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(event: Aura.Event) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(event: Not.Aura.Event) {}})`,
      errors: [
        {
          message: '"event" should have type "Aura.Event"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(event: Aura.Event) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(event
  ) {}})`,
      errors: [
        {
          message: '"event" should have type "Aura.Event"',
          type: "Identifier"
        }
      ],
      output: `({doInit: function(event: Aura.Event
  ) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(
  event
  ) {}})`,
      errors: [
        {
          message: '"event" should have type "Aura.Event"',
          type: "Identifier"
        }
      ],
      output: `({doInit: function(
  event: Aura.Event
  ) {}})`
    }
  ]
});
