var ABILITY_STATS = {
  "A0IJ": {
    "rawcode": "A0IJ",
    "name": "Гейзер",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          175,
          350,
          525,
          700,
          875
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          2,
          3,
          4,
          5,
          6
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      15
    ],
    "area": 450
  },
  "A0IN": {
    "rawcode": "A0IN",
    "name": "Меч прилива",
    "hotkey": "W",
    "type": "passive",
    "damage": [
      {
        "base": [
          150,
          225,
          300,
          375,
          450
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.7
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ]
  },
  "A15R": {
    "rawcode": "A15R",
    "name": "Призрачный корабль",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "STR",
          "mult": 4
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      25
    ],
    "area": 400
  },
  "A0IP": {
    "rawcode": "A0IP",
    "name": "Призрачная Флотилия",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          400,
          600,
          800,
          1000,
          1200
        ]
      }
    ],
    "cool": [
      120
    ],
    "area": 1500
  },
  "A0IO": {
    "rawcode": "A0IO",
    "name": "Волны",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          70
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      14
    ]
  },
  "A0KB": {
    "rawcode": "A0KB",
    "name": "Циклон",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          400,
          550,
          700,
          850
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "airborne",
        "duration": [
          1
        ],
        "weight": 1
      }
    ],
    "cool": [
      15
    ],
    "area": 300
  },
  "A0K2": {
    "rawcode": "A0K2",
    "name": "Мощь ветра",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          325,
          400,
          475,
          550,
          625,
          1.2,
          1.8,
          2.4,
          3
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.6
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      25
    ],
    "area": 350,
    "dash": {
      "dashRange": [
        1100
      ]
    }
  },
  "A0K3": {
    "rawcode": "A0K3",
    "name": "Контроль Ветра",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          30,
          1.5,
          2.5,
          3,
          3.5
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1
        }
      }
    ],
    "cool": [
      25
    ],
    "buffs": {
      "atkSpeed": [
        20,
        30,
        40,
        50,
        60
      ]
    }
  },
  "A0K5": {
    "rawcode": "A0K5",
    "name": "Ураган",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1200,
          8,
          12,
          16,
          20
        ],
        "statScale": {
          "stat": "INT",
          "mult": 4
        }
      }
    ],
    "cool": [
      140
    ],
    "area": 20075
  },
  "A0JT": {
    "rawcode": "A0JT",
    "name": "Ветер",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          70
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.7
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ]
  },
  "arbiter_1": {
    "rawcode": "arbiter_1",
    "name": "???",
    "hotkey": "Q",
    "type": "active"
  },
  "arbiter_2": {
    "rawcode": "arbiter_2",
    "name": "???",
    "hotkey": "W",
    "type": "active"
  },
  "arbiter_3": {
    "rawcode": "arbiter_3",
    "name": "???",
    "hotkey": "E",
    "type": "active"
  },
  "arbiter_4": {
    "rawcode": "arbiter_4",
    "name": "???",
    "hotkey": "R",
    "type": "ultimate"
  },
  "arbiter_5": {
    "rawcode": "arbiter_5",
    "name": "???",
    "hotkey": "F",
    "type": "passive"
  },
  "A0UW": {
    "rawcode": "A0UW",
    "name": "Магический шар",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400,
          500,
          600
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      10
    ]
  },
  "A0G4": {
    "rawcode": "A0G4",
    "name": "Ледяная стрела",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400,
          500,
          600
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      15
    ]
  },
  "A0VD": {
    "rawcode": "A0VD",
    "name": "Телекинез",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          350,
          450,
          550,
          650
        ],
        "statScale": {
          "stat": "INT",
          "mult": 4
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1
        ],
        "weight": 1
      }
    ],
    "cool": [
      25
    ]
  },
  "A0G5": {
    "rawcode": "A0G5",
    "name": "Огненная земля",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          600,
          2,
          3,
          4,
          5
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1
        },
        "isDOT": true
      }
    ],
    "cool": [
      90
    ],
    "area": 550
  },
  "A0G6": {
    "rawcode": "A0G6",
    "name": "Огненная вспышка",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          475
        ]
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.25
        ],
        "weight": 1
      }
    ],
    "cool": [
      10
    ],
    "dash": {
      "dashRange": [
        850
      ]
    }
  },
  "A15K": {
    "rawcode": "A15K",
    "name": "Тёмный дождь",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          200,
          250,
          300,
          350
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.5
        },
        "hitCount": [
          5,
          8,
          11,
          14,
          17
        ]
      }
    ],
    "cool": [
      15
    ],
    "area": 300,
    "dash": {
      "dashRange": [
        700
      ]
    }
  },
  "A137": {
    "rawcode": "A137",
    "name": "Иллюзорный скачок",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          350,
          450,
          550,
          700
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.5
        }
      }
    ],
    "cool": [
      14
    ],
    "dash": {
      "dashRange": [
        1500
      ]
    }
  },
  "A131": {
    "rawcode": "A131",
    "name": "Дух Зеры",
    "hotkey": "E",
    "type": "passive",
    "damage": [
      {
        "base": [
          50
        ]
      }
    ]
  },
  "A12I": {
    "rawcode": "A12I",
    "name": "Нагината",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          2,
          4,
          6,
          8,
          10
        ]
      }
    ],
    "cool": [
      90
    ],
    "area": 175,
    "buffs": {
      "atkSpeed": [
        90,
        120,
        150,
        180,
        210
      ]
    }
  },
  "A133": {
    "rawcode": "A133",
    "name": "Призрачность",
    "hotkey": "F",
    "type": "active",
    "cool": [
      30,
      26,
      22
    ],
    "buffs": {
      "evasion": [
        50
      ]
    }
  },
  "A0F4": {
    "rawcode": "A0F4",
    "name": "Астральная вспышка",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          450,
          550,
          650,
          750
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 450
  },
  "A0GH": {
    "rawcode": "A0GH",
    "name": "Астральная мощь",
    "hotkey": "W",
    "type": "passive",
    "damage": [
      {
        "base": [
          150,
          225,
          300,
          375,
          450
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.8
        }
      }
    ],
    "buffs": {
      "evasion": [
        10,
        15,
        20,
        25,
        30
      ]
    }
  },
  "A0F5": {
    "rawcode": "A0F5",
    "name": "Астральный удар",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          15
        ]
      },
      {
        "base": [
          200,
          300,
          400,
          500,
          600,
          2,
          3,
          4,
          5
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2
        ],
        "weight": 1
      }
    ],
    "cool": [
      20
    ]
  },
  "A16Q": {
    "rawcode": "A16Q",
    "name": "Астральная Сфера",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          120,
          240,
          360,
          480,
          600,
          3,
          3.5,
          4,
          4.5
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2.5
        }
      }
    ],
    "cool": [
      140
    ],
    "area": 450
  },
  "A0F2": {
    "rawcode": "A0F2",
    "name": "Телепортация",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          200
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 250
  },
  "A1AG": {
    "rawcode": "A1AG",
    "name": "Паралич",
    "hotkey": "Q",
    "type": "active",
    "cool": [
      15
    ],
    "area": 700
  },
  "A1AI": {
    "rawcode": "A1AI",
    "name": "Астральная стрела",
    "hotkey": "W",
    "type": "active",
    "cool": [
      20
    ],
    "dash": {
      "dashRange": [
        1100,
        1250,
        1400,
        1550,
        1700
      ]
    }
  },
  "A1AE": {
    "rawcode": "A1AE",
    "name": "Астральный разрыв",
    "hotkey": "E",
    "type": "active",
    "cool": [
      24
    ],
    "area": 250
  },
  "A1AK": {
    "rawcode": "A1AK",
    "name": "Астральная охота",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      12
    ]
  },
  "A1AM": {
    "rawcode": "A1AM",
    "name": "Поиск жертвы",
    "hotkey": "F",
    "type": "active",
    "cool": [
      25,
      22.5,
      20
    ]
  },
  "A0MI": {
    "rawcode": "A0MI",
    "name": "Астральный бросок",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400,
          500,
          600
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      14
    ],
    "area": 500
  },
  "A0ME": {
    "rawcode": "A0ME",
    "name": "Астральная молния",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          200,
          300,
          400,
          500
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.7
        ],
        "weight": 1
      }
    ],
    "cool": [
      20
    ],
    "area": 500
  },
  "A0MB": {
    "rawcode": "A0MB",
    "name": "Астральная сфера",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          500,
          650,
          800,
          950,
          1100
        ],
        "statScale": {
          "stat": "INT",
          "mult": 5
        }
      }
    ],
    "cool": [
      30
    ],
    "area": 725
  },
  "A0Q6": {
    "rawcode": "A0Q6",
    "name": "Астральный шторм",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          900,
          1350,
          1800,
          2250,
          2700,
          8,
          11,
          14,
          17
        ],
        "statScale": {
          "stat": "INT",
          "mult": 5
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          3
        ],
        "weight": 1
      }
    ],
    "cool": [
      100
    ],
    "area": 1600
  },
  "A0MF": {
    "rawcode": "A0MF",
    "name": "Астральное Возмездие",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          100,
          200,
          25
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.2
        }
      }
    ]
  },
  "blademaster_1": {
    "rawcode": "blademaster_1",
    "name": "Вихрь",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          50,
          70,
          90,
          110,
          130
        ]
      }
    ],
    "cool": [
      15,
      13,
      11,
      9,
      7
    ]
  },
  "blademaster_2": {
    "rawcode": "blademaster_2",
    "name": "Зеркальное отражение",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          30,
          40,
          50,
          60,
          70
        ]
      }
    ],
    "cool": [
      25,
      22,
      19,
      16,
      13
    ]
  },
  "blademaster_3": {
    "rawcode": "blademaster_3",
    "name": "Критический удар",
    "hotkey": "E",
    "type": "passive"
  },
  "blademaster_4": {
    "rawcode": "blademaster_4",
    "name": "Танец клинков",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          75,
          95,
          115,
          135,
          155
        ],
        "isDOT": true
      }
    ],
    "cool": [
      120,
      110,
      100,
      90,
      80
    ]
  },
  "A0EJ": {
    "rawcode": "A0EJ",
    "name": "Магнитный удар",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          450,
          600,
          750,
          900
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2
        ],
        "weight": 1
      },
      {
        "type": "knockback",
        "duration": [
          0.3
        ],
        "weight": 0.3
      }
    ],
    "cool": [
      8
    ],
    "dash": {
      "dashRange": [
        600
      ]
    }
  },
  "A0BU": {
    "rawcode": "A0BU",
    "name": "Сокрушение",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          275,
          450,
          650,
          800,
          975
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2
        ],
        "weight": 1
      }
    ],
    "cool": [
      15
    ],
    "area": 450
  },
  "A0ES": {
    "rawcode": "A0ES",
    "name": "Магическая волна",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          400,
          500,
          600,
          700,
          3.5,
          4,
          4.5,
          5
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.2
        ],
        "weight": 1
      }
    ],
    "cool": [
      20
    ],
    "area": 350
  },
  "A179": {
    "rawcode": "A179",
    "name": "Фатальный удар",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1000,
          10,
          15,
          20,
          25
        ]
      },
      {
        "base": [
          50
        ]
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          3
        ],
        "weight": 1
      }
    ],
    "cool": [
      100
    ],
    "area": 200
  },
  "A0EP": {
    "rawcode": "A0EP",
    "name": "Перелом",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          175
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.6
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.8
        ],
        "weight": 1
      }
    ]
  },
  "A01A": {
    "rawcode": "A01A",
    "name": "Огненное дыхание",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          400,
          550,
          700,
          850
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3
        }
      },
      {
        "base": [
          80,
          110,
          140,
          170,
          200
        ],
        "isDOT": true
      }
    ],
    "cool": [
      10
    ],
    "area": 150400
  },
  "A1AA": {
    "rawcode": "A1AA",
    "name": "Бочонок с пивом",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          200,
          300,
          400,
          500
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1
        }
      }
    ],
    "cool": [
      20
    ],
    "area": 300,
    "dash": {
      "dashRange": [
        1000
      ]
    }
  },
  "A12E": {
    "rawcode": "A12E",
    "name": "Прыжок",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          325,
          450,
          575,
          700,
          825
        ],
        "statScale": {
          "stat": "STR",
          "mult": 4
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2
        ],
        "weight": 1
      }
    ],
    "cool": [
      25
    ],
    "area": 400,
    "dash": {
      "dashRange": [
        1500
      ]
    }
  },
  "A0KK": {
    "rawcode": "A0KK",
    "name": "Огненные легкие",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          200,
          300,
          400,
          500,
          600,
          2,
          2.5,
          3,
          3.5
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1.5
        },
        "hitCount": [
          5
        ]
      }
    ],
    "cool": [
      100
    ]
  },
  "A01O": {
    "rawcode": "A01O",
    "name": "Пьяный мастер",
    "hotkey": "F",
    "type": "passive",
    "buffs": {
      "evasion": [
        15
      ]
    }
  },
  "A0H7": {
    "rawcode": "A0H7",
    "name": "Ярость",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          25,
          50,
          75,
          100,
          125
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.8
        }
      }
    ],
    "cool": [
      16
    ],
    "area": 250,
    "buffs": {
      "atkSpeed": [
        20,
        30,
        40,
        50,
        60
      ]
    }
  },
  "A05C": {
    "rawcode": "A05C",
    "name": "Вампиризм",
    "hotkey": "W",
    "type": "passive",
    "heal": [
      {
        "base": [
          15,
          20,
          25,
          30,
          35
        ],
        "isPct": true
      }
    ],
    "area": 600
  },
  "A15S": {
    "rawcode": "A15S",
    "name": "Мясной крюк",
    "hotkey": "E",
    "type": "active",
    "cool": [
      26,
      24,
      22,
      20,
      18
    ]
  },
  "A0V2": {
    "rawcode": "A0V2",
    "name": "Москиты",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.2
        }
      }
    ],
    "heal": [
      {
        "base": [
          20
        ],
        "isPct": true
      }
    ],
    "cool": [
      120
    ],
    "area": 2000
  },
  "A00N": {
    "rawcode": "A00N",
    "name": "Крюки",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          300
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1.5
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 350
  },
  "A0QF": {
    "rawcode": "A0QF",
    "name": "Темная стая",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          550,
          600,
          750,
          900
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3
        }
      }
    ],
    "cool": [
      13
    ]
  },
  "A04N": {
    "rawcode": "A04N",
    "name": "Энергетический удар",
    "hotkey": "W",
    "type": "active",
    "cool": [
      18
    ],
    "dash": {
      "dashRange": [
        900
      ]
    }
  },
  "A16R": {
    "rawcode": "A16R",
    "name": "Каменный дождь",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          200,
          300,
          400,
          500
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.5
        },
        "hitCount": [
          8,
          10,
          12,
          14,
          16
        ]
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.6
        ],
        "weight": 1
      }
    ],
    "cool": [
      25
    ],
    "area": 500
  },
  "A04X": {
    "rawcode": "A04X",
    "name": "Ярость",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      100
    ],
    "buffs": {
      "hp": [
        1000
      ],
      "hpRegen": [
        50
      ]
    }
  },
  "A04R": {
    "rawcode": "A04R",
    "name": "Боевое Превосходство",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          100
        ]
      }
    ],
    "area": 900
  },
  "A0UI": {
    "rawcode": "A0UI",
    "name": "Мистический разряд",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          320,
          480,
          640,
          800,
          960,
          2.5,
          3,
          3.5,
          4
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        },
        "hitCount": [
          20
        ]
      }
    ],
    "cool": [
      16,
      15,
      14,
      13,
      12
    ]
  },
  "A0UE": {
    "rawcode": "A0UE",
    "name": "Аура Сопротивления",
    "hotkey": "W",
    "type": "active",
    "area": 900,
    "buffs": {
      "magicResist": [
        7,
        14,
        21,
        28,
        35
      ],
      "manaRegenPct": [
        4,
        6,
        8,
        10,
        12
      ]
    }
  },
  "A0UF": {
    "rawcode": "A0UF",
    "name": "Кровавая кара",
    "hotkey": "E",
    "type": "active",
    "cool": [
      25
    ],
    "area": 300
  },
  "A0UG": {
    "rawcode": "A0UG",
    "name": "Молнии Раздора",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1000
        ],
        "statScale": {
          "stat": "INT",
          "mult": 5
        }
      }
    ],
    "cool": [
      80
    ],
    "area": 700
  },
  "A0VB": {
    "rawcode": "A0VB",
    "name": "Телекинез",
    "hotkey": "F",
    "type": "active",
    "cool": [
      14
    ]
  },
  "A0KJ": {
    "rawcode": "A0KJ",
    "name": "Взрывные снаряды",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          50,
          100,
          150,
          200,
          250
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      15
    ]
  },
  "A00T": {
    "rawcode": "A00T",
    "name": "Техника",
    "hotkey": "W",
    "type": "passive"
  },
  "A00F": {
    "rawcode": "A00F",
    "name": "Чакрам",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400,
          500,
          600
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cool": [
      15
    ]
  },
  "A0EZ": {
    "rawcode": "A0EZ",
    "name": "Ракетный залп",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1500,
          8,
          12,
          16,
          20
        ]
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      100
    ],
    "area": 450
  },
  "A08E": {
    "rawcode": "A08E",
    "name": "Мины",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          50
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 200
  },
  "A0NZ": {
    "rawcode": "A0NZ",
    "name": "Черная стрела",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          350,
          450,
          550,
          650
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1
        ],
        "weight": 1
      }
    ],
    "cool": [
      13
    ],
    "area": 250
  },
  "A0C4": {
    "rawcode": "A0C4",
    "name": "Зачарованные стрелы",
    "hotkey": "W",
    "type": "passive",
    "damage": [
      {
        "base": [
          75,
          150,
          225,
          300,
          375,
          1.1,
          1.4,
          1.7,
          2
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.8
        }
      }
    ],
    "cool": [
      0.34
    ]
  },
  "A197": {
    "rawcode": "A197",
    "name": "Стрелы души",
    "hotkey": "E",
    "type": "active",
    "cool": [
      25
    ],
    "area": 250
  },
  "A0IK": {
    "rawcode": "A0IK",
    "name": "Падение стрелы",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cool": [
      100
    ],
    "area": 550
  },
  "A0C0": {
    "rawcode": "A0C0",
    "name": "Уклонение",
    "hotkey": "F",
    "type": "passive",
    "buffs": {
      "evasion": [
        15
      ]
    }
  },
  "A0DY": {
    "rawcode": "A0DY",
    "name": "Темные силы",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          140,
          180,
          220,
          260,
          300
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.7
        }
      }
    ],
    "cool": [
      16
    ]
  },
  "A02C": {
    "rawcode": "A02C",
    "name": "Удар тьмы",
    "hotkey": "W",
    "type": "passive",
    "damage": [
      {
        "base": [
          75,
          150,
          225,
          300,
          375
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.2
        }
      }
    ]
  },
  "A02D": {
    "rawcode": "A02D",
    "name": "Поток тьмы",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          450,
          600,
          750,
          900
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 4
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 475
  },
  "A0HV": {
    "rawcode": "A0HV",
    "name": "Мастерство",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      100
    ],
    "area": 450,
    "buffs": {
      "agi": [
        15,
        30,
        45,
        60,
        75
      ]
    }
  },
  "A02B": {
    "rawcode": "A02B",
    "name": "Сожжение маны",
    "hotkey": "F",
    "type": "passive"
  },
  "A03V": {
    "rawcode": "A03V",
    "name": "Тёмный выстрел",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 300
  },
  "A19L": {
    "rawcode": "A19L",
    "name": "Давление тьмы",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          350,
          500,
          650,
          800
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      20
    ],
    "area": 600
  },
  "A05Q": {
    "rawcode": "A05Q",
    "name": "Пульс тьмы",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          350,
          500,
          650,
          800
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.5
        ],
        "weight": 1
      },
      {
        "type": "knockback",
        "duration": [
          0.3
        ],
        "weight": 0.3
      }
    ],
    "cool": [
      20
    ]
  },
  "A05S": {
    "rawcode": "A05S",
    "name": "Пришествие Тьмы",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cool": [
      90
    ],
    "area": 450
  },
  "A05R": {
    "rawcode": "A05R",
    "name": "Всплеск тьмы",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          150
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          3
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      10
    ],
    "area": 350
  },
  "A0AX": {
    "rawcode": "A0AX",
    "name": "Всплеск смерти",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          350,
          550,
          750,
          950,
          1150
        ]
      }
    ],
    "cool": [
      10
    ],
    "area": 700
  },
  "A0FK": {
    "rawcode": "A0FK",
    "name": "Сфера смерти",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          50,
          0.7,
          0.9,
          1.1,
          1.3
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.5
        },
        "isDOT": true
      }
    ],
    "cool": [
      18
    ]
  },
  "A0SH": {
    "rawcode": "A0SH",
    "name": "Столб смерти",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750,
          2.5,
          3,
          3.5,
          4
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cool": [
      25
    ]
  },
  "A0QR": {
    "rawcode": "A0QR",
    "name": "Тёмная энергия",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3.5
        }
      }
    ],
    "cool": [
      90
    ],
    "area": 1500
  },
  "A0FN": {
    "rawcode": "A0FN",
    "name": "Зов магии",
    "hotkey": "F",
    "type": "passive",
    "area": 700,
    "buffs": {
      "manaRegenPct": [
        2,
        3,
        4
      ]
    }
  },
  "A0W4": {
    "rawcode": "A0W4",
    "name": "Чародейская стрела",
    "hotkey": "Q",
    "type": "passive",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cool": [
      10
    ]
  },
  "A0WB": {
    "rawcode": "A0WB",
    "name": "Магический обстрел",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          60,
          70,
          80,
          90,
          100
        ]
      }
    ],
    "cool": [
      25
    ]
  },
  "A0W8": {
    "rawcode": "A0W8",
    "name": "Стихийный Удар",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          2000,
          10,
          12,
          14,
          16
        ],
        "statScale": {
          "stat": "INT",
          "mult": 8
        }
      }
    ],
    "cc": [
      {
        "type": "silence",
        "duration": [
          2
        ],
        "weight": 0.8
      }
    ],
    "cool": [
      80
    ],
    "area": 925
  },
  "A0W7": {
    "rawcode": "A0W7",
    "name": "Сменить стрелу",
    "hotkey": "F",
    "type": "active",
    "cool": [
      2
    ]
  },
  "A0HG": {
    "rawcode": "A0HG",
    "name": "Перст боли",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          450,
          600,
          750,
          900
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      10
    ]
  },
  "A0HB": {
    "rawcode": "A0HB",
    "name": "Массовая немота",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          350,
          500,
          650,
          800
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3.5
        }
      }
    ],
    "cc": [
      {
        "type": "silence",
        "duration": [
          1.5,
          1.75,
          2,
          2.25,
          2.5
        ],
        "weight": 0.8
      }
    ],
    "cool": [
      20
    ],
    "area": 400
  },
  "A0HA": {
    "rawcode": "A0HA",
    "name": "Высасывание жизни",
    "hotkey": "E",
    "type": "active",
    "cool": [
      30,
      29,
      28,
      27,
      26
    ]
  },
  "A0H9": {
    "rawcode": "A0H9",
    "name": "Столб боли",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          500,
          12,
          15,
          18,
          21
        ],
        "statScale": {
          "stat": "INT",
          "mult": 9
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      120
    ],
    "area": 900
  },
  "A0HC": {
    "rawcode": "A0HC",
    "name": "Рывок",
    "hotkey": "F",
    "type": "active",
    "cool": [
      15
    ],
    "dash": {
      "dashRange": [
        900,
        1100,
        1300
      ]
    }
  },
  "A0S9": {
    "rawcode": "A0S9",
    "name": "Удар морского воина",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          375,
          500,
          625,
          750
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1.5
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1
        ],
        "weight": 1
      }
    ],
    "cool": [
      12
    ]
  },
  "A0SE": {
    "rawcode": "A0SE",
    "name": "Толчок хвостом",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          150,
          200,
          250,
          300
        ]
      }
    ],
    "cool": [
      20
    ],
    "buffs": {
      "moveSpeed": [
        50
      ]
    }
  },
  "A0SB": {
    "rawcode": "A0SB",
    "name": "Девятый вал",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          600,
          1200,
          1800,
          2400,
          3000
        ]
      }
    ],
    "cool": [
      110
    ],
    "area": 550
  },
  "A0SC": {
    "rawcode": "A0SC",
    "name": "Сила обитателей глубины",
    "hotkey": "F",
    "type": "passive",
    "buffs": {
      "evasion": [
        15
      ]
    }
  },
  "A0MQ": {
    "rawcode": "A0MQ",
    "name": "Адский крик",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cool": [
      16
    ],
    "area": 450
  },
  "A0MT": {
    "rawcode": "A0MT",
    "name": "Разгон",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          125,
          250,
          375,
          500,
          625
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      20
    ],
    "area": 400
  },
  "A0MR": {
    "rawcode": "A0MR",
    "name": "Демонические атаки",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          120,
          240,
          360,
          480,
          600
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        },
        "hitCount": [
          5
        ]
      }
    ],
    "cool": [
      30,
      29,
      28,
      27,
      26
    ],
    "area": 550
  },
  "A0MS": {
    "rawcode": "A0MS",
    "name": "Танец клинков",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      130,
      120,
      110,
      100,
      90
    ],
    "area": 750
  },
  "A0M4": {
    "rawcode": "A0M4",
    "name": "Линия ярости",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          200
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.25
        ],
        "weight": 1
      }
    ],
    "area": 200
  },
  "A05F": {
    "rawcode": "A05F",
    "name": "Магический круг",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          250,
          350,
          450,
          550
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      16
    ],
    "area": 400
  },
  "A05K": {
    "rawcode": "A05K",
    "name": "Огненный дождь",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          80,
          140,
          200,
          260,
          320
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.8
        },
        "hitCount": [
          5,
          7,
          9,
          11,
          13
        ]
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.2
        ],
        "weight": 1
      }
    ],
    "cool": [
      20
    ],
    "area": 300
  },
  "A05L": {
    "rawcode": "A05L",
    "name": "Агония",
    "hotkey": "E",
    "type": "active",
    "cool": [
      30
    ],
    "area": 750
  },
  "A05I": {
    "rawcode": "A05I",
    "name": "Колья",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1500,
          9,
          11,
          13,
          15
        ],
        "statScale": {
          "stat": "STR",
          "mult": 7
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      100
    ],
    "area": 750
  },
  "A05J": {
    "rawcode": "A05J",
    "name": "Демоническая сила",
    "hotkey": "F",
    "type": "passive",
    "area": 300
  },
  "A0XU": {
    "rawcode": "A0XU",
    "name": "Звериный рев",
    "hotkey": "Q",
    "type": "active",
    "cool": [
      15
    ],
    "area": 400
  },
  "A0A0": {
    "rawcode": "A0A0",
    "name": "Вороны",
    "hotkey": "W",
    "type": "active",
    "cool": [
      25
    ],
    "area": 1000
  },
  "A00W": {
    "rawcode": "A00W",
    "name": "Омоложение",
    "hotkey": "E",
    "type": "active",
    "cool": [
      20
    ],
    "buffs": {
      "hpRegenPct": [
        2,
        3,
        4,
        5,
        6
      ],
      "manaRegenPct": [
        3,
        4,
        5,
        6,
        7
      ]
    }
  },
  "A0J5": {
    "rawcode": "A0J5",
    "name": "Покой",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.4
        }
      }
    ],
    "cool": [
      105
    ],
    "area": 700
  },
  "A00Z": {
    "rawcode": "A00Z",
    "name": "Кровожадность",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          150
        ]
      }
    ],
    "cool": [
      14
    ],
    "area": 300,
    "buffs": {
      "atkSpeed": [
        35
      ],
      "moveSpeed": [
        15
      ]
    }
  },
  "A122": {
    "rawcode": "A122",
    "name": "Всплеск тьмы",
    "hotkey": "Q",
    "type": "passive",
    "damage": [
      {
        "base": [
          170,
          340,
          510,
          680,
          850
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cool": [
      10,
      10,
      10,
      20
    ],
    "area": 350
  },
  "A11Q": {
    "rawcode": "A11Q",
    "name": "Тёмная аура",
    "hotkey": "W",
    "type": "active",
    "area": 1200
  },
  "A12B": {
    "rawcode": "A12B",
    "name": "Высвобождение Душ",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.4
        },
        "hitCount": [
          20
        ]
      }
    ],
    "cool": [
      30,
      29,
      28,
      27,
      26
    ]
  },
  "A0WK": {
    "rawcode": "A0WK",
    "name": "Путь тьмы",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 4
        }
      }
    ],
    "cool": [
      120
    ],
    "area": 450
  },
  "A0I4": {
    "rawcode": "A0I4",
    "name": "Сменить всплеск тьмы",
    "hotkey": "F",
    "type": "active",
    "cool": [
      1
    ]
  },
  "A0ZG": {
    "rawcode": "A0ZG",
    "name": "Всплеск огня",
    "hotkey": "Q",
    "type": "active",
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      10
    ],
    "area": 425
  },
  "A01M": {
    "rawcode": "A01M",
    "name": "Метеорный удар",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          4,
          5,
          6,
          7
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3
        }
      },
      {
        "base": [
          60,
          120,
          180,
          240,
          300
        ],
        "isDOT": true
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2
        ],
        "weight": 1
      }
    ],
    "cool": [
      30
    ],
    "area": 475
  },
  "A0SK": {
    "rawcode": "A0SK",
    "name": "Живой огонь",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          400,
          550,
          700,
          850
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3.5
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 900
  },
  "A01P": {
    "rawcode": "A01P",
    "name": "Огненный доспех",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      80
    ],
    "buffs": {
      "hp": [
        500,
        1000,
        1500,
        2000,
        2500
      ],
      "armor": [
        20,
        30,
        40,
        50,
        60
      ]
    }
  },
  "A01L": {
    "rawcode": "A01L",
    "name": "Осколки метеорита",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          20
        ]
      }
    ]
  },
  "A0O3": {
    "rawcode": "A0O3",
    "name": "Пекло",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          400,
          550,
          700,
          850
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1.5
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 450
  },
  "A0FA": {
    "rawcode": "A0FA",
    "name": "Огненный круг",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          475,
          650,
          825,
          1000
        ]
      },
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1
        },
        "isDOT": true
      },
      {
        "base": [
          3
        ],
        "isDOT": true
      }
    ],
    "cc": [
      {
        "type": "silence",
        "duration": [
          2
        ],
        "weight": 0.8
      }
    ],
    "cool": [
      20
    ],
    "area": 500
  },
  "A0F9": {
    "rawcode": "A0F9",
    "name": "Взрывная волна",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "STR",
          "mult": 5
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 300
  },
  "A0FB": {
    "rawcode": "A0FB",
    "name": "Метеорит",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1000,
          10,
          15,
          20,
          25
        ],
        "statScale": {
          "stat": "STR",
          "mult": 5
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2
        ],
        "weight": 1
      }
    ],
    "cool": [
      100
    ],
    "area": 750
  },
  "A0FC": {
    "rawcode": "A0FC",
    "name": "Огненная Броня",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          10
        ],
        "isDOT": true
      },
      {
        "base": [
          200
        ],
        "isDOT": true
      }
    ],
    "cool": [
      18,
      17,
      16
    ],
    "area": 300,
    "buffs": {
      "armor": [
        12
      ]
    }
  },
  "A0EE": {
    "rawcode": "A0EE",
    "name": "Огненный поток",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          150,
          200,
          250,
          300
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1
        }
      }
    ],
    "cool": [
      15
    ]
  },
  "A00Y": {
    "rawcode": "A00Y",
    "name": "Метеоритный дождь",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          120,
          140,
          160,
          180,
          200,
          0.7,
          0.8,
          0.9,
          1
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.6
        },
        "hitCount": [
          8
        ]
      }
    ],
    "cool": [
      20
    ],
    "area": 450
  },
  "A0H6": {
    "rawcode": "A0H6",
    "name": "Вулканический удар",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          400,
          550,
          700,
          850,
          2,
          2.5,
          3,
          3.5
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.5
        }
      }
    ],
    "cool": [
      20
    ],
    "area": 300
  },
  "A0E5": {
    "rawcode": "A0E5",
    "name": "Вулкан",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          100,
          200,
          300,
          400,
          500,
          1.5,
          2,
          2.5,
          3
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1
        }
      },
      {
        "base": [
          10
        ],
        "isDOT": true
      }
    ],
    "cool": [
      120
    ],
    "area": 650
  },
  "A14S": {
    "rawcode": "A14S",
    "name": "Бросок молота",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          400
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.7
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      10,
      15,
      15
    ],
    "area": 350
  },
  "A047": {
    "rawcode": "A047",
    "name": "Огненный щит",
    "hotkey": "Q",
    "type": "passive",
    "damage": [
      {
        "base": [
          30,
          60,
          90,
          120,
          150,
          2,
          2.5,
          3,
          3.5
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.5
        },
        "isDOT": true
      }
    ],
    "area": 200
  },
  "A14R": {
    "rawcode": "A14R",
    "name": "Сфера пламени",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          350,
          400,
          450,
          500
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      },
      {
        "base": [
          50,
          100,
          150,
          200,
          250
        ]
      }
    ],
    "cool": [
      18
    ],
    "area": 150
  },
  "A14I": {
    "rawcode": "A14I",
    "name": "Мастерство огня",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          50,
          100,
          150,
          200,
          250
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      28
    ],
    "area": 150
  },
  "A14P": {
    "rawcode": "A14P",
    "name": "Огненный танец",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      130
    ]
  },
  "A14G": {
    "rawcode": "A14G",
    "name": "Огненное сердце",
    "hotkey": "F",
    "type": "active",
    "cool": [
      25,
      23,
      21
    ],
    "buffs": {
      "spellDmgPct": [
        25,
        35,
        45
      ]
    }
  },
  "A0OW": {
    "rawcode": "A0OW",
    "name": "Пылающая дорога",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          70,
          140,
          210,
          280,
          350
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.8
        },
        "isDOT": true
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      19
    ],
    "area": 200
  },
  "A09B": {
    "rawcode": "A09B",
    "name": "Пламенная агрессия",
    "hotkey": "W",
    "type": "passive",
    "area": 100
  },
  "A09G": {
    "rawcode": "A09G",
    "name": "Огненный гейзер",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          200,
          300,
          400,
          500
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        },
        "isDOT": true
      }
    ],
    "cool": [
      20
    ],
    "area": 250
  },
  "A09E": {
    "rawcode": "A09E",
    "name": "Пламенное усиление",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      90
    ],
    "buffs": {
      "hp": [
        1000
      ]
    }
  },
  "A0B6": {
    "rawcode": "A0B6",
    "name": "Путь огня",
    "hotkey": "F",
    "type": "active",
    "cool": [
      18
    ]
  },
  "A0VJ": {
    "rawcode": "A0VJ",
    "name": "Огненная буря",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          375,
          500,
          625,
          750
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 350
  },
  "A146": {
    "rawcode": "A146",
    "name": "Огненная кара",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          75,
          150,
          225,
          300,
          375
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.5
        },
        "hitCount": [
          4,
          6,
          8,
          10,
          12
        ]
      }
    ],
    "cool": [
      20
    ]
  },
  "A0VM": {
    "rawcode": "A0VM",
    "name": "Зов Пламени",
    "hotkey": "E",
    "type": "active",
    "cool": [
      30
    ]
  },
  "A0VK": {
    "rawcode": "A0VK",
    "name": "Огненная тропа",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "INT",
          "mult": 4
        }
      }
    ],
    "cool": [
      100
    ],
    "area": 450
  },
  "A0VQ": {
    "rawcode": "A0VQ",
    "name": "Огненный диск",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          120
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.6
        }
      }
    ],
    "cool": [
      20
    ],
    "area": 250
  },
  "A011": {
    "rawcode": "A011",
    "name": "Оледенение",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          350,
          450,
          550,
          650
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "freeze",
        "duration": [
          2
        ],
        "weight": 1
      }
    ],
    "cool": [
      10
    ],
    "area": 800
  },
  "A012": {
    "rawcode": "A012",
    "name": "Ледяной Щит",
    "hotkey": "W",
    "type": "active",
    "heal": [
      {
        "base": [
          1
        ],
        "isPct": true
      }
    ],
    "cool": [
      16
    ],
    "area": 300,
    "buffs": {
      "armor": [
        4,
        8,
        12,
        16,
        20
      ]
    }
  },
  "A12G": {
    "rawcode": "A12G",
    "name": "Ледяной шар",
    "hotkey": "E",
    "type": "active",
    "cc": [
      {
        "type": "slow",
        "duration": [
          4
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      30
    ]
  },
  "A0L5": {
    "rawcode": "A0L5",
    "name": "Ледниковый Период",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          400,
          500,
          600,
          700,
          800
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cool": [
      80
    ],
    "area": 500
  },
  "A015": {
    "rawcode": "A015",
    "name": "Сила Проклятых",
    "hotkey": "F",
    "type": "passive",
    "buffs": {
      "magicResist": [
        20
      ]
    }
  },
  "A06X": {
    "rawcode": "A06X",
    "name": "Обмен",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cool": [
      10
    ]
  },
  "A19X": {
    "rawcode": "A19X",
    "name": "Ускорение",
    "hotkey": "W",
    "type": "active",
    "cool": [
      20
    ],
    "buffs": {
      "moveSpeed": [
        20,
        30,
        40,
        50,
        60
      ],
      "evasion": [
        15,
        20,
        25,
        30,
        35
      ]
    }
  },
  "A06V": {
    "rawcode": "A06V",
    "name": "Кара",
    "hotkey": "E",
    "type": "passive",
    "damage": [
      {
        "base": [
          75,
          150,
          225,
          300,
          375,
          2.25,
          2.5,
          2.75,
          3
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "area": 300
  },
  "A161": {
    "rawcode": "A161",
    "name": "Призрачный удар",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          300,
          400,
          500,
          600,
          700
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        },
        "hitCount": [
          5,
          7,
          9,
          11,
          13
        ]
      }
    ],
    "cool": [
      40
    ],
    "area": 450
  },
  "A162": {
    "rawcode": "A162",
    "name": "Призрачный Щит",
    "hotkey": "F",
    "type": "active",
    "cool": [
      19,
      17,
      15
    ],
    "buffs": {
      "armor": [
        8
      ]
    }
  },
  "A0T7": {
    "rawcode": "A0T7",
    "name": "Пронзающая Смерть",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          240,
          380,
          520,
          660,
          800
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1
        ],
        "weight": 1
      }
    ],
    "cool": [
      14
    ]
  },
  "A0T2": {
    "rawcode": "A0T2",
    "name": "Панцирь с шипами",
    "hotkey": "W",
    "type": "passive",
    "buffs": {
      "armor": [
        3,
        6,
        9,
        12,
        15
      ]
    }
  },
  "A0T6": {
    "rawcode": "A0T6",
    "name": "Подкоп",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          360,
          520,
          680,
          840,
          1000
        ],
        "statScale": {
          "stat": "STR",
          "mult": 4
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      25
    ],
    "area": 400
  },
  "A00B": {
    "rawcode": "A00B",
    "name": "Землетрясение",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1250,
          10,
          15,
          20,
          25
        ],
        "statScale": {
          "stat": "STR",
          "mult": 5
        }
      }
    ],
    "cool": [
      100
    ]
  },
  "A0V1": {
    "rawcode": "A0V1",
    "name": "Мощь древних",
    "hotkey": "F",
    "type": "passive"
  },
  "A0N4": {
    "rawcode": "A0N4",
    "name": "Сюрикен",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cool": [
      15,
      14,
      13,
      12,
      11
    ],
    "area": 1600
  },
  "A0N2": {
    "rawcode": "A0N2",
    "name": "Удар в прыжке",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          450,
          600,
          750,
          900,
          1.6,
          2.4,
          3.2,
          4
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.8
        }
      }
    ],
    "cool": [
      20
    ],
    "area": 400,
    "buffs": {
      "evasion": [
        100
      ]
    }
  },
  "A0N1": {
    "rawcode": "A0N1",
    "name": "Смертоносные удары",
    "hotkey": "E",
    "type": "passive",
    "damage": [
      {
        "base": [
          75,
          150,
          225,
          300,
          375,
          0.6,
          0.9,
          1.2,
          1.5
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.3
        }
      }
    ],
    "cool": [
      7,
      6,
      5,
      4,
      3
    ]
  },
  "A0N3": {
    "rawcode": "A0N3",
    "name": "Сюрикен смерти",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      80
    ],
    "area": 450
  },
  "A0PP": {
    "rawcode": "A0PP",
    "name": "Смертоносный кинжал",
    "hotkey": "F",
    "type": "active",
    "cool": [
      13
    ],
    "dash": {
      "dashRange": [
        1200
      ]
    }
  },
  "hell-gatekeeper_1": {
    "rawcode": "hell-gatekeeper_1",
    "name": "Огненный шар",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 450,
    "dash": {
      "dashRange": [
        900,
        1000,
        1100,
        1200,
        1300
      ]
    }
  },
  "hell-gatekeeper_2": {
    "rawcode": "hell-gatekeeper_2",
    "name": "Рывок огня",
    "hotkey": "W",
    "type": "active",
    "cool": [
      25
    ]
  },
  "hell-gatekeeper_3": {
    "rawcode": "hell-gatekeeper_3",
    "name": "Хаотическая форма",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          100
        ]
      }
    ],
    "cool": [
      33
    ],
    "buffs": {
      "armor": [
        10
      ],
      "moveSpeedFlat": [
        100
      ],
      "hp": [
        800
      ],
      "hpRegen": [
        20
      ],
      "spellDmgPct": [
        15
      ]
    }
  },
  "hell-gatekeeper_4": {
    "rawcode": "hell-gatekeeper_4",
    "name": "Огненный Рев",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      130
    ],
    "area": 425100
  },
  "hell-gatekeeper_5": {
    "rawcode": "hell-gatekeeper_5",
    "name": "Огненный меч",
    "hotkey": "F",
    "type": "passive"
  },
  "A0P3": {
    "rawcode": "A0P3",
    "name": "Плевок яда",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          450,
          600,
          750,
          900
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cool": [
      16
    ],
    "area": 400
  },
  "A0P2": {
    "rawcode": "A0P2",
    "name": "Ядовитый шар",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          400,
          550,
          700,
          850
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      20
    ],
    "area": 225
  },
  "A0MH": {
    "rawcode": "A0MH",
    "name": "Ядовитое кольцо",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.5
        },
        "hitCount": [
          3
        ]
      }
    ],
    "cool": [
      30
    ],
    "area": 200
  },
  "A0MG": {
    "rawcode": "A0MG",
    "name": "Ядовитый всплеск",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          500,
          8,
          12,
          16,
          20
        ],
        "statScale": {
          "stat": "INT",
          "mult": 4
        }
      },
      {
        "base": [
          50
        ],
        "isDOT": true
      }
    ],
    "cool": [
      120
    ],
    "area": 900
  },
  "A0I2": {
    "rawcode": "A0I2",
    "name": "Ядовитая слюна",
    "hotkey": "F",
    "type": "passive",
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ]
  },
  "A0NJ": {
    "rawcode": "A0NJ",
    "name": "Леденящий поток",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          225,
          350,
          475,
          600,
          725
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      13
    ],
    "area": 225
  },
  "A13G": {
    "rawcode": "A13G",
    "name": "Кольцо холода",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "freeze",
        "duration": [
          2
        ],
        "weight": 1
      },
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      20
    ],
    "area": 700
  },
  "A0NI": {
    "rawcode": "A0NI",
    "name": "Ледяные драконы",
    "hotkey": "E",
    "type": "active",
    "cool": [
      30
    ]
  },
  "A0OQ": {
    "rawcode": "A0OQ",
    "name": "Дыхание дракона",
    "hotkey": "R",
    "type": "ultimate",
    "cc": [
      {
        "type": "freeze",
        "duration": [
          0.3
        ],
        "weight": 1
      }
    ],
    "cool": [
      140
    ]
  },
  "A0O8": {
    "rawcode": "A0O8",
    "name": "Ледяная броня",
    "hotkey": "F",
    "type": "passive",
    "buffs": {
      "armor": [
        5
      ]
    }
  },
  "ice-lord_1": {
    "rawcode": "ice-lord_1",
    "name": "???",
    "hotkey": "Q",
    "type": "active"
  },
  "ice-lord_2": {
    "rawcode": "ice-lord_2",
    "name": "???",
    "hotkey": "W",
    "type": "active"
  },
  "ice-lord_3": {
    "rawcode": "ice-lord_3",
    "name": "???",
    "hotkey": "E",
    "type": "active"
  },
  "ice-lord_4": {
    "rawcode": "ice-lord_4",
    "name": "???",
    "hotkey": "R",
    "type": "ultimate"
  },
  "ice-lord_5": {
    "rawcode": "ice-lord_5",
    "name": "???",
    "hotkey": "F",
    "type": "passive"
  },
  "A0KW": {
    "rawcode": "A0KW",
    "name": "Иллюзия",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750,
          0.8,
          1.2,
          1.6,
          2
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.4
        }
      }
    ],
    "cool": [
      18
    ],
    "area": 350
  },
  "A0PN": {
    "rawcode": "A0PN",
    "name": "Фантомные клинки",
    "hotkey": "W",
    "type": "passive"
  },
  "A00A": {
    "rawcode": "A00A",
    "name": "Отражение души",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          20,
          500,
          700,
          900,
          1100
        ]
      },
      {
        "base": [
          20
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 275
  },
  "A0U7": {
    "rawcode": "A0U7",
    "name": "Перевоплощение",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      120
    ],
    "buffs": {
      "hp": [
        1000
      ],
      "hpRegen": [
        60
      ],
      "spellDmgPct": [
        30
      ]
    }
  },
  "A00C": {
    "rawcode": "A00C",
    "name": "Разящая тень",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          300
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      12
    ],
    "dash": {
      "dashRange": [
        1000
      ]
    }
  },
  "A0F7": {
    "rawcode": "A0F7",
    "name": "Волна Мороза",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "freeze",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      15
    ],
    "area": 325
  },
  "A06Q": {
    "rawcode": "A06Q",
    "name": "Выброс Тьмы",
    "hotkey": "W",
    "type": "active",
    "cool": [
      20
    ],
    "area": 400
  },
  "A06O": {
    "rawcode": "A06O",
    "name": "Ярость Фростморна",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          75,
          200,
          325,
          450,
          575
        ]
      },
      {
        "base": [
          75,
          150,
          225,
          300
        ]
      }
    ],
    "cool": [
      30
    ],
    "area": 1,
    "buffs": {
      "atkSpeed": [
        15,
        20,
        25,
        30,
        35
      ]
    }
  },
  "A06R": {
    "rawcode": "A06R",
    "name": "Черная Дыра",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          120,
          240,
          360,
          480,
          600,
          3,
          3.5,
          4,
          4.5
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2.5
        },
        "isDOT": true
      }
    ],
    "cool": [
      140
    ],
    "area": 700
  },
  "A06D": {
    "rawcode": "A06D",
    "name": "Проклятый меч",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          70
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.5
        }
      }
    ]
  },
  "A0E3": {
    "rawcode": "A0E3",
    "name": "Шары Смерти",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          450,
          600,
          750,
          900
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.5
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.7
        ],
        "weight": 1
      }
    ],
    "cool": [
      10
    ],
    "area": 1000
  },
  "A0HL": {
    "rawcode": "A0HL",
    "name": "Тёмный лик",
    "hotkey": "W",
    "type": "active",
    "cool": [
      11
    ]
  },
  "A0E2": {
    "rawcode": "A0E2",
    "name": "Заражение",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          120,
          180,
          240,
          300,
          360,
          1.4,
          1.6,
          1.8,
          2
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.2
        },
        "isDOT": true
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          4
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      25
    ],
    "area": 450
  },
  "A0S7": {
    "rawcode": "A0S7",
    "name": "Взрыв Глубины",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          800,
          8,
          12,
          16,
          20
        ],
        "statScale": {
          "stat": "INT",
          "mult": 4
        }
      }
    ],
    "cool": [
      100
    ],
    "area": 650
  },
  "A0E8": {
    "rawcode": "A0E8",
    "name": "Сгусток яда",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          300
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "silence",
        "duration": [
          0.5
        ],
        "weight": 0.8
      }
    ],
    "cool": [
      15
    ]
  },
  "A0NV": {
    "rawcode": "A0NV",
    "name": "Корни",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      },
      {
        "base": [
          80,
          130,
          180,
          230,
          280
        ],
        "isDOT": true
      }
    ],
    "cool": [
      15
    ],
    "area": 375,
    "dash": {
      "dashRange": [
        1000
      ]
    }
  },
  "A051": {
    "rawcode": "A051",
    "name": "Аура возмездия",
    "hotkey": "W",
    "type": "active",
    "area": 600
  },
  "A1BB": {
    "rawcode": "A1BB",
    "name": "Кусты",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 475,
    "dash": {
      "dashRange": [
        800
      ]
    }
  },
  "A0J4": {
    "rawcode": "A0J4",
    "name": "Дух Природы",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      120,
      110,
      100,
      90,
      80
    ],
    "buffs": {
      "hp": [
        1000
      ],
      "hpRegen": [
        50
      ],
      "spellDmgPct": [
        30
      ]
    }
  },
  "A15N": {
    "rawcode": "A15N",
    "name": "Душа Природы",
    "hotkey": "F",
    "type": "active",
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      14
    ],
    "area": 180
  },
  "A0U2": {
    "rawcode": "A0U2",
    "name": "Разряд молнии",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          125,
          250,
          375,
          500,
          625
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.75
        }
      }
    ],
    "cool": [
      13
    ]
  },
  "A0GX": {
    "rawcode": "A0GX",
    "name": "Поражение молнией",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          200,
          300,
          400,
          500
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.75
        },
        "isDOT": true
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      20
    ]
  },
  "A0GW": {
    "rawcode": "A0GW",
    "name": "Электрический шар",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          275,
          425,
          575,
          725,
          875
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cool": [
      30
    ],
    "area": 725
  },
  "A0GY": {
    "rawcode": "A0GY",
    "name": "Гроза",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          350,
          1.5,
          1.75,
          2,
          2.25
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.25
        },
        "hitCount": [
          80
        ]
      }
    ],
    "cool": [
      160
    ],
    "area": 325
  },
  "A0GV": {
    "rawcode": "A0GV",
    "name": "Щит молний",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          80
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.2
        }
      }
    ],
    "cool": [
      12
    ],
    "area": 250
  },
  "A0JO": {
    "rawcode": "A0JO",
    "name": "Шаровые молнии",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      15
    ],
    "area": 400,
    "dash": {
      "dashRange": [
        1000
      ]
    }
  },
  "A0JL": {
    "rawcode": "A0JL",
    "name": "Цепной прыжок",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          40,
          1,
          1.5,
          2,
          2.5
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.5
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      25
    ],
    "area": 300,
    "dash": {
      "dashRange": [
        750
      ]
    }
  },
  "A0JJ": {
    "rawcode": "A0JJ",
    "name": "Молниеносный скачок",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          2000,
          8,
          12,
          16,
          20
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 4
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      100
    ],
    "area": 750
  },
  "A0JI": {
    "rawcode": "A0JI",
    "name": "Выстрел молнией",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          200,
          300
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cool": [
      10,
      9,
      8
    ],
    "area": 300
  },
  "A0TQ": {
    "rawcode": "A0TQ",
    "name": "Ракетный выстрел",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          250,
          350,
          450,
          550
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.75
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      12
    ],
    "area": 400
  },
  "A0I9": {
    "rawcode": "A0I9",
    "name": "Выстрел лазера",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          275,
          400,
          525,
          650,
          775
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "blind",
        "duration": [
          0
        ],
        "weight": 0.3
      }
    ],
    "cool": [
      20
    ],
    "area": 200
  },
  "A0I6": {
    "rawcode": "A0I6",
    "name": "Плазменный обстрел",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          120,
          180,
          240,
          300,
          360
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.8
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 700
  },
  "A0IC": {
    "rawcode": "A0IC",
    "name": "Баллистическая Ракета",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          2000,
          12,
          16,
          20,
          24
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 8
        }
      }
    ],
    "cool": [
      100
    ],
    "area": 500
  },
  "A0IB": {
    "rawcode": "A0IB",
    "name": "Ракетница",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1
        }
      }
    ],
    "cool": [
      20,
      19,
      18
    ],
    "buffs": {
      "atkSpeed": [
        40
      ]
    }
  },
  "A08P": {
    "rawcode": "A08P",
    "name": "Громовая поступь",
    "hotkey": "Q",
    "type": "active",
    "cc": [
      {
        "type": "stun",
        "duration": [
          2.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      12
    ],
    "area": 350
  },
  "A08V": {
    "rawcode": "A08V",
    "name": "Энергия предков",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          75,
          150,
          225,
          300,
          375
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1.5
        }
      }
    ],
    "cool": [
      18
    ],
    "dash": {
      "dashRange": [
        700,
        800,
        900,
        1000,
        1100
      ]
    }
  },
  "A08S": {
    "rawcode": "A08S",
    "name": "Сотрясение земли",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1.4
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 600
  },
  "A08U": {
    "rawcode": "A08U",
    "name": "Погребение",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          400,
          800,
          1200,
          1600,
          2000,
          8,
          12,
          16,
          20
        ],
        "statScale": {
          "stat": "STR",
          "mult": 4
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          3
        ],
        "weight": 1
      },
      {
        "type": "knockback",
        "duration": [
          0.3
        ],
        "weight": 0.3
      }
    ],
    "cool": [
      120
    ],
    "area": 1200
  },
  "A08T": {
    "rawcode": "A08T",
    "name": "Удар топором",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cool": [
      8
    ]
  },
  "A01X": {
    "rawcode": "A01X",
    "name": "Водяная вспышка",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1
        ],
        "weight": 1
      }
    ],
    "cool": [
      10
    ],
    "area": 350
  },
  "A10P": {
    "rawcode": "A10P",
    "name": "Ядовитый кинжал",
    "hotkey": "W",
    "type": "passive",
    "damage": [
      {
        "base": [
          100,
          175,
          250,
          325,
          400
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.3
        }
      }
    ],
    "cool": [
      3
    ],
    "buffs": {
      "agi": [
        10,
        20,
        30,
        40,
        50
      ]
    }
  },
  "A01R": {
    "rawcode": "A01R",
    "name": "Дух Воды",
    "hotkey": "E",
    "type": "active",
    "cool": [
      30
    ],
    "buffs": {
      "moveSpeed": [
        35
      ],
      "atkSpeed": [
        20
      ]
    }
  },
  "A01S": {
    "rawcode": "A01S",
    "name": "Ядовитые шипы",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          90,
          180,
          270,
          360,
          450,
          4,
          5,
          6,
          7
        ],
        "isDOT": true
      },
      {
        "base": [
          25
        ]
      }
    ],
    "cool": [
      120
    ]
  },
  "A01T": {
    "rawcode": "A01T",
    "name": "Девятый вал",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          200
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 250
  },
  "A0RJ": {
    "rawcode": "A0RJ",
    "name": "Тёмный поток",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cool": [
      12
    ]
  },
  "A0LK": {
    "rawcode": "A0LK",
    "name": "Проклятье",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          350,
          500,
          650,
          800
        ]
      },
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.75
        },
        "isDOT": true
      }
    ],
    "cool": [
      25
    ],
    "area": 425
  },
  "A07S": {
    "rawcode": "A07S",
    "name": "Лучи тьмы",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          500,
          700,
          900,
          1100
        ],
        "statScale": {
          "stat": "INT",
          "mult": 4
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 650
  },
  "A17A": {
    "rawcode": "A17A",
    "name": "Бездна",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          250,
          2.4,
          2.6,
          2.8,
          3
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2.2
        }
      }
    ],
    "cool": [
      100
    ],
    "area": 550
  },
  "A0OO": {
    "rawcode": "A0OO",
    "name": "Могущество Некромонгера",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          100,
          150,
          200
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.8
        }
      }
    ],
    "area": 600
  },
  "A0R1": {
    "rawcode": "A0R1",
    "name": "Поражающий маневр",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          400,
          500,
          600,
          700
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      14
    ],
    "dash": {
      "dashRange": [
        1100
      ]
    }
  },
  "A0R5": {
    "rawcode": "A0R5",
    "name": "Очищение",
    "hotkey": "W",
    "type": "active",
    "cool": [
      10
    ]
  },
  "A0R4": {
    "rawcode": "A0R4",
    "name": "Метка Кошмара",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          200,
          300,
          400,
          500
        ]
      }
    ],
    "cool": [
      30,
      29,
      28,
      27,
      26
    ],
    "area": 400,
    "buffs": {
      "dmgReduction": [
        50
      ]
    }
  },
  "A0R3": {
    "rawcode": "A0R3",
    "name": "Лунная Кара",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1500,
          6,
          9,
          12,
          15
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      80
    ],
    "area": 1200
  },
  "A0R2": {
    "rawcode": "A0R2",
    "name": "Защита Луны",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          175
        ]
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      26,
      24,
      22
    ],
    "area": 500,
    "buffs": {
      "armor": [
        10
      ]
    }
  },
  "A1AP": {
    "rawcode": "A1AP",
    "name": "Удар когтями",
    "hotkey": "Q",
    "type": "passive"
  },
  "A1CM": {
    "rawcode": "A1CM",
    "name": "Волчий голод",
    "hotkey": "W",
    "type": "active",
    "cool": [
      25
    ],
    "buffs": {
      "atkSpeed": [
        50
      ]
    }
  },
  "A1B4": {
    "rawcode": "A1B4",
    "name": "Волчья охота",
    "hotkey": "E",
    "type": "active",
    "cool": [
      30
    ]
  },
  "A1BH": {
    "rawcode": "A1BH",
    "name": "Волчья стая",
    "hotkey": "R",
    "type": "ultimate"
  },
  "A1BK": {
    "rawcode": "A1BK",
    "name": "Зов Луны",
    "hotkey": "F",
    "type": "passive"
  },
  "A0BH": {
    "rawcode": "A0BH",
    "name": "Рывок",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        }
      }
    ],
    "cool": [
      13
    ],
    "area": 300,
    "dash": {
      "dashRange": [
        700,
        800,
        900,
        1000,
        1100
      ]
    }
  },
  "A0D8": {
    "rawcode": "A0D8",
    "name": "Аура крови",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          60,
          90,
          120,
          150,
          180
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1
        }
      }
    ],
    "area": 450,
    "buffs": {
      "moveSpeed": [
        6,
        9,
        12,
        15,
        18
      ],
      "hpRegen": [
        1,
        2,
        3,
        4,
        5
      ]
    }
  },
  "A0D3": {
    "rawcode": "A0D3",
    "name": "Кровавый вихрь",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          100
        ],
        "statScale": {
          "stat": "STR",
          "mult": 2
        },
        "isDOT": true
      }
    ],
    "cool": [
      30
    ],
    "area": 350
  },
  "A0D6": {
    "rawcode": "A0D6",
    "name": "Кровавая Буря",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1000,
          8,
          12,
          16,
          20
        ],
        "statScale": {
          "stat": "STR",
          "mult": 4
        }
      }
    ],
    "cool": [
      100
    ],
    "area": 325
  },
  "A0IH": {
    "rawcode": "A0IH",
    "name": "Удар в спину",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          200
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.6
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      3
    ]
  },
  "A03O": {
    "rawcode": "A03O",
    "name": "Исцеляющая Сфера",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          400,
          550,
          700,
          850
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3
        }
      }
    ],
    "heal": [
      {
        "base": [
          12,
          14,
          16,
          18,
          20
        ],
        "isPct": true
      }
    ],
    "cool": [
      15
    ],
    "area": 325
  },
  "A0T9": {
    "rawcode": "A0T9",
    "name": "Дары света",
    "hotkey": "W",
    "type": "active",
    "heal": [
      {
        "base": [
          2
        ],
        "isPct": true
      }
    ],
    "cool": [
      26,
      25,
      24,
      23,
      22
    ],
    "area": 600
  },
  "A19O": {
    "rawcode": "A19O",
    "name": "Молитва свету",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400,
          500,
          600,
          1.5,
          1.75,
          2,
          2.25
        ],
        "statScale": {
          "stat": "STR",
          "mult": 1.25
        },
        "hitCount": [
          11,
          14,
          17,
          20,
          23
        ]
      }
    ],
    "cool": [
      25
    ],
    "area": 200
  },
  "A19N": {
    "rawcode": "A19N",
    "name": "Святой Щит",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      120
    ],
    "area": 375
  },
  "A107": {
    "rawcode": "A107",
    "name": "Аура защиты",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          25
        ]
      }
    ],
    "area": 800,
    "buffs": {
      "armor": [
        10
      ]
    }
  },
  "A0EK": {
    "rawcode": "A0EK",
    "name": "Стрелы",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          225,
          300,
          375,
          450
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1
        }
      }
    ],
    "cool": [
      13
    ],
    "area": 250
  },
  "A0C3": {
    "rawcode": "A0C3",
    "name": "Прыжок рысью",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          325,
          450,
          575,
          700,
          825
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cool": [
      24
    ],
    "area": 375,
    "dash": {
      "dashRange": [
        700,
        900,
        1100,
        1300,
        1500
      ]
    },
    "buffs": {
      "atkSpeed": [
        30
      ],
      "moveSpeed": [
        50
      ]
    }
  },
  "A0IR": {
    "rawcode": "A0IR",
    "name": "Звездопад",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          75,
          150,
          225,
          300,
          375
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        },
        "hitCount": [
          60,
          80,
          100,
          120,
          140
        ]
      }
    ],
    "cool": [
      120
    ]
  },
  "A0EN": {
    "rawcode": "A0EN",
    "name": "Боевые совы",
    "hotkey": "F",
    "type": "active",
    "cool": [
      15
    ]
  },
  "A02G": {
    "rawcode": "A02G",
    "name": "Безмолвие",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          350,
          500,
          650,
          800
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "silence",
        "duration": [
          1,
          1.5,
          2,
          2.5,
          3
        ],
        "weight": 0.8
      }
    ],
    "cool": [
      10
    ],
    "area": 350
  },
  "A02L": {
    "rawcode": "A02L",
    "name": "Аура меткости",
    "hotkey": "W",
    "type": "active",
    "area": 800,
    "buffs": {
      "agi": [
        15,
        30,
        45,
        60,
        75
      ]
    }
  },
  "A00Q": {
    "rawcode": "A00Q",
    "name": "Прицельная стрельба",
    "hotkey": "E",
    "type": "passive"
  },
  "A1AD": {
    "rawcode": "A1AD",
    "name": "Мощная стрельба",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          900,
          1.6,
          2.4,
          3.2,
          4
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.8
        },
        "hitCount": [
          10
        ]
      }
    ],
    "cool": [
      100
    ],
    "area": 300
  },
  "A02M": {
    "rawcode": "A02M",
    "name": "Невидимость",
    "hotkey": "F",
    "type": "active",
    "cool": [
      25
    ],
    "buffs": {
      "moveSpeed": [
        30
      ]
    }
  },
  "A0RG": {
    "rawcode": "A0RG",
    "name": "Легкие скачки",
    "hotkey": "Q",
    "type": "active",
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.75,
          1,
          1.25,
          1.5,
          1.75
        ],
        "weight": 1
      }
    ],
    "cool": [
      15
    ],
    "dash": {
      "dashRange": [
        1000
      ]
    }
  },
  "A0RA": {
    "rawcode": "A0RA",
    "name": "Коварный бросок",
    "hotkey": "W",
    "type": "active",
    "cool": [
      15
    ]
  },
  "A0RB": {
    "rawcode": "A0RB",
    "name": "Скрытность",
    "hotkey": "E",
    "type": "active",
    "cc": [
      {
        "type": "exhaust",
        "duration": [
          0
        ],
        "weight": 0.5
      },
      {
        "type": "break",
        "duration": [
          4
        ],
        "weight": 0.6
      }
    ],
    "cool": [
      30,
      29,
      28,
      27,
      26
    ]
  },
  "A0P8": {
    "rawcode": "A0P8",
    "name": "Решающий удар",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.5
        }
      }
    ],
    "cool": [
      100,
      95,
      90,
      85,
      80
    ]
  },
  "A0RC": {
    "rawcode": "A0RC",
    "name": "Ловкий прием",
    "hotkey": "F",
    "type": "passive",
    "damage": [
      {
        "base": [
          100
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.8
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          0.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      3
    ]
  },
  "A081": {
    "rawcode": "A081",
    "name": "Волна ярости",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          240,
          380,
          520,
          660,
          800
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3
        }
      }
    ],
    "cool": [
      11
    ],
    "area": 350
  },
  "A07Z": {
    "rawcode": "A07Z",
    "name": "Аура ярости",
    "hotkey": "W",
    "type": "active",
    "area": 500,
    "buffs": {
      "atkSpeed": [
        20,
        25,
        30,
        35,
        40
      ],
      "moveSpeed": [
        4,
        8,
        16,
        24,
        32
      ]
    }
  },
  "A080": {
    "rawcode": "A080",
    "name": "Яростные Удары",
    "hotkey": "E",
    "type": "active",
    "cool": [
      20
    ]
  },
  "A10C": {
    "rawcode": "A10C",
    "name": "Огненная кровь",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      130,
      120,
      110,
      100,
      90
    ],
    "buffs": {
      "hp": [
        1000
      ],
      "spellDmgPct": [
        20
      ]
    }
  },
  "A07Y": {
    "rawcode": "A07Y",
    "name": "Сеть",
    "hotkey": "F",
    "type": "active",
    "cc": [
      {
        "type": "root",
        "duration": [
          2.5,
          3,
          3.5
        ],
        "weight": 0.7
      }
    ],
    "cool": [
      14
    ],
    "area": 425
  },
  "A001": {
    "rawcode": "A001",
    "name": "Невидимость",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ]
      }
    ],
    "cool": [
      13
    ]
  },
  "A0F0": {
    "rawcode": "A0F0",
    "name": "Мясорубка",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          200,
          300,
          400,
          500
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cool": [
      15
    ],
    "dash": {
      "dashRange": [
        700,
        900,
        1100,
        1300,
        1500
      ]
    }
  },
  "A046": {
    "rawcode": "A046",
    "name": "Световое отражение",
    "hotkey": "E",
    "type": "passive",
    "damage": [
      {
        "base": [
          100,
          150,
          200,
          250,
          300
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cool": [
      0.4
    ],
    "area": 250,
    "buffs": {
      "agi": [
        20,
        30,
        40,
        50,
        60
      ]
    }
  },
  "A03Y": {
    "rawcode": "A03Y",
    "name": "Смертельная атака",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          500
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      },
      {
        "base": [
          500,
          6,
          9,
          12,
          15
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cool": [
      120
    ],
    "area": 750
  },
  "A0H5": {
    "rawcode": "A0H5",
    "name": "Разрез",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          400,
          500
        ]
      }
    ],
    "cool": [
      10
    ]
  },
  "A0Y8": {
    "rawcode": "A0Y8",
    "name": "Морская волна",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          450,
          600,
          750,
          900
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1
        ],
        "weight": 1
      }
    ],
    "cool": [
      10
    ],
    "area": 400
  },
  "A08N": {
    "rawcode": "A08N",
    "name": "Блок",
    "hotkey": "W",
    "type": "passive",
    "buffs": {
      "evasion": [
        10,
        15,
        20,
        25,
        30
      ]
    }
  },
  "A08K": {
    "rawcode": "A08K",
    "name": "Туман",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          150,
          200,
          250,
          300,
          0.7,
          0.8,
          0.9,
          1.1
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.6
        },
        "isDOT": true
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      },
      {
        "type": "blind",
        "duration": [
          4
        ],
        "weight": 0.3
      }
    ],
    "cool": [
      25
    ],
    "area": 500,
    "dash": {
      "dashRange": [
        1000
      ]
    }
  },
  "A0S3": {
    "rawcode": "A0S3",
    "name": "Мгновенное перемещение",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1000,
          11,
          14,
          17,
          20
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 8
        }
      }
    ],
    "cool": [
      80
    ],
    "area": 650
  },
  "A0G1": {
    "rawcode": "A0G1",
    "name": "Водяной Щит",
    "hotkey": "F",
    "type": "active",
    "cool": [
      14,
      13,
      12
    ],
    "buffs": {
      "armor": [
        13
      ],
      "hpRegenPct": [
        2
      ]
    }
  },
  "A0HO": {
    "rawcode": "A0HO",
    "name": "Теневой взрыв",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2.5
        }
      }
    ],
    "cool": [
      14
    ],
    "area": 450,
    "dash": {
      "dashRange": [
        800,
        1000,
        1200,
        1400,
        1600
      ]
    }
  },
  "A0HS": {
    "rawcode": "A0HS",
    "name": "Тёмная атака",
    "hotkey": "W",
    "type": "active",
    "cool": [
      20
    ]
  },
  "A0HQ": {
    "rawcode": "A0HQ",
    "name": "Теневая хватка",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          450,
          600,
          750,
          900
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 4
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2
        ],
        "weight": 1
      }
    ],
    "cool": [
      30
    ],
    "area": 350
  },
  "A0V4": {
    "rawcode": "A0V4",
    "name": "Поток Душ",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          175,
          1,
          1.5,
          2,
          2.5
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.5
        },
        "hitCount": [
          50,
          60,
          70,
          80,
          90
        ]
      }
    ],
    "cool": [
      120
    ],
    "area": 400
  },
  "A0QW": {
    "rawcode": "A0QW",
    "name": "Ярость тьмы",
    "hotkey": "F",
    "type": "active",
    "cool": [
      15
    ],
    "buffs": {
      "atkSpeed": [
        25
      ],
      "moveSpeed": [
        15
      ]
    }
  },
  "A0LV": {
    "rawcode": "A0LV",
    "name": "Волновая атака",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          175,
          350,
          525,
          700,
          875
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.5
        }
      },
      {
        "base": [
          250
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.5
        }
      }
    ],
    "cool": [
      14
    ]
  },
  "A0LX": {
    "rawcode": "A0LX",
    "name": "Кровавый прыжок",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          350,
          450,
          550,
          650
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.5
        }
      }
    ],
    "cool": [
      18
    ],
    "dash": {
      "dashRange": [
        1100
      ]
    }
  },
  "A0M0": {
    "rawcode": "A0M0",
    "name": "Резня",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000,
          1.6,
          2.4,
          3.2,
          4
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.8
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 850,
    "buffs": {
      "evasion": [
        100
      ]
    }
  },
  "A0LY": {
    "rawcode": "A0LY",
    "name": "Вихрь Крови",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000,
          4,
          5,
          6,
          7
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        },
        "isDOT": true
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      100
    ],
    "area": 450
  },
  "A0UU": {
    "rawcode": "A0UU",
    "name": "Размашистый Удар",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.5
        }
      },
      {
        "base": [
          5,
          5
        ],
        "isDOT": true
      }
    ],
    "cool": [
      12,
      11,
      10
    ],
    "area": 350
  },
  "A0IS": {
    "rawcode": "A0IS",
    "name": "Ледяной дождь",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          100
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.7
        },
        "hitCount": [
          6,
          9,
          12,
          15,
          18
        ]
      }
    ],
    "cool": [
      15
    ],
    "area": 325
  },
  "A05B": {
    "rawcode": "A05B",
    "name": "Оледенение",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          15
        ],
        "statScale": {
          "stat": "INT",
          "mult": 5
        }
      }
    ],
    "cool": [
      26,
      25,
      24,
      23,
      22
    ]
  },
  "A0IT": {
    "rawcode": "A0IT",
    "name": "Ледяная волна",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          400,
          550,
          700,
          850
        ]
      }
    ],
    "cool": [
      24
    ],
    "area": 350
  },
  "A0IU": {
    "rawcode": "A0IU",
    "name": "Ледяной столб",
    "hotkey": "R",
    "type": "ultimate",
    "cc": [
      {
        "type": "freeze",
        "duration": [
          3
        ],
        "weight": 1
      }
    ],
    "cool": [
      100
    ],
    "area": 925
  },
  "A0IV": {
    "rawcode": "A0IV",
    "name": "Ледяная атака",
    "hotkey": "F",
    "type": "passive",
    "cc": [
      {
        "type": "slow",
        "duration": [
          3,
          4,
          5
        ],
        "weight": 0.4
      }
    ]
  },
  "sorcerer-demo_1": {
    "rawcode": "sorcerer-demo_1",
    "name": "Чародейческая стрела",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          60,
          90,
          120,
          150,
          180
        ]
      }
    ],
    "cool": [
      8,
      7,
      6,
      5,
      4
    ]
  },
  "sorcerer-demo_2": {
    "rawcode": "sorcerer-demo_2",
    "name": "Огненная стрела",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          40,
          60,
          80,
          100,
          120
        ]
      },
      {
        "base": [
          15,
          20,
          25,
          30,
          35
        ],
        "isDOT": true
      }
    ],
    "cool": [
      8,
      7,
      6,
      5,
      4
    ]
  },
  "sorcerer-demo_3": {
    "rawcode": "sorcerer-demo_3",
    "name": "Ледяная стрела",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          40,
          60,
          80,
          100,
          120
        ]
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      8,
      7,
      6,
      5,
      4
    ]
  },
  "sorcerer-demo_4": {
    "rawcode": "sorcerer-demo_4",
    "name": "Тёмная стрела",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          50,
          75,
          100,
          125,
          150
        ]
      }
    ],
    "cc": [
      {
        "type": "silence",
        "duration": [
          1,
          1.5,
          2,
          2.5,
          3
        ],
        "weight": 0.8
      }
    ],
    "cool": [
      8,
      7,
      6,
      5,
      4
    ]
  },
  "sorcerer-demo_5": {
    "rawcode": "sorcerer-demo_5",
    "name": "Прыжок рысью",
    "hotkey": "W",
    "type": "active",
    "cool": [
      20,
      18,
      16,
      14,
      12
    ],
    "buffs": {
      "atkSpeed": [
        15,
        20,
        25,
        30,
        35
      ]
    }
  },
  "sorcerer-demo_6": {
    "rawcode": "sorcerer-demo_6",
    "name": "Меткость",
    "hotkey": "E",
    "type": "passive"
  },
  "sorcerer-demo_7": {
    "rawcode": "sorcerer-demo_7",
    "name": "Боевые совы",
    "hotkey": "R",
    "type": "passive",
    "damage": [
      {
        "base": [
          15,
          25,
          35,
          45,
          55
        ]
      }
    ]
  },
  "sorcerer-demo_8": {
    "rawcode": "sorcerer-demo_8",
    "name": "Смена стрелы",
    "hotkey": "F",
    "type": "active",
    "cool": [
      1
    ]
  },
  "sorcerer-demo_9": {
    "rawcode": "sorcerer-demo_9",
    "name": "Выпад",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          140,
          180,
          220,
          260
        ]
      }
    ],
    "cool": [
      12,
      11,
      10,
      9,
      8
    ]
  },
  "sorcerer-demo_10": {
    "rawcode": "sorcerer-demo_10",
    "name": "Охота",
    "hotkey": "W",
    "type": "active",
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      20,
      18,
      16,
      14,
      12
    ]
  },
  "sorcerer-demo_11": {
    "rawcode": "sorcerer-demo_11",
    "name": "Чуткий зверь",
    "hotkey": "E",
    "type": "passive",
    "buffs": {
      "moveSpeed": [
        10,
        15,
        20,
        25,
        30
      ],
      "hpRegen": [
        2,
        3,
        4,
        5,
        6
      ]
    }
  },
  "sorcerer-demo_12": {
    "rawcode": "sorcerer-demo_12",
    "name": "Вернуться в форму",
    "hotkey": "R",
    "type": "ultimate",
    "heal": [
      {
        "base": [
          15,
          20,
          25,
          30,
          35
        ],
        "isPct": true
      }
    ],
    "cool": [
      30,
      25,
      20,
      15,
      10
    ]
  },
  "A0EW": {
    "rawcode": "A0EW",
    "name": "Печать Огня",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          325,
          450,
          575,
          700
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cool": [
      15
    ],
    "area": 400
  },
  "A0UZ": {
    "rawcode": "A0UZ",
    "name": "Огненный Гейзер",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          50,
          100,
          150,
          200,
          250
        ]
      }
    ],
    "cool": [
      20
    ],
    "area": 400
  },
  "A0OK": {
    "rawcode": "A0OK",
    "name": "Возгорание",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          200
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.2
        },
        "hitCount": [
          4,
          6,
          8,
          10,
          12
        ]
      }
    ],
    "cool": [
      26
    ],
    "area": 280
  },
  "A06F": {
    "rawcode": "A06F",
    "name": "Полет феникса",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          200,
          1.4,
          1.8,
          2.2,
          2.6
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1
        }
      }
    ],
    "cool": [
      100
    ],
    "area": 425
  },
  "A05G": {
    "rawcode": "A05G",
    "name": "Огненный щит",
    "hotkey": "F",
    "type": "active",
    "cool": [
      20,
      18,
      16
    ],
    "area": 320
  },
  "A0J2": {
    "rawcode": "A0J2",
    "name": "Энергетические вихри",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          285,
          445,
          605,
          765,
          925
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2
        }
      }
    ],
    "cool": [
      12
    ]
  },
  "A0J1": {
    "rawcode": "A0J1",
    "name": "Энергетический щит",
    "hotkey": "W",
    "type": "active",
    "cool": [
      20
    ],
    "area": 600,
    "buffs": {
      "hpRegenPct": [
        2.5,
        3,
        3.5,
        4,
        4.5
      ]
    }
  },
  "A0J0": {
    "rawcode": "A0J0",
    "name": "Плазменный выстрел",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          400,
          550,
          700,
          850,
          2.4,
          3.6,
          4.8,
          6
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.2
        }
      }
    ],
    "cool": [
      28
    ],
    "area": 325
  },
  "A0BS": {
    "rawcode": "A0BS",
    "name": "Метеоритная буря",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          300,
          1.2,
          1.8,
          2.4,
          3
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.6
        },
        "hitCount": [
          80
        ]
      }
    ],
    "cool": [
      100
    ],
    "area": 275
  },
  "A0IY": {
    "rawcode": "A0IY",
    "name": "Энергетический выстрел",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          300,
          400,
          500
        ]
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1
        ],
        "weight": 1
      }
    ],
    "cool": [
      10
    ],
    "area": 325
  },
  "A0DH": {
    "rawcode": "A0DH",
    "name": "Плазменное поле",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400,
          500,
          600
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cool": [
      16
    ],
    "area": 1400
  },
  "A0DE": {
    "rawcode": "A0DE",
    "name": "Большой взрыв",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          350,
          450,
          550,
          650
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2.5
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      20
    ],
    "area": 450
  },
  "A0DG": {
    "rawcode": "A0DG",
    "name": "Удар молнией",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          150
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1
        }
      }
    ],
    "cool": [
      25
    ],
    "area": 400
  },
  "A0DF": {
    "rawcode": "A0DF",
    "name": "Дух грозы",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      120
    ]
  },
  "A0DN": {
    "rawcode": "A0DN",
    "name": "Грозовое облако",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          60
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.6
        }
      }
    ],
    "cool": [
      16
    ],
    "area": 550
  },
  "A0EM": {
    "rawcode": "A0EM",
    "name": "Электрический заряд",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          275,
          400,
          525,
          650,
          775
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        }
      }
    ],
    "cool": [
      15
    ]
  },
  "A0KG": {
    "rawcode": "A0KG",
    "name": "Шаровые молнии",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          30,
          60,
          90,
          120,
          150
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.5
        },
        "isDOT": true
      }
    ],
    "cool": [
      25
    ],
    "area": 425,
    "buffs": {
      "armor": [
        8,
        12,
        16,
        20,
        24
      ]
    }
  },
  "A01D": {
    "rawcode": "A01D",
    "name": "Электрическая кара",
    "hotkey": "E",
    "type": "active",
    "cool": [
      30
    ]
  },
  "A0FF": {
    "rawcode": "A0FF",
    "name": "Гнев гроз",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1000,
          15,
          20,
          25,
          30
        ],
        "statScale": {
          "stat": "INT",
          "mult": 10
        }
      }
    ],
    "cool": [
      130
    ]
  },
  "A0KH": {
    "rawcode": "A0KH",
    "name": "Скорость молнии",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          250,
          300
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      14
    ],
    "area": 200,
    "dash": {
      "dashRange": [
        1100
      ]
    }
  },
  "thunder-lord-2_1": {
    "rawcode": "thunder-lord-2_1",
    "name": "???",
    "hotkey": "Q",
    "type": "active"
  },
  "thunder-lord-2_2": {
    "rawcode": "thunder-lord-2_2",
    "name": "???",
    "hotkey": "W",
    "type": "active"
  },
  "thunder-lord-2_3": {
    "rawcode": "thunder-lord-2_3",
    "name": "???",
    "hotkey": "E",
    "type": "active"
  },
  "thunder-lord-2_4": {
    "rawcode": "thunder-lord-2_4",
    "name": "???",
    "hotkey": "R",
    "type": "ultimate"
  },
  "thunder-lord-2_5": {
    "rawcode": "thunder-lord-2_5",
    "name": "???",
    "hotkey": "F",
    "type": "passive"
  },
  "A178": {
    "rawcode": "A178",
    "name": "Разветвленная молния",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          275,
          400,
          525,
          650,
          775
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.4
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 400,
    "dash": {
      "dashRange": [
        800
      ]
    }
  },
  "A054": {
    "rawcode": "A054",
    "name": "Громовой скачок",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "INT",
          "mult": 4
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      20
    ],
    "dash": {
      "dashRange": [
        700,
        900,
        1100,
        1300,
        1500
      ]
    }
  },
  "A04F": {
    "rawcode": "A04F",
    "name": "Гроза",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          200,
          250,
          300,
          350
        ],
        "statScale": {
          "stat": "INT",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      22
    ],
    "area": 450
  },
  "A058": {
    "rawcode": "A058",
    "name": "Громовой рёв",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1000,
          8,
          12,
          16,
          20
        ]
      }
    ],
    "cool": [
      130
    ],
    "area": 3000
  },
  "A04H": {
    "rawcode": "A04H",
    "name": "Разряд молнии",
    "hotkey": "F",
    "type": "active",
    "damage": [
      {
        "base": [
          300
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.3
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.3
        ],
        "weight": 1
      }
    ],
    "cool": [
      15,
      14,
      13
    ]
  },
  "A0BM": {
    "rawcode": "A0BM",
    "name": "Воздушная коса",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          240,
          380,
          520,
          660,
          800
        ],
        "statScale": {
          "stat": "STR",
          "mult": 3
        }
      }
    ],
    "cool": [
      15
    ],
    "area": 250
  },
  "A0BN": {
    "rawcode": "A0BN",
    "name": "Древняя мощь",
    "hotkey": "W",
    "type": "passive",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.5
        },
        "isDOT": true
      }
    ]
  },
  "A0WY": {
    "rawcode": "A0WY",
    "name": "Серия Ударов",
    "hotkey": "E",
    "type": "active",
    "cool": [
      30
    ],
    "dash": {
      "dashRange": [
        2000
      ]
    }
  },
  "A0BL": {
    "rawcode": "A0BL",
    "name": "Гнев Титана",
    "hotkey": "R",
    "type": "ultimate",
    "cool": [
      120
    ],
    "buffs": {
      "armor": [
        20
      ],
      "hp": [
        500
      ],
      "moveSpeedFlat": [
        60
      ]
    }
  },
  "A0BO": {
    "rawcode": "A0BO",
    "name": "Ангельское благословение",
    "hotkey": "F",
    "type": "active",
    "cool": [
      14
    ]
  },
  "A0S0": {
    "rawcode": "A0S0",
    "name": "Ритуал крови",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.2
        }
      }
    ],
    "cool": [
      15
    ],
    "area": 250
  },
  "A0S2": {
    "rawcode": "A0S2",
    "name": "Путь безумия",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          50,
          100,
          150,
          200,
          250
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.4
        }
      }
    ],
    "cool": [
      25
    ],
    "buffs": {
      "atkSpeed": [
        20,
        25,
        30,
        35,
        40
      ],
      "moveSpeed": [
        70
      ]
    }
  },
  "A0S1": {
    "rawcode": "A0S1",
    "name": "Тёмный ритуал",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "STR",
          "mult": 4
        },
        "hitCount": [
          6
        ]
      }
    ],
    "cc": [
      {
        "type": "blind",
        "duration": [
          4
        ],
        "weight": 0.3
      }
    ],
    "cool": [
      30,
      28,
      26,
      24,
      22
    ],
    "area": 600
  },
  "A0S5": {
    "rawcode": "A0S5",
    "name": "Похищение Жизни",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          500,
          3,
          3.5,
          4,
          4.5
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 2.5
        }
      }
    ],
    "cool": [
      120
    ]
  },
  "A0RZ": {
    "rawcode": "A0RZ",
    "name": "Поглощение крови",
    "hotkey": "F",
    "type": "passive",
    "heal": [
      {
        "base": [
          15,
          20,
          25,
          5,
          8,
          10
        ],
        "isPct": true
      }
    ],
    "buffs": {
      "moveSpeed": [
        10,
        15,
        20
      ]
    }
  },
  "A028": {
    "rawcode": "A028",
    "name": "Кровавый наскок",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400,
          500,
          600
        ]
      }
    ],
    "cool": [
      11
    ],
    "area": 300
  },
  "A0KY": {
    "rawcode": "A0KY",
    "name": "Кровавая ярость",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "STR",
          "mult": 4
        }
      }
    ],
    "cool": [
      15
    ],
    "area": 250
  },
  "A0CB": {
    "rawcode": "A0CB",
    "name": "Увечье",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "STR",
          "mult": 0.2
        }
      }
    ],
    "heal": [
      {
        "base": [
          50
        ],
        "isPct": true
      }
    ],
    "cool": [
      24
    ]
  },
  "S000": {
    "rawcode": "S000",
    "name": "Неистовствующая Ярость",
    "hotkey": "R",
    "type": "ultimate",
    "heal": [
      {
        "base": [
          35,
          45,
          55,
          65,
          75
        ],
        "isPct": true
      }
    ],
    "cool": [
      80
    ],
    "buffs": {
      "atkSpeed": [
        35,
        60,
        85,
        110,
        135
      ]
    }
  },
  "A0O0": {
    "rawcode": "A0O0",
    "name": "Сила вурдалака",
    "hotkey": "F",
    "type": "passive"
  },
  "A04W": {
    "rawcode": "A04W",
    "name": "Молот правосудия",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          250,
          375,
          500,
          625,
          750
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.5
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          2
        ],
        "weight": 1
      }
    ],
    "cool": [
      15
    ],
    "area": 400
  },
  "A08M": {
    "rawcode": "A08M",
    "name": "Воля Света",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1.5
        }
      }
    ],
    "heal": [
      {
        "base": [
          50
        ],
        "isPct": true
      }
    ],
    "cool": [
      15
    ],
    "area": 425
  },
  "A03U": {
    "rawcode": "A03U",
    "name": "Волны Света",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          175,
          250,
          325,
          400,
          1.25,
          1.5,
          1.75,
          2
        ],
        "statScale": {
          "stat": "INT",
          "mult": 1
        },
        "hitCount": [
          10
        ]
      }
    ],
    "cool": [
      25
    ]
  },
  "A04V": {
    "rawcode": "A04V",
    "name": "Сила света",
    "hotkey": "R",
    "type": "ultimate",
    "heal": [
      {
        "base": [
          2
        ],
        "isPct": true
      }
    ],
    "cool": [
      90
    ],
    "area": 5000
  },
  "A04P": {
    "rawcode": "A04P",
    "name": "Священная Защита",
    "hotkey": "F",
    "type": "passive",
    "buffs": {
      "evasion": [
        15,
        18,
        21
      ]
    }
  },
  "A06L": {
    "rawcode": "A06L",
    "name": "Сюрикен",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.5
        }
      }
    ],
    "cool": [
      15
    ]
  },
  "A0T1": {
    "rawcode": "A0T1",
    "name": "Скрытый клинок",
    "hotkey": "W",
    "type": "active",
    "cool": [
      20
    ]
  },
  "A145": {
    "rawcode": "A145",
    "name": "Ловкий удар",
    "hotkey": "E",
    "type": "passive",
    "damage": [
      {
        "base": [
          30,
          60,
          90,
          120,
          150,
          0.4,
          0.6,
          0.8,
          1
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.2
        }
      }
    ],
    "heal": [
      {
        "base": [
          50
        ],
        "isPct": true
      }
    ]
  },
  "A07O": {
    "rawcode": "A07O",
    "name": "Дождь из лезвий",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          650,
          8.5,
          11,
          13.5,
          16
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 6
        }
      }
    ],
    "cool": [
      120
    ],
    "area": 650
  },
  "A07Q": {
    "rawcode": "A07Q",
    "name": "Скачок",
    "hotkey": "F",
    "type": "active",
    "cool": [
      15
    ],
    "dash": {
      "dashRange": [
        1000
      ]
    },
    "buffs": {
      "atkSpeed": [
        100
      ]
    }
  },
  "A0GB": {
    "rawcode": "A0GB",
    "name": "Волна",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          150,
          300,
          450,
          600,
          750
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          4
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      10
    ],
    "area": 325
  },
  "A0HU": {
    "rawcode": "A0HU",
    "name": "Морские потоки",
    "hotkey": "W",
    "type": "active",
    "damage": [
      {
        "base": [
          75,
          150,
          225,
          300,
          375,
          1,
          1.5,
          2,
          2.5
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      20
    ]
  },
  "A093": {
    "rawcode": "A093",
    "name": "Водяная форма",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          400,
          600,
          800,
          1000,
          2.6,
          3.4,
          4.2,
          5
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.8
        }
      }
    ],
    "cool": [
      28
    ]
  },
  "A0JD": {
    "rawcode": "A0JD",
    "name": "Водоворот",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 3
        },
        "isDOT": true
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          0.3
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      150
    ]
  },
  "A0JE": {
    "rawcode": "A0JE",
    "name": "Водяной барьер",
    "hotkey": "F",
    "type": "active",
    "cool": [
      20,
      18,
      16
    ],
    "area": 450,
    "buffs": {
      "armor": [
        9,
        12,
        15
      ]
    }
  },
  "A0FR": {
    "rawcode": "A0FR",
    "name": "Воздушный шторм",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          200,
          300,
          400,
          500,
          600
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2.5
        }
      }
    ],
    "cool": [
      10
    ],
    "area": 330
  },
  "A0FS": {
    "rawcode": "A0FS",
    "name": "Ветряные снаряды",
    "hotkey": "W",
    "type": "active",
    "cool": [
      14
    ]
  },
  "A0FU": {
    "rawcode": "A0FU",
    "name": "Поток ветра",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          160,
          320,
          480,
          640,
          800
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cc": [
      {
        "type": "disarm",
        "duration": [
          1,
          1.5,
          2,
          2.5,
          3
        ],
        "weight": 0.8
      }
    ],
    "cool": [
      22
    ],
    "area": 325
  },
  "A0AB": {
    "rawcode": "A0AB",
    "name": "Воздушная стена",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          200,
          2.5,
          3,
          3.5,
          4
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        },
        "isDOT": true
      }
    ],
    "cool": [
      140
    ],
    "area": 825
  },
  "A0FT": {
    "rawcode": "A0FT",
    "name": "Полет",
    "hotkey": "F",
    "type": "active",
    "cool": [
      8
    ],
    "buffs": {
      "evasion": [
        50
      ]
    }
  },
  "A08X": {
    "rawcode": "A08X",
    "name": "Торнадо",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          0
        ],
        "statScale": {
          "stat": "INT",
          "mult": 3
        }
      }
    ],
    "cool": [
      12
    ]
  },
  "A0S6": {
    "rawcode": "A0S6",
    "name": "Доспехи ветра",
    "hotkey": "W",
    "type": "active",
    "cool": [
      25
    ]
  },
  "A090": {
    "rawcode": "A090",
    "name": "Аура ветров",
    "hotkey": "E",
    "type": "active",
    "area": 700,
    "buffs": {
      "atkSpeed": [
        35
      ],
      "moveSpeed": [
        35
      ]
    }
  },
  "A0SJ": {
    "rawcode": "A0SJ",
    "name": "Вихрь",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          500,
          2.5,
          3,
          3.5,
          4
        ],
        "statScale": {
          "stat": "INT",
          "mult": 2
        },
        "isDOT": true
      }
    ],
    "cool": [
      100
    ],
    "area": 550
  },
  "A08Z": {
    "rawcode": "A08Z",
    "name": "Смерч",
    "hotkey": "F",
    "type": "active",
    "cool": [
      16
    ]
  },
  "A0RQ": {
    "rawcode": "A0RQ",
    "name": "Кристаллы",
    "hotkey": "Q",
    "type": "active",
    "damage": [
      {
        "base": [
          100,
          200,
          300,
          400,
          500
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 1.5
        }
      }
    ],
    "cc": [
      {
        "type": "slow",
        "duration": [
          3
        ],
        "weight": 0.4
      }
    ],
    "cool": [
      10
    ],
    "area": 300
  },
  "A0RP": {
    "rawcode": "A0RP",
    "name": "Магическое усиление",
    "hotkey": "E",
    "type": "active",
    "damage": [
      {
        "base": [
          80,
          120,
          160,
          200,
          240
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 0.5
        }
      }
    ],
    "cool": [
      30
    ],
    "buffs": {
      "atkSpeed": [
        70
      ]
    }
  },
  "A0RN": {
    "rawcode": "A0RN",
    "name": "Плазменный луч",
    "hotkey": "R",
    "type": "ultimate",
    "damage": [
      {
        "base": [
          1000,
          6,
          8,
          10
        ],
        "statScale": {
          "stat": "AGI",
          "mult": 4
        }
      }
    ],
    "cc": [
      {
        "type": "stun",
        "duration": [
          1.5
        ],
        "weight": 1
      }
    ],
    "cool": [
      100
    ],
    "area": 475
  },
  "A0EO": {
    "rawcode": "A0EO",
    "name": "Электрическая цепь",
    "hotkey": "F",
    "type": "active",
    "cool": [
      14
    ]
  }
};
