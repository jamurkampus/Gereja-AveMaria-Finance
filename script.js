document.addEventListener("DOMContentLoaded", function() {
    fetch('finance.json')
    .then(response => response.json())
    .then(data => {
        let financeData = document.getElementById("finance-data");
        let saldo = 0;

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
        });
    })
    .catch(error => console.error("Error loading finance data:", error));
});
