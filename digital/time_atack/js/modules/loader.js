export const loadPage = async(URL, parentDOM) => {
    const bg = document.createElement("div");
    bg.className = "fixed top-0 left-0 z-50 w-screen h-screen bg-paragraph/70 flex justify-center items-center p-8";
    const p = document.createElement("p");
    p.innerHTML = "問題をロードしています。";
    p.className = "text-white";
    bg.appendChild(p);
    parentDOM.appendChild(bg);

    const response = await fetch(URL)
    .then(res => res.json())
    .then(data => {
        return data;
    });
    
    p.innerHTML = "問題をロードしました。問題数は全部で5問です。3秒後にスタートします。";
    await delay(3);
    p.className = "text-white text-5xl font-bold";
    p.innerHTML = "3";
    await delay(1);
    p.innerHTML = "2";
    await delay(1);
    p.innerHTML = "1";
    await delay(1);
    p.innerHTML = "スタート！";
    await delay(1);

    parentDOM.removeChild(bg);
    return response;
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}