function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "EN",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element"
  );
}

