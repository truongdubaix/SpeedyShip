// src/components/MapPicker.jsx
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
  iconSize: [32, 32],
});

// ⭐ Component set center mỗi khi toạ độ thay đổi
function SetViewOnChange({ pos, defaultPos }) {
  const map = useMap();

  useEffect(() => {
    if (defaultPos) map.setView(defaultPos);
  }, [defaultPos]);

  useEffect(() => {
    if (pos) map.setView(pos);
  }, [pos]);

  return null;
}

function SelectMarker({ pos, setPos }) {
  useMapEvents({
    click(e) {
      setPos([e.latlng.lat, e.latlng.lng]); // luôn lưu array [lat, lng]
    },
  });
  return pos ? <Marker position={pos} icon={icon} /> : null;
}

export default function MapPicker({ defaultPos, onCancel, onConfirm }) {
  const [pos, setPos] = useState(defaultPos);

  // Nếu defaultPos thay đổi (ví dụ chọn địa chỉ khác), map sẽ update
  useEffect(() => {
    setPos(defaultPos);
  }, [defaultPos]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 w-[90%] md:w-[650px]">
      <div className="flex justify-between pb-2 border-b">
        <h2 className="font-semibold text-gray-700 text-lg">
          📍 Chọn vị trí trên bản đồ
        </h2>
        <button
          onClick={onCancel}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          ❌
        </button>
      </div>

      <div className="mt-3 w-full h-[350px] rounded overflow-hidden">
        <MapContainer
          center={defaultPos}
          zoom={16}
          scrollWheelZoom
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <SelectMarker pos={pos} setPos={setPos} />
          <SetViewOnChange pos={pos} defaultPos={defaultPos} />
        </MapContainer>
      </div>

      <button
        onClick={() => onConfirm({ lat: pos[0], lng: pos[1] })}
        className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
      >
        ✔ Xác nhận vị trí này
      </button>
    </div>
  );
}
