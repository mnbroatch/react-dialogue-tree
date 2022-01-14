(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('yarn-bound/src/index')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'yarn-bound/src/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactDialogueTree = {}, global.React, global.YarnBound));
})(this, (function (exports, React, YarnBound) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var YarnBound__default = /*#__PURE__*/_interopDefaultLegacy(YarnBound);

  function useForceUpdate() {
    const [value, setValue] = React.useState(0);
    return () => setValue(value => value + 1);
  }

  function DialogueNode({
    node,
    node: {
      text,
      options,
      selected,
      isDialogueEnd
    },
    defaultOption,
    isHistory,
    advance
  }) {
    let optionItems;

    if (options) {
      optionItems = options.filter((option, index) => !isHistory || index === selected).map((option, index) => /*#__PURE__*/React__default["default"].createElement("li", {
        key: index,
        className: ['dialogue-node__option', !option.isAvailable && 'dialogue-node__option--disabled'].filter(Boolean).join(' '),
        onClick: !isHistory && option.isAvailable ? () => {
          advance(index);
        } : undefined
      }, option.text));
    } else {
      optionItems = !isDialogueEnd && !isHistory && /*#__PURE__*/React__default["default"].createElement("li", {
        className: "dialogue-node__option dialogue-node__option--default",
        onClick: !isHistory ? () => {
          advance();
        } : undefined
      }, defaultOption);
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "dialogue-node"
    }, text, optionItems && /*#__PURE__*/React__default["default"].createElement("ul", {
      className: "dialogue-node__options"
    }, optionItems));
  }

  function ChatScroller({
    children,
    scrollSpeed = 8
  }) {
    const innerRef = React.useRef();
    React.useEffect(() => {
      if (!innerRef.current || !innerRef.current.lastChild) return;
      const scrollEnd = innerRef.current.scrollHeight - Math.max(innerRef.current.lastChild.offsetHeight, innerRef.current.offsetHeight);

      const animate = () => {
        innerRef.current.scrollTop += scrollSpeed;
        if (innerRef.current.scrollTop < scrollEnd) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, [children, scrollSpeed]);
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "chat-scroller"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "chat-scroller__inner",
      ref: innerRef,
      style: {
        height: '100%',
        overflowY: 'auto'
      }
    }, children));
  }

  function DialogueTree({
    currentResult,
    history,
    advance,
    defaultOption
  }) {
    const nodes = currentResult ? [...history, currentResult] : history;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "dialogue-tree"
    }, /*#__PURE__*/React__default["default"].createElement(ChatScroller, {
      scrollSpeed: 8
    }, nodes.map((node, index) => node && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "dialogue-tree__node-spacer",
      key: index
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "dialogue-tree__node-wrapper"
    }, /*#__PURE__*/React__default["default"].createElement(DialogueNode, {
      node: node,
      advance: advance,
      defaultOption: defaultOption,
      isHistory: history.includes(node)
    }))))));
  }

  function DialogueTreeContainer({
    dialogue,
    startAt = 'Start',
    functions,
    variableStorage,
    handleCommand,
    combineTextAndOptionsResults = true,
    onDialogueEnd = () => {},
    defaultOption = 'Next'
  }) {
    const runner = React.useMemo(() => new YarnBound__default["default"]({
      dialogue,
      startAt,
      functions,
      variableStorage,
      handleCommand,
      combineTextAndOptionsResults
    }), [dialogue]);
    React.useEffect(() => {
      runner.combineTextAndOptionsResults = combineTextAndOptionsResults;
      runner.handleCommand = handleCommand;
      runner.variableStorage = variableStorage;
    }, [combineTextAndOptionsResults, handleCommand, variableStorage]);
    const forceUpdate = useForceUpdate();
    const advance = React.useCallback(optionIndex => {
      runner.advance(optionIndex);
      forceUpdate();

      if (runner.currentResult.isDialogueEnd) {
        onDialogueEnd();
      }
    }, [runner]);
    return /*#__PURE__*/React__default["default"].createElement(DialogueTree, {
      className: "mnbroatch-react-dialogue-tree",
      currentResult: runner.currentResult,
      history: runner.history,
      advance: advance,
      defaultOption: defaultOption
    });
  }

  exports.DialogueNode = DialogueNode;
  exports["default"] = DialogueTreeContainer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
