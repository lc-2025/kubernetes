function getPicture() {
  if (window.localStorage) {
    let picture = localStorage.getItem('picture');

    if (picture) {
      document.getElementsByTagName('img')[0].src = picture;
    }
  }
}

getPicture();
// TODO: Refactor - not interval but check timestamp - if >= 10' then set new
setInterval(async function() {
  try {
    picture = await fetch('https://picsum.photos/1200?random');

    if (window.localStorage && picture) {
      localStorage.setItem('picture', picture.url.replace('fastly.', ''));
    }
  } catch (error) {
    console.error(error);
  }

  getPicture();
}, 10 * 60 * 1000);
