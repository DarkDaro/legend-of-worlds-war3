/**
 * site-settings.js — настройки сайта: тема, звук, анимации, стекломорфизм,
 * тяжёлые эффекты.
 *
 * Флаги лежат в localStorage (ключ site-settings-v1), хранятся только
 * выключенные — дефолт «всё включено». Флаги ставятся атрибутами на <html>:
 *   data-anim="on|off", data-glass="on|off", data-fx="on|off", data-sound="on|off".
 * Тема — строка: SiteSettings.get('theme') даёт '' (по странице) или id темы
 * из THEMES ниже ('neon', 'ashenvale', 'dark', 'contrast', 'astral', 'winter');
 * пустое значение оставляет разметку в покое — так прототип «Ашенваля» живёт
 * на lore.html и index.html через атрибут в HTML, а явный выбор перекрывает
 * разметку на всех страницах. meta theme-color следует за темой (TD-7).
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

    // значения по умолчанию: всё включено, тема не выбрана («по странице»)
    function flags() {
        var s = read();
        return {
            sound: s.sound !== false,
            anim: s.anim !== false,
            glass: s.glass !== false,
            fx: s.fx !== false,
            text: s.text === true,
            decor: s.decor !== false,
            theme: s.theme || ''
        };
    }

    // дефолт разметки запоминается до первого apply: «по странице» всегда
    // возвращает страницу к тому, что написано в её HTML
    var PAGE_THEME = document.documentElement.getAttribute('data-theme');
    var MARKUP_TC = (document.querySelector('meta[name="theme-color"]') || {}).content || null;

    // фон темы для meta theme-color (TD-7): неон, «Ашенваль», «Тёмная»,
    // «Высокий контраст», «Астральная», «Зимняя морозная»
    var THEME_COLORS = { neon: '#0b0e14', ashenvale: '#09100c', dark: '#0d0d0f', contrast: '#040406', astral: '#0d0a14', winter: '#0e1218' };

    function apply(f) {
        var h = document.documentElement;
        h.setAttribute('data-anim', f.anim ? 'on' : 'off');
        h.setAttribute('data-glass', f.glass ? 'on' : 'off');
        h.setAttribute('data-fx', f.fx ? 'on' : 'off');
        h.setAttribute('data-sound', f.sound ? 'on' : 'off');
        h.setAttribute('data-text', f.text ? 'on' : 'off');
        h.setAttribute('data-decor', f.decor ? 'on' : 'off');
        // тема: пусто — возврат к дефолту разметки, явный выбор перекрывает
        // разметку на всех страницах
        if (f.theme === 'ashenvale') h.setAttribute('data-theme', 'ashenvale');
        else if (f.theme === 'dark') h.setAttribute('data-theme', 'dark');
        else if (f.theme === 'contrast') h.setAttribute('data-theme', 'contrast');
        else if (f.theme === 'astral') h.setAttribute('data-theme', 'astral');
        else if (f.theme === 'winter') h.setAttribute('data-theme', 'winter');
        else if (f.theme === 'neon') h.removeAttribute('data-theme');
        else if (PAGE_THEME) h.setAttribute('data-theme', PAGE_THEME);
        else h.removeAttribute('data-theme');
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            if (THEME_COLORS[f.theme]) meta.setAttribute('content', THEME_COLORS[f.theme]);
            else if (MARKUP_TC) meta.setAttribute('content', MARKUP_TC);
        }
    }

    var api = {
        get: function (k) { return flags()[k]; },
        set: function (k, v) {
            var s = read();
            if (k === 'theme') s.theme = v || '';
            else s[k] = !!v;
            try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* приватный режим — работаем без хранения */ }
            apply(flags());
            try {
                document.dispatchEvent(new CustomEvent('site-settings:change', { detail: { key: k, value: k === 'theme' ? (v || '') : !!v } }));
            } catch (e) { /* CustomEvent нет — только очень старые браузеры */ }
        }
    };
    window.SiteSettings = api;
    apply(flags());

    // ── панель настроек ──
    // шестерёнка живёт в шапке сразу после навигации: на десктопе пилюля в
    // конце ряда, на телефоне (≤600px) css прижимает её в правый нижний угол
    // плавающей круглой кнопкой — симметрично кнопке «наверх» (она слева).
    // Раньше кнопка сидела внутри .header-nav и на телефоне была видна только
    // в раскрытом меню бургера четырнадцатой строкой — владелец её не нашёл.
    // Панель — поповер в правом верхнем углу, материал и цвета только из токенов.

    var ROWS = [
        ['sound', 'Звук', 'Звуковое сопровождение (контент звука появится позже)'],
        ['anim', 'Анимации', 'Пульсации, счётчики, плавные появления'],
        ['glass', 'Стекломорфизм', 'Размытие фона под шапкой и панелями'],
        ['fx', 'Тяжёлые эффекты', 'Декоративные орбы, свечение курсора, неоновые тени текста'],
        ['text', 'Яркий текст', 'Светлее шкала текста — под яркое солнце и слабое зрение'],
        ['decor', 'Фон главной', 'Картинка арены в шапке главной — можно убрать для читаемости']
    ];

    // темы: пустой id — «по странице», прототип «Ашенваля» живёт в разметке lore и главной
    var THEMES = [
        ['', 'По странице'],
        ['neon', 'Неон'],
        ['ashenvale', 'Ашенваль'],
        ['dark', 'Тёмная'],
        ['contrast', 'Высокий контраст'],
        ['astral', 'Астральная'],
        ['winter', 'Зимняя морозная']
    ];

    function buildPanel() {
        var nav = document.querySelector('.header-nav');
        if (!nav || document.getElementById('site-settings-root')) return;

        var gear = document.createElement('button');
        gear.type = 'button';
        gear.className = 'nav-link settings-btn';
        gear.setAttribute('aria-label', 'Настройки сайта');
        gear.innerHTML = '<i class="fas fa-cog"></i>';
        // после .header-nav, а не внутри: на телефоне навигация скрыта до
        // открытия бургера, а настройки должны быть видны всегда
        nav.insertAdjacentElement('afterend', gear);

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

        // строка темы: пилюли выбора вместо тумблера, активная подсвечивается
        var trow = document.createElement('div');
        trow.className = 'settings-row settings-row-theme';

        var tbox = document.createElement('div');
        var tlabel = document.createElement('div');
        tlabel.className = 'settings-name';
        tlabel.textContent = 'Тема';
        var thint = document.createElement('div');
        thint.className = 'settings-hint';
        thint.textContent = '«По странице» оставляет разметке решать';
        tbox.appendChild(tlabel);
        tbox.appendChild(thint);

        var seg = document.createElement('div');
        seg.className = 'settings-themes';
        seg.setAttribute('role', 'group');
        seg.setAttribute('aria-label', 'Тема оформления');
        THEMES.forEach(function (t) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'settings-theme-btn';
            b.setAttribute('data-theme-id', t[0]);
            b.textContent = t[1];
            b.addEventListener('click', function () {
                api.set('theme', t[0]);
            });
            seg.appendChild(b);
        });

        trow.appendChild(tbox);
        trow.appendChild(seg);
        panel.appendChild(trow);

        document.body.appendChild(panel);

        function syncThemeButtons() {
            var cur = api.get('theme') || '';
            var btns = panel.querySelectorAll('.settings-theme-btn');
            for (var i = 0; i < btns.length; i++) {
                var active = btns[i].getAttribute('data-theme-id') === cur;
                btns[i].classList.toggle('active', active);
                btns[i].setAttribute('aria-pressed', String(active));
            }
        }
        syncThemeButtons();

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

        // внешние смены флага (из ui-effects и т.п.) синхронизируют тумблеры и тему
        document.addEventListener('site-settings:change', function () {
            var switches = panel.querySelectorAll('.settings-switch');
            for (var i = 0; i < switches.length; i++) {
                var sw = switches[i];
                var on = api.get(sw.getAttribute('data-key'));
                sw.setAttribute('aria-checked', String(on));
                sw.classList.toggle('off', !on);
            }
            syncThemeButtons();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildPanel);
    } else {
        buildPanel();
    }
})();
