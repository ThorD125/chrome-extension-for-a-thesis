export function setup_response(request, results, payload) {
  let response = {
    ...request,
    results: results,
    payload: payload,
  };
  delete response.fullrequest;
  chrome.runtime.sendMessage(response);
}
