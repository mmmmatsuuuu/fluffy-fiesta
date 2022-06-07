// n秒待つ
export const Delay = (n) => {
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

// モーダルを表示
export const Modal = async(content, parentDOM, time) => {
    const bg = document.createElement("div");
    bg.className = "fixed top-0 left-0 z-50 w-screen h-screen bg-paragraph/70 flex justify-center items-center p-8";
    bg.appendChild(content);
    parentDOM.appendChild(bg);

    await Delay(time);

    parentDOM.removeChild(bg);
}

export const MyRound = (num, base) => {
    const rounded = Math.round(num * (10 ** base)) / (10 ** base);

    return rounded;
}

export const Shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }