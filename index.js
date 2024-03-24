var likeCount = 0;
var totalLiked = 0;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loop() {
    console.log("Script loading…please wait…");
    var Time1 = Math.ceil(Math.random() * 10) + 3;
    var Time2 = Math.ceil(Math.random() * 10) + 3;
    var randomSkip = Math.random() * 10;

    // Like semua postingan yang ada di halaman
    async function likeAllPosts() {
        var posts = document.querySelectorAll('svg[aria-label="Like"]');
        for (let i = 0; i < posts.length; i++) {
            await sleep(3000); // Tunggu sebentar sebelum melike postingan berikutnya (sesuaikan kebutuhan Anda)
            posts[i].parentElement.click();
            likeCount++;
            totalLiked++;
            console.log("Liked post " + likeCount);
            if (likeCount % 20 === 0) {
                console.log("Liked 20 posts. Resting for 5 minutes...");
                await sleep(5 * 60 * 1000); // Istirahat selama 5 menit setelah melike 20 postingan
            }
        }
    }

    // Jika ada postingan yang belum dilike, like semua postingan
    if (document.querySelectorAll('svg[aria-label="Like"]').length > 0) {
        await likeAllPosts();
    }

    // Scroll ke bawah untuk memuat lebih banyak postingan
    window.scrollTo(0, document.body.scrollHeight);

    // Lanjut ke postingan berikutnya jika tombol "Next" ditemukan
    if (document.querySelectorAll("svg[aria-label='Next']").length) {
        console.log("Loading next post");
        var btn = document.querySelectorAll("svg[aria-label='Next']");
        btn[0].parentElement.click();

        // Tunggu hingga postingan berikutnya dimuat sepenuhnya sebelum memproses postingan selanjutnya
        await sleep(5000); // Sesuaikan dengan kebutuhan Anda atau gunakan cara lain untuk menunggu loading selesai
        loop(); // Panggil kembali fungsi loop untuk memproses postingan berikutnya
    } else {
        console.log("No more posts on this tag!");
        // Kembali ke awal jika tidak ada postingan lagi
        console.log("Restarting...");
        await sleep(5000); // Tunggu sebentar sebelum memulai ulang (sesuaikan dengan kebutuhan Anda)
        loop(); // Panggil kembali fungsi loop untuk memulai ulang
    }
}

loop();
