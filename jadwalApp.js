function prayerTimes(latitude, longitude) {
    // Kosongkan konten sebelumnya
    const content = document.getElementById('prayerContent');
    content.innerHTML = "Memuat data...";

    fetch('https://api.aladhan.com/v1/calendar?latitude=' + latitude + '&longitude=' + longitude + '&method=2')
        .then(response => response.json())
        .then(function(response) {
            content.innerHTML = ""; // Bersihkan teks loading

            let data = response.data[0].timings;

            // 5 Waktu utama yang ingin ditampilkan
            const displayedTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            const indonesianNames = {
                'Fajr': 'Subuh',
                'Dhuhr': 'Dzuhur',
                'Asr': 'Ashar',
                'Maghrib': 'Maghrib',
                'Isha': 'Isya'
            };

            let table = document.createElement('table');
            let tableTbody = document.createElement('tbody');

            displayedTimes.forEach(key => {
                let row = tableTbody.insertRow();
                let name = row.insertCell(0);
                let time = row.insertCell(1);

                // Mengambil waktu tanpa embel-embel (WIB) jika ada
                let cleanTime = data[key].split(' ')[0];

                name.innerHTML = indonesianNames[key];
                time.innerHTML = cleanTime + ' (WIB)';
                tableTbody.appendChild(row);
            });

            table.appendChild(tableTbody);
            content.appendChild(table);
        });
}

// Fungsi saat dropdown kota berubah
function changeCity() {
    let coords = document.getElementById('citySelect').value.split(',');
    prayerTimes(coords[0], coords[1]);
}

function success(position) {
    prayerTimes(position.coords.latitude, position.coords.longitude);
}

function error() {
    // Default Jakarta
    prayerTimes('-6.200000', '106.816666');
}

function userLocation() {
    if (!navigator.geolocation) {
        error();
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function index() {
    userLocation();
}

index();