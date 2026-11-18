/**
 * site-settings.js — настройки сайта: звук, анимации, стекломорфизм,
 * тяжёлые эффекты.
 *
 * Флаги лежат в localStorage (ключ site-settings-v1), хранятся только
 * выключенные — дефолт «всё включено». Флаги ставятся атрибутами на <html>:
 *   data-anim="on|off", data-glass="on|off", data-fx="on|off", data-sound="on|off".
 * Значения читает блок «Настройки сайта» в конце css/base.css.
 * Скрипт подключается сразу после <body> на всех страницах — атрибуты
 * ставятся до первой отрисовки, мигания эффектами нет.
 * Публичное API для остального JS: SiteSettings.get('anim'), SiteSettings.set('anim', false).
 * Событие site-settings:change летит при каждом переключении.
 */
(function () {
    'use strict';

    var KEY = 'site-settings-v1';

    function read() {
        try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
        catch (e) { return {}; }
    }

    // значения по умолчанию: всё включено
    function flags() {
        var s = read();
        return {
            sound: s.sound !== false,
            anim: s.anim !== false,
            glass: s.glass !== false,
            fx: s.fx !== false
        };
    }

    function apply(f) {
        var h = document.documentElement;
        h.setAttribute('data-anim', f.anim ? 'on' : 'off');
        h.setAttribute('data-glass', f.glass ? 'on' : 'off');
        h.setAttribute('data-fx', f.fx ? 'on' : 'off');
        h.setAttribute('data-sound', f.sound ? 'on' : 'off');
    }

    var api = {
        get: function (k) { return flags()[k]; },
        set: function (k, v) {
            var s = read();
            s[k] = !!v;
            try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* приватный режим — работаем без хранения */ }
            apply(flags());
            try {
                document.dispatchEvent(new CustomEvent('site-settings:change', { detail: { key: k, value: !!v } }));
            } catch (e) { /* CustomEvent нет — только очень старые браузеры */ }
        }
    };
    window.SiteSettings = api;
    apply(flags());

    // ── панель настроек ──
    // шестерёнка — последний пункт .header-nav: на десктопе пилюля в ряду,
    // на мобильном попадает в выпадающее меню бургера; панель — поповер
    // в правом верхнем углу, материал и цвета только из токенов.

    var ROWS = [
        ['sound', 'Звук', 'Звуковое сопровождение (контент звука появится позже)'],
        ['anim', 'Анимации', 'Пульсации, счётчики, плавные появления'],
        ['glass', 'Стекломорфизм', 'Размытие фона под шапкой и панелями'],
        ['fx', 'Тяжёлые эффекты', 'Декоративные орбы, свечение курсора, неоновые тени текста']
    ];

    function buildPanel() {
        var nav = document.querySelector('.header-nav');
        if (!nav || document.getElementById('site-settings-root')) return;

        var gear = document.createElement('button');
        gear.type = 'button';
        gear.className = 'nav-link settings-btn';
        gear.setAttribute('aria-label', 'Настройки сайта');
        // подпись только для мобильного меню бургера; на десктопе иконка-пилюля
        gear.innerHTML = '<i class="fas fa-cog"></i><span class="settings-btn-label">Настройки</span>';
        nav.appendChild(gear);

        var panel = document.createElement('div');
        panel.id = 'site-settings-root';
        panel.className = 'settings-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Настройки сайта');
        panel.hidden = true;

        var title = document.createElement('div');
        title.className = 'settings-title';
        title.textContent = 'Настройки сайта';
        panel.appendChild(title);

        ROWS.forEach(function (row) {
            var key = row[0], name = row[1], hint = row[2];

            var line = document.createElement('div');
            line.className = 'settings-row';

            var box = document.createElement('div');
            var label = document.createElement('div');
            label.className = 'settings-name';
            label.textContent = name;
            var hintEl = document.createElement('div');
            hintEl.className = 'settings-hint';
            hintEl.textContent = hint;
            box.appendChild(label);
            box.appendChild(hintEl);

            var sw = document.createElement('button');
            sw.type = 'button';
            sw.className = 'settings-switch';
            sw.setAttribute('role', 'switch');
            sw.setAttribute('aria-checked', String(api.get(key)));
            sw.setAttribute('aria-label', name);
            sw.setAttribute('data-key', key);
            if (!api.get(key)) sw.classList.add('off');
            sw.addEventListener('click', function () {
                api.set(key, !api.get(key));
            });

            line.appendChild(box);
            line.appendChild(sw);
            panel.appendChild(line);
        });

        document.body.appendChild(panel);

        gear.addEventListener('click', function (e) {
            e.stopPropagation();
            panel.hidden = !panel.hidden;
            gear.classList.toggle('active', !panel.hidden);
        });

        // клик мимо панели закрывает её; Esc тоже
        document.addEventListener('click', function (e) {
            if (!panel.hidden && !e.target.closest('.settings-panel') && !e.target.closest('.settings-btn')) {
                panel.hidden = true;
                gear.classList.remove('active');
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !panel.hidden) {
                panel.hidden = true;
                gear.classList.remove('active');
            }
        });

        // внешние смены флага (из ui-effects и т.п.) синхронизируют тумблеры
        document.addEventListener('site-settings:change', function () {
            var switches = panel.querySelectorAll('.settings-switch');
            for (var i = 0; i < switches.length; i++) {
                var sw = switches[i];
                var on = api.get(sw.getAttribute('data-key'));
                sw.setAttribute('aria-checked', String(on));
                sw.classList.toggle('off', !on);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildPanel);
    } else {
        buildPanel();
    }
})();
