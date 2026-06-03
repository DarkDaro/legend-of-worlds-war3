/**
 * map-changes-page.js — Сводка по классам и приростам для map-changes.html
 * Данные из hero-data.js (HEROES_DATA)
 */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof HEROES_DATA === 'undefined') return;

  var heroes = HEROES_DATA.filter(function(h) { return !h.wip && !h.isAltForm; });

  // ── Распределение по атрибутам ──
  var attrGroups = { strength: [], agility: [], intelligence: [] };
  heroes.forEach(function(h) {
    if (attrGroups[h.attr]) attrGroups[h.attr].push(h);
  });

  var ATTR_LABELS = {
    strength: { label: 'Сила', color: '#e74c3c', icon: 'fas fa-fist-raised' },
    agility: { label: 'Ловкость', color: '#2ecc71', icon: 'fas fa-feather-alt' },
    intelligence: { label: 'Разум', color: '#3498db', icon: 'fas fa-hat-wizard' }
  };

  // ── Круговая диаграмма (SVG) ──
  var pieEl = document.getElementById('mcPieChart');
  if (pieEl) {
    var total = heroes.length;
    var slices = [];
    var startAngle = -Math.PI / 2; // начинаем сверху

    var attrOrder = ['strength', 'agility', 'intelligence'];
    attrOrder.forEach(function(attr) {
      var count = attrGroups[attr].length;
      var pct = count / total;
      var angle = pct * 2 * Math.PI;
      var endAngle = startAngle + angle;

      // SVG arc
      var r = 80;
      var cx = 90, cy = 90;
      var x1 = cx + r * Math.cos(startAngle);
      var y1 = cy + r * Math.sin(startAngle);
      var x2 = cx + r * Math.cos(endAngle);
      var y2 = cy + r * Math.sin(endAngle);
      var largeArc = angle > Math.PI ? 1 : 0;

      var d = 'M ' + cx + ' ' + cy + ' L ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 1 ' + x2 + ' ' + y2 + ' Z';

      slices.push('<path d="' + d + '" fill="' + ATTR_LABELS[attr].color + '" opacity="0.85"><title>' + ATTR_LABELS[attr].label + ': ' + count + '</title></path>');

      startAngle = endAngle;
    });

    var svg = '<svg viewBox="0 0 180 180" class="mc-pie-svg">' + slices.join('') +
      '<circle cx="90" cy="90" r="40" fill="var(--bg-primary, #0f172a)"/>' +
      '<text x="90" y="86" text-anchor="middle" fill="var(--text-primary)" font-size="18" font-weight="700">' + total + '</text>' +
      '<text x="90" y="102" text-anchor="middle" fill="var(--text-secondary)" font-size="9">героев</text>' +
      '</svg>';

    // Легенда
    var legend = '<div class="mc-pie-legend">';
    attrOrder.forEach(function(attr) {
      var info = ATTR_LABELS[attr];
      var count = attrGroups[attr].length;
      var pct = Math.round(count / total * 100);
      legend += '<div class="mc-pie-legend-item">' +
        '<span class="mc-pie-dot" style="background:' + info.color + '"></span>' +
        '<i class="' + info.icon + '" style="color:' + info.color + '"></i> ' +
        info.label + ': <strong>' + count + '</strong> <span class="mc-pie-pct">(' + pct + '%)</span>' +
        '</div>';
    });
    legend += '</div>';

    pieEl.innerHTML = '<div class="mc-pie-wrap">' + svg + legend + '</div>';
  }

  // ── Таблица ролей ──
  var roleEl = document.getElementById('mcRoleTable');
  if (roleEl) {
    var roleCounts = {};
    heroes.forEach(function(h) {
      (h.roles || []).forEach(function(r) {
        roleCounts[r] = (roleCounts[r] || 0) + 1;
      });
    });

    var ROLE_NAMES = {
      tank: 'Танк', bruiser: 'Рубака', damager: 'Дамагер', assassin: 'Убийца',
      initiator: 'Инициатор', controller: 'Контролёр', healer: 'Целитель', support: 'Помощник'
    };
    var ROLE_COLORS = {
      tank: '#3498db', bruiser: '#e67e22', damager: '#e74c3c', assassin: '#9b59b6',
      initiator: '#f1c40f', controller: '#1abc9c', healer: '#2ecc71', support: '#95a5a6'
    };

    var sortedRoles = Object.entries(roleCounts).sort(function(a, b) { return b[1] - a[1]; });
    var html = '<div class="mc-role-grid">';
    sortedRoles.forEach(function(pair) {
      var key = pair[0], count = pair[1];
      var name = ROLE_NAMES[key] || key;
      var color = ROLE_COLORS[key] || '#999';
      html += '<div class="mc-role-chip" style="border-color:' + color + '; color:' + color + '">' +
        name + ' <strong>' + count + '</strong></div>';
    });
    html += '</div>';
    roleEl.innerHTML = html;
  }

  // ── Сводка приростов по классам ──
  var gainsEl = document.getElementById('mcGainsTable');
  if (gainsEl) {
    var html = '<table class="mc-table"><tr><th>Атрибут</th><th>Героев</th><th>STR</th><th>AGI</th><th>INT</th><th>Сумма</th></tr>';

    attrOrder.forEach(function(attr) {
      var group = attrGroups[attr];
      var info = ATTR_LABELS[attr];
      var count = group.length;

      var strGains = group.map(function(h) { return h.strGain || 0; });
      var agiGains = group.map(function(h) { return h.agiGain || 0; });
      var intGains = group.map(function(h) { return h.intGain || 0; });

      function fmt(arr) {
        var avg = arr.reduce(function(s, v) { return s + v; }, 0) / arr.length;
        var mn = Math.min.apply(null, arr);
        var mx = Math.max.apply(null, arr);
        if (mn === mx) return avg.toFixed(1);
        return avg.toFixed(1) + ' <span class="mc-gain-range">(' + mn.toFixed(1) + '–' + mx.toFixed(1) + ')</span>';
      }

      var sumGains = group.map(function(h) { return (h.strGain || 0) + (h.agiGain || 0) + (h.intGain || 0); });
      var sumAvg = sumGains.reduce(function(s, v) { return s + v; }, 0) / sumGains.length;

      html += '<tr>' +
        '<td><i class="' + info.icon + '" style="color:' + info.color + '"></i> ' + info.label + '</td>' +
        '<td><strong>' + count + '</strong></td>' +
        '<td>' + fmt(strGains) + '</td>' +
        '<td>' + fmt(agiGains) + '</td>' +
        '<td>' + fmt(intGains) + '</td>' +
        '<td><strong>' + sumAvg.toFixed(1) + '</strong></td>' +
        '</tr>';
    });

    html += '</table>';
    gainsEl.innerHTML = html;
  }
});
