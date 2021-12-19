$(document).ready(function() {
  document.cookie = "googtrans=/en";
  let browserLang = "EN";

  $(".lang").click(function() {
    var lang = $(this).data("lang");
    var $frame = $(".goog-te-menu-frame:first");
    var googlePluginLang = $(".goog-te-menu-frame:first")
      .contents()
      .find(".goog-te-menu2-item-selected span.text")[0]
      .innerText.split(" ")[0];

    if (googlePluginLang === "Seleccionar") browserLang = "ES";
    
    if (browserLang === "ES") {
      if (lang === "English") lang = "inglés";
      if (lang === "Spanish") lang = "español";
      if (lang === "Portuguese") lang = "portugués";
      if (lang === "Italian") lang = "italiano";
    }

    $frame
      .contents()
      .find(".goog-te-menu2-item span.text:contains(" + lang + ")")
      .get(0)
      .click();
  });
});
