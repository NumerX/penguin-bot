function printLog(message) {
  console.log("[LOG] " + message);
}
function printError(message) {
  console.log("[ERR] " + message);
}
function printInfo(message) {
  console.log("[INFO] " + message);
}
function printSuccess(message) {
  console.log("[SUCCESS] " + message);
}

module.exports = {
printLog: function(message) {
    printLog(message);
  },
  printError: function(message) {
    printError(message);
  },
  printInfo: function(message) {
    printInfo(message);
  },
  printSuccess: function(message) {
    printSuccess(message);
  }}
