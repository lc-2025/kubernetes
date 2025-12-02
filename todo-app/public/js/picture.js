/**
 * @description Time checking helper
 * Calculates the time gap between two fetched images in minutes
 * @author Luca Cattide
 * @date 02/12/2025
 * @param {*} date
 * @returns {*}
 */
function checkTime(date) {
  // Time gap millisecond -> second -> minutes conversion
  const timePassed = ((new Date().getTime() - new Date(date).getTime()) / 1000) / 60;

  return Math.abs(Math.round(timePassed));
}

/**
 * @description URL format helper
 * @author Luca Cattide
 * @date 02/12/2025
 * @param {*} url
 * @returns {*}
 */
function formatUrl(url) {
  return url.replace('fastly.', '');
}

/**
 * @description Picture getter
 * Retrieves a random image from an external API
 * See: https://picsum.photos
 * @author Luca Cattide
 * @date 02/12/2025
 * @returns {*}
 */
async function getPicture() {
  try {
    const picture = await fetch('https://picsum.photos/1200?random');

    if (!picture) {
      throw new Error('Picture fetching error');
    }

    return picture;
  } catch (error) {
    console.error(error);
  }
}

/**
 * @description Picture handler
 * Manages the fetched image by caching for 10'
 * then replacing it
 * @author Luca Cattide
 * @date 02/12/2025
 */
function handlePicture() {
  if (window.localStorage) {
    const picture = localStorage.getItem('picture');

    if (picture) {
      const { date, url } = JSON.parse(picture);

      setPicture(url);

      // 10' check - If passed then perform a new fetch
      if (checkTime(date) >= 10) {
        getPicture().then((response) => {
          storePicture(formatUrl(response.url));
        })
      }
    } else {
      getPicture().then((response) => {
        const url = formatUrl(response.url);

        setPicture(url);
        storePicture(url);
      });
    }
  }
}

/**
 * @description Picture setter
 * Updates the current displayed image
 * @author Luca Cattide
 * @date 02/12/2025
 * @param {*} url
 */
function setPicture(url) {
  document.getElementsByTagName('img')[0].src = url;
}

/**
 * @description Stores a new fetched image
 * @author Luca Cattide
 * @date 02/12/2025
 * @param {*} url
 */
async function storePicture(url) {
  localStorage.setItem('picture', JSON.stringify({
    // Store the creation date to use it as trigger for the next fetch
    date: new Date(),
    url,
  }));
}

handlePicture();
