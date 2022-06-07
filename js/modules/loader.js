import { Delay } from "./common.js";


export const LoadPage = async(URL, parentDOM) => {
    const bg = document.createElement("div");
    bg.className = "fixed top-0 left-0 z-50 w-screen h-screen bg-paragraph/70 flex justify-center items-center p-8";
    
    const div = document.createElement("div");
    div.className = "border-2 border-stroke p-4 rounded bg-highlight mb-4 w-2/3";
    
    const p = document.createElement("p");
    p.className = "text-lg font-bold";
    p.innerHTML = "問題をロードしています。";
    div.appendChild(p);
    
    bg.appendChild(div);
    parentDOM.appendChild(bg);



    const response = await fetch(URL)
    .then(res => res.json())
    .then(data => {
        return data;
    });
    
    p.innerHTML = "問題をロードしました。問題数は全部で5問です。3秒後にスタートします。";
    await Delay(3);
    p.className = "text-5xl font-bold text-center";
    p.innerHTML = "3";
    await Delay(1);
    p.innerHTML = "2";
    await Delay(1);
    p.innerHTML = "1";
    await Delay(1);
    p.innerHTML = "スタート！";
    await Delay(1);

    parentDOM.removeChild(bg);
    return response;
}

export const LoadRank = async(URL, parentDOM) => {
    const bg = document.createElement("div");
    bg.className = "fixed top-0 left-0 z-50 w-screen h-screen bg-paragraph/70 flex justify-center items-center p-8";
    
    const div = document.createElement("div");
    div.className = "border-2 border-stroke p-4 rounded bg-highlight mb-4 w-2/3";
    
    const p = document.createElement("p");
    p.className = "text-lg font-bold";
    p.innerHTML = "ランキングをロードしています。";
    div.appendChild(p);
    
    bg.appendChild(div);
    parentDOM.appendChild(bg);

    const response = await fetch(URL)
    .then(res => res.json())
    .then(data => {
        return data;
    });

    parentDOM.removeChild(bg);
    return response;
}