import { useState, useEffect } from "react";

export default function DiaChiSelector({ label, onChange, required }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selected, setSelected] = useState({
    province: "",
    district: "",
    ward: "",
  });

  const [fullAddress, setFullAddress] = useState("");

  // Lấy danh sách tỉnh
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then(setProvinces);
  }, []);

  // Cập nhật và gọi onChange
  const updateFullAddress = (p, d, w) => {
    const addr = [p, d, w].filter(Boolean).join(", ");
    setFullAddress(addr);
    onChange(addr);
  };

  // Khi chọn tỉnh
  const handleProvince = async (e) => {
    const code = e.target.value;
    if (!code) return;

    const res = await fetch(
      `https://provinces.open-api.vn/api/p/${code}?depth=2`
    );
    const data = await res.json();

    setDistricts(data.districts);
    setWards([]);
    setSelected({ province: data.name, district: "", ward: "" });

    updateFullAddress(data.name, "", "");
  };

  // Khi chọn quận
  const handleDistrict = async (e) => {
    const code = e.target.value;
    if (!code) return;

    const res = await fetch(
      `https://provinces.open-api.vn/api/d/${code}?depth=2`
    );
    const data = await res.json();

    setWards(data.wards);
    setSelected((s) => ({ ...s, district: data.name, ward: "" }));

    updateFullAddress(selected.province, data.name, "");
  };

  // Khi chọn phường
  const handleWard = (e) => {
    const name = e.target.options[e.target.selectedIndex].text;
    setSelected((s) => ({ ...s, ward: name }));

    updateFullAddress(selected.province, selected.district, name);
  };

  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">{label}</label>
      <div className="grid md:grid-cols-3 gap-3">
        <select
          onChange={handleProvince}
          className="border p-3 rounded-lg"
          defaultValue=""
          required={required}
        >
          <option value="">-- Tỉnh/Thành phố --</option>
          {provinces.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          onChange={handleDistrict}
          className="border p-3 rounded-lg"
          disabled={!districts.length}
          defaultValue=""
          required={required}
        >
          <option value="">-- Quận/Huyện --</option>
          {districts.map((d) => (
            <option key={d.code} value={d.code}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          onChange={handleWard}
          className="border p-3 rounded-lg"
          disabled={!wards.length}
          defaultValue=""
          required={required}
        >
          <option value="">-- Phường/Xã --</option>
          {wards.map((w) => (
            <option key={w.code} value={w.code}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/*⚠️ Input này dùng để trình duyệt validate => PHẢI required*/}
      <input
        type="text"
        value={fullAddress}
        required={required}
        readOnly
        style={{ opacity: 0, height: 0, padding: 0, border: "none" }}
      />
    </div>
  );
}
