export const TimeCounter = async () => {
    let time = 0;
    const counter = document.getElementById("time-area");
    const counterS = document.getElementById("time-second");

    while (true) {
        var m = Math.floor(time / 60);
        var s = time % 60;
        counter.innerHTML = `経過時間:　${ m } 分 ${ s } 秒`;
        counterS.innerHTML = time;
        await delay(1);
        time++;
    }
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}