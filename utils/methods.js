export async function setup_response(request, results) {
  // console.log(results);
  let response = {
    method: request.method,
    url: request.url,

    // results: theResult,
    results: results,
  };
  delete response.fullrequest;

  chrome.runtime.sendMessage(response);
}
