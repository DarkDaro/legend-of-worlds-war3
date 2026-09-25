(function() {
    'use strict';

    if (typeof STORAGE_DB_READY === 'undefined' && typeof STORAGE_BASE === 'undefined') return;

    // ===== Конвертер WC3-кодов цвета |cffXXXXXX ... |r → HTML =====
    function wc3ToHtml(text) {
        if (!text) return '';
        var s = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        s = s.replace(/\|c([0-9a-fA-F]{8})([\s\S]*?)\|r/g, function(m, cc, body) {
            var hex = cc.length === 8 ? cc.slice(2) : cc;
            return '<span style="color:#' + hex + '">' + body + '</span>';
        });
        return s;
    }

    function escHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    // Класс бейджа требования
    function reqBadgeHtml(req) {
        if (!req) return '';
        var cls = '';
        if (req.indexOf('Admin') !== -1) cls = 'admin';
        else if (req.indexOf('Premium') !== -1) cls = 'premium';
        else if (req.indexOf('VIP') !== -1 || req.indexOf('Tester') !== -1) cls = 'vip';
        if (!cls) return '';
        return '<span class="storage-req-badge ' + cls + '"><i class="fas fa-crown"></i> ' + escHtml(req) + '</span>';
    }

    function reqClass(req) {
        if (!req) return '';
        if (req.indexOf('Admin') !== -1) return ' req-admin';
        if (req.indexOf('Premium') !== -1) return ' req-premium';
        if (req.indexOf('VIP') !== -1 || req.indexOf('Tester') !== -1) return ' req-vip';
        return '';
    }

    // ===== Построение ящика =====
    var slotsEl = document.getElementById('storageSlots');
    var actionsEl = document.getElementById('storageActions');
    var booksRowEl = document.getElementById('storageBooksRow');
    var bookPanel = document.getElementById('storageBookPanel');
    var bookPanelTitle = document.getElementById('storageBookPanelTitle');
    var bookPanelBtns = document.getElementById('storageBookBtns');

    var panel = document.getElementById('storageInfoPanel');
    var iconEl = document.getElementById('storageInfoIcon');
    var titleEl = document.getElementById('storageInfoTitle');
    var textEl = document.getElementById('storageInfoText');
    var hintEl = document.getElementById('storageInfoHint');

    var DEFAULT_INFO = {
        icon: 'fa-hand-pointer',
        title: 'Хранилище',
        text: 'Наведи курсор или нажми на кнопку ящика, чтобы увидеть описание.',
        hint: 'Кнопки слотов кладут и забирают предметы. Спеллбуки открывают книги кнопок.'
    };

    function showAbility(ab, btn) {
        if (!ab) return;
        var hot = ab.hotkey ? ' <span class="storage-hotkey">' + ab.hotkey + '</span>' : '';
        iconEl.innerHTML = '<i class="fas ' + (ab.btnIcon || 'fa-book') + '"></i>';
        titleEl.innerHTML = escHtml(ab.name) + hot;
        textEl.innerHTML = wc3ToHtml(ab.desc || ab.tip || '');
        hintEl.innerHTML = (ab.cool ? '<i class="fas fa-clock"></i> Перезарядка: ' + ab.cool + ' сек. ' : '') +
            (ab.req ? 'Требуется статус: ' + escHtml(ab.req) : (ab.slot ? 'Слот ' + ab.slot + ' из 6' : ''));
        panel.classList.add('active');
        document.querySelectorAll('.storage-btn').forEach(function(b) { b.classList.remove('selected'); });
        if (btn) btn.classList.add('selected');
    }

    function showBook(bookRaw, book, btn) {
        var hot = book.hotkey ? ' <span class="storage-hotkey">' + book.hotkey + '</span>' : '';
        iconEl.innerHTML = '<i class="fas ' + book.icon + '"></i>';
        titleEl.innerHTML = 'Спеллбук «' + escHtml(book.name) + '»' + hot;
        textEl.innerHTML = wc3ToHtml(book.desc || '');
        hintEl.innerHTML = 'Клик — открыть список кнопок книги';
        panel.classList.add('active');
        document.querySelectorAll('.storage-btn').forEach(function(b) { b.classList.remove('selected'); });
        if (btn) btn.classList.add('selected');
    }

    function resetPanel() {
        iconEl.innerHTML = '<i class="fas ' + DEFAULT_INFO.icon + '"></i>';
        titleEl.textContent = DEFAULT_INFO.title;
        textEl.innerHTML = DEFAULT_INFO.text;
        hintEl.textContent = DEFAULT_INFO.hint;
        panel.classList.remove('active');
        document.querySelectorAll('.storage-btn').forEach(function(b) { b.classList.remove('selected'); });
    }

    function bindBtn(btn, fn) {
        btn.addEventListener('mouseenter', fn);
        btn.addEventListener('focus', fn);
        btn.addEventListener('click', function(e) {
            fn(e);
            // toggleBook только для кнопок спеллбуков (dataset.book установлен)
            if (btn.dataset.book) toggleBook(btn.dataset.book, bookPanel, btn);
        });
    }

    // Кнопка "Сбросить" в инфо-панели
    var resetBtn = document.getElementById('storageInfoReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetPanel();
            closeBook();
        });
    }

    // Кнопка "Закрыть" в спеллбук-панели
    var bookCloseBtn = document.getElementById('storageBookClose');
    if (bookCloseBtn) {
        bookCloseBtn.addEventListener('click', function() {
            closeBook();
            resetPanel();
        });
    }

    // Слоты
    STORAGE_LAYOUT.slots.forEach(function(raw, i) {
        var ab = STORAGE_BASE[raw];
        if (!ab) return;
        var btn = document.createElement('button');
        btn.className = 'storage-btn storage-slot';
        btn.innerHTML = '<span class="storage-hotkey">' + ab.hotkey + '</span>' +
            '<span class="storage-slot-num">' + (i + 1) + '</span>' +
            '<i class="fas ' + ab.btnIcon + '"></i>';
        bindBtn(btn, function() { showAbility(ab, btn); });
        slotsEl.appendChild(btn);
    });

    // Действия
    STORAGE_LAYOUT.actions.forEach(function(raw) {
        var ab = STORAGE_BASE[raw];
        if (!ab) return;
        var btn = document.createElement('button');
        btn.className = 'storage-btn storage-action';
        btn.title = shortName(raw);
        btn.innerHTML = '<i class="fas ' + ab.btnIcon + '"></i>' +
            '<span class="storage-act-label">' + escHtml(shortName(raw)) + '</span>' +
            ' <span class="storage-hotkey">' + ab.hotkey + '</span>';
        bindBtn(btn, function() { showAbility(ab, btn); });
        actionsEl.appendChild(btn);
    });

    function shortName(raw) {
        if (raw === 'A0GO') return 'Отдать всё';
        if (raw === 'A0GP') return 'Взять всё';
        if (raw === 'A0GQ') return 'Выбросить всё';
        var ab = STORAGE_BASE[raw];
        return ab ? ab.name : '';
    }

    // Спеллбуки
    var openBookRaw = null;
    function toggleBook(bookRaw, panelEl, btn) {
        var book = STORAGE_BOOKS[bookRaw];
        if (!book) return;
        if (openBookRaw === bookRaw) {
            closeBook();
            return;
        }
        openBookRaw = bookRaw;
        bookPanelTitle.innerHTML = '<i class="fas ' + book.icon + '"></i> ' + escHtml(book.name) + ' — кнопки книги';
        bookPanelBtns.innerHTML = '';
        book.list.forEach(function(subRaw) {
            var sub = STORAGE_BOOK_ABILITIES[subRaw];
            if (!sub || sub.kind === 'hidden') return;
            var sBtn = document.createElement('button');
            sBtn.className = 'storage-btn storage-sub' + reqClass(sub.req);
            var hot = sub.hotkey ? '<span class="storage-hotkey">' + sub.hotkey + '</span>' : '';
            var req = sub.req ? '<span class="storage-req-tag">' + escHtml(shortReq(sub.req)) + '</span>' : '';
            sBtn.innerHTML = hot + '<span>' + escHtml(sub.name) + '</span>' + req;
            bindBtn(sBtn, function() { showAbility(sub, sBtn); });
            bookPanelBtns.appendChild(sBtn);
        });
        panelElOpen();
        document.querySelectorAll('.storage-book').forEach(function(b) { b.classList.remove('expanded'); });
        if (btn) btn.classList.add('expanded');
    }
    function panelElOpen() {
        var p = document.getElementById('storageBookPanel');
        if (p) {
            p.classList.add('open');
            // Мобильные: прокрутить к открытой панели
            if (window.innerWidth <= 900) {
                p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }
    function closeBook() {
        openBookRaw = null;
        var p = document.getElementById('storageBookPanel');
        if (p) p.classList.remove('open');
        document.querySelectorAll('.storage-book').forEach(function(b) { b.classList.remove('expanded'); });
    }

    STORAGE_LAYOUT.books.forEach(function(raw) {
        var book = STORAGE_BOOKS[raw];
        if (!book) return;
        var btn = document.createElement('button');
        btn.className = 'storage-btn storage-book';
        btn.dataset.book = raw;
        btn.innerHTML = '<i class="fas ' + book.icon + '"></i>' + escHtml(book.name) +
            ' <span class="storage-hotkey">' + book.hotkey + '</span>';
        bindBtn(btn, function() { showBook(raw, book, btn); });
        booksRowEl.appendChild(btn);
    });

    // Увод мыши с ящика — сброс
    var box = document.getElementById('storageBox');
    if (box) box.addEventListener('mouseleave', function() {
        resetPanel();
        closeBook();
    });

    // Таблица: слоты и действия
    var tSlots = document.getElementById('storageTableSlots');
    if (tSlots) {
        var rows = [];
        STORAGE_LAYOUT.slots.forEach(function(raw, i) {
            var ab = STORAGE_BASE[raw];
            if (!ab) return;
            rows.push('<tr><td><strong>Слот ' + (i + 1) + '</strong></td><td><span class="storage-hk">' + ab.hotkey + '</span></td><td class="storage-desc">' + escHtml(ab.desc) + '</td></tr>');
        });
        rows.push('<tr><td><strong>Отдать всё</strong></td><td><span class="storage-hk">D</span></td><td>Отдать все предметы герою.</td></tr>');
        rows.push('<tr><td><strong>Взять всё</strong></td><td><span class="storage-hk">C</span></td><td>Взять все предметы у героя (максимальное количество зависит от свободных слотов).</td></tr>');
        rows.push('<tr><td><strong>Выбросить всё</strong></td><td><span class="storage-hk">E</span></td><td>Выбросить все предметы из хранилища.</td></tr>');
        tSlots.innerHTML = rows.join('');
    }

    // Сворачиваемые карточки спеллбуков (низ страницы)
    function renderBookCollapse(bookRaw, containerId) {
        var cont = document.getElementById(containerId);
        if (!cont) return;
        var book = STORAGE_BOOKS[bookRaw];
        if (!book) return;
        book.list.forEach(function(subRaw) {
            var sub = STORAGE_BOOK_ABILITIES[subRaw];
            if (!sub || sub.kind === 'hidden') return;
            var card = document.createElement('div');
            card.className = 'storage-collapse';
            var hot = sub.hotkey ? '<span class="storage-hk">' + sub.hotkey + '</span>' : '<span style="width:2px"></span>';
            var meta = '';
            var metaBits = [];
            if (sub.cool) metaBits.push('<span class="meta-chip"><i class="fas fa-clock"></i> ' + sub.cool + ' сек</span>');
            if (sub.req) metaBits.push(reqBadgeHtml(sub.req));
            if (metaBits.length) meta = '<div class="storage-collapse-meta">' + metaBits.join('') + '</div>';
            card.innerHTML =
                '<button class="storage-collapse-head" type="button">' +
                    hot +
                    '<span class="coll-name">' + escHtml(sub.name) + '</span>' +
                    '<i class="fas fa-chevron-down coll-chev"></i>' +
                '</button>' +
                '<div class="storage-collapse-body"><p class="storage-desc">' + wc3ToHtml(sub.desc) + '</p>' + meta + '</div>';
            var head = card.querySelector('.storage-collapse-head');
            head.addEventListener('click', function() {
                var isOpen = card.classList.contains('open');
                // Закрыть остальные открытые в этой группе
                cont.querySelectorAll('.storage-collapse.open').forEach(function(c) {
                    if (c !== card) c.classList.remove('open');
                });
                card.classList.toggle('open', !isOpen);
            });
            cont.appendChild(card);
        });
    }
    renderBookCollapse('A0OR', 'storageCollapseA0OR');
    renderBookCollapse('A157', 'storageCollapseA157');
    renderBookCollapse('A158', 'storageCollapseA158');
})();
