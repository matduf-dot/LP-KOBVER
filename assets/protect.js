/* Images et videos non recuperables au clic droit / appui long.
   Pose des le parsing du <head> : le style existe avant le premier rendu,
   les deux ecouteurs sont en capture pour passer devant d'eventuels
   handlers de page. Les elements injectes plus tard sont couverts aussi,
   puisqu'on ecoute sur document et pas sur chaque balise. */
(function () {
  var SEL = 'img, video, canvas, picture, [data-protected]';

  var style = document.createElement('style');
  style.textContent =
    SEL + '{' +
      '-webkit-user-drag:none;' +
      '-webkit-touch-callout:none;' +   /* iOS : pas de panneau "Enregistrer l'image" */
      '-webkit-user-select:none;' +
      '-ms-user-select:none;' +
      'user-select:none;' +
    '}';
  (document.head || document.documentElement).appendChild(style);

  function media(el) {
    if (!el || el.nodeType !== 1) return null;
    return el.closest ? el.closest(SEL) : null;
  }

  document.addEventListener('contextmenu', function (e) {
    if (media(e.target)) e.preventDefault();
  }, true);

  document.addEventListener('dragstart', function (e) {
    if (media(e.target)) e.preventDefault();
  }, true);
})();
