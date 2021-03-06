const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


// Get Quote from API

async function getQuote() {
    const proxyUrl = 'http://api.allorigins.win/get?url=';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        const data = await response.json();
        const quoteObj = JSON.parse(data.contents);
        // If Author is blank, add 'Unknown'
        if (quoteObj.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = quoteObj.quoteAuthor
        }
        // Reduce font size for long quotes
        if (quoteObj.quoteText.length > 100) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = quoteObj.quoteText;
        
     
    } catch (error) {
        getQuote();
      
    }
}
  // Tweet Quote

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load

getQuote();