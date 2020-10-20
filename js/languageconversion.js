var dict = {};

var urlprd = "http://39.99.129.115";
var urldev = "http://127.0.0.1";

function getUrl(){
    return urldev;
}
$(function() {
    registerWords();

     var lang = getCookie("lang");

      if(lang == null) {
          setLanguage("en");
      }else {
          setLanguage(lang);
      }
    //setLanguage("en");
    $("#enBtn").bind("click", function() {

        setLanguage("en");
        window.location.href=window.location.href;
    });

    $("#zhBtn").bind("click", function() {

        setLanguage("cn");
        window.location.href=window.location.href;

    });

    $("#applyBtn").bind("click", function() {
        alert(__tr("a translation test!"));
    });
});

function setLanguage(lang) {
    setCookie("lang=" + lang + "; path=/;");
    translate();
}

function getCookieVal(name) {
    var items = document.cookie.split(";");
    for (var i in items) {
        var cookie = $.trim(items[i]);
        var eqIdx = cookie.indexOf("=");
        var key = cookie.substring(0, eqIdx);
        if (name == $.trim(key)) {
            return $.trim(cookie.substring(eqIdx+1));
        }
    }
    return null;
}

function setCookie(cookie) {
    document.cookie = cookie;
}

function translate() {
    loadDict();


    $("[lang]").each(function() {
        switch (this.tagName.toLowerCase()) {
            case "input":
                $(this).val( __tr($(this).attr("lang")) );
                break;
            default:
                $(this).text( __tr($(this).attr("lang")) );
        }
    });
}

function __tr(src) {
    return (dict[src] || src);
}

function loadDict() {
    var lang = getCookieVal("lang");

    if(lang == null){
        lang ="en";
    }



    $.ajax({
        async: false,
        type: "GET",
        url: "langJson/"+lang + ".json",
        success: function(msg) {
            dict =  msg ;
        }
    });
}

function registerWords() {
    $("[lang]").each(function() {

        switch (this.tagName.toLowerCase()) {
            case "input":
                $(this).attr("lang", $(this).val());
                break;
            default:
                $(this).attr("lang", $(this).text());
        }
    });
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

