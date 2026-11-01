/*
 * Hugo Cards – learning path progress.
 * Stores completed lessons in localStorage (never sent anywhere).
 *   [data-lesson]  lesson id (Hugo .TranslationKey, same across languages)
 *   .lesson-done   toggle button at the end of a lesson
 *   [data-lessons] JSON array of lesson ids; gets "x/y" or "✓" in its
 *                  own summary's .path-progress and the class .is-complete
 */
(function () {
  "use strict";
  var KEY = "hugo-cards-progress";

  function load() {
    try { return new Set(JSON.parse(localStorage.getItem(KEY)) || []); }
    catch (e) { return new Set(); }        // storage blocked or corrupt
  }
  function save(set) {
    try { localStorage.setItem(KEY, JSON.stringify(Array.from(set))); }
    catch (e) { /* ignore */ }
  }

  var done = load();

  function renderLists() {
    document.querySelectorAll("[data-lessons]").forEach(function (el) {
      var ids;
      try { ids = JSON.parse(el.dataset.lessons); } catch (e) { return; }
      if (!ids.length) return;
      var n = ids.filter(function (id) { return done.has(id); }).length;
      var complete = n === ids.length;
      var badge = el.querySelector(":scope > summary .path-progress");
      if (badge) badge.textContent = n === 0 ? "" : complete ? "✓" : n + "/" + ids.length;
      el.classList.toggle("is-complete", complete);
    });
    document.querySelectorAll("a[data-lesson]").forEach(function (a) {
      a.classList.toggle("is-done", done.has(a.dataset.lesson));
    });
  }

  document.querySelectorAll(".lesson-done").forEach(function (btn) {
    var id = btn.dataset.lesson;
    function render() {
      var isDone = done.has(id);
      btn.textContent = isDone ? btn.dataset.labelDone : btn.dataset.labelOpen;
      btn.classList.toggle("is-done", isDone);
      btn.setAttribute("aria-pressed", String(isDone));
    }
    btn.addEventListener("click", function () {
      if (done.has(id)) { done.delete(id); } else { done.add(id); }
      save(done);
      render();
    });
    btn.hidden = false;
    render();
  });

  renderLists();
})();
