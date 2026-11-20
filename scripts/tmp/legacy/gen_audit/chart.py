#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""График веса JS-баз для отчёта аудита (палитра DM-1, акцент #1B6B7A)."""
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

data = [
    ('search-index.js', 57),
    ('hero-lore.js', 28),
    ('ability-stats.js', 140),
    ('items-db.js', 153),
    ('bot-builds.js', 155),
    ('abilities-db.js', 304),
]
labels = [d[0] for d in data]
vals = [d[1] for d in data]

fig, ax = plt.subplots(figsize=(7.6, 3.0), constrained_layout=True)
bars = ax.barh(labels, vals, color='#1B6B7A', height=0.62, zorder=3)
bars[-1].set_color('#0F4A55')

for b, v in zip(bars, vals):
    ax.text(v + 5, b.get_y() + b.get_height() / 2, f'{v} КБ',
            va='center', ha='left', fontsize=9.5, color='#162235')

ax.set_xlim(0, 345)
ax.set_xlabel('Размер файла, КБ (без сжатия)', fontsize=10, color='#162235')
ax.tick_params(axis='both', labelsize=9.5, colors='#162235')
ax.grid(axis='x', color='#C8DDE2', linewidth=0.8, zorder=0)
for s in ['top', 'right', 'left']:
    ax.spines[s].set_visible(False)
ax.spines['bottom'].set_color('#C8DDE2')

fig.savefig('/home/z/my-project/scripts/gen_audit/chart_js_weights.png', dpi=200, facecolor='white')
print('chart saved')
