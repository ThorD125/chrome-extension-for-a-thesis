import post_xmlbody_attack from "./exploits/post_xmlbody_attack.js";
import post_formbody_attack from "./exploits/post_formbody_attack.js";
import get_filepath from "./exploits/get_filepath.js";
import post_command_injection from "./exploits/post_command_injection.js";

console.log("xam .js loaded");

chrome.runtime.onMessage.addListener(async (attack) => {
  // console.log("message received");
  // console.log(attack);

  if (attack["post_xmlbody_attack"] != undefined) {
    post_xmlbody_attack(attack["post_xmlbody_attack"]);
  } else if (attack["post_formbody_attack"] != undefined) {
    post_formbody_attack(attack["post_formbody_attack"]);
  } else if (attack["get_filepath"] != undefined) {
    get_filepath(attack["get_filepath"]);
  } else if (attack["post_command_injection"] != undefined) {
    post_command_injection(attack["post_command_injection"]);
  } else {
    console.log("no attack found");
  }

  // updateBadge(tabCounters);
});
