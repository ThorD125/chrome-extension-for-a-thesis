import post_xmlbody_attack from "./exploits/post_xmlbody_attack.js";
import post_formbody_attack from "./exploits/post_formbody_attack.js";

console.log("xam .js loaded");

chrome.runtime.onMessage.addListener(async (attack) => {
  // console.log("message received");
  console.log(attack);

  if (attack["post_xmlbody_attack"] != undefined) {
    post_xmlbody_attack(attack["post_xmlbody_attack"]);
  } else if (attack["post_formbody_attack"] != undefined) {
    post_formbody_attack(attack["post_formbody_attack"]);
  }

  // updateBadge(tabCounters);
});
