export default function setup_attack(request, attack) {
  chrome.runtime.sendMessage({ [`${attack}`]: request });
}
