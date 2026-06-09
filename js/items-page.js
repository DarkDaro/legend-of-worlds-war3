document.addEventListener('DOMContentLoaded', function() {
  (function() {
    const STORAGE_KEY = 'heroData:itemGridCollapseState';

    function loadCollapsedState() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
      } catch (err) {
        return {};
      }
    }

    function saveCollapsedState(state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (err) {
        /* ignore storage errors */
      }
    }

    const collapsedState = loadCollapsedState();

    function getToggleButton(h2) {
      return h2.querySelector('.collapse-toggle');
    }

    function updateToggleButton(h2, isCollapsed) {
      const btn = getToggleButton(h2);
      if (!btn) return;
      btn.innerHTML = '<i class="fas ' + (isCollapsed ? 'fa-chevron-right' : 'fa-chevron-down') + ' collapse-chevron"></i>';
      btn.setAttribute('aria-label', isCollapsed ? 'Развернуть магазин' : 'Свернуть магазин');
      btn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
      btn.title = isCollapsed ? 'Развернуть магазин' : 'Свернуть магазин';
    }

    function applyGridState(section, animate) {
      if (!section) return;
      var grid = section.querySelector('.items-grid');
      var h2 = section.querySelector('h2');
      if (!grid || !h2) return;

      var isCollapsed = !!collapsedState[section.id];
      grid.classList.toggle('collapsed', isCollapsed);
      h2.classList.toggle('collapsed-header', isCollapsed);
      updateToggleButton(h2, isCollapsed);

      if (isCollapsed) {
        grid.style.maxHeight = '0px';
        return;
      }

      if (animate) {
        grid.style.maxHeight = grid.scrollHeight + 'px';
        setTimeout(function() {
          if (!grid.classList.contains('collapsed')) {
            grid.style.maxHeight = '';
          }
        }, 350);
      } else {
        grid.style.maxHeight = '';
      }
    }

    function toggleGridState(section) {
      if (!section) return;
      var nextState = !collapsedState[section.id];
      collapsedState[section.id] = nextState;
      saveCollapsedState(collapsedState);
      applyGridState(section, true);
    }

    function restoreGridState() {
      document.querySelectorAll('.category-section').forEach(function(section) {
        applyGridState(section, false);
      });
    }

    document.querySelectorAll('.category-section h2').forEach(function(h2) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'collapse-toggle';
      btn.innerHTML = '<i class="fas fa-chevron-down collapse-chevron"></i>';
      btn.setAttribute('aria-label', 'Свернуть магазин');
      btn.setAttribute('aria-expanded', 'true');
      h2.appendChild(btn);
      updateToggleButton(h2, !!collapsedState[h2.parentElement.id]);

      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleGridState(h2.parentElement);
      });

      h2.addEventListener('click', function() {
        toggleGridState(h2.parentElement);
      });
    });

    restoreGridState();
  })();

  }); // end DOMContentLoaded

  // Обработка hash и ?item= теперь в items-db.js (openItemFromUrl)
