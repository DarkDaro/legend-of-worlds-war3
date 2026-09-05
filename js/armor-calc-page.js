document.addEventListener('DOMContentLoaded', function() {
        // === Утилита: ограничение значения input === (защита от 99999999 и отрицательных чисел)
        function clampInput(el, min, max) {
            const v = parseFloat(el.value);
            if (isNaN(v) || v < min) el.value = min;
            else if (v > max) el.value = max;
        }

        const armorInput = document.getElementById('armorInput');
        const agiInput = document.getElementById('agiInput');
        const hpInput = document.getElementById('hpInput');
        const constToggle = document.getElementById('constToggle');
        const constInput = document.getElementById('constInput');
        const cInput = document.getElementById('cInput');

        constToggle.addEventListener('change', function() {
            constInput.classList.toggle('visible', this.checked);
            calculate();
        });

        function calculate() {
            const baseArmor = parseFloat(armorInput.value) || 0;
            const agi = parseFloat(agiInput.value) || 0;
            const armor = baseArmor + agi * GAME_CONSTANTS.AGI_ARMOR_FACTOR;
            const hp = parseFloat(hpInput.value) || 1;
            const C = constToggle.checked ? (parseFloat(cInput.value) || GAME_CONSTANTS.ARMOR_C) : GAME_CONSTANTS.ARMOR_C;

            // 06.09: две формулы как в WC3 — положительная и отрицательная броня считаются по-разному
            let reduction, ehp;
            if (armor >= 0) {
                // Положительная: снижение = (A×C)/(1+A×C), EHP = HP×(1+A×C)
                reduction = (armor * C) / (1 + armor * C);
                ehp = hp * (1 + armor * C);
            } else {
                // Отрицательная: множитель урона = 2 − 0.94^(−A) (экспонента, не зависит от C)
                // Снижение отрицательное (урон растёт), EHP падает
                const mult = 2 - Math.pow(0.94, -armor); // >1, максимум 2 (двойной урон)
                reduction = 1 - mult; // отрицательное число
                ehp = hp / mult;
            }
            const gain = ((ehp - hp) / hp) * 100;

            const reductionPct = (reduction * 100).toFixed(1);
            const reductionEl = document.getElementById('reductionValue');
            reductionEl.textContent = reduction >= 0
                ? reductionPct + '%'
                : 'урон +' + (Math.abs(reduction) * 100).toFixed(1) + '%';
            reductionEl.className = 'armor-result-value ' + (reduction >= 0 ? 'positive' : 'negative');
            document.getElementById('ehpValue').textContent = Math.round(ehp).toLocaleString('ru-RU');
            document.getElementById('ehpGainValue').textContent = (gain >= 0 ? '+' : '') + gain.toFixed(1) + '%';
            document.getElementById('ehpGainValue').className = 'armor-result-value ' + (gain >= 0 ? 'positive' : 'negative');

            // Бар — для положительной брони (0–80%), для отрицательной инвертируем
            const barPct = reduction >= 0
                ? Math.min(reduction * 100 / 80 * 100, 100)
                : Math.min(Math.abs(reduction * 100) / 80 * 100, 100);
            document.getElementById('reductionBar').style.width = barPct + '%';
            document.getElementById('reductionBar').style.background = reduction >= 0
                ? 'linear-gradient(90deg, #00e6ff, #00ffaa)'
                : 'linear-gradient(90deg, #ff5555, #ff9944)';
            document.getElementById('reductionBarLabel').textContent = reductionEl.textContent;

            // Формула
            document.getElementById('formulaC').textContent = C;
        }

        armorInput.addEventListener('input', calculate);
        armorInput.addEventListener('blur', function() {
            clampInput(this, -500, 99999);
            calculate();
        });
        agiInput.addEventListener('input', calculate);
        agiInput.addEventListener('blur', function() {
            clampInput(this, 0, 99999);
            calculate();
        });
        hpInput.addEventListener('input', calculate);
        hpInput.addEventListener('blur', function() {
            clampInput(this, 1, 9999999);
            calculate();
        });
        cInput.addEventListener('input', calculate);

        // Синхронизируем инпут C и лейблы с константами
        cInput.value = GAME_CONSTANTS.ARMOR_C;
        document.getElementById('formulaC').textContent = GAME_CONSTANTS.ARMOR_C;
        document.getElementById('agiArmorNote').textContent = '(+' + GAME_CONSTANTS.AGI_ARMOR_FACTOR + ' защиты за ед.)';

        calculate();
    });