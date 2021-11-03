/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "eleventy-plugin-pwa"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "57ca62c51dd133a2385f50bb78faf878"
  },
  {
    "url": "about/index.html",
    "revision": "d674c1c547d4f69a4a4d89434df617e0"
  },
  {
    "url": "admin/index.html",
    "revision": "e44aa57431b4b3d752fa7c4bd8dfe158"
  },
  {
    "url": "admin/previews/index.js",
    "revision": "201da5ab96da9f63846f623b8bcafb12"
  },
  {
    "url": "admin/previews/page.js",
    "revision": "8343f1efa48dda326e4504ec17e620b0"
  },
  {
    "url": "admin/previews/post.js",
    "revision": "d40d8c9c0826a17c9290249fce3ec187"
  },
  {
    "url": "assets/buttons/201728160928061510824486089.png",
    "revision": "461e5ce6c2f0b04ffe92724f329268b8"
  },
  {
    "url": "assets/buttons/201840050740491528184449095.png",
    "revision": "479b01b4a7d9ff6354924c25b9789932"
  },
  {
    "url": "assets/buttons/202056270756541582790214510.png",
    "revision": "ebf8b6109007745d8778f9ceaab692ca"
  },
  {
    "url": "assets/buttons/45164_320X180.png",
    "revision": "5a8bfef3e1702efe8789b7f12840ba62"
  },
  {
    "url": "assets/buttons/48434_320X180.png",
    "revision": "4b8a9993e6d12c4b93f1cf3fb3e62783"
  },
  {
    "url": "assets/img/404-southpark.jpg",
    "revision": "e0dd430e0d719ae0b489be47e522beda"
  },
  {
    "url": "assets/img/unnamed.jpg",
    "revision": "76c78480bd4c29b9d1565a59fba79643"
  },
  {
    "url": "assets/tv/caph-jquery.min.js",
    "revision": "7a44d38422f6b6109ed2ff6b6b87c2d1"
  },
  {
    "url": "assets/tv/caph-stripe.min.css",
    "revision": "fae3f82f5f396bb97d00e1f9b270d67d"
  },
  {
    "url": "assets/tv/caph.min.css",
    "revision": "0743e672b92046203c7cf10ef9d24f19"
  },
  {
    "url": "assets/tv/dash.all.min.js",
    "revision": "f67b11b1e8d90633531d054bc807163b"
  },
  {
    "url": "assets/tv/init.js",
    "revision": "7cbbcde999f8395c298b55be7c16728b"
  },
  {
    "url": "assets/tv/JosefinSans-Light.ttf",
    "revision": "fecb0a5bec41697fb1e24d5ed87a4bba"
  },
  {
    "url": "assets/tv/keyhandler.js",
    "revision": "c6dbca57f16a835b7a5568f88d84a696"
  },
  {
    "url": "assets/tv/logger.js",
    "revision": "4f01f02b2bbf5d9f69a615d6ed3e3bdd"
  },
  {
    "url": "assets/tv/main.js",
    "revision": "c81f4061eeb21069dd60e8faabf9294c"
  },
  {
    "url": "assets/tv/navigation.js",
    "revision": "1b4869cd20981e96b8158cb40de49f0c"
  },
  {
    "url": "assets/tv/tv.css",
    "revision": "1c2f630153ab06d40cf010b54efee24b"
  },
  {
    "url": "assets/tv/tvde.css",
    "revision": "fcd0722bcd3d21cb4b5670fc36f46d6f"
  },
  {
    "url": "assets/tv/tvde.js",
    "revision": "77a091c0a4266727658c242131d6761a"
  },
  {
    "url": "assets/tv/tvdevendor.js",
    "revision": "1968755d99e96671e1aa61b33e3c6373"
  },
  {
    "url": "assets/tv/util.js",
    "revision": "d242cf982812215ee9790532c9990e3e"
  },
  {
    "url": "assets/tv/videoplayer.js",
    "revision": "a6ddf9207578cd0a38664ff34298d5d4"
  },
  {
    "url": "favicon/android-chrome-192x192.png",
    "revision": "a8c7ef75598efe171556b88d32921b78"
  },
  {
    "url": "favicon/android-chrome-512x512.png",
    "revision": "210e179487795d8e0712f127a54f35cd"
  },
  {
    "url": "favicon/apple-touch-icon.png",
    "revision": "2e402300b89c1d598aa85f1c2dd205dc"
  },
  {
    "url": "favicon/favicon-16x16.png",
    "revision": "d161ba31092d6cb6d3d07d1a83e69815"
  },
  {
    "url": "favicon/favicon-32x32.png",
    "revision": "c211beb449f28adbfcffc2c595a5697a"
  },
  {
    "url": "favicon/favicon.ico",
    "revision": "e2c51633ef615a23a8f8ad4c065be63a"
  },
  {
    "url": "index.html",
    "revision": "0042b4f1b4f08a09eabefa383c4eacdd"
  },
  {
    "url": "tv/index.html",
    "revision": "21f1eff0b5a77e85b655c5c9e9c94ec0"
  },
  {
    "url": "tvde/index.html",
    "revision": "21210d28747b35b023155678b33391e9"
  },
  {
    "url": "tvhome/index.html",
    "revision": "16451d34499ea17b391e65150400ded4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
