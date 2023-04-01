"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remarksToTree = remarksToTree;
exports.useCenteredTree = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useCenteredTree = function useCenteredTree() {
  var defaultTranslate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    x: 0,
    y: 0
  };

  var _useState = (0, _react.useState)(defaultTranslate),
      _useState2 = _slicedToArray(_useState, 2),
      translate = _useState2[0],
      setTranslate = _useState2[1];

  var containerRef = (0, _react.useCallback)(function (containerElem) {
    if (containerElem !== null) {
      var _containerElem$getBou = containerElem.getBoundingClientRect(),
          width = _containerElem$getBou.width,
          height = _containerElem$getBou.height;

      setTranslate({
        x: width / 2,
        y: height / 2
      });
    }
  }, []);
  return [translate, containerRef];
};

exports.useCenteredTree = useCenteredTree;

function remarksToTree(remarks, langKey) {
  var tree = {
    dirname: "/",
    name: "",
    slug: "",
    is_dir: true,
    has_md: true
  };
  /*
  tree = {
      node:{
          dir:
          name:
          is_dir:
          has_md:
      }
      children:[
          {
              node:{
                  dir:
                  name:
              }
          },
          {
              node:{
                  dir:string,
                  name
              }
          }
      ]
  }
  */

  function new_dir_node(slug, name, dir) {
    return {
      slug: slug,
      name: name,
      dirname: dir,
      has_md: false,
      is_dir: true
    };
  }

  remarks.forEach(function (node) {
    var path = node.fileAbsolutePath.split("/");
    path = path.slice(path.indexOf("content") + 1);
    var lang = path[path.length - 1].split('.')[1];

    if (lang === langKey) {
      var curr = tree;
      path.slice(0, -1).forEach(function (p, index) {
        var found_index = -1;
        var dir = path.slice(0, index).join("/");

        if (curr.children === undefined) {
          curr.children = [new_dir_node(p, p, dir)];
          curr = curr.children[0];
        } else {
          for (var i = 0; i < curr.children.length; i++) {
            if (curr.children[i].slug === p) {
              found_index = i;
              break;
            }
          }

          if (found_index === -1) {
            curr.children.push(new_dir_node(p, p, dir));
            curr = curr.children[curr.children.length - 1];
          } else {
            curr = curr.children[found_index];
          }
        }
      });
      var filename = path[path.length - 1].split('.');
      var basename = filename[0]; // const lang     = filename[1]

      var dirname = path.slice(0, -1).join("/");

      if (basename === "README") {
        curr.has_md = true;
        curr.name = node.frontmatter.title;
      } else {
        if (curr.children === undefined) curr.children = [];
        curr.children.push({
          slug: basename,
          name: node.frontmatter.title,
          dirname: dirname,
          has_md: true,
          is_dir: false
        });
      }
    }
  });
  return tree;
}