import { LoadRank } from "../../js/modules/loader.js";

const URL = "https://script.google.com/macros/s/AKfycbwOxp6yWjVyw-I-mgLmZ75-yqvkOc54yLWvuTdU-x31vQKI0P2_T5LaxlKtqcO0luTwSw/exec?mode=tr";

let rank = [];

document.addEventListener("DOMContentLoaded", async function() {
    // 初期値
    const qBody = document.getElementById("q-body");
    
    // ロードページの表示と問題の読み込み
    const datas = await LoadRank(URL, qBody);

    rank = datas.datas;
    
    const tbody = document.getElementById("t-body");
    rank.map(r => {
        var tr = document.createElement("tr");
        tr.className = "border-b border-main";
        switch (r.rank) {
            case 1:
                var td = document.createElement("td");
                td.className = "text-5xl font-bold text-right p-2";
                td.innerHTML = "🥇" + r.rank;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.className = "text-5xl font-bold p-2 text-center";
                td.innerHTML = r.name;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.className = "text-5xl font-bold text-right p-2";
                td.innerHTML = r.score;
                tr.appendChild(td);
                break;
            case 2:
                var td = document.createElement("td");
                td.className = "text-4xl font-bold text-right p-2";
                td.innerHTML = "🥈" + r.rank;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.className = "text-4xl font-bold p-2 text-center";
                td.innerHTML = r.name;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.className = "text-4xl font-bold text-right p-2";
                td.innerHTML = r.score;
                tr.appendChild(td);
                break;
            case 3:
                var td = document.createElement("td");
                td.className = "text-3xl font-bold text-right p-2";
                td.innerHTML = "🥉" + r.rank;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.className = "text-3xl font-bold p-2 text-center";
                td.innerHTML = r.name;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.className = "text-3xl font-bold text-right p-2";
                td.innerHTML = r.score;
                tr.appendChild(td);
                break;
            default:
                var td = document.createElement("td");
                td.className = "text-xl text-right p-2";
                td.innerHTML = r.rank;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.className = "text-xl p-2 text-center";
                td.innerHTML = r.name;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.className = "text-xl text-right p-2";
                td.innerHTML = r.score;
                tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
});