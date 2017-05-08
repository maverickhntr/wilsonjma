function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function submitQuery(url){
  var query = $('#query').val();
  // $('#button').click();
  // reroute to /results?query=xxxx
  window.location.replace("http://localhost:3000/results?query="+query);
};
