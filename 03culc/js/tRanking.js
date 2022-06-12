import { LoadRank } from "../../js/modules/loader.js";
import { makeRankingTable } from "../../js/modules/tRank.js";

const URL = "https://script.google.com/macros/s/AKfycbwZZmoFlujecnpknFPoMRiidnzuD9rTZM3trAM27y1_FepD9N5uvQtVXwaymj48-xon/exec?mode=tr";

let rank = [];

document.addEventListener("DOMContentLoaded", async function() {
    // 初期値
    const qBody = document.getElementById("q-body");
    
    // ロードページの表示と問題の読み込み
    const datas = await LoadRank(URL, qBody);

    rank = datas.datas;
    
    const tbody = document.getElementById("t-body");

    makeRankingTable(rank, tbody);
});