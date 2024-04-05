export async function setup_response(request, results, attackType) {
  // console.log(results);
  let response = {
    action: "attacksResponse",
    method: request.method,
    url: request.url,
    results: results,
    attackType: attackType,
  };
  delete response.fullrequest;

  chrome.runtime.sendMessage(response);
}
