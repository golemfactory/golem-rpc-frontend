
function getDateDifferenceInSecs(date1:Date, date2:Date) {
    return (date1.getTime() - date2.getTime()) / 1000;
}


class SizesInfo {
    x: Date[];
    val: number[];
    constructor(x: Date[], val: number[]) {
        this.x = x;
        this.val = val;
    }

    mapToNewXs(arr: Date[]) : number[] {

        let idx1 = 0;
        let idx2 = 0;
        let arr1 = this.x;
        let arr2 = arr;

        if (arr1.length === 0) {
            return [];
        }
        if (arr2.length === 0) {
            return [];
        }

        let res: number[] = [];
        for (let i = 0; i < arr2.length; i++) {
            res.push(0);
        }
        while (idx1 < arr1.length && idx2 < arr2.length) {
            if (arr1[idx1] < arr2[idx2]) {
                res[idx2] = this.val[idx1];
                idx1 += 1;
                continue;
            } else {
                idx2 += 1;
                if (idx2 < arr2.length) {
                    res[idx2] = res[idx2 - 1];
                }
                continue;
            }
        }
        return res;
    }

    getXData() {
        return this.x;
    }
    getValData() {
        return this.val;
    }

}

export function plotFromErigonLogEvents(data:any, sizes:any) : any {
    let events = data.events;
    let times = [];
    let block_nums = [];
    let block_speeds = [];
    let execution_from = 0;
    let execution_to = 15380000;
    for (let d of events) {
        if (d.type === "execution") {
            times.push(new Date(d.time));
            block_nums.push(parseFloat(d.info.blk_num));
            block_speeds.push(parseFloat(d.info.blk_per_s));
        } else if (d.type === "execution_limits") {
            execution_from = d.info.from;
            execution_to = parseInt(d.info.to);
            //vals.push(5);
        }
    }
    console.log(execution_to);

    let sizes_times : Date[] = [];
    let sizes_values : number[] = [];
    console.log(sizes);
    for (let dt in sizes) {
        let dObj = new Date(dt);
        let sizeValue = parseInt(sizes[dt]["erigon_data_size"]);
        sizes_times.push(dObj);
        sizes_values.push(sizeValue);
    }
    let sizesInfo = new SizesInfo(sizes_times, sizes_values);



    if (times.length > 10) {
        let xmin = times[0];
        let xmax = times[times.length - 1];

        let last_date = times[times.length - 1];

        const COMPARE_EVENTS_BEFORE = Math.min(100, times.length - 1);
        let date2 = times[times.length - COMPARE_EVENTS_BEFORE];
        let dif_secs = getDateDifferenceInSecs(last_date, date2);


        let last_speed = (block_nums[times.length - 1] - block_nums[times.length - COMPARE_EVENTS_BEFORE]) / dif_secs;
        console.log("Block per sec: " + last_speed);
        console.log(last_speed);

        let block_left = execution_to - block_nums[times.length - 1];
        console.log("Block left: " + block_left);
        let time_left = block_left / last_speed;
        console.log("Time left: " + time_left);

        //todo
        last_date.getTime()
        let new_date = new Date();

        //new_date.setUTCSeconds(last_date.getUTCSeconds());
        new_date.setTime(last_date.getTime() + time_left * 1000);


        let cross_array_x = [];
        let cross_array_y = [];

        let y = sizesInfo.mapToNewXs(times);
        for (let idx1 = 0; idx1 < times.length; idx1 += 1) {
            cross_array_x.push(block_nums[idx1]);
            cross_array_y.push(y[idx1]);
        }


        let plotlyData = [
            {
                x: times,
                y: block_nums,
                type: 'scatter',
            },
            {
                x: [xmin, new_date],
                y: [execution_to, execution_to],
                type: 'scatter'
            },
            {
                x: [xmin, new_date],
                y: [execution_from, execution_from],
                type: 'scatter'
            },
            {
                x: [xmax, new_date],
                y: [block_nums[times.length - 1], execution_to],
                type: 'scatter',

            },
            {
                x: sizesInfo.getXData(),
                y: sizesInfo.getValData(),
                type: 'scatter',
                yaxis: 'y2'
            },
        ];
        let plotlyData2 = [
            {
                x: cross_array_x,
                y: cross_array_y
            }
        ];

        return {
            "plotlyData": plotlyData,
            "plotlyData2": plotlyData2,
            "lastSpeed": last_speed,
            "estimatedCompletion": new_date,
            "lastDate": last_date,
        };
    }

    return [];
}