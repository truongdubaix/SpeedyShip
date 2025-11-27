import { useState, useEffect } from "react";

/** GEOCODE 💡 */
async function geocodeAddress(addr) {
  const url =
    `https://nominatim.openstreetmap.org/search?` +
    `format=json&addressdetails=1&limit=1&countrycodes=vn&q=${encodeURIComponent(
      addr
    )}`;

  const res = await fetch(url);
  const data = await res.json();
  if (!data.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    raw: data[0],
  };
}

export default function DiaChiSelector({ label, onChange, required }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selected, setSelected] = useState({
    province: null,
    district: null,
    ward: null,
  });

  const [fullAddress, setFullAddress] = useState("");

  // ===== LOAD PROVINCE =====
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((r) => r.json())
      .then(setProvinces);
  }, []);

  // ===== PROVINCE =====
  const handleProvince = async (e) => {
    const code = e.target.value;
    if (!code) return;

    const r = await fetch(
      `https://provinces.open-api.vn/api/p/${code}?depth=2`
    );
    const data = await r.json();

    setSelected({ province: data, district: null, ward: null });
    setDistricts(data.districts || []);
    setWards([]);

    emitAddress(data, null, null);
  };

  // ===== DISTRICT =====
  const handleDistrict = async (e) => {
    const code = e.target.value;
    if (!code) return;

    const r = await fetch(
      `https://provinces.open-api.vn/api/d/${code}?depth=2`
    );
    const data = await r.json();

    setSelected((prev) => ({ ...prev, district: data, ward: null }));
    setWards(data.wards || []);

    emitAddress(selected.province, data, null);
  };

  // ===== WARD (KHÔNG FETCH) =====
  const handleWard = async (e) => {
    const code = e.target.value;
    const ward = wards.find((w) => Number(w.code) === Number(code));
    if (!ward) return;

    setSelected((prev) => ({ ...prev, ward }));

    emitAddress(selected.province, selected.district, ward);
  };

  // ===== EMIT VỀ PARENT =====
  const emitAddress = async (prov, dist, ward) => {
    const addr = [ward?.name, dist?.name, prov?.name]
      .filter(Boolean)
      .join(", ");

    setFullAddress(addr);

    // ---- GEOCODE ----
    const geo = await geocodeAddress(addr);

    onChange({
      address: addr,
      lat: geo?.lat || null,
      lng: geo?.lng || null,
    });
  };

  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">{label}</label>

      <div className="grid md:grid-cols-3 gap-3">
        {/* ===== Province ===== */}
        <select
          defaultValue=""
          onChange={handleProvince}
          className="border p-3 rounded-lg"
          required={required}
        >
          <option value="">-- Tỉnh / Thành phố --</option>
          {provinces.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </select>

        {/* ===== District ===== */}
        <select
          defaultValue=""
          disabled={!districts.length}
          onChange={handleDistrict}
          className="border p-3 rounded-lg"
          required={required}
        >
          <option value="">-- Quận / Huyện --</option>
          {districts.map((d) => (
            <option key={d.code} value={d.code}>
              {d.name}
            </option>
          ))}
        </select>

        {/* ===== Ward ===== */}
        <select
          defaultValue=""
          disabled={!wards.length}
          onChange={handleWard}
          className="border p-3 rounded-lg"
          required={required}
        >
          <option value="">-- Phường / Xã --</option>
          {wards.map((w) => (
            <option key={w.code} value={w.code}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/* Input ẩn để Validate HTML */}
      <input
        type="text"
        readOnly
        required={required}
        value={fullAddress}
        style={{ opacity: 0, height: 0, padding: 0, border: "none" }}
      />
    </div>
  );
}
