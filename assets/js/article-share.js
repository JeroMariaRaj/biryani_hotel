document.addEventListener('click', async (event) => {
  const link = event.target.closest('[data-article-share]');
  if (!link) return;

  event.preventDefault();
  const articleUrl = window.location.href;
  const shareType = link.dataset.articleShare;
  const title = document.title;

  if (shareType === 'copy') {
    try {
      await navigator.clipboard.writeText(articleUrl);
      if (window.Swal) {
        Swal.fire('Link Copied!', 'The article link is ready to share.', 'success');
      }
    } catch (error) {
      window.prompt('Copy this article link:', articleUrl);
    }
    return;
  }

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${articleUrl}`)}`
  };

  if (shareUrls[shareType]) {
    window.open(shareUrls[shareType], '_blank', 'noopener,noreferrer');
  }
});
