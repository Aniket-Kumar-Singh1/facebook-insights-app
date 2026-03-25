const FB_APP_ID = import.meta.env.VITE_FB_APP_ID;

let fbReady = false;

export function initFacebookSDK() {
  return new Promise((resolve) => {
    if (fbReady) {
      resolve(window.FB);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FB_APP_ID,
        cookie: true,
        xfbml: false,
        version: 'v19.0',
      });
      fbReady = true;
      resolve(window.FB);
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });
}

export function getFB() {
  return window.FB;
}
