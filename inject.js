// inject.js
(function () {
  console.log("injected");
  const originalLog = console.log;
  console.log = function () {
    originalLog.apply(console, arguments);
    originalLog.call(
      console,
      "Log Enhancer: Extra message logged by the webpage."
    );
  };
})();
