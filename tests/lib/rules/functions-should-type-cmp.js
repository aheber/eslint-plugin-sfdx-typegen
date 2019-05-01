/**
 * @fileoverview Typescript type enforcement
 * @author Anthony Heber
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/functions-should-type-cmp"),
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
ruleTester.run("functions-should-type-cmp", rule, {
  valid: [
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({
            doInit: function(
              cmp: Cmp.c.Test
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
      code: `({doInit: function(cmp: Cmp.c.Test) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(component: Cmp.c.Test) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({
            doInit: function(
              cmp:Cmp.c.Test
            ) {
            },
            onBackClicked: function(
              cmp:Cmp.c.Test
            ) {
            }
        })`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({
            doInit: function(
              cmp: Cmp.c.Test
            ) {
            },
            onBackClicked: function(
              cmp: Cmp.c.Test
            ) {
            }
        })`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({
            doInit: function(
              cmp: Cmp.c.Test
            ) {
              var func = function(cmp){};
            }
        })`
    },
    {
      filename:
        "c:\\folder1\\folder2\\force-app\\main\\default\\aura\\Test\\TestHelper.ts",
      code: `({
            doInit: function(
              cmp: Cmp.c.Test
            ) {
              var func = function(cmp: Type){};
            }
        })`
    }
  ],

  invalid: [
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(cmp) {}})`,
      errors: [
        {
          message: '"cmp" should have type "Cmp.c.Test"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(cmp: Cmp.c.Test) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(component) {}})`,
      errors: [
        {
          message: '"component" should have type "Cmp.c.Test"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(component: Cmp.c.Test) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(cmp: Cmp.c.NotTest) {}})`,
      errors: [
        {
          message: '"cmp" should have type "Cmp.c.Test"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(cmp: Cmp.c.Test) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestController.ts",
      code: `({doInit: function(component: Cmp.c.NotTest) {}})`,
      errors: [
        {
          message: '"component" should have type "Cmp.c.Test"',
          type: "Identifier"
        }
      ],
      output: "({doInit: function(component: Cmp.c.Test) {}})"
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(cmp
  ) {}})`,
      errors: [
        {
          message: '"cmp" should have type "Cmp.c.Test"',
          type: "Identifier"
        }
      ],
      output: `({doInit: function(cmp: Cmp.c.Test
  ) {}})`
    },
    {
      filename: "./force-app/main/default/aura/Test/TestHelper.ts",
      code: `({doInit: function(
  cmp
  ) {}})`,
      errors: [
        {
          message: '"cmp" should have type "Cmp.c.Test"',
          type: "Identifier"
        }
      ],
      output: `({doInit: function(
  cmp: Cmp.c.Test
  ) {}})`
    }
  ]
});
