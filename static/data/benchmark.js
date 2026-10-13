window.SWM_SAMPLES = [
  {
    "id": "B01",
    "theme": "magic academy",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B01.webp",
    "variable": "element_mode",
    "values": [
      "RED_FLAME",
      "BLUE_FLAME"
    ],
    "action": "The wizard stays in place and raises the wand clearly above the head.",
    "rule": "If the element_mode is RED_FLAME, the magic orb erupts with large red flames; if it is BLUE_FLAME, the magic orb erupts with large blue flames.",
    "endings": [
      "the magic orb erupts with large red flames",
      "the magic orb erupts with large blue flames"
    ],
    "forbidden": [
      "the orb erupts with large bright blue flames",
      "the orb erupts with large bright red flames"
    ],
    "program": {
      "text": "If the element_mode is RED_FLAME, the magic orb erupts with large red flames; if it is BLUE_FLAME, the magic orb erupts with large blue flames.",
      "precondition": "element_mode == 'RED_FLAME'",
      "effect": "orb.flame = 'red'",
      "else_effect": "orb.flame = 'blue'",
      "mapping": {
        "RED_FLAME": "orb.flame = 'red'",
        "BLUE_FLAME": "orb.flame = 'blue'"
      }
    },
    "videos": [
      {
        "model": "LongCat-Video 13.6B",
        "twin": "A",
        "track": "Local run · probe unverified",
        "src": "static/videos/benchmark/longcat-B01-A.mp4",
        "poster": "static/images/benchmark/longcat-B01-A.webp"
      }
    ]
  },
  {
    "id": "B02",
    "theme": "dungeon",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B02.webp",
    "variable": "shrine_mode",
    "values": [
      "GATE",
      "BRAZIER"
    ],
    "action": "The player stays in place and clearly raises the right arm.",
    "rule": "If the shrine_mode is GATE, the stone door rises fully open; if it is BRAZIER, the large brazier bursts into tall flames.",
    "endings": [
      "the stone door rises fully open",
      "the large brazier bursts into tall flames"
    ],
    "forbidden": [
      "the large brazier burns with tall bright flames",
      "the stone door is raised fully open, the passage clear"
    ],
    "program": {
      "text": "If the shrine_mode is GATE, the stone door rises fully open; if it is BRAZIER, the large brazier bursts into tall flames.",
      "precondition": "shrine_mode == 'GATE'",
      "effect": "door.up = true",
      "else_effect": "brazier.lit = true",
      "mapping": {
        "GATE": "door.up = true",
        "BRAZIER": "brazier.lit = true"
      }
    },
    "videos": []
  },
  {
    "id": "B03",
    "theme": "open world",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B03.webp",
    "variable": "relic_mode",
    "values": [
      "TOWER",
      "FOUNTAIN"
    ],
    "action": "The player stays in place and raises both hands above the head.",
    "rule": "If the relic_mode is TOWER, a strong golden beam shoots from the tower top; if it is FOUNTAIN, the fountain jets a tall plume of water.",
    "endings": [
      "a strong golden beam shoots from the tower top",
      "the fountain jets a tall plume of water"
    ],
    "forbidden": [
      "the stone fountain jets a tall plume of water",
      "a strong golden beam of light shoots from the top of the tower"
    ],
    "program": {
      "text": "If the relic_mode is TOWER, a strong golden beam shoots from the tower top; if it is FOUNTAIN, the fountain jets a tall plume of water.",
      "precondition": "relic_mode == 'TOWER'",
      "effect": "tower.beam = true",
      "else_effect": "fountain.running = true",
      "mapping": {
        "TOWER": "tower.beam = true",
        "FOUNTAIN": "fountain.running = true"
      }
    },
    "videos": []
  },
  {
    "id": "B04",
    "theme": "healer",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B04.webp",
    "variable": "healing_mode",
    "values": [
      "PATIENT",
      "CRYSTAL"
    ],
    "action": "The healer stays in place and clearly spreads both arms.",
    "rule": "If the healing_mode is PATIENT, a large green glowing aura surrounds the patient; if it is CRYSTAL, the healing crystal rises up glowing bright white.",
    "endings": [
      "a large green glowing aura surrounds the patient",
      "the healing crystal rises up glowing bright white"
    ],
    "forbidden": [
      "the large healing crystal rises up glowing bright white",
      "the patient is surrounded by a large bright green glowing aura"
    ],
    "program": {
      "text": "If the healing_mode is PATIENT, a large green glowing aura surrounds the patient; if it is CRYSTAL, the healing crystal rises up glowing bright white.",
      "precondition": "healing_mode == 'PATIENT'",
      "effect": "patient.aura = true",
      "else_effect": "crystal.up = true",
      "mapping": {
        "PATIENT": "patient.aura = true",
        "CRYSTAL": "crystal.up = true"
      }
    },
    "videos": []
  },
  {
    "id": "B05",
    "theme": "visual novel",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B05.webp",
    "variable": "scene_flag",
    "values": [
      "CURTAIN",
      "LIGHTS"
    ],
    "action": "The player stays in place and gives one clear wave.",
    "rule": "If the scene_flag is CURTAIN, the red curtain pulls fully open; if it is LIGHTS, all the stage lanterns light up.",
    "endings": [
      "the red curtain pulls fully open",
      "all the stage lanterns light up"
    ],
    "forbidden": [
      "the stage lanterns all shine bright",
      "the red curtain is pulled fully open to the sides"
    ],
    "program": {
      "text": "If the scene_flag is CURTAIN, the red curtain pulls fully open; if it is LIGHTS, all the stage lanterns light up.",
      "precondition": "scene_flag == 'CURTAIN'",
      "effect": "curtain.open = true",
      "else_effect": "lights.lit = true",
      "mapping": {
        "CURTAIN": "curtain.open = true",
        "LIGHTS": "lights.lit = true"
      }
    },
    "videos": []
  },
  {
    "id": "B06",
    "theme": "dating",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B06.webp",
    "variable": "date_scene",
    "values": [
      "CANOPY",
      "LIGHTS"
    ],
    "action": "The player stays in place and performs one clear clap.",
    "rule": "If the date_scene is CANOPY, the pergola canopy spreads fully out overhead; if it is LIGHTS, the heart lanterns glow bright pink.",
    "endings": [
      "the pergola canopy spreads fully out overhead",
      "the heart lanterns glow bright pink"
    ],
    "forbidden": [
      "the heart-shaped lanterns all glow bright pink",
      "the pergola canopy is fully spread out overhead"
    ],
    "program": {
      "text": "If the date_scene is CANOPY, the pergola canopy spreads fully out overhead; if it is LIGHTS, the heart lanterns glow bright pink.",
      "precondition": "date_scene == 'CANOPY'",
      "effect": "canopy.out = true",
      "else_effect": "hearts.lit = true",
      "mapping": {
        "CANOPY": "canopy.out = true",
        "LIGHTS": "hearts.lit = true"
      }
    },
    "videos": []
  },
  {
    "id": "B07",
    "theme": "museum",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B07.webp",
    "variable": "exhibit_mode",
    "values": [
      "STATUE",
      "CURTAIN"
    ],
    "action": "The player raises one arm and clearly points toward the statue.",
    "rule": "If the exhibit_mode is STATUE, bright blue tracery covers the statue; if it is CURTAIN, the back curtain pulls fully open.",
    "endings": [
      "bright blue tracery covers the statue",
      "the back curtain pulls fully open"
    ],
    "forbidden": [
      "the curtain is pulled fully open to the sides",
      "the statue surface is covered with bright blue glowing tracery"
    ],
    "program": {
      "text": "If the exhibit_mode is STATUE, bright blue tracery covers the statue; if it is CURTAIN, the back curtain pulls fully open.",
      "precondition": "exhibit_mode == 'STATUE'",
      "effect": "statue.pattern = true",
      "else_effect": "curtain.open = true",
      "mapping": {
        "STATUE": "statue.pattern = true",
        "CURTAIN": "curtain.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B08",
    "theme": "survival",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B08.webp",
    "variable": "signal_mode",
    "values": [
      "FIRE",
      "FLAG"
    ],
    "action": "The player stays in place and raises both arms into a clear V shape.",
    "rule": "If the signal_mode is FIRE, the campfire bursts into tall flames; if it is FLAG, the red signal flag rises high on its pole.",
    "endings": [
      "the campfire bursts into tall flames",
      "the red signal flag rises high on its pole"
    ],
    "forbidden": [
      "the large red signal flag is raised high on its pole",
      "the campfire burns with tall bright flames"
    ],
    "program": {
      "text": "If the signal_mode is FIRE, the campfire bursts into tall flames; if it is FLAG, the red signal flag rises high on its pole.",
      "precondition": "signal_mode == 'FIRE'",
      "effect": "fire.lit = true",
      "else_effect": "flag.up = true",
      "mapping": {
        "FIRE": "fire.lit = true",
        "FLAG": "flag.up = true"
      }
    },
    "videos": []
  },
  {
    "id": "B09",
    "theme": "escape room",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B09.webp",
    "variable": "mechanism_mode",
    "values": [
      "DOOR",
      "DRAWER"
    ],
    "action": "The large wall lever moves clearly from the upper position to the lower position.",
    "rule": "If the mechanism_mode is DOOR, the stone door rises fully open; if it is DRAWER, the large wall drawer pops clearly out.",
    "endings": [
      "the stone door rises fully open",
      "the large wall drawer pops clearly out"
    ],
    "forbidden": [
      "the large wall drawer is popped clearly out of the wall",
      "the stone door is raised fully open, the passage clear"
    ],
    "program": {
      "text": "If the mechanism_mode is DOOR, the stone door rises fully open; if it is DRAWER, the large wall drawer pops clearly out.",
      "precondition": "mechanism_mode == 'DOOR'",
      "effect": "door.up = true",
      "else_effect": "drawer.out = true",
      "mapping": {
        "DOOR": "door.up = true",
        "DRAWER": "drawer.out = true"
      }
    },
    "videos": []
  },
  {
    "id": "B10",
    "theme": "dungeon",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B10.webp",
    "variable": "lever_mode",
    "values": [
      "BRIDGE",
      "FIRE"
    ],
    "action": "The stone lever is clearly pushed down.",
    "rule": "If the lever_mode is BRIDGE, the stone drawbridge drops flat across the gap; if it is FIRE, both braziers burst into tall flames.",
    "endings": [
      "the stone drawbridge drops flat across the gap",
      "both braziers burst into tall flames"
    ],
    "forbidden": [
      "both large braziers burn with tall bright flames",
      "the stone drawbridge lies flat across the gap"
    ],
    "program": {
      "text": "If the lever_mode is BRIDGE, the stone drawbridge drops flat across the gap; if it is FIRE, both braziers burst into tall flames.",
      "precondition": "lever_mode == 'BRIDGE'",
      "effect": "bridge.down = true",
      "else_effect": "braziers.lit = true",
      "mapping": {
        "BRIDGE": "bridge.down = true",
        "FIRE": "braziers.lit = true"
      }
    },
    "videos": []
  },
  {
    "id": "B11",
    "theme": "sailing",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B11.webp",
    "variable": "nav_mode",
    "values": [
      "SAIL",
      "BEACON"
    ],
    "action": "The large ship wheel clearly rotates clockwise by about a quarter turn.",
    "rule": "If the nav_mode is SAIL, the main sail spreads fully out; if it is BEACON, the bow beacon glows strong green.",
    "endings": [
      "the main sail spreads fully out",
      "the bow beacon glows strong green"
    ],
    "forbidden": [
      "the bow beacon glows strong green",
      "the main sail is fully spread"
    ],
    "program": {
      "text": "If the nav_mode is SAIL, the main sail spreads fully out; if it is BEACON, the bow beacon glows strong green.",
      "precondition": "nav_mode == 'SAIL'",
      "effect": "sail.unfurled = true",
      "else_effect": "beacon.green = true",
      "mapping": {
        "SAIL": "sail.unfurled = true",
        "BEACON": "beacon.green = true"
      }
    },
    "videos": []
  },
  {
    "id": "B12",
    "theme": "board game",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B12.webp",
    "variable": "board_mode",
    "values": [
      "BRIDGE",
      "TOWER"
    ],
    "action": "The large central board dial clearly rotates by about half a turn.",
    "rule": "If the board_mode is BRIDGE, the bridge rises up over the board; if it is TOWER, a tall tower rises from the board corner.",
    "endings": [
      "the bridge rises up over the board",
      "a tall tower rises from the board corner"
    ],
    "forbidden": [
      "a tall tower rises from the board corner",
      "the board bridge rises up over the board"
    ],
    "program": {
      "text": "If the board_mode is BRIDGE, the bridge rises up over the board; if it is TOWER, a tall tower rises from the board corner.",
      "precondition": "board_mode == 'BRIDGE'",
      "effect": "bridge.up = true",
      "else_effect": "tower.up = true",
      "mapping": {
        "BRIDGE": "bridge.up = true",
        "TOWER": "tower.up = true"
      }
    },
    "videos": []
  },
  {
    "id": "B13",
    "theme": "farming",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B13.webp",
    "variable": "irrigation_mode",
    "values": [
      "DOOR",
      "LANTERN"
    ],
    "action": "The large irrigation valve clearly rotates by about ninety degrees.",
    "rule": "If the irrigation_mode is DOOR, the greenhouse door swings wide open; if it is LANTERN, the barn lantern bursts into warm yellow light.",
    "endings": [
      "the greenhouse door swings wide open",
      "the barn lantern bursts into warm yellow light"
    ],
    "forbidden": [
      "the barn lantern burns with a bright warm yellow flame",
      "the greenhouse door is wide open"
    ],
    "program": {
      "text": "If the irrigation_mode is DOOR, the greenhouse door swings wide open; if it is LANTERN, the barn lantern bursts into warm yellow light.",
      "precondition": "irrigation_mode == 'DOOR'",
      "effect": "greenhouse.open = true",
      "else_effect": "lantern.lit = true",
      "mapping": {
        "DOOR": "greenhouse.open = true",
        "LANTERN": "lantern.lit = true"
      }
    },
    "videos": []
  },
  {
    "id": "B14",
    "theme": "ranch",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B14.webp",
    "variable": "ranch_signal",
    "values": [
      "ANIMALS",
      "GATE"
    ],
    "action": "The player stays in place and strikes the large ranch bell once.",
    "rule": "If the ranch_signal is ANIMALS, the two sheep come to stand beside the front trough; if it is GATE, the pen gate swings wide open.",
    "endings": [
      "the two sheep come to stand beside the front trough",
      "the pen gate swings wide open"
    ],
    "forbidden": [
      "the pen gate is wide open",
      "the two sheep stand right beside the front feed trough"
    ],
    "program": {
      "text": "If the ranch_signal is ANIMALS, the two sheep come to stand beside the front trough; if it is GATE, the pen gate swings wide open.",
      "precondition": "ranch_signal == 'ANIMALS'",
      "effect": "sheep.near = true",
      "else_effect": "gate.open = true",
      "mapping": {
        "ANIMALS": "sheep.near = true",
        "GATE": "gate.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B15",
    "theme": "camping",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B15.webp",
    "variable": "camp_mode",
    "values": [
      "TENT",
      "LIGHTS"
    ],
    "action": "The large crank clearly rotates through one full turn.",
    "rule": "If the camp_mode is TENT, the tent entrance flap opens wide; if it is LIGHTS, all three camp lamps light up.",
    "endings": [
      "the tent entrance flap opens wide",
      "all three camp lamps light up"
    ],
    "forbidden": [
      "all three camp lamps glow bright",
      "the tent entrance flap is wide open"
    ],
    "program": {
      "text": "If the camp_mode is TENT, the tent entrance flap opens wide; if it is LIGHTS, all three camp lamps light up.",
      "precondition": "camp_mode == 'TENT'",
      "effect": "tent.open = true",
      "else_effect": "lamps.lit = true",
      "mapping": {
        "TENT": "tent.open = true",
        "LIGHTS": "lamps.lit = true"
      }
    },
    "videos": []
  },
  {
    "id": "B16",
    "theme": "shopkeeping",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B16.webp",
    "variable": "shop_mode",
    "values": [
      "SHELF",
      "SIGN"
    ],
    "action": "The player stays in place and presses the large floor pedal down.",
    "rule": "If the shop_mode is SHELF, the big shelf slides out toward the front; if it is SIGN, the shop sign glows bright yellow.",
    "endings": [
      "the big shelf slides out toward the front",
      "the shop sign glows bright yellow"
    ],
    "forbidden": [
      "the hanging shop sign glows bright yellow",
      "the big shelf is slid out toward the front"
    ],
    "program": {
      "text": "If the shop_mode is SHELF, the big shelf slides out toward the front; if it is SIGN, the shop sign glows bright yellow.",
      "precondition": "shop_mode == 'SHELF'",
      "effect": "shelf.out = true",
      "else_effect": "sign.yellow = true",
      "mapping": {
        "SHELF": "shelf.out = true",
        "SIGN": "sign.yellow = true"
      }
    },
    "videos": []
  },
  {
    "id": "B17",
    "theme": "card game",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B17.webp",
    "variable": "table_mode",
    "values": [
      "CARD",
      "FLAG"
    ],
    "action": "The player presses the large button on the edge of the card table.",
    "rule": "If the table_mode is CARD, the giant card flips face up; if it is FLAG, the red flag rises high on the flagpole.",
    "endings": [
      "the giant card flips face up",
      "the red flag rises high on the flagpole"
    ],
    "forbidden": [
      "the large red flag is raised high on the side flagpole",
      "the giant card lies face up showing its illustrated front"
    ],
    "program": {
      "text": "If the table_mode is CARD, the giant card flips face up; if it is FLAG, the red flag rises high on the flagpole.",
      "precondition": "table_mode == 'CARD'",
      "effect": "card.face = 'up'",
      "else_effect": "flag.up = true",
      "mapping": {
        "CARD": "card.face = 'up'",
        "FLAG": "flag.up = true"
      }
    },
    "videos": []
  },
  {
    "id": "B18",
    "theme": "detective",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B18.webp",
    "variable": "evidence_mode",
    "values": [
      "CABINET",
      "LAMP"
    ],
    "action": "The large evidence-room dial clearly rotates by about half a turn.",
    "rule": "If the evidence_mode is CABINET, both evidence cabinet doors open wide; if it is LAMP, the desk lamp glows strong blue.",
    "endings": [
      "both evidence cabinet doors open wide",
      "the desk lamp glows strong blue"
    ],
    "forbidden": [
      "the large desk lamp glows strong blue",
      "the evidence cabinet doors are both wide open"
    ],
    "program": {
      "text": "If the evidence_mode is CABINET, both evidence cabinet doors open wide; if it is LAMP, the desk lamp glows strong blue.",
      "precondition": "evidence_mode == 'CABINET'",
      "effect": "cabinet.open = true",
      "else_effect": "lamp.blue = true",
      "mapping": {
        "CABINET": "cabinet.open = true",
        "LAMP": "lamp.blue = true"
      }
    },
    "videos": []
  },
  {
    "id": "B19",
    "theme": "magic academy",
    "family": "trigger cast",
    "image": "static/images/benchmark/B19.webp",
    "variable": "element",
    "values": [
      "ICE",
      "FIRE"
    ],
    "action": "The wizard stays in place and makes one clear wand-casting sweep.",
    "rule": "If the element is ICE, the stone fountain freezes over with blue ice; if it is FIRE, the iron brazier bursts into red flames.",
    "endings": [
      "the stone fountain freezes over with blue ice",
      "the iron brazier bursts into red flames"
    ],
    "forbidden": [
      "the heavy iron brazier burns with large bright red flames",
      "the wide fountain is frozen over with solid blue ice"
    ],
    "program": {
      "text": "If the element is ICE, the stone fountain freezes over with blue ice; if it is FIRE, the iron brazier bursts into red flames.",
      "precondition": "element == 'ICE'",
      "effect": "fountain.frozen = true",
      "else_effect": "brazier.lit = true",
      "mapping": {
        "ICE": "fountain.frozen = true",
        "FIRE": "brazier.lit = true"
      }
    },
    "videos": []
  },
  {
    "id": "B20",
    "theme": "turn combat",
    "family": "trigger cast",
    "image": "static/images/benchmark/B20.webp",
    "variable": "enemy_reaction",
    "values": [
      "SHIELD",
      "ARMOR"
    ],
    "action": "The player stays in place and performs one large, clear sword-swing attack.",
    "rule": "If the enemy_reaction is SHIELD, the enemy's large shield cracks apart and breaks; if it is ARMOR, the enemy's armor is covered by thick blue ice.",
    "endings": [
      "the enemy's large shield cracks apart and breaks",
      "the enemy's armor is covered by thick blue ice"
    ],
    "forbidden": [
      "the enemy's plate armor is covered with a thick layer of blue ice",
      "the enemy's large round shield is cracked apart and broken"
    ],
    "program": {
      "text": "If the enemy_reaction is SHIELD, the enemy's large shield cracks apart and breaks; if it is ARMOR, the enemy's armor is covered by thick blue ice.",
      "precondition": "enemy_reaction == 'SHIELD'",
      "effect": "shield.state = 'broken'",
      "else_effect": "armor.state = 'frozen'",
      "mapping": {
        "SHIELD": "shield.state = 'broken'",
        "ARMOR": "armor.state = 'frozen'"
      }
    },
    "videos": []
  },
  {
    "id": "B21",
    "theme": "dungeon",
    "family": "trigger cast",
    "image": "static/images/benchmark/B21.webp",
    "variable": "curse_mode",
    "values": [
      "STATUE",
      "GATE"
    ],
    "action": "The player raises the staff and makes one clear downward casting sweep.",
    "rule": "If the curse_mode is STATUE, the skull statue cracks apart into two pieces; if it is GATE, the big stone door behind it opens wide.",
    "endings": [
      "the skull statue cracks apart into two pieces",
      "the big stone door behind it opens wide"
    ],
    "forbidden": [
      "the big stone door is wide open",
      "the skull statue is cracked apart into two pieces"
    ],
    "program": {
      "text": "If the curse_mode is STATUE, the skull statue cracks apart into two pieces; if it is GATE, the big stone door behind it opens wide.",
      "precondition": "curse_mode == 'STATUE'",
      "effect": "statue.state = 'cracked'",
      "else_effect": "door.open = true",
      "mapping": {
        "STATUE": "statue.state = 'cracked'",
        "GATE": "door.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B22",
    "theme": "healer",
    "family": "trigger cast",
    "image": "static/images/benchmark/B22.webp",
    "variable": "heal_route",
    "values": [
      "PATIENT",
      "PLANT"
    ],
    "action": "The healer raises the healing staff and releases one clearly visible pulse of energy.",
    "rule": "If the heal_route is PATIENT, a large green glowing aura surrounds the patient; if it is PLANT, the plant opens one large white flower.",
    "endings": [
      "a large green glowing aura surrounds the patient",
      "the plant opens one large white flower"
    ],
    "forbidden": [
      "the potted plant bears one large open white flower",
      "the patient is surrounded by a large bright green glowing aura"
    ],
    "program": {
      "text": "If the heal_route is PATIENT, a large green glowing aura surrounds the patient; if it is PLANT, the plant opens one large white flower.",
      "precondition": "heal_route == 'PATIENT'",
      "effect": "patient.aura = true",
      "else_effect": "plant.bloomed = true",
      "mapping": {
        "PATIENT": "patient.aura = true",
        "PLANT": "plant.bloomed = true"
      }
    },
    "videos": []
  },
  {
    "id": "B23",
    "theme": "survival",
    "family": "trigger cast",
    "image": "static/images/benchmark/B23.webp",
    "variable": "survival_mode",
    "values": [
      "LOG",
      "FIRE"
    ],
    "action": "The player stays in place and performs one clear downward axe swing.",
    "rule": "If the survival_mode is LOG, the stump splits into two halves; if it is FIRE, the campfire behind bursts into tall flames.",
    "endings": [
      "the stump splits into two halves",
      "the campfire behind bursts into tall flames"
    ],
    "forbidden": [
      "the campfire burns with tall bright flames",
      "the large wood stump is split into two halves"
    ],
    "program": {
      "text": "If the survival_mode is LOG, the stump splits into two halves; if it is FIRE, the campfire behind bursts into tall flames.",
      "precondition": "survival_mode == 'LOG'",
      "effect": "stump.state = 'split'",
      "else_effect": "fire.lit = true",
      "mapping": {
        "LOG": "stump.state = 'split'",
        "FIRE": "fire.lit = true"
      }
    },
    "videos": []
  },
  {
    "id": "B24",
    "theme": "museum",
    "family": "trigger cast",
    "image": "static/images/benchmark/B24.webp",
    "variable": "scan_mode",
    "values": [
      "PATTERN",
      "CASE"
    ],
    "action": "The player raises the scanner toward the statue and emits one clearly visible scanning beam.",
    "rule": "If the scan_mode is PATTERN, large blue tracery covers the statue; if it is CASE, the glass case rises high and open.",
    "endings": [
      "large blue tracery covers the statue",
      "the glass case rises high and open"
    ],
    "forbidden": [
      "the glass display case is raised high and open above its base",
      "the statue surface is covered with large blue glowing tracery"
    ],
    "program": {
      "text": "If the scan_mode is PATTERN, large blue tracery covers the statue; if it is CASE, the glass case rises high and open.",
      "precondition": "scan_mode == 'PATTERN'",
      "effect": "statue.pattern = true",
      "else_effect": "case.up = true",
      "mapping": {
        "PATTERN": "statue.pattern = true",
        "CASE": "case.up = true"
      }
    },
    "videos": []
  },
  {
    "id": "B25",
    "theme": "open world",
    "family": "trigger cast",
    "image": "static/images/benchmark/B25.webp",
    "variable": "relic_mode",
    "values": [
      "MONOLITH",
      "TORCHES"
    ],
    "action": "The player stays in place, clearly draws the bow, and releases once.",
    "rule": "If the relic_mode is MONOLITH, the whole monolith glows strong purple; if it is TORCHES, both fire towers burst into large flames.",
    "endings": [
      "the whole monolith glows strong purple",
      "both fire towers burst into large flames"
    ],
    "forbidden": [
      "both fire towers burn with large bright flames",
      "the whole monolith glows strong purple"
    ],
    "program": {
      "text": "If the relic_mode is MONOLITH, the whole monolith glows strong purple; if it is TORCHES, both fire towers burst into large flames.",
      "precondition": "relic_mode == 'MONOLITH'",
      "effect": "monolith.lit = true",
      "else_effect": "towers.lit = true",
      "mapping": {
        "MONOLITH": "monolith.lit = true",
        "TORCHES": "towers.lit = true"
      }
    },
    "videos": []
  },
  {
    "id": "B26",
    "theme": "stealth",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B26.webp",
    "variable": "security_mode",
    "values": [
      "GUARD",
      "ALARM"
    ],
    "action": "The player stays behind the cover and performs one clear whistling gesture.",
    "rule": "If the security_mode is GUARD, the guard walks up to the near foreground; if it is ALARM, the alarm lamp flashes bright red.",
    "endings": [
      "the guard walks up to the near foreground",
      "the alarm lamp flashes bright red"
    ],
    "forbidden": [
      "the large alarm lamp flashes bright red",
      "the guard stands in the near foreground beside the cover"
    ],
    "program": {
      "text": "If the security_mode is GUARD, the guard walks up to the near foreground; if it is ALARM, the alarm lamp flashes bright red.",
      "precondition": "security_mode == 'GUARD'",
      "effect": "guard.near = true",
      "else_effect": "alarm.red = true",
      "mapping": {
        "GUARD": "guard.near = true",
        "ALARM": "alarm.red = true"
      }
    },
    "videos": []
  },
  {
    "id": "B27",
    "theme": "ranch",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B27.webp",
    "variable": "whistle_mode",
    "values": [
      "HERD",
      "BARN"
    ],
    "action": "The player stays in place and performs one clear whistling gesture.",
    "rule": "If the whistle_mode is HERD, the two sheep come to stand close beside the player; if it is BARN, the big barn door swings wide open.",
    "endings": [
      "the two sheep come to stand close beside the player",
      "the big barn door swings wide open"
    ],
    "forbidden": [
      "the big barn door is wide open",
      "the two sheep stand close beside the player"
    ],
    "program": {
      "text": "If the whistle_mode is HERD, the two sheep come to stand close beside the player; if it is BARN, the big barn door swings wide open.",
      "precondition": "whistle_mode == 'HERD'",
      "effect": "sheep.near = true",
      "else_effect": "barn.open = true",
      "mapping": {
        "HERD": "sheep.near = true",
        "BARN": "barn.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B28",
    "theme": "sailing",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B28.webp",
    "variable": "ship_signal",
    "values": [
      "SAIL",
      "LIGHT"
    ],
    "action": "The player strikes the large deck bell once.",
    "rule": "If the ship_signal is SAIL, the main sail spreads fully out; if it is LIGHT, the stern signal lamp glows bright red.",
    "endings": [
      "the main sail spreads fully out",
      "the stern signal lamp glows bright red"
    ],
    "forbidden": [
      "the stern signal lamp glows bright red",
      "the main sail is fully spread"
    ],
    "program": {
      "text": "If the ship_signal is SAIL, the main sail spreads fully out; if it is LIGHT, the stern signal lamp glows bright red.",
      "precondition": "ship_signal == 'SAIL'",
      "effect": "sail.unfurled = true",
      "else_effect": "lamp.red = true",
      "mapping": {
        "SAIL": "sail.unfurled = true",
        "LIGHT": "lamp.red = true"
      }
    },
    "videos": []
  },
  {
    "id": "B29",
    "theme": "cooking",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B29.webp",
    "variable": "kitchen_mode",
    "values": [
      "OVEN",
      "POT"
    ],
    "action": "The player presses the large kitchen service bell once.",
    "rule": "If the kitchen_mode is OVEN, the big oven door swings wide open; if it is POT, the broth in the pot turns vivid red.",
    "endings": [
      "the big oven door swings wide open",
      "the broth in the pot turns vivid red"
    ],
    "forbidden": [
      "the broth in the large pot is vivid fresh red",
      "the big oven door is wide open"
    ],
    "program": {
      "text": "If the kitchen_mode is OVEN, the big oven door swings wide open; if it is POT, the broth in the pot turns vivid red.",
      "precondition": "kitchen_mode == 'OVEN'",
      "effect": "oven.open = true",
      "else_effect": "soup.red = true",
      "mapping": {
        "OVEN": "oven.open = true",
        "POT": "soup.red = true"
      }
    },
    "videos": []
  },
  {
    "id": "B30",
    "theme": "shopkeeping",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B30.webp",
    "variable": "store_scene",
    "values": [
      "SHELF",
      "SIGN"
    ],
    "action": "The player stays in place and performs one clear clap.",
    "rule": "If the store_scene is SHELF, the large shelf slides out toward the front; if it is SIGN, the top sign glows bright green.",
    "endings": [
      "the large shelf slides out toward the front",
      "the top sign glows bright green"
    ],
    "forbidden": [
      "the top sign panel glows bright green",
      "the large shelf is slid out toward the front"
    ],
    "program": {
      "text": "If the store_scene is SHELF, the large shelf slides out toward the front; if it is SIGN, the top sign glows bright green.",
      "precondition": "store_scene == 'SHELF'",
      "effect": "shelf.out = true",
      "else_effect": "sign.green = true",
      "mapping": {
        "SHELF": "shelf.out = true",
        "SIGN": "sign.green = true"
      }
    },
    "videos": []
  },
  {
    "id": "B31",
    "theme": "farming",
    "family": "trigger zone",
    "image": "static/images/benchmark/B31.webp",
    "variable": "field_mode",
    "values": [
      "WATER",
      "SCARECROW"
    ],
    "action": "The player stays in place and presses the large floor pedal down.",
    "rule": "If the field_mode is WATER, fast water fills the field channel; if it is SCARECROW, the scarecrow's arms stick out level and horizontal.",
    "endings": [
      "fast water fills the field channel",
      "the scarecrow's arms stick out level and horizontal"
    ],
    "forbidden": [
      "the scarecrow's arms stick out level and horizontal",
      "fast flowing water fills the field channel"
    ],
    "program": {
      "text": "If the field_mode is WATER, fast water fills the field channel; if it is SCARECROW, the scarecrow's arms stick out level and horizontal.",
      "precondition": "field_mode == 'WATER'",
      "effect": "channel.flowing = true",
      "else_effect": "scarecrow.arms = true",
      "mapping": {
        "WATER": "channel.flowing = true",
        "SCARECROW": "scarecrow.arms = true"
      }
    },
    "videos": []
  },
  {
    "id": "B32",
    "theme": "escape room",
    "family": "trigger zone",
    "image": "static/images/benchmark/B32.webp",
    "variable": "floor_mode",
    "values": [
      "DOOR",
      "PANEL"
    ],
    "action": "The player takes one short step forward onto the center of the large pressure plate.",
    "rule": "If the floor_mode is DOOR, the stone door rises fully open; if it is PANEL, the wall panel rotates half a turn.",
    "endings": [
      "the stone door rises fully open",
      "the wall panel rotates half a turn"
    ],
    "forbidden": [
      "the wall panel is rotated half a turn onto its side",
      "the stone door is raised fully open, the passage clear"
    ],
    "program": {
      "text": "If the floor_mode is DOOR, the stone door rises fully open; if it is PANEL, the wall panel rotates half a turn.",
      "precondition": "floor_mode == 'DOOR'",
      "effect": "door.up = true",
      "else_effect": "panel.turned = true",
      "mapping": {
        "DOOR": "door.up = true",
        "PANEL": "panel.turned = true"
      }
    },
    "videos": []
  },
  {
    "id": "B33",
    "theme": "magic academy",
    "family": "trigger zone",
    "image": "static/images/benchmark/B33.webp",
    "variable": "circle_mode",
    "values": [
      "CRYSTAL",
      "BOOKS"
    ],
    "action": "The player takes one short step forward into the magic circle.",
    "rule": "If the circle_mode is CRYSTAL, the large crystal floats up glowing blue; if it is BOOKS, all the shelf books flip open.",
    "endings": [
      "the large crystal floats up glowing blue",
      "all the shelf books flip open"
    ],
    "forbidden": [
      "the books on the shelves are all open with spread pages",
      "the large crystal floats high in the air glowing blue"
    ],
    "program": {
      "text": "If the circle_mode is CRYSTAL, the large crystal floats up glowing blue; if it is BOOKS, all the shelf books flip open.",
      "precondition": "circle_mode == 'CRYSTAL'",
      "effect": "crystal.up = true",
      "else_effect": "books.open = true",
      "mapping": {
        "CRYSTAL": "crystal.up = true",
        "BOOKS": "books.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B34",
    "theme": "camping",
    "family": "trigger zone",
    "image": "static/images/benchmark/B34.webp",
    "variable": "camp_trigger",
    "values": [
      "FIRE",
      "TENT"
    ],
    "action": "The player takes one short step forward into the circular campsite marker.",
    "rule": "If the camp_trigger is FIRE, the campfire bursts into tall flames; if it is TENT, the tent entrance flap opens wide.",
    "endings": [
      "the campfire bursts into tall flames",
      "the tent entrance flap opens wide"
    ],
    "forbidden": [
      "the tent entrance flap is wide open",
      "the campfire burns with tall bright flames"
    ],
    "program": {
      "text": "If the camp_trigger is FIRE, the campfire bursts into tall flames; if it is TENT, the tent entrance flap opens wide.",
      "precondition": "camp_trigger == 'FIRE'",
      "effect": "fire.lit = true",
      "else_effect": "tent.open = true",
      "mapping": {
        "FIRE": "fire.lit = true",
        "TENT": "tent.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B35",
    "theme": "museum",
    "family": "trigger zone",
    "image": "static/images/benchmark/B35.webp",
    "variable": "gallery_mode",
    "values": [
      "STATUE",
      "CURTAIN"
    ],
    "action": "The player takes one short step forward onto the large gallery floor marker.",
    "rule": "If the gallery_mode is STATUE, the statue rotates a quarter turn; if it is CURTAIN, the back curtain pulls fully open.",
    "endings": [
      "the statue rotates a quarter turn",
      "the back curtain pulls fully open"
    ],
    "forbidden": [
      "the curtain is pulled fully open to the sides",
      "the statue is rotated a quarter turn to the side"
    ],
    "program": {
      "text": "If the gallery_mode is STATUE, the statue rotates a quarter turn; if it is CURTAIN, the back curtain pulls fully open.",
      "precondition": "gallery_mode == 'STATUE'",
      "effect": "statue.turned = true",
      "else_effect": "curtain.open = true",
      "mapping": {
        "STATUE": "statue.turned = true",
        "CURTAIN": "curtain.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B36",
    "theme": "open world",
    "family": "trigger zone",
    "image": "static/images/benchmark/B36.webp",
    "variable": "zone_mode",
    "values": [
      "PILLARS",
      "FOUNTAIN"
    ],
    "action": "The player takes one short step forward across the ruin entrance line.",
    "rule": "If the zone_mode is PILLARS, both stone pillars rise tall from the ground; if it is FOUNTAIN, the fountain jets a tall plume of water.",
    "endings": [
      "both stone pillars rise tall from the ground",
      "the fountain jets a tall plume of water"
    ],
    "forbidden": [
      "the fountain jets a tall plume of water",
      "both stone pillars stand tall, risen from the ground"
    ],
    "program": {
      "text": "If the zone_mode is PILLARS, both stone pillars rise tall from the ground; if it is FOUNTAIN, the fountain jets a tall plume of water.",
      "precondition": "zone_mode == 'PILLARS'",
      "effect": "pillars.up = true",
      "else_effect": "fountain.running = true",
      "mapping": {
        "PILLARS": "pillars.up = true",
        "FOUNTAIN": "fountain.running = true"
      }
    },
    "videos": []
  },
  {
    "id": "B37",
    "theme": "cooking",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B37.webp",
    "variable": "recipe_mode",
    "values": [
      "SOUP",
      "OVEN"
    ],
    "action": "The chef stays in place and raises one hand in a clear start gesture.",
    "rule": "If the recipe_mode is SOUP, the broth in the pot turns vivid green; if it is OVEN, orange flames rise from the oven top.",
    "endings": [
      "the broth in the pot turns vivid green",
      "orange flames rise from the oven top"
    ],
    "forbidden": [
      "bright orange flames rise from the oven top",
      "the broth in the large pot is vivid green"
    ],
    "program": {
      "text": "If the recipe_mode is SOUP, the broth in the pot turns vivid green; if it is OVEN, orange flames rise from the oven top.",
      "precondition": "recipe_mode == 'SOUP'",
      "effect": "soup.green = true",
      "else_effect": "oven.flame = true",
      "mapping": {
        "SOUP": "soup.green = true",
        "OVEN": "oven.flame = true"
      }
    },
    "videos": []
  },
  {
    "id": "B38",
    "theme": "fishing",
    "family": "trigger mechanism",
    "image": "static/images/benchmark/B38.webp",
    "variable": "fishing_mode",
    "values": [
      "FLOAT",
      "LIGHT"
    ],
    "action": "The player raises the right arm in a clear reel-in command while the fixed reel visibly rotates.",
    "rule": "If the fishing_mode is FLOAT, the large float is pulled up high out of the water; if it is LIGHT, the shore lamp glows bright blue.",
    "endings": [
      "the large float is pulled up high out of the water",
      "the shore lamp glows bright blue"
    ],
    "forbidden": [
      "the shore lamp glows bright blue",
      "the large red float is pulled up high out of the water"
    ],
    "program": {
      "text": "If the fishing_mode is FLOAT, the large float is pulled up high out of the water; if it is LIGHT, the shore lamp glows bright blue.",
      "precondition": "fishing_mode == 'FLOAT'",
      "effect": "float.up = true",
      "else_effect": "lamp.blue = true",
      "mapping": {
        "FLOAT": "float.up = true",
        "LIGHT": "lamp.blue = true"
      }
    },
    "videos": []
  },
  {
    "id": "B39",
    "theme": "detective",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B39.webp",
    "variable": "investigation_mode",
    "values": [
      "WALL",
      "CABINET"
    ],
    "action": "The player stays in place and raises one arm in a clear command gesture.",
    "rule": "If the investigation_mode is WALL, blue glowing outlines appear on the evidence wall; if it is CABINET, the evidence cabinet doors open wide.",
    "endings": [
      "blue glowing outlines appear on the evidence wall",
      "the evidence cabinet doors open wide"
    ],
    "forbidden": [
      "the large evidence cabinet doors are wide open",
      "large blue glowing outlines mark items on the evidence wall"
    ],
    "program": {
      "text": "If the investigation_mode is WALL, blue glowing outlines appear on the evidence wall; if it is CABINET, the evidence cabinet doors open wide.",
      "precondition": "investigation_mode == 'WALL'",
      "effect": "wall.mark = true",
      "else_effect": "cabinet.open = true",
      "mapping": {
        "WALL": "wall.mark = true",
        "CABINET": "cabinet.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B40",
    "theme": "visual novel",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B40.webp",
    "variable": "scene_mode",
    "values": [
      "NPC",
      "LIGHTS"
    ],
    "action": "The player stays in place and performs one clear bow.",
    "rule": "If the scene_mode is NPC, the NPC sits down on the chair; if it is LIGHTS, all the stage lanterns glow purple.",
    "endings": [
      "the NPC sits down on the chair",
      "all the stage lanterns glow purple"
    ],
    "forbidden": [
      "the stage lanterns all glow purple",
      "the NPC sits down on the chair"
    ],
    "program": {
      "text": "If the scene_mode is NPC, the NPC sits down on the chair; if it is LIGHTS, all the stage lanterns glow purple.",
      "precondition": "scene_mode == 'NPC'",
      "effect": "npc.seated = true",
      "else_effect": "lights.purple = true",
      "mapping": {
        "NPC": "npc.seated = true",
        "LIGHTS": "lights.purple = true"
      }
    },
    "videos": []
  },
  {
    "id": "B41",
    "theme": "dating",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B41.webp",
    "variable": "date_mode",
    "values": [
      "NPC",
      "FOUNTAIN"
    ],
    "action": "The player stays in place and gives one clear wave.",
    "rule": "If the date_mode is NPC, the NPC sits down on the bench; if it is FOUNTAIN, the fountain jets a tall plume of water.",
    "endings": [
      "the NPC sits down on the bench",
      "the fountain jets a tall plume of water"
    ],
    "forbidden": [
      "the fountain jets a tall plume of water",
      "the NPC sits down on the bench"
    ],
    "program": {
      "text": "If the date_mode is NPC, the NPC sits down on the bench; if it is FOUNTAIN, the fountain jets a tall plume of water.",
      "precondition": "date_mode == 'NPC'",
      "effect": "npc.seated = true",
      "else_effect": "fountain.running = true",
      "mapping": {
        "NPC": "npc.seated = true",
        "FOUNTAIN": "fountain.running = true"
      }
    },
    "videos": []
  },
  {
    "id": "B42",
    "theme": "card game",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B42.webp",
    "variable": "card_effect",
    "values": [
      "CARD",
      "FIRE"
    ],
    "action": "The player stays in place and raises one hand high above the head.",
    "rule": "If the card_effect is CARD, the giant card flips face up; if it is FIRE, both braziers burst into blue flames.",
    "endings": [
      "the giant card flips face up",
      "both braziers burst into blue flames"
    ],
    "forbidden": [
      "both braziers burn with large blue flames",
      "the giant card lies face up showing its illustrated front"
    ],
    "program": {
      "text": "If the card_effect is CARD, the giant card flips face up; if it is FIRE, both braziers burst into blue flames.",
      "precondition": "card_effect == 'CARD'",
      "effect": "card.face = 'up'",
      "else_effect": "braziers.blue = true",
      "mapping": {
        "CARD": "card.face = 'up'",
        "FIRE": "braziers.blue = true"
      }
    },
    "videos": []
  },
  {
    "id": "B43",
    "theme": "turn combat",
    "family": "trigger cast",
    "image": "static/images/benchmark/B43.webp",
    "variable": "combat_effect",
    "values": [
      "ENEMY",
      "PILLAR"
    ],
    "action": "The player stays in place and performs one clear forward sword swing without requiring blade contact.",
    "rule": "If the combat_effect is ENEMY, the enemy kneels down and stays kneeling; if it is PILLAR, the magic pillar behind burns with red flames.",
    "endings": [
      "the enemy kneels down and stays kneeling",
      "the magic pillar behind burns with red flames"
    ],
    "forbidden": [
      "the large magic pillar burns with red flames",
      "the enemy kneels down on one knee and stays kneeling"
    ],
    "program": {
      "text": "If the combat_effect is ENEMY, the enemy kneels down and stays kneeling; if it is PILLAR, the magic pillar behind burns with red flames.",
      "precondition": "combat_effect == 'ENEMY'",
      "effect": "enemy.kneeling = true",
      "else_effect": "pillar.red = true",
      "mapping": {
        "ENEMY": "enemy.kneeling = true",
        "PILLAR": "pillar.red = true"
      }
    },
    "videos": []
  },
  {
    "id": "B44",
    "theme": "survival",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B44.webp",
    "variable": "power_mode",
    "values": [
      "BLAZE",
      "LIGHTS"
    ],
    "action": "The player stays in place and extends one arm straight upward.",
    "rule": "If the power_mode is BLAZE, the fire pit logs burst into orange flames; if it is LIGHTS, all three camp lamps glow white.",
    "endings": [
      "the fire pit logs burst into orange flames",
      "all three camp lamps glow white"
    ],
    "forbidden": [
      "all three camp lamps glow bright white",
      "the log stack burns with large bright orange flames"
    ],
    "program": {
      "text": "If the power_mode is BLAZE, the fire pit logs burst into orange flames; if it is LIGHTS, all three camp lamps glow white.",
      "precondition": "power_mode == 'BLAZE'",
      "effect": "fire.lit = true",
      "else_effect": "lamps.on = true",
      "mapping": {
        "BLAZE": "fire.lit = true",
        "LIGHTS": "lamps.on = true"
      }
    },
    "videos": []
  },
  {
    "id": "B45",
    "theme": "shopkeeping",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B45.webp",
    "variable": "opening_mode",
    "values": [
      "CURTAIN",
      "SIGN"
    ],
    "action": "The player stays in place and clearly spreads both arms sideways.",
    "rule": "If the opening_mode is CURTAIN, the window curtain pulls fully open; if it is SIGN, the big top sign glows bright red.",
    "endings": [
      "the window curtain pulls fully open",
      "the big top sign glows bright red"
    ],
    "forbidden": [
      "the big top sign panel glows bright red",
      "the window curtain is pulled fully open to the sides"
    ],
    "program": {
      "text": "If the opening_mode is CURTAIN, the window curtain pulls fully open; if it is SIGN, the big top sign glows bright red.",
      "precondition": "opening_mode == 'CURTAIN'",
      "effect": "curtain.open = true",
      "else_effect": "sign.red = true",
      "mapping": {
        "CURTAIN": "curtain.open = true",
        "SIGN": "sign.red = true"
      }
    },
    "videos": []
  },
  {
    "id": "B46",
    "theme": "farming",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B46.webp",
    "variable": "growth_mode",
    "values": [
      "FLOWER",
      "WATER"
    ],
    "action": "The player stays in place and raises both hands in one clear casting-like gesture.",
    "rule": "If the growth_mode is FLOWER, the central plant opens one large yellow flower; if it is WATER, all the sprinklers spray wide water jets.",
    "endings": [
      "the central plant opens one large yellow flower",
      "all the sprinklers spray wide water jets"
    ],
    "forbidden": [
      "all the sprinkler heads spray wide water jets",
      "the central plant bears one large yellow flower"
    ],
    "program": {
      "text": "If the growth_mode is FLOWER, the central plant opens one large yellow flower; if it is WATER, all the sprinklers spray wide water jets.",
      "precondition": "growth_mode == 'FLOWER'",
      "effect": "plant.flower = true",
      "else_effect": "sprinklers.on = true",
      "mapping": {
        "FLOWER": "plant.flower = true",
        "WATER": "sprinklers.on = true"
      }
    },
    "videos": []
  },
  {
    "id": "B47",
    "theme": "ranch",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B47.webp",
    "variable": "ranch_mode",
    "values": [
      "WINDMILL",
      "BARN"
    ],
    "action": "The player stays in place and raises one arm high.",
    "rule": "If the ranch_mode is WINDMILL, the windmill blades start spinning fast; if it is BARN, the big barn door swings wide open.",
    "endings": [
      "the windmill blades start spinning fast",
      "the big barn door swings wide open"
    ],
    "forbidden": [
      "the big barn door is wide open",
      "the large windmill blades spin fast"
    ],
    "program": {
      "text": "If the ranch_mode is WINDMILL, the windmill blades start spinning fast; if it is BARN, the big barn door swings wide open.",
      "precondition": "ranch_mode == 'WINDMILL'",
      "effect": "windmill.spinning = true",
      "else_effect": "barn.open = true",
      "mapping": {
        "WINDMILL": "windmill.spinning = true",
        "BARN": "barn.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B48",
    "theme": "sailing",
    "family": "trigger gesture",
    "image": "static/images/benchmark/B48.webp",
    "variable": "ship_mode",
    "values": [
      "SAIL",
      "WHEEL"
    ],
    "action": "The player stays in place and makes one clear forward command gesture with both arms.",
    "rule": "If the ship_mode is SAIL, the main sail spreads fully out; if it is WHEEL, the side water wheel spins fast.",
    "endings": [
      "the main sail spreads fully out",
      "the side water wheel spins fast"
    ],
    "forbidden": [
      "the large side water wheel spins fast",
      "the main sail is fully spread"
    ],
    "program": {
      "text": "If the ship_mode is SAIL, the main sail spreads fully out; if it is WHEEL, the side water wheel spins fast.",
      "precondition": "ship_mode == 'SAIL'",
      "effect": "sail.unfurled = true",
      "else_effect": "wheel.spinning = true",
      "mapping": {
        "SAIL": "sail.unfurled = true",
        "WHEEL": "wheel.spinning = true"
      }
    },
    "videos": []
  },
  {
    "id": "B49",
    "theme": "dungeon",
    "family": "trigger cast",
    "image": "static/images/benchmark/B49.webp",
    "variable": "hall_mode",
    "values": [
      "DOOR",
      "STATUE"
    ],
    "action": "The player stays in place and raises the staff vertically.",
    "rule": "If the hall_mode is DOOR, the left stone door rises fully open; if it is STATUE, the statue's wings spread fully open.",
    "endings": [
      "the left stone door rises fully open",
      "the statue's wings spread fully open"
    ],
    "forbidden": [
      "the statue's wings spread fully open",
      "the left stone door is raised fully open"
    ],
    "program": {
      "text": "If the hall_mode is DOOR, the left stone door rises fully open; if it is STATUE, the statue's wings spread fully open.",
      "precondition": "hall_mode == 'DOOR'",
      "effect": "door.up = true",
      "else_effect": "wings.open = true",
      "mapping": {
        "DOOR": "door.up = true",
        "STATUE": "wings.open = true"
      }
    },
    "videos": []
  },
  {
    "id": "B50",
    "theme": "magic academy",
    "family": "trigger cast",
    "image": "static/images/benchmark/B50.webp",
    "variable": "target_route",
    "values": [
      "VIEWER_LEFT",
      "VIEWER_RIGHT"
    ],
    "action": "The wizard stays in place, raises the wand high, and makes one clear forward casting sweep.",
    "rule": "If the target_route is VIEWER_LEFT, the brazier on the viewer's left burns with large green flames while the right one stays dark; if it is VIEWER_RIGHT, the brazier on the viewer's right burns with large green flames while the left one stays dark.",
    "endings": [
      "the brazier on the viewer's left burns with large green flames while the right one stays dark",
      "the brazier on the viewer's right burns with large green flames while the left one stays dark"
    ],
    "forbidden": [
      "the viewer's right brazier burns with large green flames",
      "the viewer's left brazier burns with large green flames"
    ],
    "program": {
      "text": "If the target_route is VIEWER_LEFT, the brazier on the viewer's left burns with large green flames while the right one stays dark; if it is VIEWER_RIGHT, the brazier on the viewer's right burns with large green flames while the left one stays dark.",
      "precondition": "target_route == 'VIEWER_LEFT'",
      "effect": "left.lit = true",
      "else_effect": "right.lit = true",
      "mapping": {
        "VIEWER_LEFT": "left.lit = true",
        "VIEWER_RIGHT": "right.lit = true"
      }
    },
    "videos": []
  }
];
