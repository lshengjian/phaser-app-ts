export default {
   myconfig:
   {
    w: 11,
    h: 11,
    r: 20,
    backgroundColor: 0xffffff,
    parent: 'game',
    statusBarAlign: 'center',
    credit: 'github.com/lshengjian'
  },
    animations: [
        {
            name: "left_step",
            textures: [
                "L01",
                "L02",
                "L03",
                "L04",
                "L05",
            ],
            repeat: 0,
        },
        {
            name: "top_left_step",
            textures: [
                "TL01",
                "TL02",
                "TL03",
                "TL04",
                "TL05",
            ],
            repeat: 0,
        },
        {
            name: "bottom_left_step",
            textures: [
                "BL01",
                "BL02",
                "BL03",
                "BL04",
                "BL05",
            ],
            repeat: 0,
        },
        {
            name: "left_run",
            textures: [
                "L02",
                "L03",
                "L04",
                "L05",
            ],
            repeat: 3,
        },
        {
            name: "top_left_run",
            textures: [
                "TL02",
                "TL03",
                "TL04",
                "TL05",
            ],
            repeat: 3,
        },
        {
            name: "bottom_left_run",
            textures: [
                "BL02",
                "BL03",
                "BL04",
                "BL05",
            ],
            repeat: 3,
        },
    ],
    origins: {
        left: {x: 0.75, y: 0.75},
        top_left: {x: 0.63, y: 0.83},
        bottom_left: {x: 0.65, y: 0.5},
    },
    stopTextures: {
        left: "L01",
        top_left: "TL01",
        bottom_left: "BL01",
    },
    cannotEscapeTextures: {
        left: "L02",
        top_left: "TL02",
        bottom_left: "BL02",
    },
    directions: [
        {
            scaleX: 1,
            name: "left",
        },
        {
            scaleX: 1,
            name: "top_left",
        },
        {
            scaleX: -1,
            name: "top_left",
        },
        {
            scaleX: -1,
            name: "left",
        },
        {
            scaleX: -1,
            name: "bottom_left",
        },
        {
            scaleX: 1,
            name: "bottom_left",
        },
    ],
    catDefaultDirection: 5,
    catStepLength: 20,
    frameRate: 15
};
