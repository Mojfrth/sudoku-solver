const Util = {
    print2DArray: function (grid) {
        for (let i = 0; i < grid.length; i++) {
            console.log(...grid[i]);
        }
        console.log();
    },
    copyGrid: function (from, to) {
        for (let i = 0; i < from.length; i++) {
            to[i] = [...from[i]];
        }
    },
    sleep: async function (ms) {
        if (ms === 0) return;
        if (!ms) {
            throw new Error("Speed parameter not defined!");
        }
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    },
};

export { Util };