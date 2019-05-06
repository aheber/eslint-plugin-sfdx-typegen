"use strict";

module.exports = class {
  constructor(context) {
    this.context = context;
    this.sourceCode = context.getSourceCode();
  }
  // Test if current node is nested in another function and should be ignored
  isNested() {
    let isNested = false;
    this.context.getAncestors().forEach(a => {
      if (a.type === "FunctionExpression") {
        isNested = true;
      }
    });
    return isNested;
  }

  buildConfig() {
    let conf = {};
    // TODO: Deal with input that is not derived from a file but rather <input>
    let parts = this.context.getFilename().split(/[/\\]/);
    conf.file = parts.pop();
    // TODO: review case sensitivity evaluation
    let isHelper = conf.file.indexOf("Helper.") > 0;

    let cmpName = parts.pop();
    conf.cmpType = `Cmp.c.${cmpName}`;
    conf.helperType = `Helper.c.${cmpName}`;

    conf.thisType = "void";
    if (isHelper) {
      conf.thisType = conf.helperType;
    }
    return conf;
  }

  getTypeString(node) {
    if (node == undefined) {
      return "";
    }
    return this.sourceCode
      .getText(node)
      .trim()
      .replace(/:\s*/, "")
      .replace(/<.*/, "");
  }

  ensureType(param, expectedType) {
    // Get existing type and compare it to expectation
    if (param.typeAnnotation == null) {
      this.addType(param, expectedType);
      return;
    }
    let type = this.getTypeString(param.typeAnnotation);
    if (type !== expectedType) {
      // Type is not as expected, recommend it be replaced
      this.context.report({
        node: param,
        message: `"${param.name}" should have type "${expectedType}"`,
        fix: function(fixer) {
          return fixer.replaceText(param.typeAnnotation, `: ${expectedType}`);
        }
      });
    }
  }

  addType(param, type) {
    this.context.report({
      node: param,
      message: `"${param.name}" should have type "${type}"`,
      fix: function(fixer) {
        return fixer.insertTextAfter(param, `: ${type}`);
      }
    });
  }
};
