function highlightHTML(
    originalHTML,
    plainText,
    plainTextPositions
  ) {
    let highlightedHTML = originalHTML;
    let htmlPositions = [];
  
    // Sort the plainTextPositions array by start position.
    plainTextPositions.sort((a, b) => a.start - b.start);
  
    // Iterate over the plainTextPositions array.
    for (const position of plainTextPositions) {
      // Get the start and end positions of the word in the HTML content.
      const start = position.start;
      const end = position.end;
  
      // Calculate the start and end positions of the word in the HTML content, taking into account any HTML tags that may be present.
      htmlPositions.push({
        start: findStartOfWord(originalHTML, start),
        end: findEndOfWord(originalHTML, end),
      });
    }
  
    // Iterate over the htmlPositions array and highlight the words.
    for (const position of htmlPositions) {
      const { start, end } = position;
  
      highlightedHTML =
        highlightedHTML.substring(0, start) +
        "<mark>" +
        highlightedHTML.substring(start, end) +
        "</mark>" +
        highlightedHTML.substring(end);
    }
  
    return highlightedHTML;
  }
  
  function findStartOfWord(html, position) {
    while (position > 0 && isHTMLTag(html[position - 1])) {
      position--;
    }
  
    return position;
  }
  
  function findEndOfWord(html, position) {
    while (position < html.length && isHTMLTag(html[position])) {
      position++;
    }
  
    return position;
  }
  
  function isHTMLTag(character) {
    return character === "<" && !character.match(/\s/);
  }
  
  
  const htmlContent = `<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;
  
  const plainText = `Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here .`;
  
  const plainTextPositions = [
    {
      start: 241,
      end: 247,
    },
    {
      start: 518,
      end: 525,
    },
  ];
  
  const highlightedHTML = highlightHTML(
    htmlContent,
    plainText,
    plainTextPositions
  );
  
  console.log(highlightedHTML);
  