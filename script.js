document.addEventListener("DOMContentLoaded", function() {
    fetch('finance.json')
    .then(response => response.json())
    .then(data => {
        let summaryData = document.getElementById("summary-data");
        let detailsSection = document.getElementById("details");
        let detailsData = document.getElementById("details-data");
        let detailTitle = document.getElementById("detail-title");
        let summarySection = document.getElementById("summary");

        let monthlySummary = {};
        let transactionsByMonth = {};

        // Mengelompokkan data berdasarkan bulan
        data.forEach(entry => {
            let month = entry.tanggal.substring(0, 7); // Format YYYY-MM

            // Rekapitulasi total pemasukan & pengeluaran per bulan
            if (!monthlySummary[month]) {
                monthlySummary[month] = { pemasukan: 0, pengeluaran: 0 };
                transactionsByMonth[month] = [];
            }

            monthlySummary[month].pemasukan += entry.pemasukan || 0;
            monthlySummary[month].pengeluaran += entry.pengeluaran || 0;
            transactionsByMonth[month].push(entry);
        });

        // Menampilkan rekapitulasi per bulan
        for (let month in monthlySummary) {
            let summaryRow = `<tr onclick="showDetails('${month}')">
                <td>${month}</td>
                <td>Rp ${monthlySummary[month].pemasukan.toLocaleString()}</td>
                <td>Rp ${monthlySummary[month].pengeluaran.toLocaleString()}</td>
            </tr>`;
            summaryData.innerHTML += summaryRow;
        }

        // Fungsi untuk menampilkan detail transaksi bulan tertentu
        window.showDetails = function(month) {
            detailTitle.innerText = `Detail Transaksi Bulan ${month}`;
            detailsData.innerHTML = "";
            
            transactionsByMonth[month].forEach(entry => {
                let row = `<tr>
                    <td>${entry.tanggal}</td>
                    <td>${entry.keterangan}</td>
                    <td>${entry.pemasukan ? 'Rp ' + entry.pemasukan.toLocaleString() : '-'}</td>
                    <td>${entry.pengeluaran ? 'Rp ' + entry.pengeluaran.toLocaleString() : '-'}</td>
                </tr>`;
                detailsData.innerHTML += row;
            });

            // Menampilkan bagian detail dan menyembunyikan rekapitulasi
            detailsSection.style.display = "block";
            summarySection.style.display = "none";
        };

        // Fungsi untuk kembali ke rekapitulasi
        window.hideDetails = function() {
            detailsSection.style.display = "none";
            summarySection.style.display = "block";
        };
    })
    .catch(error => console.error("Error loading finance data:", error));
});
