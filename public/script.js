const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const result = document.getElementById('result');

shortenBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();

  if (url === '') {
    alert('Please enter a URL.');
    return;
  }

  try {
    const response = await fetch('/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    result.innerHTML = `Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
  } catch (error) {
    console.error('Error:', error);
    result.textContent = 'Failed to shorten URL. Please try again.';
  }
});