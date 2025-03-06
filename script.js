document.addEventListener("DOMContentLoaded", function() {
    fetch('finance.json')
    .then(response => response.json())
    .then(data => {
        let financeData = document.getElementById("finance-data");
        let summaryData = document.getElementById("summary-data");
        let saldo = 0;
        let monthlySummary = {};

        data.forEach(entry => {
            saldo += entry.pemasukan - entry.pengeluaran;

            let row = `<tr>
                <td>${entry.tanggal}</td>
                <td>${entry.keterangan}</td>
                <td>${entry.pemasukan ? 'Rp ' + entry.pemasukan.toLocaleString() : '-'}</td>
                <td>${entry.pengeluaran ? 'Rp ' + entry.pengeluaran.toLocaleString() : '-'}</td>
                <td>Rp ${saldo.toLocaleString()}</td>
            </tr>`;
            financeData.innerHTML += row;

            // Mengelompokkan total pemasukan dan pengeluaran berdasarkan bulan
            let month = entry.tanggal.substring(0, 7); // Format YYYY-MM
            if (!monthlySummary[month]) {
                monthlySummary[month] = { pemasukan: 0, pengeluaran: 0 };
            }
            monthlySummary[month].pemasukan += entry.pemasukan || 0;
            monthlySummary[month].pengeluaran += entry.pengeluaran || 0;
        });

        // Menampilkan total pemasukan dan pengeluaran per bulan
        for (let month in monthlySummary) {
            let summaryRow = `<tr>
                <td>${month}</td>
                <td>Rp ${monthlySummary[month].pemasukan.toLocaleString()}</td>
                <td>Rp ${monthlySummary[month].pengeluaran.toLocaleString()}</td>
            </tr>`;
            summaryData.innerHTML += summaryRow;
        }
    })
    .catch(error => console.error("Error loading finance data:", error));
});
