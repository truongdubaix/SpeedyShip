import { useState, useEffect } from "react";

export default function DiaChiSelector({ label, onChange }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selected, setSelected] = useState({
    province: "",
    district: "",
    ward: "",
  });

  // Lấy danh sách tỉnh
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then(setProvinces);
  }, []);

  // Khi chọn tỉnh → load quận
  const handleProvince = async (e) => {
    const code = e.target.value;
    const res = await fetch(
      `https://provinces.open-api.vn/api/p/${code}?depth=2`
    );
    const data = await res.json();
    setDistricts(data.districts);
    setWards([]);
    setSelected({ province: data.name, district: "", ward: "" });
    onChange(data.name);
  };

  // Khi chọn quận → load phường
  const handleDistrict = async (e) => {
    const code = e.target.value;
    const res = await fetch(
      `https://provinces.open-api.vn/api/d/${code}?depth=2`
    );
    const data = await res.json();
    setWards(data.wards);
    setSelected((s) => ({ ...s, district: data.name, ward: "" }));
    onChange(`${selected.province}, ${data.name}`);
  };

  // Khi chọn phường
  const handleWard = (e) => {
    const name = e.target.options[e.target.selectedIndex].text;
    setSelected((s) => ({ ...s, ward: name }));
    onChange(`${selected.province}, ${selected.district}, ${name}`);
  };

  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">{label}</label>
      <div className="grid md:grid-cols-3 gap-3">
        <select
          onChange={handleProvince}
          className="border p-3 rounded-lg"
          defaultValue=""
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
        >
          <option value="">-- Phường/Xã --</option>
          {wards.map((w) => (
            <option key={w.code} value={w.code}>
              {w.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
