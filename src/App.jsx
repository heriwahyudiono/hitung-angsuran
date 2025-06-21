import { useState } from 'react';
import dayjs from 'dayjs';

function App() {
  const [otr, setOtr] = useState(240000000);
  const [dp, setDp] = useState(20);
  const [jangkaWaktu, setJangkaWaktu] = useState(18);
  const [bunga, setBunga] = useState(14);
  const [kontrakNo, setKontrakNo] = useState('AGR00001');
  const [hasil, setHasil] = useState('');
  const [tabel, setTabel] = useState([]);

  const hitungAngsuran = () => {
    const otrVal = parseFloat(otr);
    const dpVal = parseFloat(dp);
    const waktu = parseInt(jangkaWaktu);
    const bungaVal = parseFloat(bunga);

    if (isNaN(otrVal) || isNaN(dpVal) || isNaN(waktu) || isNaN(bungaVal)) {
      setHasil('Mohon isi semua kolom dengan benar.');
      setTabel([]);
      return;
    }

    const dpNominal = otrVal * (dpVal / 100);
    const pokokUtang = otrVal - dpNominal;
    const bungaDecimal = bungaVal / 100;

    const totalPembayaran = pokokUtang + (pokokUtang * bungaDecimal);
    const angsuranPerBulan = totalPembayaran / waktu;

    setHasil(
      `Pokok Utang: Rp${pokokUtang.toLocaleString('id-ID')}` +
      `\nBunga (${bungaVal}%): Rp${(pokokUtang * bungaDecimal).toLocaleString('id-ID')}` +
      `\nTotal Pembayaran: Rp${totalPembayaran.toLocaleString('id-ID')}` +
      `\nAngsuran/Bulan: Rp${angsuranPerBulan.toLocaleString('id-ID')}`
    );

    const jadwal = [];
    const tanggalMulai = dayjs('2024-01-25');

    for (let i = 0; i < waktu; i++) {
      jadwal.push({
        kontrak: kontrakNo,
        ke: i + 1,
        nominal: angsuranPerBulan,
        jatuhTempo: tanggalMulai.add(i, 'month').format('YYYY-MM-DD')
      });
    }
    setTabel(jadwal);
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4">Hitung Angsuran Kredit Mobil</h2>

      <label htmlFor="kontrak" className="block">Nomor Kontrak:</label>
      <input type="text" id="kontrak" placeholder="Misal: AGR00001" value={kontrakNo} onChange={(e) => setKontrakNo(e.target.value)} className="w-full p-2 my-2 border" />

      <label htmlFor="otr" className="block">Harga Mobil (OTR):</label>
      <input type="number" id="otr" placeholder="Misal: 240000000" value={otr} onChange={(e) => setOtr(e.target.value)} className="w-full p-2 my-2 border" />

      <label htmlFor="dp" className="block">Down Payment/DP (%):</label>
      <input type="number" id="dp" placeholder="Misal: 20" value={dp} onChange={(e) => setDp(e.target.value)} className="w-full p-2 my-2 border" />

      <label htmlFor="jangkaWaktu" className="block">Jangka Waktu (bulan):</label>
      <input type="number" id="jangkaWaktu" placeholder="Misal: 18" value={jangkaWaktu} onChange={(e) => setJangkaWaktu(e.target.value)} className="w-full p-2 my-2 border" />

      <label htmlFor="bunga" className="block">Bunga (%):</label>
      <input type="number" id="bunga" placeholder="Misal: 14" value={bunga} onChange={(e) => setBunga(e.target.value)} className="w-full p-2 my-2 border" />

      <button onClick={hitungAngsuran} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Hitung Angsuran</button>

      <div className="result font-bold whitespace-pre-line mt-6">{hasil}</div>

      {tabel.length > 0 && (
        <table className="mt-6 w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">KONTRAK_NO</th>
              <th className="border px-2 py-1">ANGSURAN_KE</th>
              <th className="border px-2 py-1">ANGSURAN_PER_BULAN</th>
              <th className="border px-2 py-1">TANGGAL_JATUH_TEMPO</th>
            </tr>
          </thead>
          <tbody>
            {tabel.map((row) => (
              <tr key={row.ke}>
                <td className="border px-2 py-1 text-center">{row.kontrak}</td>
                <td className="border px-2 py-1 text-center">{row.ke}</td>
                <td className="border px-2 py-1 text-right">{row.nominal.toLocaleString('id-ID')}</td>
                <td className="border px-2 py-1 text-center">{row.jatuhTempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
