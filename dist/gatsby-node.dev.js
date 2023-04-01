"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = require("path");

exports.createPages = function _callee(_ref) {
  var actions, graphql, reporter, createPage, query;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          actions = _ref.actions, graphql = _ref.graphql, reporter = _ref.reporter;
          createPage = actions.createPage;
          _context.next = 4;
          return regeneratorRuntime.awrap(graphql("\n    query MyQuery {\n        allMarkdownRemark {\n          nodes {\n            html\n            fileAbsolutePath\n          }\n        }\n      }\n    "));

        case 4:
          query = _context.sent;

          if (!query.errors) {
            _context.next = 8;
            break;
          }

          reporter.panicOnBuild("Error while running GraphQL query");
          return _context.abrupt("return");

        case 8:
          query.data.allMarkdownRemark.nodes.forEach(function (node) {
            var mdpath = node.fileAbsolutePath.split("/");
            mdpath = mdpath.slice(mdpath.indexOf("content") + 1);
            var filename = mdpath[mdpath.length - 1].split(".");
            var lang = filename[1];
            var basename = filename[0];
            var urlpath;

            if (basename == "README") {
              urlpath = [lang].concat(_toConsumableArray(mdpath.slice(0, -1))).join("/");
            } else {
              urlpath = [lang].concat(_toConsumableArray(mdpath.slice(0, -1)), [basename]).join("/");
            }

            console.log("urlpath: ".concat(urlpath));
            createPage({
              path: urlpath,
              component: path.resolve("./src/templates/Nightly/index.js"),
              context: {
                slug: urlpath,
                html: node.html
              }
            });
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};